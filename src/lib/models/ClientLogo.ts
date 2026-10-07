import mongoose, { Schema, Document, Model } from "mongoose";

export interface IClientLogo extends Document {
  name: string;
  industry?: string;
  logoText: string;
  logoUrl?: string;
  order: number;
  isActive: boolean;
}

const ClientLogoSchema = new Schema<IClientLogo>(
  {
    name: { type: String, required: true, trim: true },
    industry: { type: String, default: "Pharma & Industrial" },
    logoText: { type: String, required: true },
    logoUrl: { type: String, default: "" },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const ClientLogoModel: Model<IClientLogo> =
  mongoose.models.ClientLogo || mongoose.model<IClientLogo>("ClientLogo", ClientLogoSchema);
