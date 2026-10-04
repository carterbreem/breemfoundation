export const siteConfig = {
  name: "Breem Foundation",
  shortName: "Breem",
  description:
    "A U.S.-registered 501(c)(3) nonprofit helping individuals and families facing financial hardship.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://breemfoundation.org",
  contactEmail:
    process.env.CONTACT_EMAIL ?? "breemsfoundation.org@proton.me",
  taxId: process.env.NEXT_PUBLIC_TAX_ID ?? "74-2655302",
  phone: "+1 (555) 012-3456",
  address: "United States",
  social: {
    facebook: "https://facebook.com/breemfoundation",
    twitter: "https://twitter.com/breemfoundation",
    instagram: "https://instagram.com/breemfoundation",
    linkedin: "https://linkedin.com/company/breemfoundation",
    youtube: "https://youtube.com/@breemfoundation"
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Success Stories", href: "/stories" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" }
  ],
  navCta: {
    apply: { label: "Apply for Assistance", href: "/apply" },
    donate: { label: "Donate Now", href: "/donate" }
  },
  footer: {
    about: [
      { label: "About Us", href: "/about" },
      { label: "Success Stories", href: "/stories" },
      { label: "Contact Us", href: "/contact" }
    ],
    help: [
      { label: "Apply for Assistance", href: "/apply" },
      { label: "Donate", href: "/donate" },
      { label: "Frequently Asked Questions", href: "/faq" },
      { label: "Track Application", href: "/track" }
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" }
    ]
  }
} as const;

export type SiteConfig = typeof siteConfig;
