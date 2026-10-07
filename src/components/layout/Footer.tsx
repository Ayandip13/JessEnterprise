import React from "react";
import Link from "next/link";
import { Scale, Mail, Phone, MapPin, ShieldCheck, FileCheck, Award } from "lucide-react";
import { COMPANY_INFO, CATEGORIES } from "@/lib/catalog-data";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Company Profile & Licensing */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-sky-700 rounded flex items-center justify-center text-white font-bold">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-white tracking-tight">
                  {COMPANY_INFO.companyName}
                </h3>
                <p className="text-xs text-sky-400 font-semibold tracking-wider uppercase">
                  {COMPANY_INFO.tagline}
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {COMPANY_INFO.aboutText}
            </p>

            <div className="bg-slate-800/80 rounded p-3 text-xs space-y-1.5 border border-slate-700">
              <div className="flex items-center gap-2 text-sky-300 font-semibold">
                <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Legal Metrology Authorised</span>
              </div>
              <p className="text-slate-300 pl-6">
                Lic.No. – <strong>{COMPANY_INFO.legalMetrologyLicNo}</strong>
              </p>
            </div>
          </div>

          {/* Column 2: Product Categories */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 pb-2 border-b border-slate-800">
              Product Categories
            </h4>
            <ul className="space-y-2.5 text-xs">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/products?category=${cat.slug}`}
                    className="hover:text-sky-400 transition-colors flex items-center gap-1.5"
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
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 pb-2 border-b border-slate-800">
              Services & Compliance
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/services" className="hover:text-sky-400 transition-colors">
                  Legal Metrology L & M Stamping
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-sky-400 transition-colors">
                  Lab & Industrial Balance AMC
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-sky-400 transition-colors">
                  NABL Standard Weights Calibration
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-sky-400 transition-colors">
                  Anti-Vibration Pad & Table Installation
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-sky-400 transition-colors">
                  Acrylic, SS, MS & Teflon Custom Fabrication
                </Link>
              </li>
              <li>
                <Link href="/customers" className="hover:text-sky-400 transition-colors">
                  Our Precious Customers
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Statutory Identifiers */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 pb-2 border-b border-slate-800">
              Contact & Credentials
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <a href={`mailto:${COMPANY_INFO.primaryEmail}`} className="hover:text-sky-400 transition-colors">
                  {COMPANY_INFO.primaryEmail}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  Office: {COMPANY_INFO.phoneOffice} / {COMPANY_INFO.phoneMobile}
                </span>
              </div>

              <div className="pt-3 space-y-1 text-[11px] text-slate-400 border-t border-slate-800">
                <p>
                  <strong className="text-slate-300">GSTIN:</strong> {COMPANY_INFO.gstNo}
                </p>
                <p>
                  <strong className="text-slate-300">MSME Reg:</strong> {COMPANY_INFO.msmeNo}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Disclaimer */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 JESS ENTERPRISES. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:text-slate-400">
              About
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-slate-400">
              Contact
            </Link>
            <span>•</span>
            <Link href="/admin" className="hover:text-slate-400">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
