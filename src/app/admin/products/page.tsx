import React from "react";
import { getProducts, getCategories } from "@/lib/data-service";
import { ProductManagerClient } from "./ProductManagerClient";

export default async function AdminProductsPage() {
  const products = await getProducts();
  const categories = await getCategories();

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
            Catalog Management
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-1">Products Catalog</h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Add new products, edit specifications, and toggle featured status.
          </p>
        </div>
      </div>

      <ProductManagerClient initialProducts={products} categories={categories} />
    </div>
  );
}
