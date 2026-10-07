"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Scale, Lock, KeyRound, LogOut, ShieldAlert, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function AdminAuthWrapper({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check saved session in browser
    const savedToken = localStorage.getItem("jess_admin_token");
    if (savedToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (data.success && data.token) {
        localStorage.setItem("jess_admin_token", data.token);
        setIsAuthenticated(true);
      } else {
        setError(data.error || "Access denied. Incorrect password.");
      }
    } catch (err: any) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("jess_admin_token");
    setIsAuthenticated(false);
    setPassword("");
  };

  // Loading state during initial token check
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-slate-100 flex items-center justify-center text-slate-700 text-xs font-semibold">
        Verifying administrator credentials...
      </div>
    );
  }

  // Render Light Theme Login Form if unauthenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50/60 to-slate-100 flex flex-col justify-center items-center p-4 text-slate-900">
        <div className="max-w-md w-full bg-white border border-indigo-100 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-gradient-to-r from-sky-600 to-indigo-700 rounded-xl flex items-center justify-center text-white mx-auto shadow-md">
              <Scale className="w-7 h-7" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-800 bg-sky-50 px-3 py-1 rounded-full border border-sky-200 inline-block mt-2">
              Authorised Access Only
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Jess Enterprises Admin Portal
            </h1>
            <p className="text-xs text-slate-600">
              Please enter the administrator passcode to access the control panel.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 text-xs rounded-lg p-3 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Admin Passcode / Key *
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password..."
                  className="w-full text-sm bg-slate-50 border border-slate-300 text-slate-900 rounded-lg px-3 py-2.5 pl-9 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={loading}
              className="w-full justify-center font-bold shadow-md"
            >
              <Lock className="w-4 h-4" /> {loading ? "Authenticating..." : "Unlock Control Panel"}
            </Button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-sky-800 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Render Admin Control Panel layout with Logout option when authenticated
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-900">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-gradient-to-b from-indigo-950 via-slate-900 to-indigo-950 text-slate-200 border-r border-indigo-900 flex flex-col shrink-0 shadow-sm">
        <div className="p-6 border-b border-indigo-900/60 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-r from-sky-500 to-indigo-600 rounded-md flex items-center justify-center text-white font-bold shadow-xs">
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
            className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-200 hover:text-white hover:bg-indigo-900/80 rounded-md transition-colors"
          >
            Dashboard Overview
          </Link>
          <Link
            href="/admin/products"
            className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-200 hover:text-white hover:bg-indigo-900/80 rounded-md transition-colors"
          >
            Products Catalog
          </Link>
          <Link
            href="/admin/categories"
            className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-200 hover:text-white hover:bg-indigo-900/80 rounded-md transition-colors"
          >
            Categories
          </Link>
          <Link
            href="/admin/services"
            className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-200 hover:text-white hover:bg-indigo-900/80 rounded-md transition-colors"
          >
            Services & AMC
          </Link>
          <Link
            href="/admin/settings"
            className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-200 hover:text-white hover:bg-indigo-900/80 rounded-md transition-colors"
          >
            WhatsApp & Info
          </Link>
        </nav>

        <div className="p-4 border-t border-indigo-900/60 space-y-2">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 text-xs text-red-400 hover:text-red-300 hover:bg-indigo-900/60 px-3 py-2 rounded-md transition-colors font-semibold"
          >
            <LogOut className="w-4 h-4" /> Lock / Logout Admin
          </button>
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-slate-400 hover:text-white px-3 py-1 transition-colors"
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
