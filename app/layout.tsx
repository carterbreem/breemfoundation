import type { Metadata, Viewport } from "next";
import { inter, playfair } from "@/lib/fonts";
import { Toaster } from "@/components/ui/toaster";
import { VisitorTracker } from "@/components/shared/visitor-tracker";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const SITE_NAME = "Breem Foundation";
const TAX_ID = process.env.NEXT_PUBLIC_TAX_ID ?? "74-2655302";
const CONTACT_EMAIL =
  process.env.CONTACT_EMAIL ?? "breemsfoundation.org@proton.me";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Compassion in Action`,
    template: `%s · ${SITE_NAME}`
  },
  description:
    "Breem Foundation is a U.S.-registered 501(c)(3) nonprofit helping individuals and families facing financial hardship with housing, medical, food, education, and emergency assistance.",
  keywords: [
    "Breem Foundation",
    "charity",
    "nonprofit",
    "financial assistance",
    "housing assistance",
    "medical assistance",
    "emergency aid",
    "donate",
    "apply for assistance",
    "501c3"
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  applicationName: SITE_NAME,
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Compassion in Action`,
    description:
      "Helping individuals and families through financial hardship with dignity, transparency, and speed.",
    images: [
      {
        url: "/og/og-default.jpg",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Compassion in Action`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Compassion in Action`,
    description:
      "Helping individuals and families through financial hardship with dignity, transparency, and speed.",
    images: ["/og/og-default.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  icons: {
    icon: [{ url: "/favicon.ico" }],
    apple: [{ url: "/apple-touch-icon.png" }]
  },
  alternates: { canonical: SITE_URL }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#0B5ED7" }
  ]
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  email: CONTACT_EMAIL,
  taxID: TAX_ID,
  description:
    "Breem Foundation is a U.S.-registered 501(c)(3) nonprofit helping individuals and families facing financial hardship.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "US"
  },
  sameAs: [
    "https://facebook.com/breemfoundation",
    "https://twitter.com/breemfoundation",
    "https://instagram.com/breemfoundation",
    "https://linkedin.com/company/breemfoundation"
  ]
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-screen bg-surface font-sans text-ink antialiased">
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <Toaster />
        <VisitorTracker />
      </body>
    </html>
  );
}
