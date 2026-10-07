"use client";

import React, { useState } from "react";
import { Boxes, Layers, CheckCircle2, Send, Wrench } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { QuoteModal } from "@/components/shared/QuoteModal";

export function FabricationSection() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  const materials = [
    { name: "Acrylic", desc: "Clear view cabinets, desiccator boxes, glove trays & safety enclosures" },
    { name: "Stainless Steel (SS)", desc: "SS 304 / SS 316 cleanroom tables, hoods, trolleys & storage racks" },
    { name: "Mild Steel (MS)", desc: "Powder-coated heavy industrial frames, stands & structural assemblies" },
    { name: "Teflon & PVC", desc: "Chemical-resistant custom machined components, fittings & trays" },
    { name: "Polycarbonate", desc: "Impact-resistant protective covers, guards & clear lab partitions" },
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left info */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 bg-slate-100 border border-slate-300 text-slate-800 text-xs font-bold px-3 py-1 rounded">
              <Wrench className="w-3.5 h-3.5 text-sky-700" />
              Custom Engineering & Fabrication Work
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Fabrication Work as per Customer Requirements
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              We design and execute custom laboratory and industrial fabrication work using high-grade materials. Whether you require custom acrylic cabinets, specialized HPLC column storage units, or cleanroom stainless steel furniture, our team builds to your exact specifications.
            </p>

            {/* Materials Breakdown */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Supported Material Specifications:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {materials.map((mat, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-50 border border-slate-200 rounded p-3 text-xs hover:border-sky-300 transition-colors"
                  >
                    <div className="font-bold text-slate-900 flex items-center gap-1.5 mb-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-700 shrink-0" />
                      {mat.name}
                    </div>
                    <div className="text-slate-600">{mat.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <Button variant="primary" onClick={() => setQuoteModalOpen(true)}>
                <Send className="w-4 h-4" /> Request Custom Fabrication Quote
              </Button>
            </div>
          </div>

          {/* Right Highlight Box: HPLC Storage & Custom Cabinet showcase */}
          <div className="lg:col-span-5">
            <div className="bg-sky-900 text-white rounded-lg p-6 shadow-md space-y-5 border border-sky-800">
              <div className="flex items-center justify-between pb-3 border-b border-sky-800">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-300">
                  Featured Fabrication Product
                </span>
                <Boxes className="w-5 h-5 text-sky-300" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-2">
                  HPLC Column Storage Cabinets
                </h3>
                <p className="text-xs text-sky-100 leading-relaxed mb-4">
                  Organized, vibration-dampened cabinets engineered specifically for protective storage of sensitive HPLC and GC chromatography columns in pharmaceutical QC laboratories.
                </p>

                <div className="bg-sky-950/80 rounded p-4 border border-sky-700/60 space-y-2 text-xs">
                  <div className="flex justify-between items-center text-sky-200">
                    <span>Available Drawer Capacities:</span>
                    <strong className="text-white font-mono bg-sky-800 px-2 py-0.5 rounded">
                      60 pcs & 72 pcs
                    </strong>
                  </div>
                  <div className="flex justify-between items-center text-sky-200">
                    <span>Material Options:</span>
                    <strong className="text-white">Acrylic / SS / MS Powder-Coated</strong>
                  </div>
                  <div className="flex justify-between items-center text-sky-200">
                    <span>Locking & Organization:</span>
                    <strong className="text-white">Custom Slotted Dividers</strong>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setQuoteModalOpen(true)}
                className="w-full bg-white text-sky-900 hover:bg-sky-50 font-bold text-xs py-2.5 rounded transition-colors text-center block"
              >
                Enquire HPLC Storage Cabinets
              </button>
            </div>
          </div>
        </div>
      </div>

      <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
    </section>
  );
}
