import { NextRequest, NextResponse } from "next/server";

export const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_SECRET || "jess123";

/**
 * Server-side authorization check for Admin API mutation endpoints.
 * Protects database write/delete operations from unauthorized external access.
 */
export function verifyAdminAuth(req: NextRequest): { authorized: boolean; errorResponse?: NextResponse } {
  const adminSecret = process.env.ADMIN_SECRET || "jess123";

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

  return { authorized: true };
}

/**
 * Validates admin password against environment variable or fallback passcode.
 */
export function isValidAdminPassword(inputPasscode: string): boolean {
  const targetPasscode = process.env.ADMIN_SECRET || "jess123";
  return inputPasscode.trim() === targetPasscode;
}
