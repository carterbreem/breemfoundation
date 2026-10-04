# Breem Foundation

> A modern, professional charity platform for Breem Foundation — a U.S.-registered 501(c)(3) nonprofit helping individuals and families facing financial hardship.

🌐 **Live site:** https://breemfoundation.vercel.app
📧 **Contact:** breemsfoundation.org@proton.me
🧾 **EIN:** 74-2655302

---

## ✨ Features

### Public Website
- Home, About, Success Stories, FAQ, Contact
- Privacy Policy, Terms of Service
- SEO-optimized with Open Graph metadata, sitemap, robots.txt
- Fully responsive, mobile-friendly design

### Application Flow
- Multi-step form with progress tracking
- Direct-to-Supabase file uploads (photo + supporting docs)
- Real reference numbers (BF-2026-XXXXXX)
- Submitted applications tracked in database
- Applicant tracker (full name + reference number lookup)
- Telegram notification to admin on new submission

### Donations
- One-time or monthly
- Preset + custom amounts
- Manual payment methods: Bank Transfer, Cash App, PayPal, Zelle, Venmo
- Email submit button for payment details
- Reference numbers (DN-2026-XXXXXX)

### Admin Dashboard
- Secure login (triple-tap the logo on any page → `/admin/login`)
- Overview with live stats
- Applications: search, filter, paginate, CSV export
- Application detail: status change, notes, email applicant, message applicant
- Donations: same features + **Email Donor** button (pre-filled payment details)
- Messages inbox (contact form submissions)
- Content management: Success Stories, Testimonials, FAQs
- Settings page with environment health checks

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + custom design tokens |
| Animations | Framer Motion |
| Database | PostgreSQL (Supabase) |
| ORM | Prisma |
| Auth | Custom sessions (bcrypt + httpOnly cookies) |
| File Storage | Supabase Storage |
| Notifications | Telegram Bot API |
| Hosting | Vercel |
| Email | Proton Mail (contact) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js v20+ ([download](https://nodejs.org))
- A Supabase account ([sign up](https://supabase.com))
- A Vercel account ([sign up](https://vercel.com))
- A Telegram bot (optional, for admin notifications)

### 1. Clone the Repository

```bash
git clone https://github.com/carterbreem/breemfoundation.git
cd breemfoundation
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. Create a new Supabase project at https://supabase.com/dashboard
2. Go to **Project Settings → API** and copy:
   - Project URL
   - `anon` public key
   - `service_role` secret key
3. Go to **Project Settings → Database → Connection String** and copy:
   - Transaction pooler URL (port 6543)
   - Direct connection URL (port 5432)
4. Go to **Storage** and create a private bucket named `applicant-documents`

### 4. Configure Environment Variables

Create a file called `.env.local` in the project root:

```env
# ── Supabase ─────────────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# ── Database ─────────────────────────────────────────
DATABASE_URL=postgresql://postgres.xxx:...@...pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1
DIRECT_URL=postgresql://postgres:...@db.xxx.supabase.co:5432/postgres

# ── Admin account ────────────────────────────────────
ADMIN_EMAIL=admin@breemfoundation.org
ADMIN_PASSWORD=your-secure-password

# ── Contact + Tax ────────────────────────────────────
CONTACT_EMAIL=breemsfoundation.org@proton.me
NEXT_PUBLIC_TAX_ID=74-2655302

# ── Site ─────────────────────────────────────────────
NEXT_PUBLIC_SITE_URL=https://breemfoundation.vercel.app

# ── Auth ─────────────────────────────────────────────
AUTH_SECRET=generate-a-long-random-string

# ── Telegram (optional) ──────────────────────────────
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
```

### 5. Push Schema to Database

Since Prisma can't push directly to Supabase's pooler, use the **SQL Editor** in Supabase to run the schema. The full SQL is in the project history or run `prisma migrate deploy` if you have a local Postgres.

**Or**, if you have Node.js locally, run:

```bash
npx prisma db push
npx prisma db seed
```

### 6. Run Locally

```bash
npm run dev
```

Visit http://localhost:3000

---

## 🔐 Admin Access

**Hidden access method:**
1. Go to the public site
2. **Tap the logo 3 times quickly** (within 800ms of each other)
3. You'll be redirected to `/admin/login`
4. Sign in with your admin credentials

**Alternative direct URL:**
- Go to `/admin/login` directly

---

## 📦 Deployment to Vercel

1. Push your code to GitHub
2. Go to https://vercel.com/new
3. Import your repository
4. Add all environment variables (Settings → Environment Variables)
5. Deploy

**After deployment:**
- Update `NEXT_PUBLIC_SITE_URL` to your Vercel URL
- Redeploy for the change to take effect

---

## 📁 Project Structure

```
breem-foundation/
├── app/
│   ├── (marketing)/       Public pages (home, about, stories, faq, contact, etc.)
│   ├── admin/             Admin dashboard (protected)
│   ├── api/               API routes
│   ├── apply/             Application form + success
│   ├── donate/            Donation form + success
│   ├── portal/            Applicant portal (login, signup, verify)
│   ├── track/             Application tracker
│   ├── globals.css        Global styles + design tokens
│   ├── layout.tsx         Root layout
│   ├── not-found.tsx      Custom 404
│   ├── error.tsx          Global error boundary
│   ├── sitemap.ts         Auto sitemap
│   └── robots.ts          Auto robots.txt
├── components/
│   ├── admin/             Admin-only components
│   ├── apply/             Application form components
│   ├── donate/            Donation components
│   ├── layout/            Navbar, Footer, SiteShell
│   ├── marketing/         Homepage/marketing sections
│   ├── portal/            Applicant portal components
│   ├── shared/            Logo, motion, section heading
│   └── ui/                Base UI primitives
├── lib/
│   ├── applications/      Application helpers
│   ├── auth/              Session, password, guard
│   ├── donations/         Donation helpers
│   ├── supabase/          Supabase clients
│   ├── validators/        Zod schemas
│   └── ...                Config, utils, telegram, reference numbers
├── prisma/
│   └── schema.prisma      Database schema
└── public/                Static assets
```

---

## 🧪 Testing Checklist

Before going live, test these flows:

- [ ] Submit an application with real files
- [ ] Confirm reference number appears + email button works
- [ ] Track the application with name + reference
- [ ] Submit a donation intent
- [ ] Receive Telegram notification for both
- [ ] Log into admin dashboard
- [ ] Update application status
- [ ] Send email to applicant
- [ ] Use Email Donor button on a donation
- [ ] Export applications and donations as CSV
- [ ] Edit a success story
- [ ] Edit an FAQ

---

## 🔒 Security

- ✅ bcrypt password hashing (cost 10)
- ✅ HTTP-only session cookies
- ✅ Server-side auth guards on all admin routes
- ✅ Middleware-based route protection
- ✅ Rate limiting on forms
- ✅ Honeypot fields
- ✅ File type/size validation
- ✅ Private Supabase storage buckets
- ✅ Signed URLs for viewing documents (1-hour expiry)
- ✅ Environment variables never committed

---

## 📄 License

© 2026 Breem Foundation. All rights reserved.

Breem Foundation is a registered 501(c)(3) nonprofit organization (EIN 74-2655302).

---

## 🙏 Acknowledgments

Built with care for families facing hardship. Every line of code serves the mission.
