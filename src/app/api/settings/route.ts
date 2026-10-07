import { NextRequest, NextResponse } from "next/server";
import { getCompanySettings } from "@/lib/data-service";
import { connectToDatabase } from "@/lib/db";
import { SettingsModel } from "@/lib/models/Settings";
import { verifyAdminAuth } from "@/lib/auth";

export async function GET() {
  try {
    const settings = await getCompanySettings();
    return NextResponse.json({ success: true, data: settings });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const authCheck = verifyAdminAuth(req);
    if (!authCheck.authorized && authCheck.errorResponse) {
      return authCheck.errorResponse;
    }

    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json(
        { success: false, error: "Database connection not available" },
        { status: 503 }
      );
    }

    const body = await req.json();
    let settings = await SettingsModel.findOne();

    if (!settings) {
      settings = await SettingsModel.create(body);
    } else {
      Object.assign(settings, body);
      await settings.save();
    }

    return NextResponse.json({ success: true, data: settings });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
