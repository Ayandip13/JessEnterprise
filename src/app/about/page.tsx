import React from "react";
import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getCompanySettings } from "@/lib/data-service";
import { ShieldCheck, Scale, Award, Building2, CheckCircle2, Mail, Phone, MapPin } from "lucide-react";
import { CustomerLogos } from "@/components/shared/CustomerLogos";

export const metadata: Metadata = {
  title: "About Us & Legal Metrology Licenses | Jess Enterprises",
  description:
    "Learn about Jess Enterprises, an authorized Legal Metrology (Lic.No. 22000126 - CLM), MSME micro enterprise, and leading laboratory equipment supplier.",
};

export default async function AboutPage() {
  const settings = await getCompanySettings();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header />

      <main className="flex-1 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header Banner */}
          <div className="bg-slate-900 text-white rounded-lg p-6 sm:p-10 border border-slate-800">
            <div className="inline-flex items-center gap-1.5 bg-sky-950 text-sky-400 text-xs font-bold px-2.5 py-1 rounded border border-sky-800 mb-3">
              <Scale className="w-3.5 h-3.5 text-sky-400" />
              Company Profile & Credentials
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              About Jess Enterprises
            </h1>
            <p className="text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
              {settings.aboutText}
            </p>
          </div>

          {/* Statutory Licensing & Business Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-2xs">
              <div className="w-10 h-10 bg-amber-50 rounded flex items-center justify-center text-amber-800 mb-3 border border-amber-200">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                Government Authorization
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-1 mb-2">Legal Metrology</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Authorised for L & M Stamping, verification, and balance servicing under government metrology regulations.
              </p>
              <div className="bg-amber-50 p-2.5 rounded border border-amber-200 text-xs font-mono text-amber-900 font-bold">
                Lic.No. – {settings.legalMetrologyLicNo}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-2xs">
              <div className="w-10 h-10 bg-sky-50 rounded flex items-center justify-center text-sky-800 mb-3 border border-sky-200">
                <Award className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-800">
                Tax Identification
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-1 mb-2">GST Registration</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Registered Goods & Services Tax entity providing GST tax invoices for institutional & industrial B2B procurement.
              </p>
              <div className="bg-sky-50 p-2.5 rounded border border-sky-200 text-xs font-mono text-sky-900 font-bold">
                GST: {settings.gstNo}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-2xs">
              <div className="w-10 h-10 bg-slate-100 rounded flex items-center justify-center text-slate-800 mb-3 border border-slate-300">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-800">
                Enterprise Classification
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-1 mb-2">MSME Enterprise</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Officially registered Micro Small and Medium Enterprise under the Ministry of MSME, Govt. of India.
              </p>
              <div className="bg-slate-100 p-2.5 rounded border border-slate-300 text-xs font-mono text-slate-900 font-bold">
                MSME – {settings.msmeNo}
              </div>
            </div>
          </div>

          {/* Operational Divisions Overview */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight border-b border-slate-100 pb-3">
              Core Capabilities & Offerings
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700">
              <div className="space-y-3">
                <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-700" />
                  Sales, Service & AMC of Balances
                </div>
                <p className="leading-relaxed text-slate-600">
                  Comprehensive sales of analytical balances, micro balances, moisture analyzers, and crane scales. Backed by routine Annual Maintenance Contracts (AMC), anti-vibration pad & table setup, and printer connectivity.
                </p>
              </div>

              <div className="space-y-3">
                <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-700" />
                  Custom Acrylic, SS & MS Fabrication
                </div>
                <p className="leading-relaxed text-slate-600">
                  Precision engineering of custom acrylic cabinets, desiccator boxes, HPLC column storage drawers (60/72 pcs), SS 304/316 cleanroom furniture, and MS heavy-duty industrial frames.
                </p>
              </div>
            </div>
          </div>

          {/* Precious Customers */}
          <CustomerLogos />
        </div>
      </main>

      <Footer />
    </div>
  );
}
