"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShieldCheck, Award, Scale, ArrowRight, Send, CheckCircle2 } from "lucide-react";
import { COMPANY_INFO } from "@/lib/catalog-data";
import { Button } from "@/components/ui/Button";
import { QuoteModal } from "@/components/shared/QuoteModal";

export function HeroShowcase() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  return (
    <section className="bg-slate-900 text-white border-b border-slate-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Key Authority & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            {/* Government Licensing Trust Badge */}
            <div className="inline-flex flex-wrap items-center gap-2 bg-sky-950/80 border border-sky-800/60 rounded-full px-4 py-1.5 text-xs text-sky-200">
              <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
              <span className="font-semibold text-white">Authorised Legal Metrology License:</span>
              <span className="font-mono text-amber-300 font-bold">{COMPANY_INFO.legalMetrologyLicNo}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
              Precision Metrology & Scientific Laboratory Equipment
            </h1>

            <p className="text-slate-300 text-base leading-relaxed max-w-2xl font-normal">
              Sales, authorized Legal Metrology stamping, servicing, AMC of analytical balances, precision instruments, and custom SS/MS/Acrylic fabrication for pharmaceutical, chemical, and industrial leaders.
            </p>

            {/* Credential Bullets derived strictly from PDF */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-semibold text-slate-200">
              <div className="flex items-center gap-2 bg-slate-800/60 p-2.5 rounded border border-slate-700/60">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Balances AMC & L & M Stamping</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/60 p-2.5 rounded border border-slate-700/60">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                <span>NABL Certified Reference Weights</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/60 p-2.5 rounded border border-slate-700/60">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Spectrophotometer & Lab Meters</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/60 p-2.5 rounded border border-slate-700/60">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Acrylic / SS / MS Custom Fabrication</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Button
                variant="primary"
                size="lg"
                onClick={() => setQuoteModalOpen(true)}
                className="font-bold tracking-wide"
              >
                <Send className="w-4 h-4" /> Request Quote via WhatsApp
              </Button>
              <Link href="/products">
                <Button variant="outline" size="lg" className="border-slate-600 text-slate-100 hover:bg-slate-800">
                  Browse Catalog <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Statutory Business Information Summary */}
          <div className="lg:col-span-5">
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 shadow-md space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                  Statutory Registrations
                </span>
                <Scale className="w-5 h-5 text-sky-400" />
              </div>

              <div className="space-y-3 text-xs">
                <div className="bg-slate-900/80 p-3 rounded border border-slate-700">
                  <div className="text-slate-400 font-medium">Legal Metrology License:</div>
                  <div className="text-sm font-bold text-amber-300 font-mono">
                    Lic.No. – {COMPANY_INFO.legalMetrologyLicNo}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-900/80 p-3 rounded border border-slate-700">
                    <div className="text-slate-400 font-medium">GSTIN:</div>
                    <div className="text-xs font-bold text-white font-mono">{COMPANY_INFO.gstNo}</div>
                  </div>
                  <div className="bg-slate-900/80 p-3 rounded border border-slate-700">
                    <div className="text-slate-400 font-medium">MSME Registration:</div>
                    <div className="text-xs font-bold text-white font-mono">{COMPANY_INFO.msmeNo}</div>
                  </div>
                </div>

                <div className="bg-slate-900/80 p-3 rounded border border-slate-700 space-y-1">
                  <div className="text-slate-400 font-medium">Official Contact Helpline:</div>
                  <div className="text-xs text-slate-200">
                    Email: <span className="font-medium text-white">{COMPANY_INFO.primaryEmail}</span>
                  </div>
                  <div className="text-xs text-slate-200">
                    Ph: <span className="font-semibold text-emerald-400">{COMPANY_INFO.phoneOffice}</span> /{" "}
                    <span className="font-semibold text-emerald-400">{COMPANY_INFO.phoneMobile}</span>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 italic text-center">
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
