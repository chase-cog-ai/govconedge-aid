# GovConEdge AI — Cognition Landing Page

Presentation aid and landing page for the **GovConEdge AI Episode 2 (2026)** talk. Built with Next.js, Tailwind CSS, and deployed on Vercel.

**Live site:** [https://govconedge-aid.vercel.app/](https://govconedge-aid.vercel.app/)

---

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to preview locally. The page hot-reloads as you edit.

### Key Files

- `src/app/page.tsx` — Main landing page content and components
- `src/app/globals.css` — Theme, animations, and global styles
- `src/app/layout.tsx` — Root layout and metadata

---

## Deploying to Vercel

The site is connected to this GitHub repo and **deploys automatically** whenever you push to `main`.

### To update the live site:

```bash
# 1. Make your changes locally

# 2. Stage and commit
git add -A
git commit -m "Your commit message"

# 3. Push to main — Vercel will auto-deploy
git push origin main
```

Vercel will build and deploy within ~60 seconds. Check the deployment status at the [Vercel dashboard](https://vercel.com).

### Manual Redeploy (without code changes)

If you need to trigger a fresh deploy without pushing new code, you can do so from the Vercel dashboard:

1. Go to your project at [vercel.com](https://vercel.com)
2. Click **Deployments**
3. Click the **⋯** menu on the latest deployment → **Redeploy**

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Hosting:** Vercel
- **Repo:** [github.com/chase-cog-ai/govconedge-aid](https://github.com/chase-cog-ai/govconedge-aid)
