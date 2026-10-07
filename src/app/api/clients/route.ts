import { NextRequest, NextResponse } from "next/server";
import { getClientLogos } from "@/lib/data-service";
import { connectToDatabase } from "@/lib/db";
import { ClientLogoModel } from "@/lib/models/ClientLogo";
import { verifyAdminAuth } from "@/lib/auth";

export async function GET() {
  try {
    const clients = await getClientLogos();
    return NextResponse.json({ success: true, count: clients.length, data: clients });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
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
    if (!body.name) {
      return NextResponse.json(
        { success: false, error: "Company name is required" },
        { status: 400 }
      );
    }

    const newClient = await ClientLogoModel.create({
      name: body.name,
      industry: body.industry || "Pharma & Industrial",
      logoText: body.logoText || body.name,
      logoUrl: body.logoUrl || "",
      order: body.order || 0,
      isActive: body.isActive !== undefined ? body.isActive : true,
    });

    return NextResponse.json({ success: true, data: newClient }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
