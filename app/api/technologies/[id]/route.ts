import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Technology from "@/models/Technology";
import { isMutationAllowed, jsonError } from "@/lib/api-helpers";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  if (!isMutationAllowed(request)) {
    return jsonError("Unauthorized request.", 401);
  }

  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();
    const updated = await Technology.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return jsonError("Technology not found.", 404);
    }
    return NextResponse.json({ success: true, data: updated });
  } catch {
    return jsonError("Unable to update technology.", 500);
  }
}

export async function DELETE(request: Request, { params }: Params) {
  if (!isMutationAllowed(request)) {
    return jsonError("Unauthorized request.", 401);
  }

  try {
    await dbConnect();
    const { id } = await params;
    const deleted = await Technology.findByIdAndDelete(id);
    if (!deleted) {
      return jsonError("Technology not found.", 404);
    }
    return NextResponse.json({ success: true });
  } catch {
    return jsonError("Unable to delete technology.", 500);
  }
}
