import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { ProductModel } from "@/lib/models/Product";
import { CategoryModel } from "@/lib/models/Category";
import { ServiceModel } from "@/lib/models/Service";
import { ClientLogoModel } from "@/lib/models/ClientLogo";
import { SettingsModel } from "@/lib/models/Settings";
import { PRODUCTS, CATEGORIES, SERVICES, CLIENT_LOGOS, COMPANY_INFO } from "@/lib/catalog-data";

export async function POST() {
  try {
    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json(
        {
          success: false,
          error: "Database connection not established. Set MONGODB_URI to enable persistent database seeding.",
          seededInFallbackMode: true,
        },
        { status: 200 }
      );
    }

    // Clear existing collections
    await ProductModel.deleteMany({});
    await CategoryModel.deleteMany({});
    await ServiceModel.deleteMany({});
    await ClientLogoModel.deleteMany({});
    await SettingsModel.deleteMany({});

    // Seed Categories
    await CategoryModel.insertMany(CATEGORIES);

    // Seed Products
    await ProductModel.insertMany(PRODUCTS);

    // Seed Services
    await ServiceModel.insertMany(SERVICES);

    // Seed Client Logos
    const clientDocs = CLIENT_LOGOS.map((client, idx) => ({
      name: client.name,
      industry: client.industry,
      logoText: client.name,
      order: idx + 1,
    }));
    await ClientLogoModel.insertMany(clientDocs);

    // Seed Company Settings
    await SettingsModel.create(COMPANY_INFO);

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully with authentic catalog data from PDF!",
      counts: {
        products: PRODUCTS.length,
        categories: CATEGORIES.length,
        services: SERVICES.length,
        clientLogos: CLIENT_LOGOS.length,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
