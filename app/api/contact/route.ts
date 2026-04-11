import nodemailer from "nodemailer";
import { jsonError } from "@/lib/api-helpers";

const requestMap = new Map<string, number>();
const LIMIT_WINDOW_MS = 60_000;

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for") ?? "local";
  const key = forwardedFor.split(",")[0].trim();
  const lastRequestTime = requestMap.get(key) ?? 0;
  const now = Date.now();

  if (now - lastRequestTime < LIMIT_WINDOW_MS) {
    return jsonError("Please wait before sending another message.", 429);
  }
  requestMap.set(key, now);

  try {
    const body = await request.json();
    const { name, email, subject, message } = body as {
      name?: string;
      email?: string;
      subject?: string;
      message?: string;
    };

    if (!name || !email || !message) {
      return jsonError("Name, email and message are required.");
    }
    if (!isEmail(email)) {
      return jsonError("A valid email address is required.");
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT ?? 587);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL ?? smtpUser;

    if (!smtpHost || !smtpUser || !smtpPass || !toEmail || !fromEmail) {
      return jsonError("Email service is not configured.", 500);
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const safeSubject = subject?.trim() || "Portfolio Contact";

    await transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `[Portfolio Contact] ${safeSubject}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    return new Response(JSON.stringify({ success: true, message: "Message sent successfully." }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return jsonError("Unable to send message right now.", 500);
  }
}
