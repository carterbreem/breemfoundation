/**
 * Breem Foundation — Dummy content for Phase 2.
 * Replace with database-driven content in later phases.
 */

export interface Stat {
  label: string;
  value: string;
  suffix?: string;
  description: string;
}

export const stats: Stat[] = [
  {
    label: "Families Helped",
    value: "12,400",
    suffix: "+",
    description: "Across 38 countries since 2019"
  },
  {
    label: "Donations Received",
    value: "$4.2",
    suffix: "M",
    description: "Stewarded with 100% transparency"
  },
  {
    label: "Active Volunteers",
    value: "860",
    suffix: "+",
    description: "Giving time and skills every month"
  },
  {
    label: "Avg. Response Time",
    value: "72",
    suffix: "hrs",
    description: "From application to first reply"
  }
];

export interface Step {
  number: number;
  title: string;
  description: string;
  icon: "apply" | "review" | "approve" | "receive";
}

export const howItWorks: Step[] = [
  {
    number: 1,
    title: "Apply",
    description:
      "Complete a short, secure application. Tell us your situation — no jargon, no judgment.",
    icon: "apply"
  },
  {
    number: 2,
    title: "We Review",
    description:
      "Our team carefully reviews every application within 72 hours, with dignity and confidentiality.",
    icon: "review"
  },
  {
    number: 3,
    title: "Decision",
    description:
      "You receive a clear decision and, if approved, the support you need — fast.",
    icon: "approve"
  },
  {
    number: 4,
    title: "Receive Help",
    description:
      "Funds or resources are delivered directly. No middlemen. No hidden fees. Ever.",
    icon: "receive"
  }
];

export interface Story {
  id: string;
  slug: string;
  personName: string;
  location: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  category: "Housing" | "Medical" | "Education" | "Emergency" | "Food" | "Financial";
  amountAwarded?: string;
  featured?: boolean;
}

export const stories: Story[] = [
  {
    id: "1",
    slug: "amara-rent-relief",
    personName: "Amara O.",
    location: "Houston, TX",
    title: "Rent relief after a sudden job loss",
    excerpt:
      "When Amara lost her job two weeks before rent was due, she applied for help on a Friday. By Monday, our team approved emergency housing support. She kept her home and her children stayed in their school.",
    imageUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80&auto=format&fit=crop",
    category: "Housing",
    amountAwarded: "$2,400",
    featured: true
  },
  {
    id: "2",
    slug: "daniel-medical-fund",
    personName: "Daniel M.",
    location: "Lagos, Nigeria",
    title: "Emergency surgery for a father of three",
    excerpt:
      "Daniel's youngest son needed urgent surgery his family couldn't afford. Breem Foundation covered the hospital deposit within 48 hours. Today, his son is healthy and back in school.",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80&auto=format&fit=crop",
    category: "Medical",
    amountAwarded: "$3,800",
    featured: true
  },
  {
    id: "3",
    slug: "grace-education-grant",
    personName: "Grace A.",
    location: "Atlanta, GA",
    title: "A second chance at nursing school",
    excerpt:
      "After caring for her ill mother for two years, Grace nearly dropped out of nursing school. A Breem education grant covered her final semester's tuition. She graduated last spring.",
    imageUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80&auto=format&fit=crop",
    category: "Education",
    amountAwarded: "$5,200",
    featured: true
  },
  {
    id: "4",
    slug: "maria-grocery-support",
    personName: "María R.",
    location: "Phoenix, AZ",
    title: "Groceries for a mother of four",
    excerpt:
      "After escaping an unsafe home, María had nothing to feed her children. Our food assistance program delivered three months of groceries and connected her to local support.",
    imageUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80&auto=format&fit=crop",
    category: "Food",
    amountAwarded: "$900"
  },
  {
    id: "5",
    slug: "james-utility-rescue",
    personName: "James K.",
    location: "Chicago, IL",
    title: "Keeping the lights on through winter",
    excerpt:
      "A medical emergency drained James's savings. With winter approaching and a shut-off notice, Breem covered his utility arrears and set up a payment plan with the provider.",
    imageUrl:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80&auto=format&fit=crop",
    category: "Emergency",
    amountAwarded: "$1,150"
  },
  {
    id: "6",
    slug: "fatima-small-business",
    personName: "Fatima B.",
    location: "Nairobi, Kenya",
    title: "Rebuilding a small tailoring business",
    excerpt:
      "Fatima's sewing machine — her entire livelihood — was destroyed in a fire. A Breem micro-grant replaced it, plus supplies for three months. She now employs two apprentices.",
    imageUrl:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800&q=80&auto=format&fit=crop",
    category: "Financial",
    amountAwarded: "$1,800"
  }
];

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  quote: string;
  avatarUrl: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah M.",
    role: "Mother of three",
    location: "Dallas, TX",
    quote:
      "I was terrified to ask for help. Breem Foundation treated me like a person, not a case number. They didn't just pay my rent — they gave me back my dignity.",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80&auto=format&fit=crop",
    rating: 5
  },
  {
    id: "2",
    name: "Michael T.",
    role: "Recovering patient",
    location: "Nashville, TN",
    quote:
      "After my heart surgery, I couldn't work for months. Breem covered my mortgage when no bank would. I'll spend the rest of my life giving back to this organization.",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80&auto=format&fit=crop",
    rating: 5
  },
  {
    id: "3",
    name: "Aisha K.",
    role: "First-generation student",
    location: "Boston, MA",
    quote:
      "My tuition gap was going to force me to drop out. One email to Breem changed my entire future. I'm now in medical school, and I plan to work in underserved communities.",
    avatarUrl:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80&auto=format&fit=crop",
    rating: 5
  },
  {
    id: "4",
    name: "Pastor John D.",
    role: "Community partner",
    location: "Miami, FL",
    quote:
      "We refer families to Breem because they actually follow through. In 12 years of ministry, I've never seen an organization move this fast with this much compassion.",
    avatarUrl:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80&auto=format&fit=crop",
    rating: 5
  }
];

