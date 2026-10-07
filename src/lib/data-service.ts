import { connectToDatabase } from "./db";
import { ProductModel, IProduct } from "./models/Product";
import { CategoryModel, ICategory } from "./models/Category";
import { ServiceModel, IService } from "./models/Service";
import { ClientLogoModel, IClientLogo } from "./models/ClientLogo";
import { SettingsModel, ISettings } from "./models/Settings";
import {
  PRODUCTS,
  CATEGORIES,
  SERVICES,
  CLIENT_LOGOS,
  COMPANY_INFO,
  CatalogProduct,
  CatalogCategory,
  CatalogService,
  CatalogClient,
  CompanySettings,
} from "./catalog-data";

export async function getProducts(options?: {
  categorySlug?: string;
  isFeatured?: boolean;
  search?: string;
}): Promise<CatalogProduct[]> {
  try {
    const db = await connectToDatabase();
    if (db) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const query: any = {};
      if (options?.categorySlug) {
        query.categorySlug = options.categorySlug;
      }
      if (options?.isFeatured !== undefined) {
        query.isFeatured = options.isFeatured;
      }
      if (options?.search) {
        query.$or = [
          { name: { $regex: options.search, $options: "i" } },
          { shortDescription: { $regex: options.search, $options: "i" } },
          { "specifications.value": { $regex: options.search, $options: "i" } },
        ];
      }

      let docs = await ProductModel.find(query).sort({ srNo: 1, createdAt: -1 });
      if (docs.length === 0 && !options?.categorySlug && !options?.search) {
        await ProductModel.insertMany(
          PRODUCTS.map((p, idx) => ({
            srNo: idx + 1,
            name: p.name,
            slug: p.slug,
            categorySlug: p.categorySlug,
            categoryName: p.categoryName,
            shortDescription: p.shortDescription,
            fullDescription: p.fullDescription,
            images: p.images,
            specifications: p.specifications,
            isFeatured: p.isFeatured,
            isAvailable: true,
            enquiryEnabled: true,
            legalMetrologyCert: p.legalMetrologyCert || false,
          }))
        );
        docs = await ProductModel.find(query).sort({ srNo: 1, createdAt: -1 });
      }

      if (docs.length > 0) {
        return docs.map((doc: IProduct) => ({
          id: doc._id.toString(),
          srNo: (doc as any).srNo || 1,
          name: doc.name,
          slug: doc.slug,
          categorySlug: doc.categorySlug,
          categoryName: doc.categoryName,
          shortDescription: doc.shortDescription,
          fullDescription: doc.fullDescription,
          images: doc.images,
          specifications: doc.specifications,
          isFeatured: doc.isFeatured,
          isAvailable: doc.isAvailable,
          enquiryEnabled: doc.enquiryEnabled,
          legalMetrologyCert: doc.legalMetrologyCert,
        }));
      }
    }
  } catch (error) {
    console.warn("MongoDB query failed, falling back to static catalog:", error);
  }

  // Fallback to in-memory static catalog derived from PDF
  let filtered = [...PRODUCTS];
  if (options?.categorySlug) {
    filtered = filtered.filter((p) => p.categorySlug === options.categorySlug);
  }
  if (options?.isFeatured !== undefined) {
    filtered = filtered.filter((p) => p.isFeatured === options.isFeatured);
  }
  if (options?.search) {
    const term = options.search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.shortDescription.toLowerCase().includes(term) ||
        p.specifications.some((s) => s.value.toLowerCase().includes(term))
    );
  }
  return filtered;
}

export async function getProductBySlug(slug: string): Promise<CatalogProduct | null> {
  try {
    const db = await connectToDatabase();
    if (db) {
      const doc = await ProductModel.findOne({ slug });
      if (doc) {
        return {
          id: doc._id.toString(),
          srNo: (doc as any).srNo || 1,
          name: doc.name,
          slug: doc.slug,
          categorySlug: doc.categorySlug,
          categoryName: doc.categoryName,
          shortDescription: doc.shortDescription,
          fullDescription: doc.fullDescription,
          images: doc.images,
          specifications: doc.specifications,
          isFeatured: doc.isFeatured,
          isAvailable: doc.isAvailable,
          enquiryEnabled: doc.enquiryEnabled,
          legalMetrologyCert: doc.legalMetrologyCert,
        };
      }
    }
  } catch (error) {
    console.warn("MongoDB lookup failed, falling back to static catalog:", error);
  }

  const match = PRODUCTS.find((p) => p.slug === slug);
  return match || null;
}

