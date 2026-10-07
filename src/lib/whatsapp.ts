import { CatalogProduct } from "./catalog-data";

export interface CustomerDetails {
  name: string;
  phone: string;
  quantity: number;
  company?: string;
  email?: string;
  message?: string;
}

export interface EnquiryItem {
  product: CatalogProduct;
  quantity: number;
}

/**
 * Normalizes phone numbers for WhatsApp API.
 * Strips all non-digit characters. If the number is 10 digits (e.g. Indian mobile number),
 * defaults to appending '91' country code.
 */
export function normalizeWhatsAppNumber(rawPhone: string): string {
  if (!rawPhone) return "919225901519";
  const digitsOnly = rawPhone.replace(/[^\d]/g, "");

  // If 10 digits, default to Indian country code 91
  if (digitsOnly.length === 10) {
    return `91${digitsOnly}`;
  }

  // If starts with 0 and has 11 digits, replace 0 with 91
  if (digitsOnly.length === 11 && digitsOnly.startsWith("0")) {
    return `91${digitsOnly.slice(1)}`;
  }

  return digitsOnly || "919225901519";
}

/**
 * Formats a clean, professional pre-filled WhatsApp message for a single product enquiry.
 */
export function generateSingleProductEnquiryMessage({
  product,
  customer,
  productUrl,
}: {
  product: CatalogProduct;
  customer: CustomerDetails;
  productUrl?: string;
}): string {
  let text = `JESS ENTERPRISES - PRODUCT ENQUIRY\n\n`;
  text += `*Product:* ${product.name}\n`;
  text += `*Category:* ${product.categoryName}\n`;
  text += `*Quantity:* ${customer.quantity}\n`;

  if (product.specifications && product.specifications.length > 0) {
    const keySpec = product.specifications.slice(0, 2).map((s) => `${s.name}: ${s.value}`).join(" | ");
    text += `*Key Spec:* ${keySpec}\n`;
  }

  text += `\n*CUSTOMER DETAILS*\n`;
  text += `*Name:* ${customer.name}\n`;
  text += `*Company:* ${customer.company?.trim() || "N/A"}\n`;
  text += `*Phone:* ${customer.phone}\n`;
  text += `*Email:* ${customer.email?.trim() || "N/A"}\n`;

  if (customer.message && customer.message.trim()) {
    text += `\n*Requirement / Notes:*\n${customer.message.trim()}\n`;
  }

  if (productUrl) {
    text += `\n*Product Page:*\n${productUrl}\n`;
  }

  text += `\nI would like to request an official quotation and availability details for the above product.\n\nThank you.`;

  return text;
}

/**
 * Formats a clean, professional pre-filled WhatsApp message for bulk equipment enquiry.
 */
export function generateBulkEnquiryMessage({
  items,
  customer,
  pageUrl,
}: {
  items: EnquiryItem[];
  customer: CustomerDetails;
  pageUrl?: string;
}): string {
  let text = `JESS ENTERPRISES - BULK EQUIPMENT ENQUIRY\n\n`;
  text += `*PRODUCTS REQUESTED (${items.length}):*\n`;

  items.forEach((item, index) => {
    text += `${index + 1}. *${item.product.name}* (Qty: ${item.quantity}) - Category: ${item.product.categoryName}\n`;
  });

  text += `\n*CUSTOMER DETAILS*\n`;
  text += `*Name:* ${customer.name}\n`;
  text += `*Company:* ${customer.company?.trim() || "N/A"}\n`;
  text += `*Phone:* ${customer.phone}\n`;
  text += `*Email:* ${customer.email?.trim() || "N/A"}\n`;

  if (customer.message && customer.message.trim()) {
    text += `\n*Requirement / Notes:*\n${customer.message.trim()}\n`;
  }

  if (pageUrl) {
    text += `\n*Catalog Link:*\n${pageUrl}\n`;
  }

  text += `\nI would like to request an official quotation and availability for the listed items.\n\nThank you.`;

  return text;
}

/**
 * Constructs the final WhatsApp click-to-chat URL using safe URL encoding.
 */
export function buildWhatsAppUrl(rawPhone: string, messageText: string): string {
  const normalizedPhone = normalizeWhatsAppNumber(rawPhone);
  const encodedText = encodeURIComponent(messageText);
  return `https://wa.me/${normalizedPhone}?text=${encodedText}`;
}
