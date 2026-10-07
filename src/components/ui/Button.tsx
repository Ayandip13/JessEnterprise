import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "whatsapp" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyle =
    "inline-flex items-center justify-center font-medium rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

  const variants = {
    primary: "bg-sky-700 text-white hover:bg-sky-800 active:bg-sky-900 focus:ring-sky-600 shadow-xs",
    secondary: "bg-slate-800 text-white hover:bg-slate-900 focus:ring-slate-700",
    outline: "border border-sky-700 text-sky-800 bg-white hover:bg-sky-50 focus:ring-sky-600",
    whatsapp: "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500 shadow-xs font-semibold",
    ghost: "bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-slate-400",
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5 gap-1.5",
    md: "text-sm px-4 py-2 gap-2",
    lg: "text-base px-6 py-3 gap-2.5",
  };

  return (
    <button className={cn(baseStyle, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}
