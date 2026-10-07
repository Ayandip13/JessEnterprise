import React from "react";
import { ShieldCheck, Mail, Phone, Award } from "lucide-react";
import { COMPANY_INFO } from "@/lib/catalog-data";

export function CredentialsBar() {
  return (
    <div className="bg-gradient-to-r from-sky-900 via-indigo-900 to-slate-900 text-slate-100 text-xs py-2 px-4 border-b border-indigo-800/50 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Metrology & Government Credentials */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1 text-slate-200">
          <span className="inline-flex items-center gap-1 font-medium text-sky-300">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-300" />
            Legal Metrology Lic. No.:{" "}
            <strong className="text-white font-mono">{COMPANY_INFO.legalMetrologyLicNo}</strong>
          </span>
          <span className="hidden sm:inline text-indigo-400">|</span>
          <span className="inline-flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-amber-300" />
            GST: <strong className="text-white font-mono">{COMPANY_INFO.gstNo}</strong>
          </span>
          <span className="hidden sm:inline text-indigo-400">|</span>
          <span>
            MSME: <strong className="text-white font-mono">{COMPANY_INFO.msmeNo}</strong>
          </span>
        </div>

        {/* Contact Links */}
        <div className="flex items-center gap-4 text-slate-200">
          <a
            href={`mailto:${COMPANY_INFO.primaryEmail}`}
            className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-sky-300" />
            <span>{COMPANY_INFO.primaryEmail}</span>
          </a>
          <span className="text-indigo-400">|</span>
          <a
            href={`tel:${COMPANY_INFO.phoneOffice}`}
            className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-300" />
            <span>Ph: {COMPANY_INFO.phoneOffice}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
