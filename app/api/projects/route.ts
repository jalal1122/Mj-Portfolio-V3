import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Project from "@/models/Project";
import { isMutationAllowed, jsonError } from "@/lib/api-helpers";

export async function GET() {
  try {
    await dbConnect();
    const projects = await Project.find().populate("techStack").sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: projects });
  } catch {
    return jsonError("Unable to fetch projects.", 500);
  }
}

export async function POST(request: Request) {
  if (!isMutationAllowed(request)) {
    return jsonError("Unauthorized request.", 401);
  }

  try {
    await dbConnect();
    const body = await request.json();
    const created = await Project.create(body);
    const populated = await created.populate("techStack");
    return NextResponse.json({ success: true, data: populated }, { status: 201 });
  } catch {
    return jsonError("Unable to create project.", 500);
  }
}
