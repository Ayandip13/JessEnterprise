import mongoose, { Schema, Document, Model } from "mongoose";

export interface IService extends Document {
  title: string;
  slug: string;
  category: string; // e.g. "Legal Metrology", "Servicing & AMC", "Custom Fabrication"
  shortDescription: string;
  fullDescription: string;
  highlights: string[];
  licenseNo?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    category: { type: String, required: true },
    shortDescription: { type: String, required: true },
    fullDescription: { type: String, required: true },
    highlights: { type: [String], default: [] },
    licenseNo: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

export const ServiceModel: Model<IService> =
  mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);
