import { NextRequest, NextResponse } from "next/server";
import { getProductBySlug } from "@/lib/data-service";
import { connectToDatabase } from "@/lib/db";
import { ProductModel } from "@/lib/models/Product";
import { verifyAdminAuth } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: product });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
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

    const { slug } = await params;
    const body = await req.json();

    const updated = await ProductModel.findOneAndUpdate({ slug }, body, { new: true });
    if (!updated) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
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

    const { slug } = await params;
    const deleted = await ProductModel.findOneAndDelete({ slug });

    if (!deleted) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Product deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

