import React from "react";
import Link from "next/link";
import { Scale, Mail, Phone, MapPin, ShieldCheck } from "lucide-react";
import { COMPANY_INFO, CATEGORIES } from "@/lib/catalog-data";

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-sky-50/80 via-indigo-50/40 to-slate-100 text-slate-800 border-t border-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Company Profile & Licensing */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/jess-logo.png"
                alt="Jess Enterprises Logo"
                className="w-12 h-12 object-contain shrink-0"
              />
              <div>
                <h3 className="font-brand italic text-xl font-bold text-slate-900 tracking-tight">
                  Jess Enterprises
                </h3>
                <p className="text-xs text-sky-700 font-semibold tracking-wider uppercase">
                  {COMPANY_INFO.tagline}
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {COMPANY_INFO.aboutText}
            </p>

            <div className="bg-white rounded-lg p-3 text-xs space-y-1.5 border border-indigo-100 shadow-2xs">
              <div className="flex items-center gap-2 text-indigo-900 font-semibold">
                <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0" />
                <span>Legal Metrology Authorised</span>
              </div>
              <p className="text-slate-700 pl-6">
                Lic.No. – <strong className="font-mono text-sky-900">{COMPANY_INFO.legalMetrologyLicNo}</strong>
              </p>
            </div>
          </div>

          {/* Column 2: Product Categories */}
          <div>
            <h4 className="text-sm font-bold text-indigo-950 uppercase tracking-wider mb-4 pb-2 border-b border-indigo-100">
              Product Categories
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/products?category=${cat.slug}`}
                    className="hover:text-sky-700 transition-colors flex items-center gap-1.5 text-slate-700"
                  >
                    <span className="text-sky-500">•</span>
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links & Services */}
          <div>
            <h4 className="text-sm font-bold text-indigo-950 uppercase tracking-wider mb-4 pb-2 border-b border-indigo-100">
              Services & Compliance
            </h4>
            <ul className="space-y-2.5 text-xs font-medium text-slate-700">
              <li>
                <Link href="/services" className="hover:text-sky-700 transition-colors">
                  Legal Metrology L & M Stamping
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-sky-700 transition-colors">
                  Lab & Industrial Balance AMC
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-sky-700 transition-colors">
                  NABL Standard Weights Calibration
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-sky-700 transition-colors">
                  Anti-Vibration Pad & Table Installation
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-sky-700 transition-colors">
                  Acrylic, SS, MS & Teflon Custom Fabrication
                </Link>
              </li>
              <li>
                <Link href="/customers" className="hover:text-sky-700 transition-colors">
                  Our Precious Customers
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Statutory Identifiers */}
          <div>
            <h4 className="text-sm font-bold text-indigo-950 uppercase tracking-wider mb-4 pb-2 border-b border-indigo-100">
              Contact & Credentials
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5 text-slate-700">
                <MapPin className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-600 shrink-0" />
                <a href={`mailto:${COMPANY_INFO.primaryEmail}`} className="text-slate-800 hover:text-sky-700 font-semibold transition-colors">
                  {COMPANY_INFO.primaryEmail}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-slate-800 font-medium">
                  Office: {COMPANY_INFO.phoneOffice} / {COMPANY_INFO.phoneMobile}
                </span>
              </div>

              <div className="pt-3 space-y-1 text-[11px] text-slate-600 border-t border-indigo-100">
                <p>
                  <strong className="text-slate-900">GSTIN:</strong> {COMPANY_INFO.gstNo}
                </p>
                <p>
                  <strong className="text-slate-900">MSME Reg:</strong> {COMPANY_INFO.msmeNo}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Disclaimer */}
        <div className="pt-8 border-t border-indigo-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 JESS ENTERPRISES. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:text-slate-900">
              About
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-slate-900">
              Contact
            </Link>
            <span>•</span>
            <Link href="/admin" className="hover:text-slate-900">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
