import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Project from "@/models/Project";
import { getMutationActor, isMutationAllowed, jsonError } from "@/lib/api-helpers";

type Params = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: Params) {
  try {
    await dbConnect();
    const { id } = await params;
    const project = await Project.findById(id).populate("techStack").lean();
    if (!project) {
      return jsonError("Project not found.", 404);
    }
    return NextResponse.json({ success: true, data: project });
  } catch {
    return jsonError("Unable to fetch project.", 500);
  }
}

export async function PATCH(request: Request, { params }: Params) {
  if (!isMutationAllowed(request)) {
    return jsonError("Unauthorized request.", 401);
  }

  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();
    const updated = await Project.findByIdAndUpdate(id, { ...body, changedBy: getMutationActor(request) }, {
      new: true,
      runValidators: true,
    }).populate("techStack");
    if (!updated) {
      return jsonError("Project not found.", 404);
    }
    return NextResponse.json({ success: true, data: updated });
  } catch {
    return jsonError("Unable to update project.", 500);
  }
}

export async function DELETE(request: Request, { params }: Params) {
  if (!isMutationAllowed(request)) {
    return jsonError("Unauthorized request.", 401);
  }

  try {
    await dbConnect();
    const { id } = await params;
    const deleted = await Project.findByIdAndDelete(id);
    if (!deleted) {
      return jsonError("Project not found.", 404);
    }
    return NextResponse.json({ success: true });
  } catch {
    return jsonError("Unable to delete project.", 500);
  }
}
