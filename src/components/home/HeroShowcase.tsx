"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShieldCheck, Scale, ArrowRight, Send, CheckCircle2 } from "lucide-react";
import { COMPANY_INFO } from "@/lib/catalog-data";
import { Button } from "@/components/ui/Button";
import { QuoteModal } from "@/components/shared/QuoteModal";

export function HeroShowcase() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  return (
    <section className="bg-gradient-to-br from-sky-50 via-indigo-50/50 to-slate-50 text-slate-900 border-b border-indigo-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Key Authority & Value Proposition */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            {/* Government Licensing Trust Badge */}
            <div className="inline-flex flex-wrap items-center gap-1.5 sm:gap-2 bg-sky-100/90 border border-sky-300 rounded-full px-3.5 py-1.5 text-xs text-sky-900 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-sky-700 shrink-0" />
              <span className="font-semibold text-slate-800">Legal Metrology License:</span>
              <span className="font-mono text-indigo-900 font-bold">{COMPANY_INFO.legalMetrologyLicNo}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-slate-900">
              Precision Metrology &{" "}
              <span className="bg-gradient-to-r from-sky-700 via-indigo-800 to-indigo-950 bg-clip-text text-transparent">
                Scientific Equipment
              </span>
            </h1>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
              Sales, authorized Legal Metrology stamping, servicing, AMC of analytical balances, precision instruments, and custom SS/MS/Acrylic fabrication for pharmaceutical, chemical, and industrial leaders.
            </p>

            {/* Credential Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-1 text-xs font-semibold text-slate-800">
              <div className="flex items-center gap-2 bg-white p-2.5 sm:p-3 rounded-lg border border-indigo-100 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                <span>Balances AMC & L & M Stamping</span>
              </div>
              <div className="flex items-center gap-2 bg-white p-2.5 sm:p-3 rounded-lg border border-indigo-100 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                <span>NABL Certified Reference Weights</span>
              </div>
              <div className="flex items-center gap-2 bg-white p-2.5 sm:p-3 rounded-lg border border-indigo-100 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                <span>Spectrophotometer & Lab Meters</span>
              </div>
              <div className="flex items-center gap-2 bg-white p-2.5 sm:p-3 rounded-lg border border-indigo-100 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                <span>Acrylic / SS / MS Custom Fabrication</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={() => setQuoteModalOpen(true)}
                className="w-full sm:w-auto font-bold tracking-wide shadow-md justify-center py-3 text-sm sm:text-base"
              >
                <Send className="w-4 h-4" /> Request Quote via WhatsApp
              </Button>
              <Link href="/products" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-indigo-200 text-indigo-900 bg-white hover:bg-indigo-50 justify-center py-3 text-sm sm:text-base">
                  Browse Catalog <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Statutory Business Information Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-indigo-100 rounded-xl p-4 sm:p-6 shadow-md space-y-4 sm:space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-indigo-100">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-800">
                  Statutory Registrations
                </span>
                <Scale className="w-5 h-5 text-indigo-700" />
              </div>

              <div className="space-y-3 text-xs">
                <div className="bg-sky-50/70 p-3 rounded-lg border border-sky-200">
                  <div className="text-slate-600 font-medium">Legal Metrology License:</div>
                  <div className="text-sm font-bold text-sky-950 font-mono break-all">
                    Lic.No. – {COMPANY_INFO.legalMetrologyLicNo}
                  </div>
                </div>

                <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
                  <div className="bg-indigo-50/60 p-3 rounded-lg border border-indigo-100">
                    <div className="text-slate-600 font-medium">GSTIN:</div>
                    <div className="text-xs font-bold text-indigo-950 font-mono break-all">{COMPANY_INFO.gstNo}</div>
                  </div>
                  <div className="bg-indigo-50/60 p-3 rounded-lg border border-indigo-100">
                    <div className="text-slate-600 font-medium">MSME Registration:</div>
                    <div className="text-xs font-bold text-indigo-950 font-mono break-all">{COMPANY_INFO.msmeNo}</div>
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
                  <div className="text-slate-600 font-medium">Official Contact Helpline:</div>
                  <div className="text-xs text-slate-800 truncate">
                    Email: <span className="font-semibold text-slate-900">{COMPANY_INFO.primaryEmail}</span>
                  </div>
                  <div className="text-xs text-slate-800">
                    Ph: <span className="font-semibold text-emerald-700">{COMPANY_INFO.phoneOffice}</span> /{" "}
                    <span className="font-semibold text-emerald-700">{COMPANY_INFO.phoneMobile}</span>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 italic text-center">
                "JESS ENTERPRISES is a professional company established to deliver best services to its clients."
              </div>
            </div>
          </div>
        </div>
      </div>

      <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
    </section>
  );
}
