import React from "react";
import Link from "next/link";
import { Scale, Package, Layers, Wrench, Settings, ArrowLeft, Database } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row text-slate-900">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-200 border-r border-slate-800 flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-800">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-sky-700 rounded flex items-center justify-center text-white font-bold">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <div className="font-extrabold text-sm text-white tracking-tight">JESS ADMIN</div>
              <div className="text-[10px] text-sky-400 font-semibold uppercase">Control Panel</div>
            </div>
          </Link>
        </div>

        <nav className="p-4 space-y-1 flex-1">
          <Link
            href="/admin"
            className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 rounded transition-colors"
          >
            <Database className="w-4 h-4 text-sky-400" /> Dashboard Overview
          </Link>
          <Link
            href="/admin/products"
            className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 rounded transition-colors"
          >
            <Package className="w-4 h-4 text-sky-400" /> Products Catalog
          </Link>
          <Link
            href="/admin/categories"
            className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 rounded transition-colors"
          >
            <Layers className="w-4 h-4 text-sky-400" /> Categories
          </Link>
          <Link
            href="/admin/services"
            className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 rounded transition-colors"
          >
            <Wrench className="w-4 h-4 text-sky-400" /> Services & AMC
          </Link>
          <Link
            href="/admin/settings"
            className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 rounded transition-colors"
          >
            <Settings className="w-4 h-4 text-sky-400" /> WhatsApp & Info
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-slate-400 hover:text-white py-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Main Website
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">{children}</main>
    </div>
  );
}
