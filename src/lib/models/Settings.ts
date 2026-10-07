import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISettings extends Document {
  companyName: string;
  tagline: string;
  legalMetrologyLicNo: string;
  gstNo: string;
  msmeNo: string;
  primaryEmail: string;
  phoneOffice: string;
  phoneMobile: string;
  whatsAppNumber: string;
  address: string;
  aboutText: string;
}

const SettingsSchema = new Schema<ISettings>(
  {
    companyName: { type: String, default: "JESS ENTERPRISES" },
    tagline: { type: String, default: "Innovative Services" },
    legalMetrologyLicNo: { type: String, default: "22000126 - CLM" },
    gstNo: { type: String, default: "30AZCPG5317P1ZG" },
    msmeNo: { type: String, default: "UDYAM-GA-01-0024091 (Micro)" },
    primaryEmail: { type: String, default: "jess.enterprises14@gmail.com" },
    phoneOffice: { type: String, default: "9225901519" },
    phoneMobile: { type: String, default: "9158391519" },
    whatsAppNumber: { type: String, default: "919225901519" },
    address: { type: String, default: "Goa, India" },
    aboutText: {
      type: String,
      default:
        "JESS ENTERPRISES is a professional company established to deliver best services to its Clients. We look forward to a mutually beneficial business association with your esteemed organization.",
    },
  },
  {
    timestamps: true,
  }
);

export const SettingsModel: Model<ISettings> =
  mongoose.models.Settings || mongoose.model<ISettings>("Settings", SettingsSchema);
