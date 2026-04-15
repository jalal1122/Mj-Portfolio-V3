import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import HomeContent from "@/models/HomeContent";
import { isMutationAllowed, jsonError } from "@/lib/api-helpers";

export async function GET() {
  try {
    await dbConnect();
    const content = await HomeContent.findOne().sort({ updatedAt: -1 }).lean();
    return NextResponse.json({ success: true, data: content ?? null });
  } catch {
    return jsonError("Unable to fetch home content.", 500);
  }
}

export async function POST(request: Request) {
  if (!isMutationAllowed(request)) {
    return jsonError("Unauthorized request.", 401);
  }

  try {
    await dbConnect();
    const body = await request.json();
    const created = await HomeContent.create(body);
    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch {
    return jsonError("Unable to create home content.", 500);
  }
}

