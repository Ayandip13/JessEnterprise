"use client";

import React, { useState } from "react";
import {
  FlaskConical,
  Scale,
  Thermometer,
  RotateCw,
  Boxes,
  Waves,
  Zap,
  Activity,
  Gauge,
  Sliders,
  Layers,
  ShieldCheck,
  Package,
} from "lucide-react";

interface InstrumentVisualProps {
  categorySlug: string;
  slug: string;
  imageUrl?: string;
  className?: string;
}

export function InstrumentVisual({
  categorySlug,
  slug,
  imageUrl,
  className = "h-40",
}: InstrumentVisualProps) {
  const [imageError, setImageError] = useState(false);

  // Determine visual styling and icon based on product slug/category fallback
  const getVisualConfig = () => {
    if (slug.includes("spectrophotometer")) {
      return {
        icon: FlaskConical,
        label: "UV-Vis Spectrophotometer",
        bgColor: "bg-sky-50",
        borderColor: "border-sky-200",
        iconColor: "text-sky-700",
        tag: "Analytical Instrument",
      };
    }
    if (slug.includes("ph-meter") || slug.includes("ion")) {
      return {
        icon: Activity,
        label: "Electrochemistry Meter",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
        iconColor: "text-blue-700",
        tag: "pH / Ion / Conductivity",
      };
    }
    if (slug.includes("density")) {
      return {
        icon: Gauge,
        label: "Density Meter Kit",
        bgColor: "bg-indigo-50",
        borderColor: "border-indigo-200",
        iconColor: "text-indigo-700",
        tag: "Solid Density Assay",
      };
    }
    if (slug.includes("polarimeter") || slug.includes("refractometer")) {
      return {
        icon: Sliders,
        label: "Optical Assay Unit",
        bgColor: "bg-cyan-50",
        borderColor: "border-cyan-200",
        iconColor: "text-cyan-700",
        tag: "Optical & Refraction",
      };
    }
    if (slug.includes("viscometer")) {
      return {
        icon: Waves,
        label: "Rotational Viscometer",
        bgColor: "bg-sky-50",
        borderColor: "border-sky-200",
        iconColor: "text-sky-800",
        tag: "Viscosity Analysis",
      };
    }
    if (slug.includes("sonicator") || slug.includes("ultrasonic")) {
      return {
        icon: Zap,
        label: "Ultrasonic System",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
        iconColor: "text-blue-800",
        tag: "Ultrasonic Processing",
      };
    }
    if (slug.includes("balance") || slug.includes("weighing") || slug.includes("scale")) {
      return {
        icon: Scale,
        label: "Legal Metrology Balance",
        bgColor: "bg-amber-50",
        borderColor: "border-amber-200",
        iconColor: "text-amber-800",
        tag: "Lic.No. 22000126 - CLM",
      };
    }
    if (slug.includes("weights")) {
      return {
        icon: ShieldCheck,
        label: "NABL Standard Weights",
        bgColor: "bg-amber-50",
        borderColor: "border-amber-300",
        iconColor: "text-amber-900",
        tag: "Class E1, E2, F1, F2",
      };
    }
    if (slug.includes("ice") || slug.includes("bath") || slug.includes("furnace") || slug.includes("incubator")) {
      return {
        icon: Thermometer,
        label: "Thermal Equipment",
        bgColor: "bg-slate-100",
        borderColor: "border-slate-300",
        iconColor: "text-slate-800",
        tag: "Temperature Control",
      };
    }
    if (slug.includes("stirrer") || slug.includes("shaker") || slug.includes("centrifuge")) {
      return {
        icon: RotateCw,
        label: "Sample Prep & Mixing",
        bgColor: "bg-sky-50",
        borderColor: "border-sky-200",
        iconColor: "text-sky-700",
        tag: "Mixing & Separation",
      };
    }
    if (slug.includes("hplc") || slug.includes("fabrication") || slug.includes("acrylic") || slug.includes("ss")) {
      return {
        icon: Boxes,
        label: "Custom Fabrication",
        bgColor: "bg-slate-100",
        borderColor: "border-slate-300",
        iconColor: "text-slate-900",
        tag: "SS / MS / Acrylic / Teflon",
      };
    }

    return {
      icon: Package,
      label: "Scientific Equipment",
      bgColor: "bg-slate-50",
      borderColor: "border-slate-200",
      iconColor: "text-slate-700",
      tag: "Jess Enterprises",
    };
  };

  if (imageUrl && !imageError) {
    return (
      <div
        className={`w-full ${className} bg-white border border-slate-200 rounded-md flex items-center justify-center p-2 relative overflow-hidden group-hover:border-sky-300 transition-colors`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={slug}
          onError={() => setImageError(true)}
          className="max-h-full max-w-full object-contain transition-transform duration-200 group-hover:scale-105"
        />
      </div>
    );
  }

  const config = getVisualConfig();
  const Icon = config.icon;

  return (
    <div
      className={`w-full ${className} ${config.bgColor} border ${config.borderColor} rounded-md flex flex-col items-center justify-center p-4 relative overflow-hidden group-hover:bg-sky-100/60 transition-colors`}
    >
      <div className="absolute top-2 left-2">
        <span className="text-[10px] font-bold uppercase tracking-wider bg-white/90 text-slate-700 px-2 py-0.5 rounded border border-slate-200 shadow-2xs">
          {config.tag}
        </span>
      </div>

      <Icon className={`w-12 h-12 ${config.iconColor} mb-2 stroke-[1.5]`} />

      <span className="text-xs font-bold text-slate-800 tracking-tight text-center">
        {config.label}
      </span>
    </div>
  );
}
