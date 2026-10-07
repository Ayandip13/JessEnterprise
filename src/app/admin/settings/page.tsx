import React from "react";
import { getCompanySettings } from "@/lib/data-service";
import { SettingsClientForm } from "./SettingsClientForm";

export default async function AdminSettingsPage() {
  const settings = await getCompanySettings();

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-2xs">
        <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
          Global Configuration
        </span>
        <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
          WhatsApp & Company Settings
        </h1>
        <p className="text-xs text-slate-600 mt-0.5">
          Update the destination WhatsApp number for quote enquiries, contact numbers, email, and metrology license credentials.
        </p>
      </div>

      <SettingsClientForm initialSettings={settings} />
    </div>
  );
}
