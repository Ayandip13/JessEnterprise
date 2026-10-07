import React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Scale, ArrowLeft, Package, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header />

      <main className="flex-1 py-16 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center space-y-6">
          <div className="w-16 h-16 bg-sky-100 text-sky-800 rounded-full flex items-center justify-center mx-auto border border-sky-200 shadow-xs">
            <Scale className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-1 rounded border border-sky-200">
              404 Page Not Found
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 mt-3 tracking-tight">
              Requested Resource Not Found
            </h1>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              The product, category, or page you are searching for might have been moved or is currently unavailable in the catalog.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/products" className="w-full sm:w-auto">
              <Button variant="primary" size="md" className="w-full font-bold">
                <Package className="w-4 h-4" /> Explore Products
              </Button>
            </Link>
            <Link href="/" className="w-full sm:w-auto">
              <Button variant="outline" size="md" className="w-full font-semibold">
                <ArrowLeft className="w-4 h-4" /> Return to Homepage
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
