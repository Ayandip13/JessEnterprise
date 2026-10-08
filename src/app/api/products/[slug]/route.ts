import { NextRequest, NextResponse } from "next/server";
import { getProductBySlug } from "@/lib/data-service";
import { connectToDatabase } from "@/lib/db";
import { ProductModel } from "@/lib/models/Product";
import { verifyAdminAuth } from "@/lib/auth";
import mongoose from "mongoose";

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

    const { slug: identifier } = await params;
    const body = await req.json();

    const isId = mongoose.Types.ObjectId.isValid(identifier);
    const query = isId ? { _id: identifier } : { slug: identifier };

    const updateFields: any = {
      name: body.name,
      categorySlug: body.categorySlug,
      categoryName: body.categoryName,
      shortDescription: body.shortDescription,
      fullDescription: body.fullDescription,
      images: Array.isArray(body.images) ? body.images : [],
      specifications: body.specifications,
      isFeatured: body.isFeatured,
      isAvailable: body.isAvailable,
      enquiryEnabled: body.enquiryEnabled,
      legalMetrologyCert: body.legalMetrologyCert,
    };

    const updated = await ProductModel.findOneAndUpdate(
      query,
      { $set: updateFields },
      { new: true }
    );

    if (!updated) {
      // Try searching by slug if passed identifier was string id or vice versa
      const fallbackUpdated = await ProductModel.findOneAndUpdate(
        { slug: identifier },
        { $set: updateFields },
        { new: true }
      );
      if (fallbackUpdated) {
        return NextResponse.json({ success: true, data: fallbackUpdated });
      }
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

    const { slug: identifier } = await params;
    const isId = mongoose.Types.ObjectId.isValid(identifier);
    const query = isId ? { $or: [{ _id: identifier }, { slug: identifier }] } : { slug: identifier };

    const deleted = await ProductModel.findOneAndDelete(query);

    if (!deleted) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Product deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
