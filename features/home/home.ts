// Content source: Figma file lagZ6ViqHTzVpszZMTW9u4, "Homepage – Desktop 1440" 2:8.
// The Hero (83:2) and Benefit Strip (2:11) were assigned to W1.2 (issue #5) and
// are implemented here with the project lead's authorisation.

import { getService, type Service } from "@/features/services/services";

// Figma 2:11.
export const homeBenefits = [
  "Practical Guidance",
  "Contextualised Solutions",
  "Learner-Centred Approach",
  "Continuous Improvement",
] as const;

// Figma 4:38. The homepage uses its own card order and, for two services, a
// slightly different summary from the Services overview, so both are kept here.
const homeServiceCards = [
  {
    slug: "rto-compliance-consulting",
    summary:
      "Plain-English compliance support, from audit preparation and internal audits through to rectification and continuous improvement.",
  },
  {
    slug: "llnd-support-resources",
    summary:
      "Accessible, learner-friendly materials supporting diverse language, literacy, numeracy and digital needs.",
  },
  {
    slug: "tas-development",
    summary:
      "Contextualised TAS development covering delivery structure, assessment sequencing and resource mapping.",
  },
  {
    slug: "validation-moderation-reviews",
    summary:
      "Validation, moderation and assessment tool review that strengthens consistency and evidence quality.",
  },
  {
    slug: "business-advisory",
    summary:
      "Strategic planning, risk management and operational improvement for training organisations.",
  },
  {
    slug: "professional-development",
    summary:
      "Practical capability support for trainers, assessors and compliance staff through coaching and workshops.",
  },
] as const;

export const homeServices = homeServiceCards.map(({ slug, summary }) => {
  const service = getService(slug);
  if (!service) throw new Error(`Unknown homepage service: ${slug}`);
  return { ...service, summary } satisfies Service;
});

// Figma 4:59.
export const homeAboutPoints = [
  "Practical, plain-English guidance",
  "Contextualised solutions",
  "Learner-centred resources",
  "Continuous improvement support",
] as const;

// Figma 4:63.
export const homeSteps = [
  "Tell us what support you need",
  "Review your systems and requirements",
  "Develop practical solutions",
  "Implement and improve",
] as const;

// Figma 4:77 contains placeholders only. Replace these with client-supplied,
// client-approved testimonials and set `approved: true` on each one.
export const homeTestimonials = [
  {
    quote: "“Client testimonial placeholder — to be supplied and approved by the client.”",
    client: "Client testimonial placeholder",
    approved: false,
  },
  {
    quote: "“Client testimonial placeholder — to be supplied and approved by the client.”",
    client: "Client testimonial placeholder",
    approved: false,
  },
  {
    quote: "“Client testimonial placeholder — to be supplied and approved by the client.”",
    client: "Client testimonial placeholder",
    approved: false,
  },
] as const;
