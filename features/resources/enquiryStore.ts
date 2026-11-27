// Integration boundary for resource enquiries (Figma 677:3129 → 677:3203).
//
// No backend exists yet (Supabase is issue #6), so getResourceEnquiryStore()
// returns null and requestResourceEnquiry reports "unavailable". The UI then
// shows an honest "not sent" message instead of the Figma "Enquiry Sent" state.
// When the backend is ready, return a real store here. Nothing else needs to change.

export type ResourceEnquiryRecord = {
  resourceSlug: string;
  resourceTitle: string;
  createdAt: string;
};

export interface ResourceEnquiryStore {
  save(record: ResourceEnquiryRecord): Promise<void>;
}

export function getResourceEnquiryStore(): ResourceEnquiryStore | null {
  return null;
}
