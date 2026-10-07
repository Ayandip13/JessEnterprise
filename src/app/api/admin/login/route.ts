import { NextRequest, NextResponse } from "next/server";
import { isValidAdminPassword } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const password = (body.password || body.passcode || "").trim();

    if (!password) {
      return NextResponse.json(
        { success: false, error: "Password is required" },
        { status: 400 }
      );
    }

    if (isValidAdminPassword(password)) {
      const token = process.env.ADMIN_SECRET || "jess123";
      const response = NextResponse.json({
        success: true,
        message: "Authentication successful",
        token,
      });

      // Set HTTP-only session cookie
      response.cookies.set("jess_admin_token", token, {
        httpOnly: false, // accessible via JS for client headers
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response;
    }

    return NextResponse.json(
      { success: false, error: "Invalid admin password. Access denied." },
      { status: 401 }
    );
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
