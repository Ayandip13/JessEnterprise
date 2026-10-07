"use client";

import React, { useState } from "react";
import { Plus, Trash2, Edit, Save, X, Building2, Upload, Image as ImageIcon, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { CatalogClient } from "@/lib/catalog-data";
import { Button } from "@/components/ui/Button";

interface CustomerManagerClientProps {
  initialClients?: CatalogClient[];
}

export default function CustomerManagerClient({ initialClients = [] }: CustomerManagerClientProps) {
  const [clients, setClients] = useState<CatalogClient[]>(initialClients);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  React.useEffect(() => {
    if (initialClients.length === 0) {
      fetch("/api/clients")
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.data) {
            setClients(data.data);
          }
        })
        .catch(() => {});
    }
  }, [initialClients.length]);

  // Form State
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("Pharmaceuticals & Healthcare");
  const [logoUrl, setLogoUrl] = useState("");
  const [order, setOrder] = useState<number>(clients.length + 1);
  const [isActive, setIsActive] = useState(true);

  const resetForm = () => {
    setName("");
    setIndustry("Pharmaceuticals & Healthcare");
    setLogoUrl("");
    setOrder(clients.length + 1);
    setIsActive(true);
    setEditingId(null);
    setShowForm(false);
  };

  const handleStartEdit = (client: CatalogClient) => {
    setEditingId(client.id || null);
    setName(client.name);
    setIndustry(client.industry);
    setLogoUrl(client.logoUrl || "");
    setOrder(client.order || 1);
    setIsActive(client.isActive !== false);
    setShowForm(true);
  };

  // Upload Logo File Handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setStatusMessage(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "clients");

    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("jess_admin_token") || "" : "";
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "x-admin-secret": token },
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        setLogoUrl(data.url);
        setStatusMessage("Logo uploaded successfully!");
      } else {
        setStatusMessage("Upload Notice: " + (data.error || "Failed to upload image."));
      }
    } catch (err: any) {
      setStatusMessage("Error uploading file: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const payload = {
      name: name.trim(),
      industry: industry.trim(),
      logoText: name.trim(),
      logoUrl: logoUrl.trim(),
      order: Number(order) || 1,
      isActive,
    };

    const token = typeof window !== "undefined" ? localStorage.getItem("jess_admin_token") || "" : "";

    try {
      if (editingId) {
        // Update
        const res = await fetch(`/api/clients/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-admin-secret": token,
          },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          setClients(clients.map((c) => (c.id === editingId ? { ...c, ...payload } : c)));
          setStatusMessage("Client updated successfully!");
        } else {
          setStatusMessage("Updated in active session view.");
        }
      } else {
        // Create
        const res = await fetch("/api/clients", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-admin-secret": token,
          },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        const created: CatalogClient = {
          id: data.data?._id || `client-${Date.now()}`,
          ...payload,
        };
        setClients([created, ...clients]);
        setStatusMessage("Client added successfully!");
      }
    } catch (err: any) {
      setStatusMessage("Client saved to active view.");
    } finally {
      resetForm();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this company?")) return;

    const token = typeof window !== "undefined" ? localStorage.getItem("jess_admin_token") || "" : "";
    try {
      await fetch(`/api/clients/${id}`, {
        method: "DELETE",
        headers: { "x-admin-secret": token },
      });
      setClients(clients.filter((c) => c.id !== id));
      setStatusMessage("Company deleted successfully.");
    } catch (err: any) {
      setClients(clients.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {statusMessage && (
        <div className="bg-sky-50 border border-sky-200 text-sky-800 p-3 rounded-lg text-xs font-semibold flex items-center justify-between shadow-2xs">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-sky-600" />
            {statusMessage}
          </span>
          <button onClick={() => setStatusMessage(null)}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">
            Precious Clients & Partners ({clients.length})
          </h2>
          <p className="text-xs text-slate-500">
            Manage corporate client listings, upload logos, set display order and toggle visibility.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            if (showForm) resetForm();
            else setShowForm(true);
          }}
          className="font-bold"
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? "Cancel" : "Add Client Company"}
        </Button>
      </div>

      {/* Add / Edit Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-slate-200 rounded-xl p-6 shadow-md space-y-4"
        >
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">
              {editingId ? "Edit Client Company" : "Add New Client Company"}
            </h3>
            <button type="button" onClick={resetForm} className="text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Company Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Cipla Ltd / Sanofi India"
                className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Industry Sector
              </label>
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="e.g. Pharmaceuticals / Specialty Chemicals"
                className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Logo File Upload & Preview Section */}
          <div className="border-t border-slate-100 pt-4 space-y-3">
            <label className="block text-xs font-bold text-slate-700 uppercase">
              Company Logo Image Upload
            </label>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {/* File input button */}
              <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg text-xs font-bold text-slate-800 transition-colors">
                <Upload className="w-4 h-4 text-sky-700" />
                {uploading ? "Uploading Image..." : "Choose Image File..."}
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/webp, image/svg+xml, image/gif"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </label>

              <div className="text-[11px] text-slate-500">
                Supports JPG, PNG, WEBP, SVG (Max 5MB)
              </div>
            </div>

            {/* Live Logo Preview Box */}
            {logoUrl ? (
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-12 bg-white border border-slate-200 rounded flex items-center justify-center p-1 overflow-hidden">
                    <img src={logoUrl} alt="Logo preview" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Uploaded Logo URL:</span>
                    <span className="text-[11px] font-mono text-sky-700 truncate max-w-xs block">{logoUrl}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setLogoUrl("")}
                    className="text-xs text-red-600 hover:text-red-800 font-semibold px-2 py-1 bg-red-50 rounded border border-red-200"
                  >
                    Remove Logo
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 border border-dashed border-slate-300 rounded-lg p-3 text-xs text-slate-500 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-slate-400" />
                <span>No logo uploaded. Standard stylized badge will be used if no image file is provided.</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-100 pt-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Display Order Position
              </label>
              <input
                type="number"
                value={order}
                onChange={(e) => setOrder(parseInt(e.target.value) || 1)}
                className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                id="isActive"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-4 h-4 text-sky-600 border-slate-300 rounded focus:ring-sky-500"
              />
              <label htmlFor="isActive" className="text-xs font-bold text-slate-800">
                Visible on Public Customers Page
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <Button type="button" variant="ghost" onClick={resetForm}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="font-bold">
              <Save className="w-4 h-4" /> {editingId ? "Update Company" : "Save Company"}
            </Button>
          </div>
        </form>
      )}

      {/* Customers List Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[500px]">
            <thead className="bg-slate-50 text-slate-700 uppercase font-bold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Logo Preview</th>
                <th className="px-4 py-3">Company Name</th>
                <th className="px-4 py-3">Industry</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {clients.map((c, idx) => (
                <tr key={c.id || idx} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-mono text-slate-500">{c.order || idx + 1}</td>
                  <td className="px-4 py-3">
                    {c.logoUrl ? (
                      <div className="w-10 h-8 bg-slate-100 rounded border border-slate-200 p-0.5 flex items-center justify-center overflow-hidden">
                        <img src={c.logoUrl} alt={c.name} className="max-h-full max-w-full object-contain" />
                      </div>
                    ) : (
                      <div className="w-10 h-8 bg-sky-50 text-sky-800 rounded border border-sky-200 flex items-center justify-center font-bold text-[10px]">
                        <Building2 className="w-4 h-4" />
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 font-bold text-slate-900">{c.name}</td>
                  <td className="px-4 py-3 text-slate-600">{c.industry}</td>
                  <td className="px-4 py-3">
                    {c.isActive !== false ? (
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[10px]">
                        <Eye className="w-3 h-3" /> Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-slate-400 font-medium bg-slate-100 px-2 py-0.5 rounded text-[10px]">
                        <EyeOff className="w-3 h-3" /> Hidden
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button
                      onClick={() => handleStartEdit(c)}
                      className="text-sky-700 hover:text-sky-900 font-semibold p-1"
                      title="Edit Company"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    {c.id && (
                      <button
                        onClick={() => handleDelete(c.id!)}
                        className="text-slate-400 hover:text-red-600 p-1"
                        title="Delete Company"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
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
