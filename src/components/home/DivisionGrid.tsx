import React from "react";
import Link from "next/link";
import { ShieldCheck, FlaskConical, Boxes, ArrowRight, Check } from "lucide-react";
import { COMPANY_INFO } from "@/lib/catalog-data";

export function DivisionGrid() {
  const divisions = [
    {
      title: "Legal Metrology – Authorised",
      icon: ShieldCheck,
      badge: `Lic.No. ${COMPANY_INFO.legalMetrologyLicNo}`,
      badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
      description:
        "Official statutory Legal Metrology L & M stamping, verification, certification of analytical balances, moisture analyzers, and supply of NABL certified reference weights.",
      items: [
        "Balances AMC / Service & Repair",
        "L & M Stamping & Re-verification",
        "Anti-Vibration Pad & Table Setup",
        "New Weights with NABL Certificate (E1, E2, F1, F2)",
        "Moisture Analyzer & Printer connectivity",
      ],
      link: "/services#metrology",
    },
    {
      title: "Lab Instruments & Accessories",
      icon: FlaskConical,
      badge: "Sales & Technical Support",
      badgeColor: "bg-sky-100 text-sky-900 border-sky-300",
      description:
        "High-performance analytical laboratory instruments engineered for precision quantitative assays, quality control, electrochemistry, and sample preparation.",
      items: [
        "PMT Spectrophotometer / TOC / N, H2, Air Generator",
        "Ion / pH / Conductivity / TDS / DO Meters",
        "Polarimeter & Touchscreen Refractometer",
        "Viscometer, Probe Sonicator & Ultrasonic Cleaner",
        "Ice Flaker, Ceramic Magnetic Stirrer & Centrifuge",
      ],
      link: "/products",
    },
    {
      title: "Custom Fabrication Work",
      icon: Boxes,
      badge: "As Per Customer Specification",
      badgeColor: "bg-slate-200 text-slate-900 border-slate-400",
      description:
        "Tailored fabrication work across SS, MS, Acrylic, PVC, Teflon, and Polycarbonate according to engineering drawings and cleanroom specifications.",
      items: [
        "Acrylic Cabinets, Trays & Enclosures",
        "HPLC Column Storage Cabinets (60 & 72 pcs)",
        "SS 304 / SS 316 Custom Laboratory Tables",
        "MS Heavy-Duty Industrial Structural Frames",
        "Teflon, PVC & Polycarbonate Components",
      ],
      link: "/services#fabrication",
    },
  ];

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-100 px-2.5 py-1 rounded">
            Core Business Divisions
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Comprehensive Metrology, Instrument Sales & Custom Fabrication
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Established to deliver best services to pharmaceutical, research, and industrial clients with statutory compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {divisions.map((div, idx) => {
            const Icon = div.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-lg p-6 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-sky-50 rounded-md flex items-center justify-center text-sky-800 border border-sky-100">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${div.badgeColor}`}
                    >
                      {div.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2">{div.title}</h3>
                  <p className="text-xs text-slate-600 mb-4 leading-relaxed">{div.description}</p>

                  <div className="space-y-2 border-t border-slate-100 pt-4 mb-6">
                    {div.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href={div.link}
                  className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-sky-800 bg-sky-50 hover:bg-sky-100 py-2.5 rounded border border-sky-200 transition-colors w-full"
                >
                  Explore Division <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
