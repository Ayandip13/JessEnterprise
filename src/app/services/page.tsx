import React from "react";
import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getServices, getCompanySettings } from "@/lib/data-service";
import { ShieldCheck, Scale, Wrench, CheckCircle2, Award, FileText } from "lucide-react";
import { ServicesClientSection } from "./ServicesClientSection";

export const metadata: Metadata = {
  title: "Services & Legal Metrology AMC | Jess Enterprises",
  description:
    "Authorised Legal Metrology Lic.No. 22000126 - CLM. Balances AMC, L&M Stamping, Anti-Vibration Pad & Table, NABL Weights Calibration, and Custom Fabrication.",
};

export default async function ServicesPage() {
  const services = await getServices();
  const settings = await getCompanySettings();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header />

      <main className="flex-1 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-sky-600 via-indigo-700 to-indigo-900 text-white rounded-xl p-6 sm:p-8 border border-indigo-600/30 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-indigo-950/60 text-sky-200 text-xs font-bold px-3 py-1 rounded-full border border-sky-400/40 mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-300" />
                Statutory Metrology & Engineering Services
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Services, AMC & Custom Fabrication
              </h1>
              <p className="text-xs sm:text-sm text-sky-100 mt-1 max-w-2xl">
                Government authorised Legal Metrology stamping, comprehensive annual maintenance contracts for balances, and bespoke fabrication in Stainless Steel, Acrylic, and Teflon.
              </p>
            </div>

            <div className="bg-indigo-950/70 p-4 rounded-lg border border-indigo-500/40 text-xs shrink-0 space-y-1">
              <div className="text-sky-200 font-medium">Metrology License Number:</div>
              <div className="text-sm font-bold text-amber-300 font-mono">
                Lic.No. – {settings.legalMetrologyLicNo}
              </div>
              <div className="text-sky-100 font-medium pt-1">
                GST: <span className="font-mono text-white font-bold">{settings.gstNo}</span>
              </div>
            </div>
          </div>

          {/* Detailed Services Grid */}
          <ServicesClientSection services={services} whatsAppNumber={settings.whatsAppNumber} />

          {/* Legal Metrology Verification Protocol Box */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded text-amber-800 flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Legal Metrology Stamping & Certification Protocol
                </h3>
                <p className="text-xs text-slate-600">
                  Authorised under Government Legal Metrology Department regulations.
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed">
              We manage the entire re-verification and stamping lifecycle for laboratory analytical balances, commercial scales, and precision mass standards. Our certified technicians prepare equipment, execute preliminary calibration, coordinate official stamping by the Legal Metrology officer, and issue official statutory certificates.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-slate-50 border border-slate-200 rounded p-3 text-xs">
                <div className="font-bold text-slate-900 mb-1">1. Pre-Inspection & Tuning</div>
                <div className="text-slate-600">Cleaning, spirit level alignment, corner load error checking & zero setting.</div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded p-3 text-xs">
                <div className="font-bold text-slate-900 mb-1">2. Stamping & Sealing</div>
                <div className="text-slate-600">Official verification and lead sealing under License No. {settings.legalMetrologyLicNo}.</div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded p-3 text-xs">
                <div className="font-bold text-slate-900 mb-1">3. Certificate Delivery</div>
                <div className="text-slate-600">Issuance of statutory verification certificate for regulatory audit compliance.</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