export interface Faq {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const faqs: Faq[] = [
  {
    id: "1",
    question: "Who is eligible to apply for assistance?",
    answer:
      "Any individual or family facing genuine financial hardship is welcome to apply, regardless of country, background, or faith. We prioritize applicants with urgent, documented needs — housing, medical, food, education, or emergency support. There is no cost to apply.",
    category: "Eligibility"
  },
  {
    id: "2",
    question: "How long does the application process take?",
    answer:
      "Most applications are reviewed within 72 hours. Complex cases requiring additional documents may take up to 7 days. You can track your status in real time through the Applicant Portal using the reference number we send you.",
    category: "Process"
  },
  {
    id: "3",
    question: "What documents do I need to provide?",
    answer:
      "You'll need a clear photo of yourself and supporting documents that verify your situation (e.g., a bill, medical invoice, or eviction notice). All uploads accept PDF, JPG, or PNG under 10 MB. Your documents are encrypted and stored securely.",
    category: "Documents"
  },
  {
    id: "4",
    question: "Is my personal information kept confidential?",
    answer:
      "Yes — absolutely. Your application, documents, and messages are encrypted, accessible only to our trained review team, and never shared, sold, or used for marketing. See our Privacy Policy for full details.",
    category: "Privacy"
  },
  {
    id: "5",
    question: "How are donations used?",
    answer:
      "91 cents of every dollar goes directly to families in need. 9 cents covers essential operating costs. We publish an annual report and are audited independently. Breem Foundation is a registered 501(c)(3) nonprofit — your donation is tax-deductible.",
    category: "Donations"
  },
  {
    id: "6",
    question: "Can I donate to a specific family or cause?",
    answer:
      "You can direct your gift toward a category (housing, medical, food, education, emergency), and 100% of designated funds are used for that purpose. We don't process donations to specific named individuals to protect applicant privacy.",
    category: "Donations"
  },
  {
    id: "7",
    question: "What payment methods do you accept?",
    answer:
      "We accept bank transfers, Cash App, PayPal, Zelle, and Venmo. After you submit a donation intent, we'll email you the exact payment details for your chosen method. Your donation is confirmed once our team verifies receipt.",
    category: "Donations"
  },
  {
    id: "8",
    question: "Can I apply more than once?",
    answer:
      "Yes. Life happens — and if your situation changes, you're welcome to apply again. We simply ask that you tell us about previous assistance so we can review fairly and prioritize new needs.",
    category: "Process"
  },
  {
    id: "9",
    question: "Do you help internationally?",
    answer:
      "Yes. Breem Foundation is U.S.-registered but serves families worldwide. Our current focus regions include the United States, West Africa, East Africa, and parts of South Asia — though applications from any country are welcome.",
    category: "Eligibility"
  },
  {
    id: "10",
    question: "How can I contact you if I have more questions?",
    answer:
      "Email us anytime at breemsfoundation.org@proton.me. We respond to every message within one business day. You can also use the contact form on our Contact page.",
    category: "Contact"
  }
];

/** Categories used for filtering FAQs */
export const faqCategories = [
  "All",
  "Eligibility",
  "Process",
  "Documents",
  "Donations",
  "Privacy",
  "Contact"
] as const;
