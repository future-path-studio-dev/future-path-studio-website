import type { EnquiryErrors, EnquiryValues } from "./validation";

export type EnquiryResult =
  | { status: "idle" }
  | { status: "invalid"; errors: EnquiryErrors; values: EnquiryValues }
  | { status: "unavailable"; values: EnquiryValues }
  | { status: "error"; values: EnquiryValues }
  | { status: "success" };

export const initialEnquiryResult: EnquiryResult = { status: "idle" };
