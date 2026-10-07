export interface EnquiryFormData {
  customerName: string;
  customerPhone: string;
  quantity: number;
  customerCompany?: string;
  customerEmail?: string;
  customerMessage?: string;
}

export interface FormErrors {
  customerName?: string;
  customerPhone?: string;
  quantity?: string;
  customerCompany?: string;
  customerEmail?: string;
  customerMessage?: string;
}

export function validateEnquiryForm(data: EnquiryFormData): FormErrors {
  const errors: FormErrors = {};

  // Customer Name
  if (!data.customerName || !data.customerName.trim()) {
    errors.customerName = "Please enter your full name";
  } else if (data.customerName.trim().length < 2) {
    errors.customerName = "Name must be at least 2 characters";
  }

  // Customer Phone
  if (!data.customerPhone || !data.customerPhone.trim()) {
    errors.customerPhone = "Please enter a valid phone number";
  } else {
    const digitsOnly = data.customerPhone.replace(/[^\d]/g, "");
    if (digitsOnly.length < 7 || digitsOnly.length > 15) {
      errors.customerPhone = "Phone number must be between 7 and 15 digits";
    }
  }

  // Quantity
  if (!data.quantity || data.quantity < 1 || !Number.isInteger(data.quantity)) {
    errors.quantity = "Quantity must be at least 1";
  } else if (data.quantity > 999) {
    errors.quantity = "Quantity cannot exceed 999";
  }

  // Email (Optional)
  if (data.customerEmail && data.customerEmail.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.customerEmail.trim())) {
      errors.customerEmail = "Please enter a valid email address (e.g. name@company.com)";
    }
  }

  // Requirement Message (Optional)
  if (data.customerMessage && data.customerMessage.length > 1000) {
    errors.customerMessage = "Requirement message cannot exceed 1000 characters";
  }

  return errors;
}
