import "server-only";
import type { EnquiryValues } from "./validation";

// Integration boundary for saving Contact enquiries.
//
// No backend is connected yet: the Supabase foundation (issue #6, W1.3) has not
// been delivered, so getEnquiryStore() returns null and submitEnquiry reports
// "unavailable" instead of pretending the message was sent.
//
// To connect a backend, implement EnquiryStore (for example a Supabase insert
// into public.enquiries) and return it from getEnquiryStore() when its
// configuration is present. See docs/CONTACT_IMPLEMENTATION.md.

export type EnquiryRecord = EnquiryValues & {
  source: "contact-page";
};

export interface EnquiryStore {
  /** Persist the enquiry. Throw if it could not be saved. */
  save(enquiry: EnquiryRecord): Promise<void>;
}

export function getEnquiryStore(): EnquiryStore | null {
  return null;
}
