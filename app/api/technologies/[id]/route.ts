import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Technology from "@/models/Technology";
import { isMutationAllowed, jsonError } from "@/lib/api-helpers";

type Params = { params: Promise<{ id: string }> };
const LEGACY_TECH_SVG_PLACEHOLDER = "https://placeholder.invalid/tech.svg";

export async function PATCH(request: Request, { params }: Params) {
  if (!isMutationAllowed(request)) {
    return jsonError("Unauthorized request.", 401);
  }

  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();
    const updated = await Technology.findByIdAndUpdate(id, {
      ...body,
      cloudinarySvgUrl: body.cloudinarySvgUrl || LEGACY_TECH_SVG_PLACEHOLDER,
      color: body.color ?? "",
    }, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return jsonError("Technology not found.", 404);
    }
    return NextResponse.json({ success: true, data: updated });
  } catch (error: unknown) {
    const mongoError = error as { code?: number; name?: string; errors?: Record<string, { message?: string }> };
    if (mongoError.code === 11000) {
      return jsonError("Technology with this name already exists.", 409);
    }
    if (mongoError.name === "ValidationError") {
      const firstError = Object.values(mongoError.errors ?? {})[0]?.message;
      return jsonError(firstError || "Invalid technology payload.", 422);
    }
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
