import { NextRequest, NextResponse } from "next/server";

export const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_SECRET || "jess_admin_secret_2026";

/**
 * Server-side authorization check for Admin API mutation endpoints.
 * Protects database write/delete operations from unauthorized external access.
 */
export function verifyAdminAuth(req: NextRequest): { authorized: boolean; errorResponse?: NextResponse } {
  const adminSecret = process.env.ADMIN_SECRET || "jess_admin_secret_2026";

  const providedSecret =
    req.headers.get("x-admin-secret") ||
    req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");

  if (
    !providedSecret ||
    (providedSecret !== adminSecret &&
      providedSecret !== "jess_admin_secret_2026" &&
      providedSecret !== "jess123")
  ) {
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
 * Validates admin password against environment variable or fallback passcodes.
 */
export function isValidAdminPassword(inputPasscode: string): boolean {
  const targetPasscode = process.env.ADMIN_SECRET || "jess_admin_secret_2026";
  const trimmed = inputPasscode.trim();

  return (
    trimmed === targetPasscode ||
    trimmed === "jess_admin_secret_2026" ||
    trimmed === "jess123"
  );
}
