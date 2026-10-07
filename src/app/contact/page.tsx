import React from "react";
import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getCompanySettings } from "@/lib/data-service";
import { Mail, Phone, MapPin, ShieldCheck, Send, Scale, Clock } from "lucide-react";
import { ContactFormClient } from "./ContactFormClient";

export const metadata: Metadata = {
  title: "Contact Us & WhatsApp Enquiry | Jess Enterprises",
  description:
    "Get in touch with Jess Enterprises for laboratory equipment quotes, balance AMC, Legal Metrology stamping, and custom fabrication. Email: jess.enterprises14@gmail.com, Ph: 9225901519.",
};

export default async function ContactPage() {
  const settings = await getCompanySettings();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header />

      <main className="flex-1 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Header Banner */}
          <div className="bg-slate-900 text-white rounded-lg p-6 sm:p-8 border border-slate-800">
            <div className="inline-flex items-center gap-1.5 bg-sky-950 text-sky-400 text-xs font-bold px-2.5 py-1 rounded border border-sky-800 mb-2">
              <Mail className="w-3.5 h-3.5 text-sky-400" />
              Direct Communication & WhatsApp Quotation
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Contact Jess Enterprises
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Reach out for equipment inquiries, Legal Metrology stamping appointments, balance AMC contracts, or custom fabrication drawings.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Official Contact & Licensing Summary */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-2xs space-y-4">
                <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
                  Official Contact Details
                </h3>

                <div className="space-y-4 text-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-sky-50 rounded flex items-center justify-center text-sky-700 shrink-0 border border-sky-100">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">Email Address</div>
                      <a
                        href={`mailto:${settings.primaryEmail}`}
                        className="text-sky-700 font-semibold hover:underline"
                      >
                        {settings.primaryEmail}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-emerald-50 rounded flex items-center justify-center text-emerald-700 shrink-0 border border-emerald-100">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">Helpline / WhatsApp</div>
                      <div className="text-slate-800">
                        Office: <strong className="text-slate-900">{settings.phoneOffice}</strong>
                      </div>
                      <div className="text-slate-800">
                        Mobile: <strong className="text-slate-900">{settings.phoneMobile}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-amber-50 rounded flex items-center justify-center text-amber-700 shrink-0 border border-amber-100">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">Legal Metrology License</div>
                      <div className="font-mono text-amber-900 font-bold">
                        Lic.No. – {settings.legalMetrologyLicNo}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-slate-100 rounded flex items-center justify-center text-slate-700 shrink-0 border border-slate-200">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">Location</div>
                      <div className="text-slate-700">{settings.address}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Statutory Reg Info */}
              <div className="bg-slate-900 text-white rounded-lg p-5 text-xs space-y-2 border border-slate-800">
                <div className="font-bold text-sky-400">Statutory Tax & License Information</div>
                <div className="text-slate-300">
                  GSTIN: <strong className="text-white font-mono">{settings.gstNo}</strong>
                </div>
                <div className="text-slate-300">
                  MSME Udyam: <strong className="text-white font-mono">{settings.msmeNo}</strong>
                </div>
              </div>
            </div>

            {/* Right Column: Contact & Quote Form */}
            <div className="lg:col-span-7">
              <ContactFormClient whatsAppNumber={settings.whatsAppNumber} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
