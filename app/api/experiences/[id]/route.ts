import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Experience from "@/models/Experience";
import { getMutationActor, isMutationAllowed, jsonError } from "@/lib/api-helpers";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  if (!isMutationAllowed(request)) {
    return jsonError("Unauthorized request.", 401);
  }

  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();
    const updated = await Experience.findByIdAndUpdate(id, { ...body, changedBy: getMutationActor(request) }, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return jsonError("Experience not found.", 404);
    }
    return NextResponse.json({ success: true, data: updated });
  } catch {
    return jsonError("Unable to update experience.", 500);
  }
}

export async function DELETE(request: Request, { params }: Params) {
  if (!isMutationAllowed(request)) {
    return jsonError("Unauthorized request.", 401);
  }

  try {
    await dbConnect();
    const { id } = await params;
    const deleted = await Experience.findByIdAndDelete(id);
    if (!deleted) {
      return jsonError("Experience not found.", 404);
    }
    return NextResponse.json({ success: true });
  } catch {
    return jsonError("Unable to delete experience.", 500);
  }
}
