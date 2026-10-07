"use client";

import React, { useState, useMemo } from "react";
import { CatalogProduct, CatalogCategory } from "@/lib/catalog-data";
import { ProductCard } from "./ProductCard";
import { CategoryFilter } from "./CategoryFilter";
import { EmptyState } from "@/components/ui/EmptyState";

interface ProductGridProps {
  initialProducts: CatalogProduct[];
  categories: CatalogCategory[];
  initialCategory?: string;
  whatsAppNumber?: string;
}

export function ProductGrid({
  initialProducts,
  categories,
  initialCategory,
  whatsAppNumber,
}: ProductGridProps) {
  const [activeCategory, setActiveCategory] = useState<string | undefined>(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      const matchesCategory = !activeCategory || product.categorySlug === activeCategory;
      const matchesSearch =
        !searchQuery ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.specifications.some(
          (s) =>
            s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.value.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [initialProducts, activeCategory, searchQuery]);

  return (
    <div>
      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        totalResults={filteredProducts.length}
      />

      {filteredProducts.length === 0 ? (
        <EmptyState
          title="No matching instruments found"
          description="We could not find any products matching your selected criteria. Try adjusting your search keywords or clearing category filters."
          actionLabel="Clear Filters"
          onAction={() => {
            setActiveCategory(undefined);
            setSearchQuery("");
          }}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} whatsAppNumber={whatsAppNumber} />
          ))}
        </div>
      )}
    </div>
  );
}
