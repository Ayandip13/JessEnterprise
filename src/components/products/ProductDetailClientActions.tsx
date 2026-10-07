"use client";

import React, { useState } from "react";
import { Send, Plus, Check } from "lucide-react";
import { CatalogProduct } from "@/lib/catalog-data";
import { Button } from "@/components/ui/Button";
import { useEnquiry } from "@/context/EnquiryContext";

interface ProductDetailClientActionsProps {
  product: CatalogProduct;
  whatsAppNumber: string;
}

export function ProductDetailClientActions({
  product,
}: ProductDetailClientActionsProps) {
  const { openQuoteModal, addItem, isItemInEnquiry } = useEnquiry();
  const [added, setAdded] = useState(false);

  const handleAddToList = () => {
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const inList = isItemInEnquiry(product.id) || isItemInEnquiry(product.slug);

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
      <Button
        variant="outline"
        size="lg"
        onClick={handleAddToList}
        className={`w-full sm:w-auto font-semibold shrink-0 ${
          inList || added ? "bg-emerald-50 text-emerald-800 border-emerald-300" : ""
        }`}
      >
        {added || inList ? (
          <>
            <Check className="w-4 h-4 text-emerald-600" /> Added to Enquiry List
          </>
        ) : (
          <>
            <Plus className="w-4 h-4" /> Add to Enquiry List
          </>
        )}
      </Button>

      <Button
        variant="whatsapp"
        size="lg"
        onClick={() => openQuoteModal(product)}
        className="w-full sm:w-auto font-bold shrink-0 shadow-sm"
      >
        <Send className="w-4 h-4" /> Request Quote via WhatsApp
      </Button>
    </div>
  );
}
