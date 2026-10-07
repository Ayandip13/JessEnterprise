"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Send,
  CheckCircle2,
  Edit3,
  Copy,
  Check,
  AlertTriangle,
  Plus,
  Minus,
  Trash2,
  ListPlus,
  PhoneCall,
  Mail,
  Scale,
} from "lucide-react";
import { CatalogProduct } from "@/lib/catalog-data";
import { Button } from "@/components/ui/Button";
import {
  generateSingleProductEnquiryMessage,
  generateBulkEnquiryMessage,
  buildWhatsAppUrl,
  normalizeWhatsAppNumber,
  CustomerDetails,
} from "@/lib/whatsapp";
import { validateEnquiryForm, EnquiryFormData, FormErrors } from "@/lib/validation";
import { useEnquiry } from "@/context/EnquiryContext";

interface QuoteModalProps {
  product?: CatalogProduct | null;
  isOpen: boolean;
  onClose: () => void;
  whatsAppNumber?: string;
  companyPhone?: string;
  companyEmail?: string;
}

type ModalStep = "form" | "review" | "sent";

export function QuoteModal({
  product: propProduct,
  isOpen,
  onClose,
  whatsAppNumber = "919225901519",
  companyPhone = "+91 9225901519",
  companyEmail = "jess.enterprises14@gmail.com",
}: QuoteModalProps) {
  const { items, activeProduct, removeItem, updateQuantity, clearEnquiry } = useEnquiry();

  // Determine effective product
  const effectiveProduct = propProduct !== undefined ? propProduct : activeProduct;
  const isBulkMode = !effectiveProduct && items.length > 0;

  // Form State
  const [formData, setFormData] = useState<EnquiryFormData>({
    customerName: "",
    customerPhone: "",
    quantity: 1,
    customerCompany: "",
    customerEmail: "",
    customerMessage: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [step, setStep] = useState<ModalStep>("form");
  const [copied, setCopied] = useState(false);
  const [generatedMessage, setGeneratedMessage] = useState("");
  const [whatsAppUrl, setWhatsAppUrl] = useState("");

  // Sync initial state when modal opens or product changes
  useEffect(() => {
    if (isOpen) {
      setStep("form");
      setErrors({});
      setCopied(false);
      setFormData((prev) => ({
        ...prev,
        quantity: 1,
      }));
    }
  }, [isOpen, effectiveProduct]);

  // Handle ESC key press to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleFormChange = (field: keyof EnquiryFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // Step 1: Validate and go to Review
  const handleProceedToReview = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateEnquiryForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    // Construct product URL for pre-filled message
    let currentUrl = "";
    if (typeof window !== "undefined") {
      const origin = window.location.origin;
      if (effectiveProduct) {
        currentUrl = `${origin}/products/${effectiveProduct.slug}`;
      } else {
        currentUrl = `${origin}/products`;
      }
    }

    const customerDetails: CustomerDetails = {
      name: formData.customerName.trim(),
      phone: formData.customerPhone.trim(),
      quantity: formData.quantity,
      company: formData.customerCompany?.trim(),
      email: formData.customerEmail?.trim(),
      message: formData.customerMessage?.trim(),
    };

    let msg = "";
    if (effectiveProduct) {
      msg = generateSingleProductEnquiryMessage({
        product: effectiveProduct,
        customer: customerDetails,
        productUrl: currentUrl,
      });
    } else {
      msg = generateBulkEnquiryMessage({
        items,
        customer: customerDetails,
        pageUrl: currentUrl,
      });
    }

    setGeneratedMessage(msg);
    const url = buildWhatsAppUrl(whatsAppNumber, msg);
    setWhatsAppUrl(url);

    setStep("review");
  };

  // Step 2: Open WhatsApp and go to Sent/Fallback UX
  const handleLaunchWhatsApp = () => {
    if (!whatsAppNumber) {
      alert("WhatsApp number is currently unavailable. Please contact our team directly.");
      return;
    }

    window.open(whatsAppUrl, "_blank", "noopener,noreferrer");
    setStep("sent");
  };

  // Copy message fallback
  const handleCopyMessage = () => {
    navigator.clipboard.writeText(generatedMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const isWhatsAppConfigured = Boolean(whatsAppNumber && normalizeWhatsAppNumber(whatsAppNumber).length >= 10);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-3 sm:p-4 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-title"
    >
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden my-8 animate-in fade-in zoom-in duration-150 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-5 sm:px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-sky-700 flex items-center justify-center text-white shrink-0">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-sky-400 tracking-wider block">
                Jess Enterprises B2B Quote
              </span>
              <h3 id="enquiry-modal-title" className="text-base sm:text-lg font-bold text-white line-clamp-1">
                {step === "form" && (effectiveProduct ? `Enquire: ${effectiveProduct.name}` : "Multiple Equipment Enquiry")}
                {step === "review" && "Review Your Quotation Request"}
                {step === "sent" && "Enquiry Ready for WhatsApp"}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-md transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {!isWhatsAppConfigured && (
            <div className="bg-amber-50 border border-amber-200 text-amber-900 text-xs rounded-lg p-3.5 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block mb-0.5">WhatsApp Enquiry Temporarily Unavailable</span>
                WhatsApp number is not configured in settings. You can still prepare your request and contact us directly at <span className="font-semibold">{companyPhone}</span> or <span className="font-semibold">{companyEmail}</span>.
              </div>
            </div>
          )}

          {/* ==================================== STEP 1: ENQUIRY FORM ==================================== */}
          {step === "form" && (
            <form onSubmit={handleProceedToReview} className="space-y-4">
              {/* Product Info Display (Single vs Bulk) */}
              {effectiveProduct ? (
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-sky-800 bg-sky-100 px-2 py-0.5 rounded">
                      Selected Product
                    </span>
                    <span className="text-xs text-slate-500 font-medium">Category: {effectiveProduct.categoryName}</span>
                  </div>
                  <div className="text-sm font-bold text-slate-900 leading-snug">
                    {effectiveProduct.name}
                  </div>
                  {effectiveProduct.legalMetrologyCert && (
                    <div className="text-[11px] text-amber-800 font-semibold flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 w-fit">
                      {effectiveProduct.legalMetrologyCert}
                    </div>
                  )}
                </div>
              ) : items.length > 0 ? (
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 space-y-2">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <ListPlus className="w-4 h-4 text-sky-700" />
                      Enquiry List ({items.length} {items.length === 1 ? "Product" : "Products"})
                    </span>
                    <button
                      type="button"
                      onClick={clearEnquiry}
                      className="text-[11px] text-red-600 hover:text-red-800 font-semibold"
                    >
                      Clear List
                    </button>
                  </div>
                  <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                    {items.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex items-center justify-between text-xs bg-white p-2 rounded border border-slate-200 gap-2"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-slate-900 truncate">{item.product.name}</div>
                          <div className="text-[10px] text-slate-500">{item.product.categoryName}</div>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-5 h-5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold"
                          >
                            -
                          </button>
                          <span className="font-mono text-xs font-bold w-4 text-center">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-5 h-5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold"
                          >
                            +
                          </button>
                          <button
                            type="button"
                            onClick={() => removeItem(item.product.id)}
                            className="text-slate-400 hover:text-red-600 ml-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-600">
                  General Equipment & Metrology Services Quotation Request
                </div>
              )}

              {/* Quantity Stepper (Only for single product) */}
              {effectiveProduct && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Quantity Required <span className="text-red-600">*</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleFormChange("quantity", Math.max(1, formData.quantity - 1))}
                      className="w-9 h-9 rounded-md border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 flex items-center justify-center font-bold transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      min={1}
                      max={999}
                      value={formData.quantity}
                      onChange={(e) => handleFormChange("quantity", parseInt(e.target.value) || 1)}
                      className="w-20 text-center text-sm font-bold border border-slate-300 rounded-md py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleFormChange("quantity", Math.min(999, formData.quantity + 1))}
                      className="w-9 h-9 rounded-md border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 flex items-center justify-center font-bold transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <span className="text-xs text-slate-500 font-medium ml-2">Units / Sets</span>
                  </div>
                  {errors.quantity && <p className="text-xs text-red-600 font-semibold mt-1">{errors.quantity}</p>}
                </div>
              )}

              {/* Customer Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Your Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.customerName}
                    onChange={(e) => handleFormChange("customerName", e.target.value)}
                    placeholder="e.g. Dr. Rajesh Sharma"
                    className={`w-full text-base sm:text-sm border ${
                      errors.customerName ? "border-red-500 bg-red-50/30" : "border-slate-300"
                    } rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none`}
                  />
                  {errors.customerName && (
                    <p className="text-xs text-red-600 font-semibold mt-1">{errors.customerName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Phone / WhatsApp Number <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.customerPhone}
                    onChange={(e) => handleFormChange("customerPhone", e.target.value)}
                    placeholder="e.g. 9822XXXXXX"
                    className={`w-full text-base sm:text-sm border ${
                      errors.customerPhone ? "border-red-500 bg-red-50/30" : "border-slate-300"
                    } rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none`}
                  />
                  {errors.customerPhone && (
                    <p className="text-xs text-red-600 font-semibold mt-1">{errors.customerPhone}</p>
                  )}
                </div>
              </div>

              {/* Company & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    value={formData.customerCompany}
                    onChange={(e) => handleFormChange("customerCompany", e.target.value)}
                    placeholder="e.g. Cipla / BITS Pilani (Optional)"
                    className="w-full text-base sm:text-sm border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.customerEmail}
                    onChange={(e) => handleFormChange("customerEmail", e.target.value)}
                    placeholder="name@company.com (Optional)"
                    className={`w-full text-base sm:text-sm border ${
                      errors.customerEmail ? "border-red-500 bg-red-50/30" : "border-slate-300"
                    } rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none`}
                  />
                  {errors.customerEmail && (
                    <p className="text-xs text-red-600 font-semibold mt-1">{errors.customerEmail}</p>
                  )}
                </div>
              </div>

              {/* Requirement Message */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Specific Requirements / Technical Notes
                </label>
                <textarea
                  rows={3}
                  value={formData.customerMessage}
                  onChange={(e) => handleFormChange("customerMessage", e.target.value)}
                  placeholder="Specify capacity tolerance, delivery location, custom fabrication requirements, or Legal Metrology AMC needs..."
                  className={`w-full text-base sm:text-sm border ${
                    errors.customerMessage ? "border-red-500 bg-red-50/30" : "border-slate-300"
                  } rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none`}
                />
                {errors.customerMessage && (
                  <p className="text-xs text-red-600 font-semibold mt-1">{errors.customerMessage}</p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <Button type="button" variant="ghost" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" className="font-bold">
                  Review Enquiry &rarr;
                </Button>
              </div>
            </form>
          )}

          {/* ==================================== STEP 2: REVIEW ENQUIRY ==================================== */}
          {step === "review" && (
            <div className="space-y-4">
              <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 space-y-3">
                <div className="text-xs font-extrabold uppercase tracking-wider text-sky-900 border-b border-sky-200 pb-2 flex items-center justify-between">
                  <span>Enquiry Summary</span>
                  <span className="text-[10px] bg-sky-200 text-sky-900 px-2 py-0.5 rounded font-bold">
                    Pre-WhatsApp Verification
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-800">
                  {effectiveProduct ? (
                    <div>
                      <span className="font-bold text-slate-500">Equipment: </span>
                      <span className="font-bold text-slate-900">{effectiveProduct.name}</span>
                      <span className="ml-2 text-slate-600">(Qty: {formData.quantity})</span>
                    </div>
                  ) : (
                    <div>
                      <span className="font-bold text-slate-500">Products ({items.length}): </span>
                      <ul className="list-disc pl-4 mt-1 space-y-0.5">
                        {items.map((i) => (
                          <li key={i.product.id} className="font-semibold text-slate-900">
                            {i.product.name} &times; {i.quantity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <span className="font-bold text-slate-500">Customer Name: </span>
                    <span className="font-semibold text-slate-900">{formData.customerName}</span>
                  </div>

                  <div>
                    <span className="font-bold text-slate-500">Phone Number: </span>
                    <span className="font-semibold text-slate-900">{formData.customerPhone}</span>
                  </div>

                  <div>
                    <span className="font-bold text-slate-500">Company: </span>
                    <span className="text-slate-800">{formData.customerCompany?.trim() || "N/A"}</span>
                  </div>

                  <div>
                    <span className="font-bold text-slate-500">Email: </span>
                    <span className="text-slate-800">{formData.customerEmail?.trim() || "N/A"}</span>
                  </div>

                  {formData.customerMessage && formData.customerMessage.trim() && (
                    <div className="pt-1 border-t border-sky-200/60">
                      <span className="font-bold text-slate-500 block mb-0.5">Notes / Requirement:</span>
                      <p className="text-slate-700 italic bg-white/80 p-2 rounded border border-sky-100">
                        {formData.customerMessage}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Pre-filled Message Preview */}
              <div>
                <span className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Generated Message Preview:
                </span>
                <pre className="bg-slate-900 text-slate-200 text-xs p-3 rounded-lg font-mono whitespace-pre-wrap max-h-40 overflow-y-auto border border-slate-800 leading-relaxed">
                  {generatedMessage}
                </pre>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-xs text-emerald-900 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p>
                  Clicking <strong>Continue to WhatsApp</strong> will open WhatsApp with your pre-formatted enquiry ready to send to Jess Enterprises sales team.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep("form")}
                  className="w-full sm:w-auto font-semibold"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Edit Details
                </Button>

                <Button
                  type="button"
                  variant="whatsapp"
                  onClick={handleLaunchWhatsApp}
                  disabled={!isWhatsAppConfigured}
                  className="w-full sm:w-auto font-bold"
                >
                  <Send className="w-4 h-4" /> Continue to WhatsApp
                </Button>
              </div>
            </div>
          )}

          {/* ==================================== STEP 3: SENT / FALLBACK UX ==================================== */}
          {step === "sent" && (
            <div className="space-y-4 text-center py-2">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div>
                <h4 className="text-lg font-bold text-slate-900">WhatsApp Window Launched</h4>
                <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto leading-relaxed">
                  Please review and click <strong>Send</strong> inside your WhatsApp application to submit your quotation request directly to our team.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-left space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700 uppercase tracking-wider">
                    WhatsApp Message Text
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyMessage}
                    className="inline-flex items-center gap-1 text-xs text-sky-700 hover:text-sky-900 font-semibold"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copy Message
                      </>
                    )}
                  </button>
                </div>
                <pre className="bg-white text-slate-800 text-[11px] p-2.5 rounded border border-slate-200 font-mono whitespace-pre-wrap max-h-32 overflow-y-auto leading-relaxed">
                  {generatedMessage}
                </pre>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Button
                  type="button"
                  variant="whatsapp"
                  onClick={handleLaunchWhatsApp}
                  className="w-full sm:w-auto text-xs font-bold"
                >
                  <Send className="w-3.5 h-3.5" /> Try Opening WhatsApp Again
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  onClick={onClose}
                  className="w-full sm:w-auto text-xs font-bold"
                >
                  Done / Close
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
