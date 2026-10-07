"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, ShieldCheck, Wrench, Boxes } from "lucide-react";
import { CatalogService } from "@/lib/catalog-data";
import { Button } from "@/components/ui/Button";
import { QuoteModal } from "@/components/shared/QuoteModal";

interface ServicesClientSectionProps {
  services: CatalogService[];
  whatsAppNumber: string;
}

export function ServicesClientSection({
  services,
  whatsAppNumber,
}: ServicesClientSectionProps) {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("");

  const handleEnquireService = (title: string) => {
    setSelectedService(title);
    setQuoteModalOpen(true);
  };

  const getIcon = (idx: number) => {
    if (idx === 0) return ShieldCheck;
    if (idx === 1) return Wrench;
    return Boxes;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service, idx) => {
          const Icon = getIcon(idx);
          return (
            <div
              key={service.slug}
              className="bg-white border border-slate-200 rounded-lg p-6 shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 bg-sky-50 rounded-md flex items-center justify-center text-sky-800 mb-4 border border-sky-100">
                  <Icon className="w-6 h-6" />
                </div>

                <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-800 px-2 py-0.5 rounded border border-slate-200">
                  {service.category}
                </span>

                <h3 className="text-lg font-bold text-slate-900 mt-2 mb-2">{service.title}</h3>
                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                  {service.fullDescription}
                </p>

                <div className="space-y-2 border-t border-slate-100 pt-4 mb-6">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                    Key Deliverables:
                  </span>
                  {service.highlights.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-700 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                variant="primary"
                size="md"
                onClick={() => handleEnquireService(service.title)}
                className="w-full justify-center font-bold"
              >
                <Send className="w-4 h-4" /> Enquire Service
              </Button>
            </div>
          );
        })}
      </div>

      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        whatsAppNumber={whatsAppNumber}
      />
    </div>
  );
}
