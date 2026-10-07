"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lock, Scale, KeyRound, ArrowLeft, LogOut, LayoutDashboard, Package, FolderTree, Wrench, Building2, Settings, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

const ADMIN_STORAGE_KEY = "jess_admin_token";

const ADMIN_NAV = [
  { label: "Dashboard Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Products Catalog", href: "/admin/products", icon: Package },
  { label: "Categories", href: "/admin/categories", icon: FolderTree },
  { label: "Services & AMC", href: "/admin/services", icon: Wrench },
  { label: "Customers & Logos", href: "/admin/customers", icon: Building2 },
  { label: "WhatsApp & Info", href: "/admin/settings", icon: Settings },
];

export function AdminAuthWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem(ADMIN_STORAGE_KEY);
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
        body: JSON.stringify({ password, passcode: password }),
      });

      const data = await res.json();
      if (data.success && data.token) {
        localStorage.setItem(ADMIN_STORAGE_KEY, data.token);
        setIsAuthenticated(true);
        setPassword("");
      } else {
        setError(data.error || "Invalid administrator password.");
      }
    } catch {
      setError("Network or server error during authentication.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(ADMIN_STORAGE_KEY);
    setIsAuthenticated(false);
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="text-white text-sm font-semibold flex items-center gap-2">
          <Scale className="w-5 h-5 text-sky-400 animate-spin" />
          <span>Verifying Admin Session...</span>
        </div>
      </div>
    );
  }

  // Render Login Modal Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/jess-logo.png"
              alt="Jess Enterprises Stamp"
              className="w-14 h-14 object-contain mx-auto drop-shadow-md"
            />
            <h1 className="text-xl font-extrabold text-slate-900 font-brand">Jess Enterprises</h1>
            <p className="text-xs font-bold text-sky-800 uppercase tracking-wider">
              Control Panel Authentication
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-md font-semibold text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Admin Passcode / Password *
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
              className="w-full justify-center font-bold shadow-md py-3"
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

  // Render Admin Control Panel layout with responsive Sidebar
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-900">
      {/* Mobile Topbar Navigation Header (visible on < md) */}
      <header className="md:hidden bg-indigo-950 text-white p-4 flex items-center justify-between border-b border-indigo-900 sticky top-0 z-30">
        <button
          type="button"
          onClick={() => setShowLogoutModal(true)}
          className="flex items-center gap-2.5 text-left focus:outline-none group"
          title="Click to Logout & Exit to Website"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/jess-logo.png"
            alt="Jess Enterprises"
            className="w-8 h-8 object-contain bg-white rounded-full p-0.5 group-hover:scale-105 transition-transform"
          />
          <div className="flex flex-col">
            <span className="font-brand font-bold text-sm text-white tracking-wide leading-tight group-hover:text-sky-300 transition-colors">
              Jess Enterprises
            </span>
            <span className="text-[9px] text-sky-400 font-extrabold uppercase tracking-widest">
              Control Panel
            </span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 text-slate-200 hover:text-white hover:bg-indigo-900/60 rounded-md"
          aria-label="Toggle Navigation"
        >
          {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Admin Sidebar */}
      <aside
        className={`${
          mobileSidebarOpen ? "block" : "hidden"
        } md:block w-full md:w-64 bg-gradient-to-b from-indigo-950 via-slate-900 to-indigo-950 text-slate-200 border-r border-indigo-900 flex-col shrink-0 md:min-h-screen shadow-sm`}
      >
        <div className="hidden md:flex p-5 border-b border-indigo-900/60 items-center justify-between">
          <button
            type="button"
            onClick={() => setShowLogoutModal(true)}
            className="flex items-center gap-3 text-left focus:outline-none group"
            title="Click to Logout & Exit to Website"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/jess-logo.png"
              alt="Jess Enterprises"
              className="w-10 h-10 object-contain bg-white rounded-full p-0.5 shadow-xs group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className="font-brand font-bold text-base text-white tracking-wide leading-tight group-hover:text-sky-300 transition-colors">
                Jess Enterprises
              </span>
              <span className="text-[9px] text-sky-400 font-extrabold uppercase tracking-widest mt-0.5">
                Admin Control Panel
              </span>
            </div>
          </button>
        </div>

        <nav className="p-3 sm:p-4 space-y-1 flex-1">
          {ADMIN_NAV.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileSidebarOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2.5 text-xs font-semibold rounded-md transition-colors ${
                  isActive
                    ? "text-white bg-sky-700/80 font-bold"
                    : "text-slate-300 hover:text-white hover:bg-indigo-900/60"
                }`}
              >
                <Icon className="w-4 h-4 text-sky-400 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-indigo-900/60">
          <button
            onClick={() => {
              setMobileSidebarOpen(false);
              setShowLogoutModal(true);
            }}
            className="w-full flex items-center justify-center gap-2 text-xs text-red-300 bg-red-950/40 hover:bg-red-900/70 border border-red-900/60 px-3 py-2.5 rounded-md transition-colors font-bold shadow-2xs"
          >
            <LogOut className="w-4 h-4 text-red-400" /> Lock / Logout Admin
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-3 sm:p-6 lg:p-8 overflow-x-hidden min-w-0">{children}</main>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 transform animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 bg-red-100 text-red-600 rounded-xl flex items-center justify-center shrink-0">
                <LogOut className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 font-brand">
                  Logout & Lock Admin Panel?
                </h3>
                <p className="text-xs text-slate-500">Jess Enterprises Control Panel</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to end your administrative session? You will be logged out and returned to the public website.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowLogoutModal(false)}
                className="font-semibold text-slate-700"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setShowLogoutModal(false);
                  handleLogout();
                  window.location.href = "/";
                }}
                className="bg-red-600 hover:bg-red-700 text-white font-bold border-red-600"
              >
                <LogOut className="w-4 h-4" /> Yes, Logout & Exit
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
