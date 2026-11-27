// Content source: Figma file lagZ6ViqHTzVpszZMTW9u4, "FAQ - Desktop 1440" 277:124
// and "FAQ – Mobile 390" 411:805. Questions are from the six FAQ items
// (398:620, 398:634, 398:648, 398:662, 398:676, 670:3254).
//
// Figma shows every item closed. The only answer text in Figma is the example in
// the open variant of the "FAQ Accordion" component (398:615), used for the
// first question. The other five answers are DRAFT copy pending client approval;
// the UI labels every answer with `approved: false`. Set `approved: true` once
// the client signs an answer off.

export type Faq = {
  question: string;
  answer: string;
  approved: boolean;
};

export const faqs: readonly Faq[] = [
  {
    question: "What services does The Future Path Studio provide?",
    // Figma 398:615 (open state of the FAQ Accordion component).
    answer:
      "The Future Path Studio provides RTO compliance consulting, LLND support resources, TAS development, validation and moderation, business advisory, and professional development for trainers, assessors and compliance staff.",
    approved: true,
  },
  {
    question: "Who does The Future Path Studio work with?",
    answer:
      "We work with RTOs and training organisations of all sizes, including new and emerging providers, established RTOs, training managers, compliance officers, trainers and assessors.",
    approved: false,
  },
  {
    question: "Can you support new and emerging RTOs?",
    answer:
      "Yes. We help new and emerging providers build compliant systems, documentation and delivery practices from the start.",
    approved: false,
  },
  {
    question: "Do you provide TAS development and assessment review support?",
    answer:
      "Yes. We develop contextualised Training and Assessment Strategies and review assessment tools for consistency, evidence quality and mapping gaps.",
    approved: false,
  },
  {
    question: "What LLND support is available?",
    answer:
      "We develop accessible, learner-friendly resources that support diverse language, literacy, numeracy and digital needs.",
    approved: false,
  },
  {
    question: "Can you provide ongoing compliance and capability support?",
    answer:
      "Yes. Support can be arranged as a single project or as ongoing compliance and capability support, depending on your organisation's needs.",
    approved: false,
  },
];

// Figma 277:134.
export const faqBenefits = [
  "RTO compliance support",
  "Training and assessment systems",
  "LLND and learner resources",
  "Staff capability and advisory",
] as const;
