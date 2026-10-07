import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Formats structured quote request message for WhatsApp integration
 */
export function createWhatsAppQuoteLink(
  phoneNumber: string,
  productName: string,
  specifications?: { name: string; value: string }[],
  customerName?: string,
  customerCompany?: string,
  customerMessage?: string
): string {
  let cleanPhone = phoneNumber ? phoneNumber.replace(/[^\d]/g, "") : "919225901519";
  if (cleanPhone.length === 10) {
    cleanPhone = `91${cleanPhone}`;
  }
  let text = `Hello Jess Enterprises,\n\nI am interested in requesting a quotation for:\n*Product:* ${productName}\n`;

  if (specifications && specifications.length > 0) {
    text += `\n*Key Specifications:*`;
    specifications.slice(0, 4).forEach((spec) => {
      text += `\n- ${spec.name}: ${spec.value}`;
    });
  }

  if (customerName) text += `\n\n*Name:* ${customerName}`;
  if (customerCompany) text += `\n*Company/Org:* ${customerCompany}`;
  if (customerMessage) text += `\n*Message:* ${customerMessage}`;

  text += `\n\nPlease share availability, pricing, and technical details. Thank you!`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}
