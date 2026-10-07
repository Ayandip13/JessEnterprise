"use client";

import React, { useState } from "react";
import { Plus, Trash2, Edit, Save, X, Upload, Image as ImageIcon, CheckCircle2 } from "lucide-react";
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
  const [editingProduct, setEditingProduct] = useState<CatalogProduct | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Product form state
  const [name, setName] = useState("");
  const [categorySlug, setCategorySlug] = useState(categories[0]?.slug || "analytical-lab-instruments");
  const [shortDescription, setShortDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [legalMetrologyCert, setLegalMetrologyCert] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [specifications, setSpecifications] = useState<{ name: string; value: string }[]>([
    { name: "Model / Code", value: "" },
    { name: "Capacity / Spec", value: "" },
  ]);

  const resetForm = () => {
    setName("");
    setCategorySlug(categories[0]?.slug || "analytical-lab-instruments");
    setShortDescription("");
    setFullDescription("");
    setLegalMetrologyCert("");
    setIsFeatured(false);
    setImageUrl("");
    setSpecifications([
      { name: "Model / Code", value: "" },
      { name: "Capacity / Spec", value: "" },
    ]);
    setEditingProduct(null);
    setShowAddForm(false);
  };

  const handleOpenEdit = (product: CatalogProduct) => {
    setEditingProduct(product);
    setName(product.name);
    setCategorySlug(product.categorySlug);
    setShortDescription(product.shortDescription || "");
    setFullDescription(product.fullDescription || "");
    setLegalMetrologyCert(product.legalMetrologyCert || "");
    setIsFeatured(!!product.isFeatured);
    setImageUrl(product.images?.[0] || "");
    setSpecifications(
      product.specifications?.length
        ? [...product.specifications]
        : [{ name: "Model / Code", value: "" }]
    );
    setShowAddForm(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const token = typeof window !== "undefined" ? localStorage.getItem("jess_admin_token") || "" : "";
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "product");

      const res = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "x-admin-secret": token,
        },
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        setImageUrl(data.url);
        setStatusMessage("Product image uploaded successfully!");
      } else {
        alert(data.error || "Image upload failed");
      }
    } catch (err: any) {
      alert("Error uploading image: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setImageUrl("");
  };

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
    const slug = editingProduct ? editingProduct.slug : slugify(name);
    const categoryName = categories.find((c) => c.slug === categorySlug)?.name || categorySlug;

    const prodPayload = {
      name,
      slug,
      categorySlug,
      categoryName,
      shortDescription,
      fullDescription: fullDescription || shortDescription,
      images: imageUrl ? [imageUrl] : [],
      specifications: specifications.filter((s) => s.name.trim() && s.value.trim()),
      isFeatured,
      isAvailable: true,
      enquiryEnabled: true,
      legalMetrologyCert,
    };

    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("jess_admin_token") || "" : "";

      if (editingProduct && editingProduct.id) {
        // Update product
        const res = await fetch(`/api/products/${editingProduct.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-admin-secret": token,
          },
          body: JSON.stringify(prodPayload),
        });

        const data = await res.json();
        if (data.success) {
          setStatusMessage("Product updated successfully!");
          setProducts(
            products.map((p) =>
              p.id === editingProduct.id ? { ...p, ...prodPayload } : p
            )
          );
          resetForm();
        } else {
          // Fallback update in state
          setProducts(
            products.map((p) =>
              p.id === editingProduct.id ? { ...p, ...prodPayload } : p
            )
          );
          setStatusMessage("Product updated locally.");
          resetForm();
        }
      } else {
        // Create new product
        const res = await fetch("/api/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-admin-secret": token,
          },
          body: JSON.stringify(prodPayload),
        });

        const data = await res.json();
        if (res.ok && data.success) {
          setStatusMessage("Product added successfully to Database!");
          const created: CatalogProduct = {
            id: data.data._id || `prod-${Date.now()}`,
            srNo: products.length + 1,
            ...prodPayload,
          };
          setProducts([created, ...products]);
          resetForm();
        } else {
          setStatusMessage("Notice: " + (data.error || "Failed to save product to database."));
        }
      }
    } catch (err: any) {
      setStatusMessage("Error saving product: " + err.message);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id || !confirm("Are you sure you want to delete this product?")) return;

    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("jess_admin_token") || "" : "";
      await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: { "x-admin-secret": token },
      });
      setProducts(products.filter((p) => p.id !== id));
      setStatusMessage("Product deleted.");
    } catch (err: any) {
      setProducts(products.filter((p) => p.id !== id));
      setStatusMessage("Product removed from view.");
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
          onClick={() => {
            if (showAddForm) {
              resetForm();
            } else {
              setShowAddForm(true);
            }
          }}
          className="font-bold"
        >
          {showAddForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showAddForm ? "Cancel" : "Add New Product"}
        </Button>
      </div>

      {/* Add / Edit Product Modal/Form */}
      {showAddForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-slate-300 rounded-lg p-6 shadow-md space-y-4"
        >
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {editingProduct ? "Edit Product / Instrument" : "Add New Equipment / Balance"}
              </h3>
              <p className="text-xs text-slate-500">
                Upload product photos, specify technical specs, and manage availability.
              </p>
            </div>
            {editingProduct && (
              <Badge variant="sky">Editing ID: {editingProduct.id.slice(-6)}</Badge>
            )}
          </div>

          {/* Product Image Upload Section */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3">
            <label className="block text-xs font-bold text-slate-700 uppercase">
              Product Image / Equipment Photo
            </label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-24 h-24 bg-white border border-slate-300 rounded-md flex items-center justify-center overflow-hidden relative group">
                {imageUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={imageUrl}
                    alt="Product preview"
                    className="w-full h-full object-contain p-1"
                  />
                ) : (
                  <div className="text-center p-2">
                    <ImageIcon className="w-8 h-8 text-slate-300 mx-auto" />
                    <span className="text-[10px] text-slate-400">No Image</span>
                  </div>
                )}
              </div>

              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <label className="cursor-pointer inline-flex items-center gap-1.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold px-3 py-2 rounded-md transition-colors shadow-2xs">
                    <Upload className="w-3.5 h-3.5" />
                    {uploading ? "Uploading..." : imageUrl ? "Replace Image" : "Upload Product Image"}
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/svg+xml"
                      onChange={handleImageUpload}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>
                  {imageUrl && (
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="text-xs text-red-600 hover:text-red-700 font-semibold px-2 py-1.5 border border-red-200 rounded hover:bg-red-50 transition-colors"
                    >
                      Remove Photo
                    </button>
                  )}
                </div>
                <p className="text-[11px] text-slate-500">
                  Supported formats: PNG, JPG, WEBP, SVG. Max file size: 5MB.
                </p>

                <div>
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Or enter direct Image URL (e.g. /uploads/products/sample.png)"
                    className="w-full text-xs border border-slate-300 rounded px-2.5 py-1 focus:ring-1 focus:ring-sky-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
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
              <div
                key={idx}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-slate-50 sm:bg-transparent p-2.5 sm:p-0 rounded-md border sm:border-0 border-slate-200"
              >
                <input
                  type="text"
                  placeholder="Spec Name (e.g. Speed / Capacity)"
                  value={spec.name}
                  onChange={(e) => handleSpecChange(idx, "name", e.target.value)}
                  className="w-full sm:w-1/3 text-xs border border-slate-300 rounded px-2.5 py-1.5 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Spec Value (e.g. 12000 rpm / 500g)"
                  value={spec.value}
                  onChange={(e) => handleSpecChange(idx, "value", e.target.value)}
                  className="w-full sm:w-2/3 text-xs border border-slate-300 rounded px-2.5 py-1.5 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveSpec(idx)}
                  className="text-slate-400 hover:text-red-600 p-1.5 self-end sm:self-center"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <Button type="button" variant="ghost" onClick={resetForm}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="font-bold">
              <Save className="w-4 h-4" /> {editingProduct ? "Update Product" : "Save Product"}
            </Button>
          </div>
        </form>
      )}

      {/* Products List Table */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[640px]">
            <thead className="bg-slate-50 text-slate-700 uppercase font-bold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Sr No</th>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Product Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Specs</th>
                <th className="px-4 py-3">Featured</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((p, idx) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-mono text-slate-500">{idx + 1}</td>
                  <td className="px-4 py-3">
                    <div className="w-10 h-10 bg-slate-100 border border-slate-200 rounded flex items-center justify-center overflow-hidden">
                      {p.images?.[0] ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ImageIcon className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-bold text-slate-900 max-w-xs">
                    {p.name}
                    {p.legalMetrologyCert && (
                      <div className="text-[10px] text-indigo-700 font-mono font-medium truncate mt-0.5">
                        {p.legalMetrologyCert}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="sky">{p.categoryName}</Badge>
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-700">
                    {p.specifications?.length || 0} items
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
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="text-indigo-600 hover:text-indigo-800 p-1.5 hover:bg-indigo-50 rounded transition-colors"
                        title="Edit product"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="text-slate-400 hover:text-red-600 p-1.5 hover:bg-red-50 rounded transition-colors"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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
