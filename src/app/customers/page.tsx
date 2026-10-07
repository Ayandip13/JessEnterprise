import React from "react";
import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getClientLogos } from "@/lib/data-service";
import { Award, Building2, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Precious Customers & Partners | Jess Enterprises",
  description:
    "Precious Customers of Jess Enterprises including Cipla, Sanofi, Glenmark, Syngenta, BITS Pilani Goa Campus, National Institute of Oceanography, and more.",
};

export default async function CustomersPage() {
  const clients = await getClientLogos();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header />

      <main className="flex-1 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Header Banner */}
          <div className="bg-slate-900 text-white rounded-lg p-6 sm:p-8 border border-slate-800">
            <div className="inline-flex items-center gap-1.5 bg-sky-950 text-sky-400 text-xs font-bold px-2.5 py-1 rounded border border-sky-800 mb-2">
              <Award className="w-3.5 h-3.5 text-sky-400" />
              Precious Customers & Industrial Associations
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Our Esteemed Corporate & Research Clients
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              We take immense pride in partnering with industry leaders across pharmaceuticals, specialty chemicals, advanced composite engineering, oceanography, and premier academic institutions.
            </p>
          </div>

          {/* Customer Cards Showcase */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {clients.map((client, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-lg p-6 shadow-2xs hover:border-sky-300 transition-colors flex items-start gap-4"
              >
                <div className="w-12 h-12 bg-sky-50 rounded-md flex items-center justify-center text-sky-800 shrink-0 border border-sky-100 font-bold text-lg">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                    {client.industry}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-1">{client.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Metrology, Instrument Sales & Service Association
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
