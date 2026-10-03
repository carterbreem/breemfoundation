/**
 * Prisma seed script.
 * Run with: npx prisma db seed
 *
 * Seeds:
 *   - Admin user (from env: ADMIN_EMAIL + ADMIN_PASSWORD)
 *   - Sample success stories, testimonials, FAQs
 *   - Site content defaults
 *
 * Safe to run multiple times — uses upsert.
 */

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  /* ── Admin user ────────────────────────────────────── */
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    console.warn(
      "⚠️  ADMIN_EMAIL or ADMIN_PASSWORD not set — skipping admin seed."
    );
  } else {
    const passwordHash = await bcrypt.hash(adminPassword, 12);
    await prisma.user.upsert({
      where: { email: adminEmail },
      update: {
        passwordHash,
        role: "ADMIN",
        emailVerified: new Date()
      },
      create: {
        email: adminEmail,
        passwordHash,
        role: "ADMIN",
        emailVerified: new Date(),
        name: "Breem Foundation Admin"
      }
    });
    console.log(`✓ Admin user ready: ${adminEmail}`);
  }

  /* ── Success stories ───────────────────────────────── */
  const stories = [
    {
      slug: "amara-rent-relief",
      title: "Rent relief after a sudden job loss",
      personName: "Amara O.",
      location: "Houston, TX",
      excerpt:
        "When Amara lost her job two weeks before rent was due, she applied for help on a Friday. By Monday, our team approved emergency housing support.",
      content:
        "When Amara lost her job two weeks before rent was due, she applied for help on a Friday. By Monday, our team approved emergency housing support. She kept her home and her children stayed in their school.",
      imageUrl:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80&auto=format&fit=crop",
      assistanceType: "HOUSING" as const,
      amountAwarded: 2400,
      featured: true
    },
    {
      slug: "daniel-medical-fund",
      title: "Emergency surgery for a father of three",
      personName: "Daniel M.",
      location: "Lagos, Nigeria",
      excerpt:
        "Daniel's youngest son needed urgent surgery his family couldn't afford. Breem Foundation covered the hospital deposit within 48 hours.",
      content:
        "Daniel's youngest son needed urgent surgery his family couldn't afford. Breem Foundation covered the hospital deposit within 48 hours. Today, his son is healthy and back in school.",
      imageUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80&auto=format&fit=crop",
      assistanceType: "MEDICAL" as const,
      amountAwarded: 3800,
      featured: true
    },
    {
      slug: "grace-education-grant",
      title: "A second chance at nursing school",
      personName: "Grace A.",
      location: "Atlanta, GA",
      excerpt:
        "After caring for her ill mother for two years, Grace nearly dropped out of nursing school. A Breem education grant covered her final semester.",
      content:
        "After caring for her ill mother for two years, Grace nearly dropped out of nursing school. A Breem education grant covered her final semester's tuition. She graduated last spring.",
      imageUrl:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80&auto=format&fit=crop",
      assistanceType: "EDUCATION" as const,
      amountAwarded: 5200,
      featured: true
    }
  ];

  for (const s of stories) {
    await prisma.successStory.upsert({
      where: { slug: s.slug },
      update: s,
      create: s
    });
  }
  console.log(`✓ Seeded ${stories.length} success stories`);

  /* ── Testimonials ──────────────────────────────────── */
  const testimonials = [
    {
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
      name: "Aisha K.",
      role: "First-generation student",
      location: "Boston, MA",
      quote:
        "My tuition gap was going to force me to drop out. One email to Breem changed my entire future. I'm now in medical school.",
      avatarUrl:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80&auto=format&fit=crop",
      rating: 5
    }
  ];

  for (const t of testimonials) {
    const existing = await prisma.testimonial.findFirst({
      where: { name: t.name, quote: t.quote }
    });
    if (!existing) {
      await prisma.testimonial.create({ data: t });
    }
  }
  console.log(`✓ Seeded ${testimonials.length} testimonials`);

  /* ── FAQs ─────────────────────────────────────────── */
  const faqs = [
    {
      question: "Who is eligible to apply for assistance?",
      answer:
        "Any individual or family facing genuine financial hardship is welcome to apply, regardless of country, background, or faith. We prioritize applicants with urgent, documented needs.",
      category: "Eligibility",
      sortOrder: 1
    },
    {
      question: "How long does the application process take?",
      answer:
        "Most applications are reviewed within 72 hours. Complex cases requiring additional documents may take up to 7 days.",
      category: "Process",
      sortOrder: 2
    },
    {
      question: "What documents do I need to provide?",
      answer:
        "You'll need a clear photo of yourself and supporting documents that verify your situation (e.g., a bill, medical invoice, or eviction notice). All uploads accept PDF, JPG, PNG, or WebP under 10 MB.",
      category: "Documents",
      sortOrder: 3
    },
    {
      question: "Is my personal information kept confidential?",
      answer:
        "Yes — absolutely. Your application, documents, and messages are encrypted, accessible only to our trained review team, and never shared, sold, or used for marketing.",
      category: "Privacy",
      sortOrder: 4
    },
    {
      question: "How are donations used?",
      answer:
        "91 cents of every dollar goes directly to families in need. 9 cents covers essential operating costs. Breem Foundation is a registered 501(c)(3) nonprofit — your donation is tax-deductible.",
      category: "Donations",
      sortOrder: 5
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept bank transfers, Cash App, PayPal, Zelle, and Venmo. After you submit a donation intent, we'll email you the exact payment details.",
      category: "Donations",
      sortOrder: 6
    },
    {
      question: "Can I apply more than once?",
      answer:
        "Yes. Life happens — and if your situation changes, you're welcome to apply again. We simply ask that you tell us about previous assistance.",
      category: "Process",
      sortOrder: 7
    },
    {
      question: "Do you help internationally?",
      answer:
        "Yes. Breem Foundation is U.S.-registered but serves families worldwide. Our current focus regions include the United States, West Africa, East Africa, and parts of South Asia.",
      category: "Eligibility",
      sortOrder: 8
    }
  ];

  for (const f of faqs) {
    const existing = await prisma.faq.findFirst({
      where: { question: f.question }
    });
    if (!existing) {
      await prisma.faq.create({ data: f });
    }
  }
  console.log(`✓ Seeded ${faqs.length} FAQs`);

  /* ── Site content defaults ─────────────────────────── */
  const siteContent = [
    { key: "hero_title", value: "When hardship hits, no one should face it alone." },
    { key: "hero_subtitle", value: "Breem Foundation helps individuals and families navigate financial hardship with fast, dignified assistance." },
    { key: "contact_email", value: "breemsfoundation.org@proton.me" },
    { key: "tax_id", value: "74-2655302" },
    { key: "mission", value: "To provide fast, dignified, and transparent financial assistance to individuals and families facing hardship." }
  ];

  for (const c of siteContent) {
    await prisma.siteContent.upsert({
      where: { key: c.key },
      update: { value: c.value },
      create: c
    });
  }
  console.log(`✓ Seeded ${siteContent.length} site content entries`);

  console.log("✅ Seeding complete.");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
