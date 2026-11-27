"use server";

import { getEnquiryStore } from "./store";
import type { EnquiryResult } from "./types";
import { readEnquiry, trimEnquiry, validateEnquiry } from "./validation";

// Server Action behind the Contact form. It re-validates every field (the
// browser checks are only for convenience) and only reports success after the
// enquiry store has actually saved the message.
export async function submitEnquiry(
  _previous: EnquiryResult,
  formData: FormData,
): Promise<EnquiryResult> {
  const values = readEnquiry(formData);
  const errors = validateEnquiry(values);
  if (Object.keys(errors).length > 0) {
    return { status: "invalid", errors, values };
  }

  const store = getEnquiryStore();
  if (!store) {
    return { status: "unavailable", values };
  }

  try {
    await store.save({ ...trimEnquiry(values), source: "contact-page" });
  } catch (error) {
    console.error("Failed to save contact enquiry", error);
    return { status: "error", values };
  }

  return { status: "success" };
}
