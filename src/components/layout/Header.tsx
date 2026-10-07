"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Scale, Send, ShieldAlert } from "lucide-react";
import { CredentialsBar } from "./CredentialsBar";
import { QuoteModal } from "@/components/shared/QuoteModal";
import { Button } from "@/components/ui/Button";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Products Catalog", href: "/products" },
  { label: "Services & AMC", href: "/services" },
  { label: "Precious Customers", href: "/customers" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      <CredentialsBar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Company Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 bg-sky-700 rounded-md flex items-center justify-center text-white font-bold shadow-xs group-hover:bg-sky-800 transition-colors">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-sky-800 transition-colors">
                  JESS ENTERPRISES
                </span>
                <span className="hidden sm:inline-block bg-sky-100 text-sky-800 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border border-sky-200">
                  Legal Metrology
                </span>
              </div>
              <span className="block text-xs font-semibold text-sky-700 tracking-wider uppercase">
                Innovative Services
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-semibold rounded-md transition-colors ${
                    isActive
                      ? "text-sky-800 bg-sky-50 font-bold"
                      : "text-slate-700 hover:text-sky-700 hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions & Quote Button */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/admin"
              className="text-xs text-slate-600 hover:text-slate-900 border border-slate-200 rounded px-2.5 py-1.5 hover:bg-slate-50 transition-colors font-medium"
            >
              Admin
            </Link>
            <Button
              variant="primary"
              size="md"
              onClick={() => setQuoteModalOpen(true)}
              className="font-bold tracking-wide"
            >
              <Send className="w-4 h-4" /> Request Quote
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center sm:hidden gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-md focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-slate-50 px-4 pt-3 pb-6 space-y-2">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2.5 rounded-md text-base font-semibold ${
                pathname === item.href
                  ? "text-sky-800 bg-sky-100"
                  : "text-slate-800 hover:bg-slate-100"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-slate-200 flex flex-col gap-2">
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                setMobileMenuOpen(false);
                setQuoteModalOpen(true);
              }}
              className="w-full justify-center"
            >
              <Send className="w-4 h-4" /> Request Quote via WhatsApp
            </Button>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center text-xs text-slate-600 py-2 border border-slate-300 rounded font-medium bg-white"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      )}

      {/* Reusable Quote Modal */}
      <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
    </header>
  );
}
