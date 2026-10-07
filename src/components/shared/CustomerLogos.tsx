import React from "react";
import { Building2, Award } from "lucide-react";
import { CLIENT_LOGOS } from "@/lib/catalog-data";

export function CustomerLogos({ title = "Our Precious Customers" }: { title?: string }) {
  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-800 bg-sky-100 px-2.5 py-1 rounded inline-flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-sky-700" />
            Trusted By Leading Organizations
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-3 tracking-tight">
            {title}
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            Serving premier pharmaceutical, chemical, research institutes, and industrial clients.
          </p>
        </div>

        {/* Customer grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {CLIENT_LOGOS.map((client, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-md p-4 text-center hover:border-sky-300 hover:shadow-2xs transition-all duration-150 flex flex-col justify-center items-center h-24"
            >
              <Building2 className="w-5 h-5 text-sky-700 mb-1.5 opacity-80" />
              <span className="text-xs font-bold text-slate-900 line-clamp-2 leading-tight">
                {client.name}
              </span>
              <span className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                {client.industry}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
