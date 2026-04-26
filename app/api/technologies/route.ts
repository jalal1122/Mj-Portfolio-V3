import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Technology from "@/models/Technology";
import { isMutationAllowed, jsonError } from "@/lib/api-helpers";

const LEGACY_TECH_SVG_PLACEHOLDER = "https://placeholder.invalid/tech.svg";

export async function GET() {
  try {
    await dbConnect();
    const technologies = await Technology.find().sort({ displayOrder: 1, createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: technologies });
  } catch {
    return jsonError("Unable to fetch technologies.", 500);
  }
}

export async function POST(request: Request) {
  if (!isMutationAllowed(request)) {
    return jsonError("Unauthorized request.", 401);
  }

  try {
    await dbConnect();
    const body = await request.json();
    const created = await Technology.create({
      ...body,
      cloudinarySvgUrl: body.cloudinarySvgUrl || LEGACY_TECH_SVG_PLACEHOLDER,
      color: body.color ?? "",
    });
    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error: unknown) {
    const mongoError = error as { code?: number; name?: string; errors?: Record<string, { message?: string }> };
    if (mongoError.code === 11000) {
      return jsonError("Technology with this name already exists.", 409);
    }
    if (mongoError.name === "ValidationError") {
      const firstError = Object.values(mongoError.errors ?? {})[0]?.message;
      return jsonError(firstError || "Invalid technology payload.", 422);
    }
    return jsonError("Unable to create technology.", 500);
  }
}
