// Content source: Figma file lagZ6ViqHTzVpszZMTW9u4
// Services Overview 471:955, category views 667:3302 / 667:3416 / 667:3530,
// service details 475:1050, 475:1368, 475:1262, 475:1156, 475:1474, 475:1580.

export const serviceCategories = [
  { slug: "compliance-quality", label: "Compliance & Quality" },
  { slug: "training-systems-resources", label: "Training Systems & Resources" },
  { slug: "capability-advisory", label: "Capability & Advisory" },
] as const;

export type ServiceCategory = (typeof serviceCategories)[number];
export type ServiceCategorySlug = ServiceCategory["slug"];

export type Service = {
  slug: string;
  name: string;
  icon: string;
  category: ServiceCategorySlug;
  summary: string;
  introduction: string;
  audience: string;
  inclusions: readonly string[];
  benefits: readonly string[];
  outcome: string;
};

export const services = [
  {
    slug: "rto-compliance-consulting",
    name: "RTO Compliance Consulting",
    icon: "📋",
    category: "compliance-quality",
    summary:
      "Plain-English compliance support covering audit preparation, internal audits, rectification and continuous improvement.",
    introduction:
      "Practical, plain-English compliance support for RTOs seeking clarity and confidence. We work alongside your team to make the standards easier to interpret and easier to meet day to day.",
    audience:
      "RTOs preparing for audit, new and emerging providers building their systems, and training managers or compliance officers who want a clearer view of where they stand.",
    inclusions: [
      "Audit preparation",
      "Internal audits",
      "Rectification support",
      "Continuous improvement systems",
    ],
    benefits: [
      "Clearer interpretation of the standards",
      "Structured, ASQA-aligned guidance",
      "Compliance systems your team can maintain",
    ],
    outcome:
      "A clearer picture of your current compliance position, with a practical set of actions your team can work through.",
  },
  {
    slug: "validation-moderation-reviews",
    name: "Validation, Moderation, Reviews & Mapping Gaps",
    icon: "🔍",
    category: "compliance-quality",
    summary:
      "Validation, moderation and assessment tool review that strengthens consistency and evidence quality.",
    introduction:
      "Quality assurance support for your training products and assessment systems, from scheduled validation through to targeted reviews of individual tools.",
    audience:
      "RTOs running a validation schedule, and teams that need an independent view of assessment quality and mapping coverage.",
    inclusions: [
      "Validation and moderation",
      "Assessment tool review",
      "Learner resource review",
      "Identification of mapping gaps",
    ],
    benefits: [
      "Stronger consistency across assessors",
      "Better evidence quality",
      "Mapping gaps identified early",
    ],
    outcome:
      "A documented review setting out identified gaps and practical recommendations you can act on.",
  },
  {
    slug: "tas-development",
    name: "Training & Assessment Strategy (TAS) Development",
    icon: "🗂️",
    category: "training-systems-resources",
    summary:
      "Contextualised TAS development covering delivery structure, assessment sequencing and resource mapping.",
    introduction:
      "Contextualised TAS development that supports compliant and practical training delivery, built around how your organisation actually delivers.",
    audience:
      "RTOs adding or updating qualifications, and training managers who need a TAS that reflects real delivery rather than a template.",
    inclusions: [
      "Delivery structure",
      "Assessment sequencing",
      "Industry consultation",
      "Trainer requirements and resource mapping",
    ],
    benefits: [
      "A TAS that reflects actual delivery",
      "Clear alignment to training package requirements",
      "Easier conversations at audit",
    ],
    outcome:
      "A contextualised Training and Assessment Strategy aligned with training package requirements and the RTO standards.",
  },
  {
    slug: "llnd-support-resources",
    name: "LLND Support Resources",
    icon: "📚",
    category: "training-systems-resources",
    summary:
      "Accessible, learner-friendly materials supporting diverse language, literacy, numeracy and digital needs.",
    introduction:
      "Accessible, inclusive and learner-friendly materials designed to support diverse language, literacy, numeracy and digital needs across your training programs.",
    audience:
      "RTOs and training organisations supporting learners with varied language, literacy, numeracy and digital skill levels.",
    inclusions: [
      "Learner workbooks",
      "Digital companion tools",
      "Contextualised LLND support materials",
      "Accessibility-focused resources",
    ],
    benefits: [
      "Materials matched to your learner cohort",
      "Clearer, more accessible language",
      "Stronger support for diverse learners",
    ],
    outcome:
      "A set of LLND materials contextualised to your learners and the way you deliver.",
  },
  {
    slug: "business-advisory",
    name: "Business Advisory for Training Organisations",
    icon: "📈",
    category: "capability-advisory",
    summary:
      "Strategic planning, risk management and operational improvement for training organisations.",
    introduction:
      "Strategic support for RTOs seeking to grow, improve or stabilise their operations, grounded in how training organisations actually run.",
    audience:
      "RTO owners and managers planning growth, restructuring delivery or working through operational pressure.",
    inclusions: [
      "Strategic planning",
      "Risk management",
      "Operational and delivery model review",
      "Staffing and compliance strategy",
    ],
    benefits: [
      "Clearer priorities and sequencing",
      "Risks identified and planned for",
      "Decisions grounded in your context",
    ],
    outcome:
      "A practical plan covering your organisation's priorities, risks and next steps.",
  },
  {
    slug: "professional-development",
    name: "Professional Development & Staff Capability",
    icon: "🎓",
    category: "capability-advisory",
    summary:
      "Capability support for trainers, assessors and compliance staff through coaching and workshops.",
    introduction:
      "Practical professional development and capability support for trainers, assessors and compliance staff, delivered through coaching and workshops.",
    audience:
      "Trainers and assessors new to the TAE, and teams building confidence in assessment practice, validation and compliance responsibilities.",
    inclusions: [
      "Assessment practice",
      "Validation and moderation practice",
      "Compliance responsibilities",
      "Learner support and quality assurance",
    ],
    benefits: [
      "More confident assessors",
      "Shared understanding across the team",
      "Capability that stays in the organisation",
    ],
    outcome:
      "A team with clearer, more consistent assessment and compliance practice.",
  },
] as const satisfies readonly Service[];

