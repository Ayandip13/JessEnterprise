import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroShowcase } from "@/components/home/HeroShowcase";
import { DivisionGrid } from "@/components/home/DivisionGrid";
import { FabricationSection } from "@/components/home/FabricationSection";
import { CustomerLogos } from "@/components/shared/CustomerLogos";
import { ProductCard } from "@/components/products/ProductCard";
import { getProducts, getCompanySettings } from "@/lib/data-service";
import { ArrowRight, ShieldCheck, Scale, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Jess Enterprises | Legal Metrology & Laboratory Equipment",
    description:
      "Authorised Legal Metrology Lic.No. 22000126 - CLM. Sales, Service & AMC of Lab & Industrial Balances, Spectrophotometers, Meters, and Custom SS/MS/Acrylic Fabrication.",
  };
}

export default async function HomePage() {
  const featuredProducts = await getProducts({ isFeatured: true });
  const settings = await getCompanySettings();

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Header />

      <main className="flex-1">
        {/* Hero Showcase */}
        <HeroShowcase />

        {/* Business Divisions */}
        <DivisionGrid />

        {/* Featured Products Catalog Section */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-100 px-2.5 py-1 rounded">
                  High Precision Equipment
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
                  Featured Instruments & Balances
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Selected laboratory balances, spectrophotometers, and metrological reference weights.
                </p>
              </div>
              <Link href="/products">
                <Button variant="outline" size="sm" className="font-semibold">
                  View Full Catalog ({featuredProducts.length}+) <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.slice(0, 6).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  whatsAppNumber={settings.whatsAppNumber}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Fabrication Section */}
        <FabricationSection />

        {/* Precious Customer Logos */}
        <CustomerLogos />

        {/* WhatsApp Quote Banner CTA */}
        <section className="bg-gradient-to-r from-sky-700 via-indigo-800 to-indigo-950 text-white py-14 border-t border-indigo-700 shadow-inner">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-indigo-900/80 px-3.5 py-1.5 rounded-full text-xs text-sky-200 font-bold uppercase tracking-wider border border-indigo-700">
              <ShieldCheck className="w-4 h-4 text-sky-300" />
              Statutory Compliance & Fast Response
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Need a Custom Quotation or Legal Metrology Stamping?
            </h2>
            <p className="text-sm text-sky-100 max-w-2xl mx-auto">
              Our technical engineers assist with balance AMC contracts, standard weight certifications, custom fabrication, and equipment procurement.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <Button variant="whatsapp" size="lg" className="font-bold shadow-md">
                  <Send className="w-4 h-4" /> Enquire via WhatsApp
                </Button>
              </Link>
              <Link href="/products">
                <Button variant="outline" size="lg" className="border-sky-300 text-white hover:bg-white/10">
                  Explore Products Catalog
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
