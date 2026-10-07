import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductSpecs } from "@/components/products/ProductSpecs";
import { ProductCard } from "@/components/products/ProductCard";
import { InstrumentVisual } from "@/components/products/InstrumentVisual";
import { getProductBySlug, getProducts, getCompanySettings } from "@/lib/data-service";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft, ShieldCheck, Scale, Send, CheckCircle2 } from "lucide-react";
import { ProductDetailClientActions } from "@/components/products/ProductDetailClientActions";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found | Jess Enterprises" };
  }

  return {
    title: `${product.name} | Jess Enterprises`,
    description: `${product.shortDescription} Supplied by Jess Enterprises - Authorised Legal Metrology Lic.No. 22000126 - CLM.`,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const allCategoryProducts = await getProducts({ categorySlug: product.categorySlug });
  const relatedProducts = allCategoryProducts.filter((p) => p.slug !== product.slug).slice(0, 3);
  const settings = await getCompanySettings();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header />

      <main className="flex-1 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <div className="mb-6">
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-sky-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Products Catalog
            </Link>
          </div>

          {/* Main Product Container */}
          <div className="bg-white border border-slate-200 rounded-lg shadow-2xs overflow-hidden mb-12">
            <div className="p-6 sm:p-8 space-y-6">
              {/* Product Header Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-4">
                  <InstrumentVisual categorySlug={product.categorySlug} slug={product.slug} className="h-56" />
                </div>

                <div className="md:col-span-8 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="sky">{product.categoryName}</Badge>
                    {product.legalMetrologyCert && (
                      <Badge variant="metrology">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                        {product.legalMetrologyCert}
                      </Badge>
                    )}
                    {product.isAvailable && (
                      <Badge variant="success">Available for Order / Quote</Badge>
                    )}
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {product.name}
                  </h1>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {product.shortDescription}
                  </p>
                </div>
              </div>

              {/* Action Buttons Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-0.5">
                    Official Quotation & Technical Inquiry
                  </div>
                  <div className="text-xs text-slate-500">
                    Get custom pricing, availability, and Legal Metrology certification details.
                  </div>
                </div>

                <ProductDetailClientActions
                  product={product}
                  whatsAppNumber={settings.whatsAppNumber}
                />
              </div>

              {/* Full Description & Compliance Note */}
              <div className="space-y-3 pt-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
                  Product Overview & Application
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {product.fullDescription}
                </p>
              </div>

              {/* Structured Key-Value Specifications */}
              <div className="pt-2">
                <ProductSpecs
                  specifications={product.specifications}
                  legalMetrologyCert={product.legalMetrologyCert}
                />
              </div>

              {/* Metrology & Calibration Guarantee Note */}
              <div className="bg-slate-900 text-white rounded-lg p-5 text-xs space-y-2 border border-slate-800">
                <div className="flex items-center gap-2 text-sky-400 font-bold">
                  <Scale className="w-4 h-4 text-sky-400" />
                  Legal Metrology & Quality Assurance
                </div>
                <p className="text-slate-300 leading-relaxed">
                  All weighing balances and calibration weights supplied by Jess Enterprises comply with standard Legal Metrology guidelines (Lic.No. {settings.legalMetrologyLicNo}). NABL accredited calibration certificates and Annual Maintenance Contracts (AMC) available upon request.
                </p>
              </div>
            </div>
          </div>

          {/* Related Products in Same Category */}
          {relatedProducts.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                Related Equipment in {product.categoryName}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProducts.map((relProduct) => (
                  <ProductCard
                    key={relProduct.id}
                    product={relProduct}
                    whatsAppNumber={settings.whatsAppNumber}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
