"use client";

import React from "react";
import { Search, Filter, X } from "lucide-react";
import { CatalogCategory } from "@/lib/catalog-data";

interface CategoryFilterProps {
  categories: CatalogCategory[];
  activeCategory?: string;
  onSelectCategory: (categorySlug?: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalResults: number;
}

export function CategoryFilter({
  categories,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  totalResults,
}: CategoryFilterProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-3.5 sm:p-4 mb-6 sm:mb-8 space-y-3.5 sm:space-y-4">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search instruments, specs, model..."
            className="w-full text-xs sm:text-sm pl-9 pr-8 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Count Indicator */}
        <div className="text-xs font-semibold text-slate-600 flex items-center justify-between sm:justify-end gap-2 shrink-0">
          <span>Showing {totalResults} product(s)</span>
          {activeCategory && (
            <button
              onClick={() => onSelectCategory(undefined)}
              className="text-sky-700 hover:underline flex items-center gap-1 font-bold"
            >
              Clear Filter <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Category Pills (Touch Scrollable on Mobile) */}
      <div className="flex items-center gap-2 pt-2 border-t border-slate-100 overflow-x-auto pb-1 max-w-full scrollbar-thin">
        <button
          onClick={() => onSelectCategory(undefined)}
          className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors shrink-0 whitespace-nowrap ${
            !activeCategory
              ? "bg-sky-700 text-white shadow-2xs"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          All Categories
        </button>

        {categories.map((cat) => {
          const isActive = activeCategory === cat.slug;
          return (
            <button
              key={cat.slug}
              onClick={() => onSelectCategory(cat.slug)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors shrink-0 whitespace-nowrap ${
                isActive
                  ? "bg-sky-700 text-white shadow-2xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