export const serviceDetailHighlights = [
  "Scope tailored to your organisation",
  "Practical, plain-English support",
  "Contact us to discuss your requirements",
] as const;

export const howItWorksSteps = [
  {
    title: "Tell us what support you need",
    description:
      "Tell us about your organisation, your systems and the outcome you are working towards.",
  },
  {
    title: "Review your systems and requirements",
    description:
      "We review your current documents, systems and requirements to see where the gaps are.",
  },
  {
    title: "Develop practical solutions",
    description:
      "We develop contextualised solutions and resources that suit how your organisation delivers.",
  },
  {
    title: "Implement and improve",
    description:
      "We support implementation and ongoing improvement so the changes hold over time.",
  },
] as const;

// Questions are from Figma 471:1063. Figma only shows the closed state for
// these items, so the answers below are DRAFT copy pending client approval.
// Set `approved: true` per answer once the client signs it off; the UI shows a
// "Draft answer" label for every unapproved answer.
export const servicesFaqs = [
  {
    question: "Which service is right for my organisation?",
    answer:
      "It depends on where your organisation is and what you need to achieve. Contact us with a short overview and we will recommend the most suitable support.",
    approved: false,
  },
  {
    question: "Do you work with new and emerging RTOs?",
    answer:
      "Yes. We support new and emerging providers as they build compliant systems, documentation and delivery practices.",
    approved: false,
  },
  {
    question: "Can you support TAS development and assessment review?",
    answer:
      "Yes. We develop contextualised Training and Assessment Strategies and review assessment tools for consistency, evidence quality and mapping gaps.",
    approved: false,
  },
  {
    question: "Can we engage you for ongoing support?",
    answer:
      "Yes. Support can be arranged as a single project or as ongoing compliance and capability support, depending on your needs.",
    approved: false,
  },
  {
    question: "Is our organisation's information kept confidential?",
    answer:
      "Yes. Information you share with us is used only to provide the support you have requested and is handled confidentially.",
    approved: false,
  },
] as const;

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getCategory(slug: string) {
  return serviceCategories.find((category) => category.slug === slug);
}
