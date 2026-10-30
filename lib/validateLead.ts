// Lead field rules shared by the forms (instant, per-field messages) and /api/lead (the final check).
// Kept free of server-only imports so client components can use it.

export const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE = /^\+?[\d\s().-]{7,20}$/;

export type LeadField = "name" | "email" | "phone" | "company" | "message";
export type FieldErrors = Partial<Record<LeadField, string>>;

const MISSING: Record<LeadField, string> = {
  name: "Please enter your name.",
  email: "Please enter your work email.",
  phone: "Please enter a phone number.",
  company: "Please enter your company name.",
  message: "Please tell us briefly about the project.",
};

// Returns a message per invalid field; an empty object means the form can be sent.
export function validateLead(values: Partial<Record<LeadField, string>>, required: LeadField[]): FieldErrors {
  const errors: FieldErrors = {};
  for (const field of required) {
    if (!values[field]?.trim()) errors[field] = MISSING[field];
  }
  const email = values.email?.trim();
  if (email && !EMAIL.test(email)) errors.email = "Please enter a valid email address, like you@company.com.";
  const phone = values.phone?.trim();
  if (phone && !PHONE.test(phone)) errors.phone = "Please enter a phone number of 7 to 20 digits, with an optional +.";
  return errors;
}
