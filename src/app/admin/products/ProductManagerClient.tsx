"use client";

import React, { useState } from "react";
import { Plus, Trash2, Edit, Save, X, CheckCircle2, ShieldCheck } from "lucide-react";
import { CatalogProduct, CatalogCategory } from "@/lib/catalog-data";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { slugify } from "@/lib/utils";

interface ProductManagerClientProps {
  initialProducts: CatalogProduct[];
  categories: CatalogCategory[];
}

export function ProductManagerClient({
  initialProducts,
  categories,
}: ProductManagerClientProps) {
  const [products, setProducts] = useState<CatalogProduct[]>(initialProducts);
  const [showAddForm, setShowAddForm] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // New product form state
  const [name, setName] = useState("");
  const [categorySlug, setCategorySlug] = useState(categories[0]?.slug || "analytical-lab-instruments");
  const [shortDescription, setShortDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [legalMetrologyCert, setLegalMetrologyCert] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [specifications, setSpecifications] = useState<{ name: string; value: string }[]>([
    { name: "Model / Code", value: "" },
    { name: "Capacity / Spec", value: "" },
  ]);

  const handleAddSpec = () => {
    setSpecifications([...specifications, { name: "", value: "" }]);
  };

  const handleRemoveSpec = (index: number) => {
    setSpecifications(specifications.filter((_, i) => i !== index));
  };

  const handleSpecChange = (index: number, field: "name" | "value", val: string) => {
    const updated = [...specifications];
    updated[index][field] = val;
    setSpecifications(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug = slugify(name);
    const categoryName = categories.find((c) => c.slug === categorySlug)?.name || categorySlug;

    const newProdPayload = {
      name,
      slug,
      categorySlug,
      categoryName,
      shortDescription,
      fullDescription: fullDescription || shortDescription,
      images: [],
      specifications: specifications.filter((s) => s.name.trim() && s.value.trim()),
      isFeatured,
      isAvailable: true,
      enquiryEnabled: true,
      legalMetrologyCert,
    };

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProdPayload),
      });

      const data = await res.json();
      if (data.success) {
        setStatusMessage("Product added successfully!");
        const created: CatalogProduct = {
          id: data.data._id || `prod-${Date.now()}`,
          srNo: products.length + 1,
          ...newProdPayload,
        };
        setProducts([created, ...products]);
        setShowAddForm(false);
        // Reset form
        setName("");
        setShortDescription("");
        setFullDescription("");
        setLegalMetrologyCert("");
        setIsFeatured(false);
      } else {
        setStatusMessage("Notice: " + (data.error || "Created in local memory mode."));
      }
    } catch (err: any) {
      // Local memory fallback update
      const created: CatalogProduct = {
        id: `prod-${Date.now()}`,
        srNo: products.length + 1,
        ...newProdPayload,
      };
      setProducts([created, ...products]);
      setShowAddForm(false);
      setStatusMessage("Product added to active view.");
    }
  };

  return (
    <div className="space-y-6">
      {statusMessage && (
        <div className="bg-sky-50 border border-sky-200 text-sky-800 p-3 rounded text-xs font-semibold flex items-center justify-between">
          <span>{statusMessage}</span>
          <button onClick={() => setStatusMessage(null)}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">
          Catalog Products ({products.length})
        </h2>
        <Button
          variant="primary"
          size="sm"
          onClick={() => setShowAddForm(!showAddForm)}
          className="font-bold"
        >
          {showAddForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showAddForm ? "Cancel" : "Add New Product"}
        </Button>
      </div>

      {/* Add Product Modal/Form */}
      {showAddForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-slate-300 rounded-lg p-6 shadow-md space-y-4"
        >
          <div className="border-b border-slate-200 pb-3">
            <h3 className="text-base font-bold text-slate-900">Add New Equipment / Balance</h3>
            <p className="text-xs text-slate-500">
              Enter product details and add structured specifications.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Product Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Precision Analytical Micro Balance"
                className="w-full text-sm border border-slate-300 rounded px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Category *
              </label>
              <select
                value={categorySlug}
                onChange={(e) => setCategorySlug(e.target.value)}
                className="w-full text-sm border border-slate-300 rounded px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none bg-white"
              >
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Short Description *
            </label>
            <input
              type="text"
              required
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="Brief summary of functions and features..."
              className="w-full text-sm border border-slate-300 rounded px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Full Description
            </label>
            <textarea
              rows={3}
              value={fullDescription}
              onChange={(e) => setFullDescription(e.target.value)}
              placeholder="Detailed technical overview and laboratory applications..."
              className="w-full text-sm border border-slate-300 rounded px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Legal Metrology / Certification Tag
              </label>
              <input
                type="text"
                value={legalMetrologyCert}
                onChange={(e) => setLegalMetrologyCert(e.target.value)}
                placeholder="e.g. Lic.No. 22000126 - CLM / NABL Certified"
                className="w-full text-sm border border-slate-300 rounded px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                id="isFeatured"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 text-sky-600 border-slate-300 rounded focus:ring-sky-500"
              />
              <label htmlFor="isFeatured" className="text-xs font-bold text-slate-800">
                Mark as Featured Product on Homepage
              </label>
            </div>
          </div>

          {/* Structured Specifications Editor */}
          <div className="border-t border-slate-200 pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Structured Technical Specifications (Unlimited)
              </span>
              <button
                type="button"
                onClick={handleAddSpec}
                className="text-xs font-bold text-sky-700 hover:text-sky-900 inline-flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Spec Line
              </button>
            </div>

            {specifications.map((spec, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Spec Name (e.g. Speed / Capacity)"
                  value={spec.name}
                  onChange={(e) => handleSpecChange(idx, "name", e.target.value)}
                  className="w-1/3 text-xs border border-slate-300 rounded px-2.5 py-1.5 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Spec Value (e.g. 12000 rpm / 500g)"
                  value={spec.value}
                  onChange={(e) => handleSpecChange(idx, "value", e.target.value)}
                  className="w-2/3 text-xs border border-slate-300 rounded px-2.5 py-1.5 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveSpec(idx)}
                  className="text-slate-400 hover:text-red-600 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <Button type="button" variant="ghost" onClick={() => setShowAddForm(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="font-bold">
              <Save className="w-4 h-4" /> Save Product
            </Button>
          </div>
        </form>
      )}

      {/* Products List Table */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 uppercase font-bold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Sr No</th>
                <th className="px-4 py-3">Product Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Specs Count</th>
                <th className="px-4 py-3">Featured</th>
                <th className="px-4 py-3">Cert / Tag</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((p, idx) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-mono text-slate-500">{idx + 1}</td>
                  <td className="px-4 py-3 font-bold text-slate-900">{p.name}</td>
                  <td className="px-4 py-3">
                    <Badge variant="sky">{p.categoryName}</Badge>
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-700">
                    {p.specifications?.length || 0} specs
                  </td>
                  <td className="px-4 py-3">
                    {p.isFeatured ? (
                      <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Yes
                      </span>
                    ) : (
                      <span className="text-slate-400">No</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-600 font-mono">
                    {p.legalMetrologyCert || "Standard"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
