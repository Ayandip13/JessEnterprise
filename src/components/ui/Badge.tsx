import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "sky" | "outline" | "metrology" | "gray" | "success";
  children: React.ReactNode;
}

export function Badge({ variant = "sky", className, children, ...props }: BadgeProps) {
  const baseStyle =
    "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-sm text-xs font-semibold tracking-wide uppercase transition-colors";

  const variants = {
    sky: "bg-sky-50 text-sky-800 border border-sky-200",
    outline: "bg-white text-slate-700 border border-slate-300",
    metrology: "bg-amber-50 text-amber-900 border border-amber-300 font-bold",
    gray: "bg-slate-100 text-slate-700 border border-slate-200",
    success: "bg-emerald-50 text-emerald-800 border border-emerald-200",
  };

  return (
    <span className={cn(baseStyle, variants[variant], className)} {...props}>
      {children}
    </span>
  );
}
