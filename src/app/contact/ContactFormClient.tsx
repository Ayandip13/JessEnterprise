"use client";

import React, { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { createWhatsAppQuoteLink } from "@/lib/utils";

interface ContactFormClientProps {
  whatsAppNumber: string;
}

export function ContactFormClient({ whatsAppNumber }: ContactFormClientProps) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceType, setServiceType] = useState("General Equipment Quotation");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const fullMessage = `[${serviceType}] ${message} (Email: ${email}, Phone: ${phone})`;
    const link = createWhatsAppQuoteLink(
      whatsAppNumber,
      serviceType,
      undefined,
      name,
      company,
      fullMessage
    );

    window.open(link, "_blank");
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 shadow-2xs">
      <h3 className="text-lg font-bold text-slate-900 mb-1">
        Request Quotation / Technical Inquiry
      </h3>
      <p className="text-xs text-slate-600 mb-6">
        Fill out your requirements below to generate an instant structured WhatsApp inquiry.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Glenmark Pharma / NIO Goa"
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="w-full text-sm border border-slate-300 rounded px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
              Phone / Mobile
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 9876543210"
              className="w-full text-sm border border-slate-300 rounded px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
            Inquiry Category *
          </label>
          <select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="w-full text-sm border border-slate-300 rounded px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none bg-white"
          >
            <option value="General Equipment Quotation">General Equipment Quotation</option>
            <option value="Legal Metrology L & M Stamping">Legal Metrology L & M Stamping</option>
            <option value="Balances AMC & Servicing">Balances AMC & Servicing</option>
            <option value="NABL Certified Standard Weights">NABL Certified Standard Weights</option>
            <option value="Acrylic / SS / MS Custom Fabrication">Acrylic / SS / MS Custom Fabrication</option>
            <option value="HPLC Column Storage Cabinets">HPLC Column Storage Cabinets</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
            Detailed Requirements / Specifications *
          </label>
          <textarea
            rows={4}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Please detail required instrument models, measurement ranges, balance precision, dimensions for fabrication, or AMC balance counts..."
            className="w-full text-sm border border-slate-300 rounded px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
          />
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded p-3 text-xs text-emerald-800 flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
          <p>
            Submitting this form connects directly with Jess Enterprises' official WhatsApp account for fast quotation turnaround.
          </p>
        </div>

        <Button type="submit" variant="whatsapp" size="lg" className="w-full font-bold">
          <Send className="w-4 h-4" /> Send Request via WhatsApp
        </Button>
      </form>
    </div>
  );
}
