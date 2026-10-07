import React from "react";
import { CheckCircle2, ShieldCheck } from "lucide-react";

interface Specification {
  name: string;
  value: string;
}

interface ProductSpecsProps {
  specifications: Specification[];
  legalMetrologyCert?: string;
}

export function ProductSpecs({ specifications, legalMetrologyCert }: ProductSpecsProps) {
  if (!specifications || specifications.length === 0) {
    return (
      <div className="text-sm text-slate-500 italic py-2">
        Detailed technical specifications available upon request.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {legalMetrologyCert && (
        <div className="bg-amber-50 border border-amber-300 rounded p-3 text-xs text-amber-900 flex items-center gap-2 font-semibold">
          <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
          <span>Statutory Compliance / Certification: {legalMetrologyCert}</span>
        </div>
      )}

      <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
        <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-700">
          Technical Specifications
        </div>
        <div className="divide-y divide-slate-100">
          {specifications.map((spec, idx) => (
            <div
              key={idx}
              className={`px-4 py-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm ${
                idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"
              }`}
            >
              <div className="font-semibold text-slate-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                {spec.name}
              </div>
              <div className="sm:col-span-2 text-slate-900 font-medium">{spec.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
