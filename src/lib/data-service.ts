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

      let docs = await ProductModel.find(query).sort({ srNo: 1, createdAt: -1 }).lean();
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
        docs = await ProductModel.find(query).sort({ srNo: 1, createdAt: -1 }).lean();
      }

      if (docs.length > 0) {
        return docs.map((doc: any) => ({
          id: String(doc._id),
          srNo: doc.srNo || 1,
          name: String(doc.name || ""),
          slug: String(doc.slug || ""),
          categorySlug: String(doc.categorySlug || ""),
          categoryName: String(doc.categoryName || ""),
          shortDescription: String(doc.shortDescription || ""),
          fullDescription: String(doc.fullDescription || ""),
          images: Array.isArray(doc.images) ? doc.images.map(String) : [],
          specifications: Array.isArray(doc.specifications)
            ? doc.specifications.map((s: any) => ({
                name: String(s?.name || ""),
                value: String(s?.value || ""),
              }))
            : [],
          isFeatured: Boolean(doc.isFeatured),
          isAvailable: doc.isAvailable !== false,
          enquiryEnabled: doc.enquiryEnabled !== false,
          legalMetrologyCert: doc.legalMetrologyCert ? String(doc.legalMetrologyCert) : undefined,
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
      const doc: any = await ProductModel.findOne({ slug }).lean();
      if (doc) {
        return {
          id: String(doc._id),
          srNo: doc.srNo || 1,
          name: String(doc.name || ""),
          slug: String(doc.slug || ""),
          categorySlug: String(doc.categorySlug || ""),
          categoryName: String(doc.categoryName || ""),
          shortDescription: String(doc.shortDescription || ""),
          fullDescription: String(doc.fullDescription || ""),
          images: Array.isArray(doc.images) ? doc.images.map(String) : [],
          specifications: Array.isArray(doc.specifications)
            ? doc.specifications.map((s: any) => ({
                name: String(s?.name || ""),
                value: String(s?.value || ""),
              }))
            : [],
          isFeatured: Boolean(doc.isFeatured),
          isAvailable: doc.isAvailable !== false,
          enquiryEnabled: doc.enquiryEnabled !== false,
          legalMetrologyCert: doc.legalMetrologyCert ? String(doc.legalMetrologyCert) : undefined,
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
      let docs = await CategoryModel.find().sort({ order: 1 }).lean();
      if (docs.length === 0) {
        await CategoryModel.insertMany(CATEGORIES);
        docs = await CategoryModel.find().sort({ order: 1 }).lean();
      }
      if (docs.length > 0) {
        return docs.map((doc: any) => ({
          name: String(doc.name || ""),
          slug: String(doc.slug || ""),
          description: String(doc.description || ""),
          iconName: String(doc.iconName || "Layers"),
          order: Number(doc.order) || 1,
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
      let docs = await ServiceModel.find().lean();
      if (docs.length === 0) {
        await ServiceModel.insertMany(SERVICES);
        docs = await ServiceModel.find().lean();
      }
      if (docs.length > 0) {
        return docs.map((doc: any) => ({
          title: String(doc.title || ""),
          slug: String(doc.slug || ""),
          category: String(doc.category || ""),
          shortDescription: String(doc.shortDescription || ""),
          fullDescription: String(doc.fullDescription || ""),
          highlights: Array.isArray(doc.highlights) ? doc.highlights.map(String) : [],
          licenseNo: doc.licenseNo ? String(doc.licenseNo) : undefined,
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
      let docs = await ClientLogoModel.find({ isActive: { $ne: false } }).sort({ order: 1 }).lean();
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
        docs = await ClientLogoModel.find({ isActive: { $ne: false } }).sort({ order: 1 }).lean();
      }
      if (docs.length > 0) {
        return docs.map((doc: any) => ({
          id: String(doc._id),
          name: String(doc.name || ""),
          industry: String(doc.industry || "Pharmaceuticals"),
          logoUrl: String(doc.logoUrl || ""),
          logoText: String(doc.logoText || doc.name || ""),
          order: Number(doc.order) || 0,
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
      const doc: any = await SettingsModel.findOne().lean();
      if (doc) {
        return {
          companyName: String(doc.companyName || COMPANY_INFO.companyName),
          tagline: String(doc.tagline || COMPANY_INFO.tagline),
          legalMetrologyLicNo: String(doc.legalMetrologyLicNo || COMPANY_INFO.legalMetrologyLicNo),
          gstNo: String(doc.gstNo || COMPANY_INFO.gstNo),
          msmeNo: String(doc.msmeNo || COMPANY_INFO.msmeNo),
          primaryEmail: String(doc.primaryEmail || COMPANY_INFO.primaryEmail),
          phoneOffice: String(doc.phoneOffice || COMPANY_INFO.phoneOffice),
          phoneMobile: String(doc.phoneMobile || COMPANY_INFO.phoneMobile),
          whatsAppNumber: String(doc.whatsAppNumber || COMPANY_INFO.whatsAppNumber),
          address: String(doc.address || COMPANY_INFO.address),
          aboutText: String(doc.aboutText || COMPANY_INFO.aboutText),
        };
      }
    }
  } catch (error) {
    console.warn("MongoDB settings failed, using fallback:", error);
  }
  return COMPANY_INFO;
}
