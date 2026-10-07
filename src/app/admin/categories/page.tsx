import React from "react";
import { getCategories } from "@/lib/data-service";
import { Layers, FolderKanban } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-2xs">
        <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
          Category Structure
        </span>
        <h1 className="text-2xl font-extrabold text-slate-900 mt-1">Product Categories</h1>
        <p className="text-xs text-slate-600 mt-0.5">
          Organize products into database-driven business categories.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat, idx) => (
          <div key={cat.slug} className="bg-white border border-slate-200 rounded-lg p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-slate-400">Order #{idx + 1}</span>
              <Badge variant="sky">{cat.slug}</Badge>
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">{cat.name}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{cat.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
