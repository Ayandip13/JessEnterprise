import React from "react";
import { getServices } from "@/lib/data-service";
import { Wrench, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export default async function AdminServicesPage() {
  const services = await getServices();

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-2xs">
        <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
          Services & Compliance
        </span>
        <h1 className="text-2xl font-extrabold text-slate-900 mt-1">Metrology & Fabrication Services</h1>
        <p className="text-xs text-slate-600 mt-0.5">
          Manage authorized Legal Metrology stamping, balance AMC contracts, and custom fabrication offerings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.slug} className="bg-white border border-slate-200 rounded-lg p-5 shadow-2xs space-y-3">
            <Badge variant="sky">{service.category}</Badge>
            <h3 className="text-base font-bold text-slate-900">{service.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{service.shortDescription}</p>

            <div className="border-t border-slate-100 pt-3 space-y-1 text-xs">
              <span className="font-bold text-slate-700 block">Deliverables:</span>
              {service.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-1.5 text-slate-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-700 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
