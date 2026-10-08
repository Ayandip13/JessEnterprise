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

export const dynamic = "force-dynamic";
export const revalidate = 0;

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
          <div className="bg-gradient-to-r from-sky-600 via-indigo-700 to-indigo-900 text-white rounded-xl p-6 sm:p-8 mb-8 border border-indigo-600/30 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-indigo-950/60 text-sky-200 text-xs font-bold px-3 py-1 rounded-full border border-sky-400/40 mb-2">
                <Scale className="w-3.5 h-3.5 text-sky-300" />
                Complete Product & Equipment Catalog
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Laboratory & Metrology Equipment
              </h1>
              <p className="text-xs sm:text-sm text-sky-100 mt-1 max-w-2xl">
                Browse our complete catalog of precision analytical instruments, Legal Metrology authorized balances, calibration weights, and custom fabrication solutions.
              </p>
            </div>

            <div className="bg-indigo-950/70 p-4 rounded-lg border border-indigo-500/40 text-xs shrink-0 space-y-1">
              <div className="flex items-center gap-1.5 text-sky-200 font-bold">
                <ShieldCheck className="w-4 h-4 text-sky-300" />
                Legal Metrology License
              </div>
              <div className="text-amber-300 font-mono font-bold">Lic.No. – {settings.legalMetrologyLicNo}</div>
              <div className="text-sky-100 text-[11px]">NABL Weights & Stamping Certificated</div>
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
