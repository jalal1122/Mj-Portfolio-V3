import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Experience from "@/models/Experience";
import { isMutationAllowed, jsonError } from "@/lib/api-helpers";

export async function GET() {
  try {
    await dbConnect();
    const experiences = await Experience.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: experiences });
  } catch {
    return jsonError("Unable to fetch experiences.", 500);
  }
}

export async function POST(request: Request) {
  if (!isMutationAllowed(request)) {
    return jsonError("Unauthorized request.", 401);
  }

  try {
    await dbConnect();
    const body = await request.json();
    const created = await Experience.create(body);
    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch {
    return jsonError("Unable to create experience.", 500);
  }
}
