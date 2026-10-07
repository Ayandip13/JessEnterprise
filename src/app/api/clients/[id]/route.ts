import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { ClientLogoModel } from "@/lib/models/ClientLogo";
import { verifyAdminAuth } from "@/lib/auth";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;
    const body = await req.json();

    const updated = await ClientLogoModel.findByIdAndUpdate(id, body, { new: true });
    if (!updated) {
      return NextResponse.json({ success: false, error: "Client company not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;
    const deleted = await ClientLogoModel.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ success: false, error: "Client company not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Client company deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
