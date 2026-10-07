"use client";

import React, { useState } from "react";
import { Database, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function SeedButton() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSeed = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("jess_admin_token") || "" : "";
      const res = await fetch("/api/seed", {
        method: "POST",
        headers: { "x-admin-secret": token },
      });
      const data = await res.json();
      if (data.success) {
        setMessage(data.message || "Database successfully seeded from PDF!");
      } else {
        setMessage(data.error || "Seed operation failed.");
      }
    } catch (e: any) {
      setMessage("Error seeding database: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-end gap-1">
      <Button variant="outline" size="sm" onClick={handleSeed} disabled={loading}>
        <Database className="w-3.5 h-3.5 text-sky-700" />
        {loading ? "Seeding Catalog..." : "Seed Database from PDF"}
      </Button>
      {message && (
        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
          {message}
        </span>
      )}
    </div>
  );
}
