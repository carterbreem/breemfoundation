# Deployment Guide

Step-by-step instructions for deploying Breem Foundation to production.

---

## Prerequisites Checklist

- [ ] GitHub account
- [ ] Vercel account (free tier OK)
- [ ] Supabase project with credentials ready
- [ ] Telegram bot token + chat ID (optional)
- [ ] Domain name (optional — Vercel provides one free)

---

## Step 1 — Prepare Supabase

### 1.1 Create Project
1. Go to https://supabase.com/dashboard
2. Click **New project**
3. Name: `breem-foundation`
4. Region: **East US (North Virginia)** (best for US-based foundation)
5. Save the database password somewhere safe

### 1.2 Create Storage Bucket
1. In the sidebar → **Storage**
2. Click **New bucket**
3. Name: `applicant-documents`
4. **Public bucket:** ❌ OFF (must be private)
5. File size limit: `10 MB`
6. Click **Create bucket**

### 1.3 Run Schema SQL
1. Sidebar → **SQL Editor** → **New query**
2. Paste the full schema SQL (available in project documentation)
3. Click **Run**
4. Verify in **Table Editor** that all 14 tables appear

### 1.4 Create Admin User
1. Sidebar → **SQL Editor** → **New query**
2. Paste this (replace `admin@example.com` with your admin email):

```sql
INSERT INTO public.users (email, "passwordHash", role, "emailVerified", name)
VALUES (
  'admin@example.com',
  '$2a$10$Dbnnv3XLpXzT1/dGVpJ/6ODUxs9Xnj0CmALdHKlZ8yEqYhK7nJlLu',
  'ADMIN',
  NOW(),
  'Breem Foundation Admin'
)
ON CONFLICT (email) DO UPDATE SET role = 'ADMIN';
```

**Then immediately change the password** — either via the portal signup flow or by running our app's reset flow.

### 1.5 Collect Credentials

Copy these 5 values:
- Project URL (from **Settings → API**)
- anon key (from **Settings → API**)
- service_role key (from **Settings → API**)
- Transaction pooler URL (from **Settings → Database → Connection String**)
- Direct connection URL (from **Settings → Database → Connection String**)

---

## Step 2 — Deploy to Vercel

### 2.1 Import Repository
1. Go to https://vercel.com/new
2. Click **Import Git Repository**
3. Select `carterbreem/breemfoundation`
4. Click **Import**

### 2.2 Add Environment Variables

**Settings → Environment Variables** — add each of these:

| Key | Value |
|---|---|
| `DATABASE_URL` | Your Supabase pooler URL **+ `?pgbouncer=true&connection_limit=1`** |
| `DIRECT_URL` | Your Supabase direct connection URL |
| `NEXT_PUBLIC_SUPABASE_URL` | From Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | From Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | From Supabase |
| `ADMIN_EMAIL` | Your admin email |
| `ADMIN_PASSWORD` | Your admin password |
| `CONTACT_EMAIL` | `breemsfoundation.org@proton.me` |
| `NEXT_PUBLIC_TAX_ID` | `74-2655302` |
| `NEXT_PUBLIC_SITE_URL` | Your Vercel URL (add after first deploy) |
| `AUTH_SECRET` | Random 32+ char string |
| `TELEGRAM_BOT_TOKEN` | From BotFather (optional) |
| `TELEGRAM_CHAT_ID` | From @userinfobot (optional) |

**For each:** check ✅ Production, ✅ Preview, ✅ Development.

### 2.3 Deploy

Click **Deploy**. First build takes 2-4 minutes.

### 2.4 Update Site URL

After the first successful deploy:
1. Copy your Vercel URL (e.g., `https://breemfoundation.vercel.app`)
2. Update `NEXT_PUBLIC_SITE_URL` in Vercel env vars
3. Go to **Deployments** → latest → **⋯** → **Redeploy**

---

## Step 3 — Verify Deployment

### 3.1 Test Public Site
- [ ] Home page loads
- [ ] All nav links work
- [ ] Mobile view is responsive (no pinch-to-zoom needed)

### 3.2 Test Application Flow
- [ ] Go to `/apply` → complete the form → upload small files
- [ ] Verify success page shows a real reference number (BF-2026-XXXXXX)
- [ ] Check Supabase `applications` table → row exists
- [ ] Check Telegram → notification received

### 3.3 Test Track Flow
- [ ] Go to `/track` → enter the name + reference → verify status appears

### 3.4 Test Donation Flow
- [ ] Go to `/donate` → complete a $1 test donation
- [ ] Verify success page shows DN-2026-XXXXXX
- [ ] Check Supabase `donations` table

### 3.5 Test Admin
- [ ] Triple-tap the logo → lands on `/admin/login`
- [ ] Sign in with admin credentials
- [ ] Overview shows correct counts
- [ ] Applications list works
- [ ] Donations list works
- [ ] Email Donor button opens mail app pre-filled

---

## Step 4 — Custom Domain (Optional)

1. Buy a domain (e.g., `breemfoundation.org`) from Namecheap, Cloudflare, or Google Domains
2. In Vercel → your project → **Domains**
3. Add your domain
4. Follow Vercel's DNS instructions
5. Update `NEXT_PUBLIC_SITE_URL` to `https://breemfoundation.org`
6. Redeploy

---

## Troubleshooting

### "Prepared statement already exists"
Add `?pgbouncer=true&connection_limit=1` to `DATABASE_URL`.

### "Dynamic server usage: used cookies"
Add `export const dynamic = "force-dynamic"` to the top of the page.

### "Invalid URL" during build
Make sure `NEXT_PUBLIC_SITE_URL` is set (not empty) in Vercel env vars.

### Admin login fails
The password hash must match. Use the signup flow first, then promote to ADMIN via SQL.

### Telegram not sending
- Verify `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` are set
- Send a message to your bot first (Telegram requires it)
- Test manually: `https://api.telegram.org/bot<TOKEN>/getMe`

---

## Ongoing Maintenance

### Rotating Admin Password
1. Delete the admin row: `DELETE FROM public.users WHERE email = 'admin@breemfoundation.org';`
2. Sign up fresh via `/portal/signup` with the new password
3. Promote to ADMIN: `UPDATE public.users SET role = 'ADMIN', "emailVerified" = NOW() WHERE email = 'admin@breemfoundation.org';`

### Backup
Supabase runs daily backups on the free tier. For manual exports:
- **Database:** Settings → Database → Backups
- **Storage:** manually download via the Storage browser

### Monitoring
- Vercel → Deployments → logs for errors
- Supabase → Logs for database errors
- Telegram for real-time alerts

---

## Support

For technical issues, contact your developer.
For charity inquiries, email breemsfoundation.org@proton.me.

**EIN:** 74-2655302
**© 2024 Breem Foundation. All rights reserved.**
