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
    "inline-flex items-center justify-center font-medium rounded-md transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

  const variants = {
    primary: "bg-gradient-to-r from-sky-600 via-sky-700 to-indigo-700 text-white hover:from-sky-700 hover:to-indigo-800 focus:ring-indigo-600 shadow-sm font-bold",
    secondary: "bg-indigo-900 text-white hover:bg-indigo-950 focus:ring-indigo-700 font-semibold shadow-xs",
    outline: "border border-indigo-200 text-indigo-900 bg-white hover:bg-sky-50 hover:border-sky-300 focus:ring-indigo-500 font-semibold",
    whatsapp: "bg-gradient-to-r from-emerald-600 to-teal-700 text-white hover:from-emerald-700 hover:to-teal-800 focus:ring-emerald-500 shadow-sm font-bold",
    ghost: "bg-transparent text-slate-700 hover:bg-sky-50 hover:text-sky-800 focus:ring-sky-400",
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
