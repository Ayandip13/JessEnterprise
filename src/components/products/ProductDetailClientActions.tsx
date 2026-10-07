"use client";

import React, { useState } from "react";
import { Send } from "lucide-react";
import { CatalogProduct } from "@/lib/catalog-data";
import { Button } from "@/components/ui/Button";
import { QuoteModal } from "@/components/shared/QuoteModal";

interface ProductDetailClientActionsProps {
  product: CatalogProduct;
  whatsAppNumber: string;
}

export function ProductDetailClientActions({
  product,
  whatsAppNumber,
}: ProductDetailClientActionsProps) {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  return (
    <>
      <Button
        variant="whatsapp"
        size="lg"
        onClick={() => setQuoteModalOpen(true)}
        className="w-full sm:w-auto font-bold shrink-0"
      >
        <Send className="w-4 h-4" /> Request Quote via WhatsApp
      </Button>

      <QuoteModal
        product={product}
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        whatsAppNumber={whatsAppNumber}
      />
    </>
  );
}
