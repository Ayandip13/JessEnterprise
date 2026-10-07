import React from "react";
import Link from "next/link";
import { getProducts, getCategories, getServices, getClientLogos, getCompanySettings } from "@/lib/data-service";
import { Package, Layers, Wrench, Building2, Phone, Database, CheckCircle2, ArrowRight } from "lucide-react";
import { SeedButton } from "./SeedButton";

export default async function AdminDashboardPage() {
  const products = await getProducts();
  const categories = await getCategories();
  const services = await getServices();
  const clients = await getClientLogos();
  const settings = await getCompanySettings();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-lg border border-slate-200 shadow-2xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
            System Control Panel
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
            Dashboard Overview
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Manage company products, categories, legal metrology services, and WhatsApp contact settings.
          </p>
        </div>

        {/* Database Seed Trigger */}
        <SeedButton />
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Total Products
            </span>
            <Package className="w-5 h-5 text-sky-700" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mt-2">{products.length}</div>
          <div className="text-[11px] text-slate-500 mt-1">Database catalog products</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Categories
            </span>
            <Layers className="w-5 h-5 text-sky-700" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mt-2">{categories.length}</div>
          <div className="text-[11px] text-slate-500 mt-1">Core business divisions</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Services & AMC
            </span>
            <Wrench className="w-5 h-5 text-sky-700" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mt-2">{services.length}</div>
          <div className="text-[11px] text-slate-500 mt-1">Metrology & fabrication services</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Precious Clients
            </span>
            <Building2 className="w-5 h-5 text-sky-700" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mt-2">{clients.length}</div>
          <div className="text-[11px] text-slate-500 mt-1">Authentic partner listings</div>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-2xs">
          <h3 className="text-base font-bold text-slate-900 mb-2">Manage Products Catalog</h3>
          <p className="text-xs text-slate-600 mb-4 leading-relaxed">
            Add new analytical equipment, edit specifications (unlimited key-value pairs), toggle featured status, and configure availability.
          </p>
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 hover:text-sky-900"
          >
            Open Product Manager <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-2xs">
          <h3 className="text-base font-bold text-slate-900 mb-2">WhatsApp & Contact Settings</h3>
          <p className="text-xs text-slate-600 mb-4 leading-relaxed">
            Configure target WhatsApp number, office phone numbers, primary email, Legal Metrology License details, and GSTIN.
          </p>
          <Link
            href="/admin/settings"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 hover:text-sky-900"
          >
            Configure WhatsApp Settings <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
