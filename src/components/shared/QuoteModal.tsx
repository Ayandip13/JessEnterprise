"use client";

import React, { useState } from "react";
import { X, Send, CheckCircle2, MessageSquare } from "lucide-react";
import { createWhatsAppQuoteLink } from "@/lib/utils";
import { CatalogProduct } from "@/lib/catalog-data";
import { Button } from "@/components/ui/Button";

interface QuoteModalProps {
  product?: CatalogProduct | null;
  isOpen: boolean;
  onClose: () => void;
  whatsAppNumber?: string;
}

export function QuoteModal({
  product,
  isOpen,
  onClose,
  whatsAppNumber = "919225901519",
}: QuoteModalProps) {
  const [customerName, setCustomerName] = useState("");
  const [customerCompany, setCustomerCompany] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerMessage, setCustomerMessage] = useState("");

  if (!isOpen) return null;

  const handleWhatsAppRedirect = (e: React.FormEvent) => {
    e.preventDefault();

    const link = createWhatsAppQuoteLink(
      whatsAppNumber,
      product ? product.name : "General Equipment & Metrology Services Enquiry",
      product?.specifications,
      customerName,
      customerCompany,
      customerMessage ? `${customerMessage} (Email: ${customerEmail}, Phone: ${customerPhone})` : undefined
    );

    window.open(link, "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
      <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in duration-150">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-wider text-sky-400 font-semibold">
              Official Quotation Request
            </span>
            <h3 className="text-lg font-bold">
              {product ? `Enquire: ${product.name}` : "Request Quotation / Technical Advice"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleWhatsAppRedirect} className="p-6 space-y-4">
          {product && (
            <div className="bg-slate-50 border border-slate-200 rounded p-3 text-xs text-slate-700">
              <span className="font-semibold text-slate-900">Category: </span>
              {product.categoryName}
              {product.legalMetrologyCert && (
                <span className="ml-2 font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                  {product.legalMetrologyCert}
                </span>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                Your Name *
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Dr. Rajesh Sharma"
                className="w-full text-sm border border-slate-300 rounded px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                Company / Institution *
              </label>
              <input
                type="text"
                required
                value={customerCompany}
                onChange={(e) => setCustomerCompany(e.target.value)}
                placeholder="e.g. Cipla / BITS Pilani"
                className="w-full text-sm border border-slate-300 rounded px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full text-sm border border-slate-300 rounded px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="+91 9876543210"
                className="w-full text-sm border border-slate-300 rounded px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
              Custom Requirements / Quantity / Notes
            </label>
            <textarea
              rows={3}
              value={customerMessage}
              onChange={(e) => setCustomerMessage(e.target.value)}
              placeholder="Specify required capacity, precision tolerance, custom fabrication dimensions, or AMC requirements..."
              className="w-full text-sm border border-slate-300 rounded px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded p-3 text-xs text-emerald-800 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
            <p>
              Clicking <strong>Send via WhatsApp</strong> will generate a pre-formatted quotation request directly to Jess Enterprises for instant response.
            </p>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="whatsapp" className="w-full sm:w-auto">
              <Send className="w-4 h-4" /> Send via WhatsApp
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
