// Content source: Figma file lagZ6ViqHTzVpszZMTW9u4, "About Us – Desktop 1440" 456:881.
// The mobile frame 462:931 is an earlier wireframe with outdated copy, so all
// copy comes from the desktop frame.

import { services } from "@/features/services/services";

// Figma 456:907.
export const aboutBenefits = [
  "Practical Guidance",
  "Contextualised Solutions",
  "Learner-Centred Approach",
  "Continuous Improvement",
] as const;

// Figma 456:926, 456:929, 456:932.
export const whoWeArePoints = [
  "Practical, plain-English guidance",
  "Contextualised solutions",
  "Continuous improvement support",
] as const;

// Figma 669:3285.
export const supportedGroups = [
  "Small to Medium RTOs",
  "New and Emerging RTOs",
  "Established RTOs",
  "Training Managers and Compliance Officers",
  "Trainers and Assessors New to the TAE",
  "Beauty, Personal Services and Creative Industries RTOs",
  "Businesses Delivering Accredited or Non-Accredited Training",
] as const;

// Figma 669:3272. The six cards use the same names, icons, summaries and order
// as the Services overview, so they come from the shared services data.
export const aboutServices = services;

// Figma 458:896 uses the "Process Step" component (454:908, Closed/Open).
// Only the Open variant's default (step 01) contains detail text. The detail
// for steps 02–04 is not in Figma, so it is `null` and the UI shows a
// "pending client approval" note instead of invented copy.
export const supportSteps: readonly { title: string; detail: string | null }[] = [
  {
    title: "Understand your requirements",
    detail: "We start by understanding your background, goals and constraints.",
  },
  { title: "Review systems and resources", detail: null },
  { title: "Develop practical solutions", detail: null },
  { title: "Support implementation and improvement", detail: null },
];

// Figma 458:948.
export const whyChooseCards = [
  {
    title: "Practical Guidance",
    body: "Plain-English support designed to make complex requirements easier to understand.",
  },
  {
    title: "Contextualised Solutions",
    body: "Support and resources developed around the training organisation's environment and needs.",
  },
  {
    title: "Learner-Centred Approach",
    body: "Training and support systems designed with quality, accessibility and learner outcomes in mind.",
  },
  {
    title: "Continuous Improvement",
    body: "Practical support that helps organisations strengthen systems and capability over time.",
  },
] as const;
