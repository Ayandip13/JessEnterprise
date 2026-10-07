"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Send, ArrowRight, ShieldCheck, Plus, Check } from "lucide-react";
import { CatalogProduct } from "@/lib/catalog-data";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { InstrumentVisual } from "./InstrumentVisual";
import { useEnquiry } from "@/context/EnquiryContext";

interface ProductCardProps {
  product: CatalogProduct;
  whatsAppNumber?: string;
}

export function ProductCard({ product, whatsAppNumber }: ProductCardProps) {
  const { openQuoteModal, addItem, isItemInEnquiry } = useEnquiry();
  const [addedTemp, setAddedTemp] = useState(false);

  const handleAddToEnquiry = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setAddedTemp(true);
    setTimeout(() => setAddedTemp(false), 2000);
  };

  const inEnquiry = isItemInEnquiry(product.id) || isItemInEnquiry(product.slug);

  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col h-full overflow-hidden group">
      {/* Top Instrument Visual Showcase */}
      <div className="p-3 bg-slate-50 border-b border-slate-100">
        <InstrumentVisual categorySlug={product.categorySlug} slug={product.slug} className="h-36" />
      </div>

      {/* Card Content & Badges */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge variant="sky">{product.categoryName}</Badge>
          {product.legalMetrologyCert && (
            <Badge variant="metrology" className="text-[10px]">
              <ShieldCheck className="w-3 h-3 text-amber-700" />
              {product.legalMetrologyCert}
            </Badge>
          )}
        </div>

        {/* Product Title */}
        <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-800 transition-colors line-clamp-2 mb-2">
          <Link href={`/products/${product.slug}`}>{product.name}</Link>
        </h3>

        {/* Short Description */}
        <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
          {product.shortDescription}
        </p>

        {/* Structured Specs Preview */}
        {product.specifications && product.specifications.length > 0 && (
          <div className="mt-auto bg-slate-50 border border-slate-100 rounded p-3 text-xs space-y-1.5 mb-4">
            <span className="font-bold text-slate-700 text-[11px] uppercase tracking-wider block mb-1">
              Key Specifications
            </span>
            {product.specifications.slice(0, 3).map((spec, idx) => (
              <div key={idx} className="flex items-start justify-between text-slate-700 gap-2">
                <span className="text-slate-500 font-medium shrink-0">{spec.name}:</span>
                <span className="font-semibold text-slate-900 text-right line-clamp-1">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Card Actions Footer */}
      <div className="bg-slate-50 px-4 py-3 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
        <Link
          href={`/products/${product.slug}`}
          className="text-xs font-bold text-sky-700 hover:text-sky-900 inline-flex items-center gap-1 transition-colors shrink-0"
        >
          View Specs <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={handleAddToEnquiry}
            title="Add to multi-product enquiry list"
            className={`p-1.5 text-xs font-medium rounded border transition-colors flex items-center gap-1 ${
              inEnquiry || addedTemp
                ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
            }`}
          >
            {addedTemp || inEnquiry ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden sm:inline text-[11px]">In List</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px]">Add</span>
              </>
            )}
          </button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => openQuoteModal(product)}
            className="font-semibold text-xs py-1 px-2.5"
          >
            <Send className="w-3.5 h-3.5" /> Enquire
          </Button>
        </div>
      </div>
    </div>
  );
}
