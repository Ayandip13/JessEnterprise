import React from "react";
import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductGrid } from "@/components/products/ProductGrid";
import { getProducts, getCategories, getCompanySettings } from "@/lib/data-service";
import { Scale, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Products Catalog | Jess Enterprises",
  description:
    "Explore analytical instruments, Legal Metrology balances, spectrophotometers, water baths, centrifuges, and custom fabrication units from Jess Enterprises.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const products = await getProducts();
  const categories = await getCategories();
  const settings = await getCompanySettings();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header />

      <main className="flex-1 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Banner */}
          <div className="bg-slate-900 text-white rounded-lg p-6 sm:p-8 mb-8 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-sky-950 text-sky-400 text-xs font-bold px-2.5 py-1 rounded border border-sky-800 mb-2">
                <Scale className="w-3.5 h-3.5 text-sky-400" />
                Complete Product & Equipment Catalog
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Laboratory & Metrology Equipment
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                Browse our complete catalog of precision analytical instruments, Legal Metrology authorized balances, calibration weights, and custom fabrication solutions.
              </p>
            </div>

            <div className="bg-slate-800 p-4 rounded border border-slate-700 text-xs shrink-0 space-y-1">
              <div className="flex items-center gap-1.5 text-sky-300 font-bold">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                Legal Metrology License
              </div>
              <div className="text-slate-200 font-mono">Lic.No. – {settings.legalMetrologyLicNo}</div>
              <div className="text-slate-400 text-[11px]">NABL Weights & Stamping Certificated</div>
            </div>
          </div>

          {/* Product Grid with Category & Search Filters */}
          <ProductGrid
            initialProducts={products}
            categories={categories}
            initialCategory={category}
            whatsAppNumber={settings.whatsAppNumber}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