export async function getCategories(): Promise<CatalogCategory[]> {
  try {
    const db = await connectToDatabase();
    if (db) {
      let docs = await CategoryModel.find().sort({ order: 1 });
      if (docs.length === 0) {
        await CategoryModel.insertMany(CATEGORIES);
        docs = await CategoryModel.find().sort({ order: 1 });
      }
      if (docs.length > 0) {
        return docs.map((doc: ICategory) => ({
          name: doc.name,
          slug: doc.slug,
          description: doc.description,
          iconName: doc.iconName || "Layers",
          order: doc.order,
        }));
      }
    }
  } catch (error) {
    console.warn("MongoDB categories failed, using fallback:", error);
  }
  return CATEGORIES;
}

export async function getServices(): Promise<CatalogService[]> {
  try {
    const db = await connectToDatabase();
    if (db) {
      let docs = await ServiceModel.find();
      if (docs.length === 0) {
        await ServiceModel.insertMany(SERVICES);
        docs = await ServiceModel.find();
      }
      if (docs.length > 0) {
        return docs.map((doc: IService) => ({
          title: doc.title,
          slug: doc.slug,
          category: doc.category,
          shortDescription: doc.shortDescription,
          fullDescription: doc.fullDescription,
          highlights: doc.highlights,
          licenseNo: doc.licenseNo,
        }));
      }
    }
  } catch (error) {
    console.warn("MongoDB services failed, using fallback:", error);
  }
  return SERVICES;
}

export async function getClientLogos(): Promise<CatalogClient[]> {
  try {
    const db = await connectToDatabase();
    if (db) {
      let docs = await ClientLogoModel.find({ isActive: { $ne: false } }).sort({ order: 1 });
      if (docs.length === 0) {
        await ClientLogoModel.insertMany(
          CLIENT_LOGOS.map((c, idx) => ({
            name: c.name,
            industry: c.industry || "Pharmaceuticals & Healthcare",
            logoText: c.logoText || c.name,
            logoUrl: c.logoUrl || "",
            order: c.order || idx + 1,
            isActive: true,
          }))
        );
        docs = await ClientLogoModel.find({ isActive: { $ne: false } }).sort({ order: 1 });
      }
      if (docs.length > 0) {
        return docs.map((doc: IClientLogo) => ({
          id: doc._id.toString(),
          name: doc.name,
          industry: doc.industry || "Pharmaceuticals",
          logoUrl: doc.logoUrl || "",
          logoText: doc.logoText || doc.name,
          order: doc.order || 0,
          isActive: doc.isActive !== false,
        }));
      }
    }
  } catch (error) {
    console.warn("MongoDB client logos failed, using fallback:", error);
  }
  return CLIENT_LOGOS;
}

export async function getCompanySettings(): Promise<CompanySettings> {
  try {
    const db = await connectToDatabase();
    if (db) {
      const doc = await SettingsModel.findOne();
      if (doc) {
        return {
          companyName: doc.companyName,
          tagline: doc.tagline,
          legalMetrologyLicNo: doc.legalMetrologyLicNo,
          gstNo: doc.gstNo,
          msmeNo: doc.msmeNo,
          primaryEmail: doc.primaryEmail,
          phoneOffice: doc.phoneOffice,
          phoneMobile: doc.phoneMobile,
          whatsAppNumber: doc.whatsAppNumber,
          address: doc.address,
          aboutText: doc.aboutText,
        };
      }
    }
  } catch (error) {
    console.warn("MongoDB settings failed, using fallback:", error);
  }
  return COMPANY_INFO;
}
