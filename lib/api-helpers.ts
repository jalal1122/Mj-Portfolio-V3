import { NextResponse } from "next/server";

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ success: false, error: message }, { status });
}

export function isMutationAllowed(request: Request) {
  const requiredToken = process.env.ADMIN_TOKEN;
  if (!requiredToken) {
    return true;
  }
  const suppliedToken = request.headers.get("x-admin-token");
  return suppliedToken === requiredToken;
}
