import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISpecification {
  name: string;
  value: string;
}

export interface IProduct extends Document {
  name: string;
  slug: string;
  categorySlug: string;
  categoryName: string;
  shortDescription: string;
  fullDescription: string;
  images: string[];
  specifications: ISpecification[];
  isFeatured: boolean;
  isAvailable: boolean;
  enquiryEnabled: boolean;
  legalMetrologyCert?: string; // e.g. "Lic.No. 22000126 - CLM" or "NABL Certified"
  createdAt: Date;
  updatedAt: Date;
}

const SpecificationSchema = new Schema<ISpecification>(
  {
    name: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false }
);

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    categorySlug: { type: String, required: true, index: true },
    categoryName: { type: String, required: true },
    shortDescription: { type: String, required: true },
    fullDescription: { type: String, required: true },
    images: { type: [String], default: [] },
    specifications: { type: [SpecificationSchema], default: [] },
    isFeatured: { type: Boolean, default: false },
    isAvailable: { type: Boolean, default: true },
    enquiryEnabled: { type: Boolean, default: true },
    legalMetrologyCert: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

export const ProductModel: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
