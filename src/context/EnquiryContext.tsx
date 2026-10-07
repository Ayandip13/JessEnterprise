"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CatalogProduct } from "@/lib/catalog-data";

export interface EnquiryItem {
  product: CatalogProduct;
  quantity: number;
}

interface EnquiryContextType {
  items: EnquiryItem[];
  addItem: (product: CatalogProduct, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearEnquiry: () => void;
  isItemInEnquiry: (productId: string) => boolean;
  totalItemsCount: number;
  
  // Modal state management
  isModalOpen: boolean;
  activeProduct: CatalogProduct | null;
  openQuoteModal: (product?: CatalogProduct | null) => void;
  closeQuoteModal: () => void;
}

const EnquiryContext = createContext<EnquiryContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "jess_enquiry_list_v1";

export function EnquiryProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<EnquiryItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState<CatalogProduct | null>(null);

  // Load stored items on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore localStorage errors
    }
  }, [items]);

  const addItem = (product: CatalogProduct, quantity = 1) => {
    setItems((prev) => {
      const existingIdx = prev.findIndex((i) => i.product.id === product.id || i.product.slug === product.slug);
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId && i.product.slug !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.product.id === productId || i.product.slug === productId ? { ...i, quantity } : i
      )
    );
  };

  const clearEnquiry = () => {
    setItems([]);
  };

  const isItemInEnquiry = (productId: string) => {
    return items.some((i) => i.product.id === productId || i.product.slug === productId);
  };

  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const openQuoteModal = (product?: CatalogProduct | null) => {
    setActiveProduct(product || null);
    setIsModalOpen(true);
  };

  const closeQuoteModal = () => {
    setIsModalOpen(false);
    setActiveProduct(null);
  };

  return (
    <EnquiryContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearEnquiry,
        isItemInEnquiry,
        totalItemsCount,
        isModalOpen,
        activeProduct,
        openQuoteModal,
        closeQuoteModal,
      }}
    >
      {children}
    </EnquiryContext.Provider>
  );
}

export function useEnquiry() {
  const context = useContext(EnquiryContext);
  if (!context) {
    throw new Error("useEnquiry must be used within an EnquiryProvider");
  }
  return context;
}
