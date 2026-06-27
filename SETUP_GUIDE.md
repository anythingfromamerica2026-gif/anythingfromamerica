# AnythingFromAmerica.com — Complete Setup Guide
## Astro + Cloudflare Pages + Decap CMS + GitHub

---

## What you're building

A professional business website with:
- Fast, SEO-optimized static pages (Astro)
- Free global hosting (Cloudflare Pages)
- Visual CMS editor at yoursite.com/admin (Decap CMS)
- Contact form that emails you (Formspree)
- Domain email send/receive (Google Workspace)
- AI crawler findability (llms.txt + JSON-LD schema)
- Auto-generated sitemap.xml

**Estimated cost:** ~$6/month (Google Workspace email only)
**Estimated setup time:** 3–5 hours total (no coding required after setup)

---

## PHASE 1 — Accounts you need (free)

### Step 1: Create a GitHub account
1. Go to **github.com** → click "Sign up"
2. Choose a username (e.g. `anythingfromamerica`)
3. Verify your email
4. ✅ Done — you now have version-controlled file storage for your site

### Step 2: Create a Cloudflare account
1. Go to **cloudflare.com** → click "Sign up"
2. Enter your email and password
3. ✅ Done — this is where your site will be hosted, for free

### Step 3: Create a Formspree account
1. Go to **formspree.io** → click "Get Started Free"
2. Sign up with your email
3. Click "New Form" → name it "AnythingFromAmerica Contact"
4. Copy your Form ID (looks like `xabc1234`)
5. ✅ Done — this handles your contact form submissions

---

## PHASE 2 — Set up the code on GitHub

### Step 4: Create a new GitHub repository
1. In GitHub, click the **+** button → "New repository"
2. Name it: `anythingfromamerica`
3. Set to **Public** (required for free Cloudflare Pages)
4. Click "Create repository"

### Step 5: Upload the project files
You have two options:

**Option A — Easy (GitHub web interface):**
1. In your new repo, click "uploading an existing file"
2. Drag and drop all the files from the project folder
3. Click "Commit changes"

**Option B — If you have a developer helping:**
```bash
cd anythingfromamerica
git init
git add .
git commit -m "Initial site launch"
git remote add origin https://github.com/YOUR_USERNAME/anythingfromamerica.git
git push -u origin main
```

### Step 6: Update config.yml with your GitHub username
In GitHub, open `public/admin/config.yml` and change:
```yaml
repo: YOUR_GITHUB_USERNAME/anythingfromamerica
```
To your actual username, e.g.:
```yaml
repo: anythingfromamerica/anythingfromamerica
```

### Step 7: Add your Formspree form ID
In `src/pages/contact.astro`, find this line:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID"
```
Replace `YOUR_FORM_ID` with your actual Formspree ID (e.g. `xabc1234`).

---

## PHASE 3 — Connect Cloudflare Pages

### Step 8: Create a Cloudflare Pages project
1. Log in to **Cloudflare** dashboard
2. Click **Workers & Pages** in the left sidebar
3. Click **"Create application"** → **"Pages"** → **"Connect to Git"**
4. Click **"Connect GitHub"** → authorize Cloudflare
5. Select your `anythingfromamerica` repository
6. Click **"Begin setup"**

### Step 9: Configure the build settings
On the setup page:
| Setting | Value |
|---------|-------|
| Framework preset | `Astro` |
| Build command | `npm run build` |
| Build output directory | `dist` |

Click **"Save and Deploy"**

⏳ Wait 1–2 minutes. Cloudflare will install packages and build your site.

### Step 10: View your live site
After the build succeeds, Cloudflare gives you a URL like:
`https://anythingfromamerica.pages.dev`

Your site is now live on the internet. 🎉

---

## PHASE 4 — Connect your domain

### Step 11: Add your domain to Cloudflare
1. In Cloudflare dashboard, click **"Add a site"** → enter `anythingfromamerica.com`
2. Choose the **Free plan**
3. Cloudflare will show you two nameserver addresses, e.g.:
   - `isla.ns.cloudflare.com`
   - `omar.ns.cloudflare.com`

### Step 12: Update nameservers at your domain registrar
1. Log in to wherever you bought your domain (GoDaddy, Namecheap, etc.)
2. Find **"Nameservers"** or **"DNS"** settings
3. Replace existing nameservers with the two Cloudflare ones
4. Save — changes take 1–24 hours to propagate

### Step 13: Connect domain to Cloudflare Pages
1. In Cloudflare Pages → your project → **"Custom domains"**
2. Click **"Set up a custom domain"**
3. Enter `anythingfromamerica.com` and click Continue
4. Also add `www.anythingfromamerica.com` → redirect to root
5. ✅ Your site is now live at anythingfromamerica.com

---

## PHASE 5 — Set up the CMS editor

### Step 14: Enable GitHub OAuth for Decap CMS

You need to create a GitHub OAuth App so your CMS editor can log in:

1. Go to **github.com/settings/developers** → "OAuth Apps" → "New OAuth App"
2. Fill in:
   - Application name: `AnythingFromAmerica CMS`
   - Homepage URL: `https://anythingfromamerica.com`
   - Authorization callback URL: `https://api.netlify.com/auth/done`
