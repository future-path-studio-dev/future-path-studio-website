// Content source: Figma file lagZ6ViqHTzVpszZMTW9u4, section "Resources" 491:2020.
// Overview 500:2023, category views 675:3202 / 675:3290 / 675:3390 / 675:3490,
// search 675:3715, no results 675:3813, details 509:2595 and 511:2625, mobile 524:2993.
//
// Figma scope note 527:3808: no prices, page counts, file sizes, download counts
// or availability claims. Scope is tailored, with an enquiry as the next step.

export const resourceCategories = [
  { slug: "compliance", label: "Compliance", emptyHint: null },
  { slug: "llnd", label: "LLND", emptyHint: null },
  { slug: "tas-assessment", label: "TAS & Assessment", emptyHint: null },
  {
    slug: "validation-moderation",
    label: "Validation & Moderation",
    // Figma 675:3887.
    emptyHint: "Contact us to discuss validation and moderation support for your organisation.",
  },
  { slug: "staff-capability", label: "Staff Capability", emptyHint: null },
] as const;

export type ResourceCategory = (typeof resourceCategories)[number];
export type ResourceCategorySlug = ResourceCategory["slug"];

// Figma "Type Chip" 494:2036: Toolkit, Template, Pack, Program, Resources.
export const resourceTypes = {
  toolkit: { label: "TOOLKIT", className: "border-[#c3d3e1] bg-[#e7edf3] text-brand-primary" },
  template: { label: "TEMPLATE", className: "border-[#c7d8fb] bg-[#eaf0fe] text-info" },
  pack: { label: "PACK", className: "border-[#c4e0c6] bg-[#e9f3ea] text-success" },
  program: { label: "PROGRAM", className: "border-[#efdcb4] bg-[#fbf2e3] text-warning" },
  resources: { label: "RESOURCES", className: "border-border bg-alternate text-muted" },
} as const;

export type ResourceType = keyof typeof resourceTypes;

export type ResourceSection =
  | { heading: string; bullets: readonly string[] }
  | { heading: string; body: string };

export type Resource = {
  slug: string;
  title: string;
  type: ResourceType;
  /** Card meta text, Figma "Length" override (for example "Learner materials"). */
  meta: string;
  category: ResourceCategorySlug;
  summary: string;
  featured: boolean;
  /** Detail content from a designed Figma detail frame, or null when Figma has none. */
  sections: readonly ResourceSection[] | null;
  /** Whether the designed detail frame includes the "Resource Preview" image slot. */
  previewSlot: boolean;
};

// Shared by both designed detail frames (676:3137, 676:3146).
export const howToAccess: ResourceSection = {
  heading: "How to access it",
  body: "Scope is tailored to each organisation. Send an enquiry and we will confirm what is included and how it would work for you.",
};

export const resources: readonly Resource[] = [
  {
    slug: "compliance-starter-kits-for-new-rtos",
    title: "Compliance Starter Kits for New RTOs",
    type: "toolkit",
    meta: "For new RTOs",
    category: "compliance",
    summary:
      "A practical starter kit covering the core systems, documents and processes a new or emerging RTO needs to put in place.",
    featured: true,
    // Figma 509:2595.
    sections: [
      {
        heading: "What the kit covers",
        bullets: [
          "Core compliance documents and templates",
          "Internal audit and continuous improvement basics",
          "Preparing and organising evidence for audit",
          "Where to seek further support",
        ],
      },
      {
        heading: "Who it is for",
        body: "New and emerging RTOs setting up their systems, and established providers rebuilding their compliance documentation.",
      },
      howToAccess,
    ],
    previewSlot: false,
  },
  {
    slug: "llnd-support-resources",
    title: "LLND Support Resources",
    type: "resources",
    meta: "Learner materials",
    category: "llnd",
    summary:
      "Accessible, learner-friendly materials supporting diverse language, literacy, numeracy and digital needs.",
    featured: false,
    sections: null,
    previewSlot: false,
  },
  {
    slug: "llnd-digital-companion-packs",
    title: "LLND Digital Companion Packs",
    type: "pack",
    meta: "Digital tools",
    category: "llnd",
    summary:
      "Digital companion tools that sit alongside your LLND materials to support learners with varied needs.",
    featured: false,
    sections: null,
    previewSlot: false,
  },
  {
    slug: "tas-templates",
    title: "TAS Templates",
    type: "template",
    meta: "Contextualisable",
    category: "tas-assessment",
    summary:
      "Training and Assessment Strategy templates you can contextualise to your qualifications and delivery.",
    featured: false,
    sections: null,
    previewSlot: false,
  },
  {
    slug: "tas-assessment-bundle-packages",
    title: "TAS + Assessment Bundle Packages",
    type: "toolkit",
    meta: "TAS + assessment",
    category: "tas-assessment",
    summary:
      "TAS templates bundled with matching assessment materials for a consistent, mapped delivery package.",
    featured: false,
    sections: null,
    previewSlot: false,
  },
  {
    slug: "tae-tutor-support-program",
    title: "TAE Tutor Support Program",
    type: "program",
    meta: "For TAE learners",
    category: "staff-capability",
    summary: "Structured tutor support for trainers and assessors working through the TAE.",
    featured: false,
    // Figma 511:2625.
    sections: [
      {
        heading: "What the program covers",
        bullets: [
          "Guided support through TAE units",
          "Assessment practice and validation",
          "Compliance responsibilities for trainers and assessors",
          "Building confidence in learner support",
        ],
      },
      {
        heading: "Who it is for",
        body: "Trainers and assessors new to the TAE, and RTOs supporting staff through their qualification.",
      },
      howToAccess,
    ],
    previewSlot: true,
  },
  {
    slug: "trainer-capability-resources",
    title: "Trainer Capability Resources",
    type: "resources",
    meta: "For trainers",
    category: "staff-capability",
    summary:
      "Professional development resources supporting assessment practice, validation and compliance responsibilities.",
    featured: false,
    sections: null,
    previewSlot: false,
  },
];

export const featuredResource = resources.find((resource) => resource.featured)!;

export function getResource(slug: string) {
  return resources.find((resource) => resource.slug === slug);
}

export function getResourceCategory(slug: string | null | undefined) {
  return resourceCategories.find((category) => category.slug === slug);
}

/**
 * Figma behaviour: "All" lists the six non-featured resources (500:2083 "6 resources"),
 * while a category view includes every resource in that category, so Compliance shows
 * the featured starter kit (675:3243 "1 resource in Compliance"). Search matches the
 * title, summary and category label, case-insensitively (675:3756).
 */
export function filterResources(categorySlug: string | null, query: string) {
  const category = getResourceCategory(categorySlug);
  const base = category
    ? resources.filter((resource) => resource.category === category.slug)
    : resources.filter((resource) => !resource.featured);
  const needle = query.trim().toLowerCase();
  if (!needle) return base;
  return base.filter((resource) =>
    [resource.title, resource.summary, getResourceCategory(resource.category)?.label ?? ""]
      .join(" ")
      .toLowerCase()
      .includes(needle),
  );
}

export function resultsLabel(count: number, categorySlug: string | null, query: string) {
  const noun = count === 1 ? "resource" : "resources";
  const category = getResourceCategory(categorySlug);
  const trimmed = query.trim();
  if (trimmed && category) return `${count} ${noun} matching "${trimmed}" in ${category.label}`;
  if (trimmed) return `${count} ${noun} matching "${trimmed}"`;
  if (category) return `${count} ${noun} in ${category.label}`;
  return `${count} ${noun}`;
}
