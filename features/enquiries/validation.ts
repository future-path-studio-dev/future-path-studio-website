// Shared validation for the Contact enquiry form. Used by the browser (instant
// feedback) and by the submitEnquiry Server Action (authoritative check), so
// both sides apply exactly the same rules.
//
// Error copy for empty and invalid fields comes from Figma frame 405:652
// ("Contact Us – Validation Errors"). The length messages are not in Figma.

export const enquiryFields = ["firstName", "lastName", "email", "subject", "message"] as const;

export type EnquiryField = (typeof enquiryFields)[number];
export type EnquiryValues = Record<EnquiryField, string>;
export type EnquiryErrors = Partial<Record<EnquiryField, string>>;

export const enquiryMaxLength: Record<EnquiryField, number> = {
  firstName: 100,
  lastName: 100,
  email: 254,
  subject: 150,
  message: 5000,
};

export const emptyEnquiry: EnquiryValues = {
  firstName: "",
  lastName: "",
  email: "",
  subject: "",
  message: "",
};

const requiredMessage: Record<EnquiryField, string> = {
  firstName: "First name is required.",
  lastName: "Last name is required.",
  email: "Please enter a valid email address.",
  subject: "Subject is required.",
  message: "Please enter your message.",
};

const tooLongMessage: Record<EnquiryField, string> = {
  firstName: `First name must be ${enquiryMaxLength.firstName} characters or fewer.`,
  lastName: `Last name must be ${enquiryMaxLength.lastName} characters or fewer.`,
  email: "Please enter a valid email address.",
  subject: `Subject must be ${enquiryMaxLength.subject} characters or fewer.`,
  message: `Message must be ${enquiryMaxLength.message} characters or fewer.`,
};

// Deliberately simple: one "@", a dot in the domain, no spaces.
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEnquiryField(field: EnquiryField, rawValue: string): string | undefined {
  const value = rawValue.trim();
  if (!value) return requiredMessage[field];
  if (value.length > enquiryMaxLength[field]) return tooLongMessage[field];
  if (field === "email" && !emailPattern.test(value)) return requiredMessage.email;
  return undefined;
}

export function validateEnquiry(values: EnquiryValues): EnquiryErrors {
  const errors: EnquiryErrors = {};
  for (const field of enquiryFields) {
    const error = validateEnquiryField(field, values[field]);
    if (error) errors[field] = error;
  }
  return errors;
}

export function readEnquiry(formData: FormData): EnquiryValues {
  const values = { ...emptyEnquiry };
  for (const field of enquiryFields) {
    const value = formData.get(field);
    values[field] = typeof value === "string" ? value : "";
  }
  return values;
}

export function trimEnquiry(values: EnquiryValues): EnquiryValues {
  const trimmed = { ...values };
  for (const field of enquiryFields) trimmed[field] = values[field].trim();
  return trimmed;
}