3. Click "Register application"
4. Copy the **Client ID** and generate a **Client Secret**

### Step 15: Set up Cloudflare Pages environment variables
In Cloudflare Pages → your project → **Settings → Environment Variables**:
Add these:
| Variable | Value |
|----------|-------|
| `OAUTH_CLIENT_ID` | Your GitHub OAuth Client ID |
| `OAUTH_CLIENT_SECRET` | Your GitHub OAuth Client Secret |

### Step 16: Access your CMS
Go to: **https://anythingfromamerica.com/admin**
- Click "Login with GitHub"
- Authorize the app
- ✅ You now have a visual content editor!

### What you can edit in the CMS:
- **FAQs** — add, edit, or delete any FAQ
- **Team members** — add team bios and photos
- **Services** — update service descriptions
- **Site settings** — update phone, email, address
- **Media** — upload images

---

## PHASE 6 — Set up domain email

### Step 17: Set up Google Workspace
1. Go to **workspace.google.com** → click "Get started"
2. Enter your business name and `anythingfromamerica.com`
3. Choose a username: `info` → creates `info@anythingfromamerica.com`
4. Select plan: **Business Starter** (~$6/month)

### Step 18: Verify your domain
Google will give you a TXT record to add. Since your domain is on Cloudflare:
1. In Cloudflare DNS → Add Record
2. Type: `TXT`, Name: `@`, Value: (paste Google's verification code)
3. Click Save → return to Google and click "Verify"

### Step 19: Add Google MX records
Google gives you 5 MX records. Add each one in Cloudflare DNS:
| Priority | Mail server |
|----------|-------------|
| 1 | `aspmx.l.google.com` |
| 5 | `alt1.aspmx.l.google.com` |
| 5 | `alt2.aspmx.l.google.com` |
| 10 | `alt3.aspmx.l.google.com` |
| 10 | `alt4.aspmx.l.google.com` |

✅ You can now send and receive email at `info@anythingfromamerica.com` via Gmail.

---

## PHASE 7 — Final checklist

### Step 20: Submit to Google Search Console
1. Go to **search.google.com/search-console**
2. Add property: `anythingfromamerica.com`
3. Verify via the TXT record method (same as above, already done)
4. Submit your sitemap: `https://anythingfromamerica.com/sitemap-index.xml`

### Step 21: Test everything
- [ ] Site loads at `https://anythingfromamerica.com`
- [ ] Contact form sends an email to your inbox
- [ ] CMS editor works at `/admin`
- [ ] Email sends and receives at `info@anythingfromamerica.com`
- [ ] Site looks good on mobile
- [ ] All navigation links work

### Step 22: How to update content going forward
1. Go to `https://anythingfromamerica.com/admin`
2. Log in with GitHub
3. Edit what you want
4. Click "Publish"
5. Site rebuilds automatically in ~30 seconds ✅

---

## File structure reference

```
anythingfromamerica/
├── src/
│   ├── layouts/
│   │   └── Layout.astro          ← Navigation + footer (shared)
│   ├── pages/
│   │   ├── index.astro           ← Home page
│   │   ├── contact.astro         ← Contact + quote form
│   │   ├── faq.astro             ← FAQ page
│   │   ├── services.astro        ← Services page (add yourself)
│   │   ├── why-usa.astro         ← Why From USA page (add yourself)
│   │   └── team.astro            ← Team page (add yourself)
│   └── styles/
│       └── global.css            ← Colors, fonts, shared styles
├── public/
│   ├── admin/
│   │   ├── index.html            ← CMS editor entry
│   │   └── config.yml            ← CMS configuration
│   ├── images/                   ← Upload your photos here
│   ├── llms.txt                  ← AI crawler findability
│   └── robots.txt                ← SEO crawler instructions
├── astro.config.mjs              ← Astro settings
├── package.json                  ← Dependencies
└── wrangler.toml                 ← Cloudflare build settings
```

---

## Updating content directly (without CMS)

For quick edits, you can edit files directly in GitHub:
1. Go to your repo on github.com
2. Click the file you want to edit
3. Click the pencil icon (✏️ Edit this file)
4. Make your changes
5. Click "Commit changes"
6. Site rebuilds in ~30 seconds

---

## Troubleshooting

**Build fails on Cloudflare:**
- Check the build logs in Cloudflare Pages → your project → Deployments
- Most common issue: missing npm package. Make sure `package.json` is uploaded.

**CMS login doesn't work:**
- Double-check your OAuth App callback URL is exactly: `https://api.netlify.com/auth/done`
- Make sure environment variables are saved in Cloudflare Pages settings

**Emails not arriving from form:**
- Check your Formspree dashboard for received submissions
- Make sure the form action URL has your correct form ID

**Domain not showing site:**
- Nameserver changes can take up to 24 hours
- Check propagation at: whatsmydns.net

---

*Built with: Astro v4 · Cloudflare Pages · Decap CMS · Formspree · Google Workspace*
