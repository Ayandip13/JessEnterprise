"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Scale, RefreshCw, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application Runtime Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 justify-center items-center py-16 px-4">
      <div className="max-w-md w-full bg-white border border-slate-200 rounded-xl p-8 shadow-md text-center space-y-6">
        <div className="w-14 h-14 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mx-auto border border-amber-200">
          <Scale className="w-7 h-7" />
        </div>

        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
            System Notice
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-2 tracking-tight">
            Unexpected Exception Occurred
          </h1>
          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
            The application encountered a temporary network or data processing issue. You can try refreshing the view.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button variant="primary" size="md" onClick={() => reset()} className="w-full font-bold">
            <RefreshCw className="w-4 h-4" /> Try Again
          </Button>
          <Link href="/" className="w-full sm:w-auto">
            <Button variant="outline" size="md" className="w-full font-semibold">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
