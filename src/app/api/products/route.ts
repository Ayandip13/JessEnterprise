import { NextRequest, NextResponse } from "next/server";
import { getProducts } from "@/lib/data-service";
import { connectToDatabase } from "@/lib/db";
import { ProductModel } from "@/lib/models/Product";
import { slugify } from "@/lib/utils";
import { verifyAdminAuth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const categorySlug = searchParams.get("category") || undefined;
    const isFeaturedParam = searchParams.get("featured");
    const search = searchParams.get("search") || undefined;

    const isFeatured = isFeaturedParam === "true" ? true : isFeaturedParam === "false" ? false : undefined;

    const products = await getProducts({ categorySlug, isFeatured, search });
    return NextResponse.json({ success: true, count: products.length, data: products });
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
        { success: false, error: "Database connection not available. Please configure MONGODB_URI." },
        { status: 503 }
      );
    }

    const body = await req.json();

    if (!body.name || !body.categorySlug || !body.shortDescription) {
      return NextResponse.json(
        { success: false, error: "Product name, category, and short description are required." },
        { status: 400 }
      );
    }

    const slug = body.slug || slugify(body.name);

    const newProduct = await ProductModel.create({
      name: body.name,
      slug,
      categorySlug: body.categorySlug,
      categoryName: body.categoryName || body.categorySlug,
      shortDescription: body.shortDescription,
      fullDescription: body.fullDescription || body.shortDescription,
      images: body.images || [],
      specifications: body.specifications || [],
      isFeatured: body.isFeatured || false,
      isAvailable: body.isAvailable !== undefined ? body.isAvailable : true,
      enquiryEnabled: body.enquiryEnabled !== undefined ? body.enquiryEnabled : true,
      legalMetrologyCert: body.legalMetrologyCert || "",
    });

    return NextResponse.json({ success: true, data: newProduct }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
