"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Scale, Send, ListPlus, ShieldCheck } from "lucide-react";
import { CredentialsBar } from "./CredentialsBar";
import { QuoteModal } from "@/components/shared/QuoteModal";
import { Button } from "@/components/ui/Button";
import { useEnquiry } from "@/context/EnquiryContext";
import { CompanySettings, COMPANY_INFO } from "@/lib/catalog-data";

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
  const [settings, setSettings] = useState<CompanySettings>(COMPANY_INFO);

  const {
    items,
    totalItemsCount,
    isModalOpen,
    activeProduct,
    openQuoteModal,
    closeQuoteModal,
  } = useEnquiry();

  // Load live DB settings on mount
  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          setSettings(res.data);
        }
      })
      .catch((err) => {
        console.warn("Failed to load header settings:", err);
      });
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      <CredentialsBar />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
          {/* Company Brand Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
            <div className="w-9 h-9 sm:w-11 sm:h-11 bg-sky-700 rounded-md flex items-center justify-center text-white font-bold shadow-xs group-hover:bg-sky-800 transition-colors shrink-0">
              <Scale className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-sm sm:text-lg lg:text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-sky-800 transition-colors truncate">
                  JESS ENTERPRISES
                </span>
                <span className="hidden xl:inline-block bg-sky-100 text-sky-800 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border border-sky-200 shrink-0">
                  Legal Metrology
                </span>
              </div>
              <span className="block text-[10px] sm:text-xs font-semibold text-sky-700 tracking-wider uppercase truncate">
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
                  className={`px-2.5 py-2 text-xs xl:text-sm font-semibold rounded-md transition-colors whitespace-nowrap ${
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

          {/* Actions & Quote Button (Desktop & Laptop) */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
            {/* Multi-product Enquiry List Badge if items exist */}
            {items.length > 0 && (
              <button
                type="button"
                onClick={() => openQuoteModal(null)}
                className="relative inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold text-sky-900 bg-sky-50 border border-sky-300 rounded-md hover:bg-sky-100 transition-colors shrink-0"
                title="View multi-product enquiry list"
              >
                <ListPlus className="w-4 h-4 text-sky-700" />
                <span>Enquiry List</span>
                <span className="ml-1 bg-sky-700 text-white text-[10px] px-1.5 py-0.2 rounded-full font-mono">
                  {totalItemsCount}
                </span>
              </button>
            )}

            <Link
              href="/admin"
              className="text-xs text-slate-600 hover:text-slate-900 border border-slate-200 rounded px-2.5 py-1.5 hover:bg-slate-50 transition-colors font-medium shrink-0"
            >
              Admin
            </Link>

            <Button
              variant="primary"
              size="md"
              onClick={() => openQuoteModal(null)}
              className="font-bold tracking-wide text-xs xl:text-sm py-2 px-3 xl:px-4 shrink-0"
            >
              <Send className="w-4 h-4" /> Request Quote
            </Button>
          </div>

          {/* Mobile & Tablet Controls */}
          <div className="flex items-center lg:hidden gap-1.5 sm:gap-2 shrink-0">
            {/* Quick Enquiry Badge on Mobile */}
            {items.length > 0 && (
              <button
                type="button"
                onClick={() => openQuoteModal(null)}
                className="relative p-2 text-sky-800 bg-sky-50 border border-sky-300 rounded-md shrink-0 min-h-[40px] min-w-[40px] flex items-center justify-center"
                aria-label="Enquiry List"
              >
                <ListPlus className="w-5 h-5 text-sky-700" />
                <span className="absolute -top-1 -right-1 bg-sky-700 text-white text-[10px] min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center font-bold font-mono">
                  {totalItemsCount}
                </span>
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-md focus:outline-none min-h-[40px] min-w-[40px] flex items-center justify-center"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-slate-900" /> : <Menu className="w-6 h-6 text-slate-900" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile / Tablet Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-1 shadow-lg max-h-[calc(100vh-80px)] overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3.5 py-3 rounded-md text-sm sm:text-base font-semibold transition-colors ${
                pathname === item.href
                  ? "text-sky-800 bg-sky-50 font-bold"
                  : "text-slate-800 hover:bg-slate-100"
              }`}
            >
              {item.label}
            </Link>
          ))}

          <div className="pt-4 mt-2 border-t border-slate-200 flex flex-col gap-2.5">
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                setMobileMenuOpen(false);
                openQuoteModal(null);
              }}
              className="w-full justify-center py-3 font-bold text-sm"
            >
              <Send className="w-4 h-4" /> Request Quote via WhatsApp
            </Button>

            <div className="flex items-center gap-2 pt-1">
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center text-xs text-slate-600 py-2.5 border border-slate-300 rounded-md font-semibold bg-slate-50 hover:bg-slate-100"
              >
                Admin Portal
              </Link>
              {items.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openQuoteModal(null);
                  }}
                  className="flex-1 text-center text-xs text-sky-800 font-bold py-2.5 border border-sky-300 rounded-md bg-sky-50 hover:bg-sky-100"
                >
                  Enquiry List ({totalItemsCount})
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Reusable Quote Modal */}
      <QuoteModal
        product={activeProduct}
        isOpen={isModalOpen}
        onClose={closeQuoteModal}
        whatsAppNumber={settings.whatsAppNumber}
        companyPhone={settings.phoneOffice}
        companyEmail={settings.primaryEmail}
      />
    </header>
  );
}
