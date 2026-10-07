import { NextRequest, NextResponse } from "next/server";

/**
 * Server-side authorization check for Admin API mutation endpoints.
 * Protects database write/delete operations from unauthorized external access.
 */
export function verifyAdminAuth(req: NextRequest): { authorized: boolean; errorResponse?: NextResponse } {
  const adminSecret = process.env.ADMIN_SECRET;

  if (adminSecret) {
    const providedSecret =
      req.headers.get("x-admin-secret") ||
      req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");

    if (!providedSecret || providedSecret !== adminSecret) {
      return {
        authorized: false,
        errorResponse: NextResponse.json(
          {
            success: false,
            error: "Unauthorized: Missing or invalid administrator authorization token.",
          },
          { status: 401 }
        ),
      };
    }
  }

  return { authorized: true };
}
