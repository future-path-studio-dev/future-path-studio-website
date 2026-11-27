"use server";

import { getResource } from "@/features/resources/resources";
import { getResourceEnquiryStore } from "@/features/resources/enquiryStore";

export type ResourceEnquiryResult =
  | { status: "idle" }
  | { status: "success"; resourceTitle: string }
  | { status: "unavailable" }
  | { status: "error" };

export async function requestResourceEnquiry(
  _previous: ResourceEnquiryResult,
  formData: FormData,
): Promise<ResourceEnquiryResult> {
  const resource = getResource(String(formData.get("resourceSlug") ?? ""));
  if (!resource) return { status: "error" };

  const store = getResourceEnquiryStore();
  if (!store) return { status: "unavailable" };

  try {
    await store.save({
      resourceSlug: resource.slug,
      resourceTitle: resource.title,
      createdAt: new Date().toISOString(),
    });
  } catch {
    return { status: "error" };
  }
  return { status: "success", resourceTitle: resource.title };
}
