import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import HomeContent from "@/models/HomeContent";
import { isMutationAllowed, jsonError } from "@/lib/api-helpers";

type Params = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: Params) {
  try {
    await dbConnect();
    const { id } = await params;
    const content = await HomeContent.findById(id).lean();
    if (!content) {
      return jsonError("Home content not found.", 404);
    }
    return NextResponse.json({ success: true, data: content });
  } catch {
    return jsonError("Unable to fetch home content.", 500);
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
    const updated = await HomeContent.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return jsonError("Home content not found.", 404);
    }
    return NextResponse.json({ success: true, data: updated });
  } catch {
    return jsonError("Unable to update home content.", 500);
  }
}

export async function DELETE(request: Request, { params }: Params) {
  if (!isMutationAllowed(request)) {
    return jsonError("Unauthorized request.", 401);
  }

  try {
    await dbConnect();
    const { id } = await params;
    const deleted = await HomeContent.findByIdAndDelete(id);
    if (!deleted) {
      return jsonError("Home content not found.", 404);
    }
    return NextResponse.json({ success: true });
  } catch {
    return jsonError("Unable to delete home content.", 500);
  }
}

