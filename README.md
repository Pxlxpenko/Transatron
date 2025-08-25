## Transatron Website (Next.js + TypeScript)

A production-ready marketing site and blog for Transatron built with Next.js 15, React 19, and Tailwind CSS 4. Content is sourced from Sanity CMS. The site supports server-side rendering, SEO meta/JSON-LD, sitemaps, SVG as React components, and EmailJS-powered forms.

### Tech stack

- **Framework**: Next.js (Pages Router), React 19, TypeScript
- **Styling**: Tailwind CSS 4, Tailwind Typography, tw-animate-css
- **CMS/Content**: Sanity (`@sanity/client`), Portable Text
- **UI**: Radix UI primitives, shadcn-style components, Lucide icons, Embla Carousel, Lottie
- **Data/Forms**: TanStack Query, TanStack React Form, Zod, EmailJS
- **SEO/Analytics**: Custom `<SeoHead />`, JSON-LD, `next-sitemap`, Vercel Speed Insights
- **Assets**: SVG → React via `@svgr/webpack` (`?react` imports), Next/Image

## Requirements

- Node.js 20+ recommended (Next.js 15 requires Node 18.18+)
- npm 10+ (or pnpm/yarn if you prefer)

## Getting started

1. Install dependencies:
   - `npm install`
2. Create `.env.local` with required variables (see below).
3. Start the dev server:
   - `npm run dev` (http://localhost:4200)

## Environment variables

Put these in `.env.local`:

```dotenv
# Site
NEXT_PUBLIC_SITE_URL=https://agger-labs.com

# Sanity (client-side safe)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_USE_CDN=false

# EmailJS (client-side safe)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=xxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=xxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxx
```

- Sanity config lives in `src/lib/sanity.ts`.
- EmailJS keys are read via `src/lib/env.ts` and used by dialogs/forms under `src/components/*Dialog.tsx`.
- `NEXT_PUBLIC_SITE_URL` is used for SEO and sitemap generation.

## Scripts

- **dev**: `next dev -p 4200`
- **build**: `next build`
- **start**: `next start -p 4200`
- **postbuild**: `next-sitemap` (writes `public/sitemap.xml` and split files)
- **lint**: `eslint .`
- **format**: `prettier --write .`
- **format:check**: `prettier --check .`

## Project structure

- `pages/` — Next.js Pages Router (home, blog index/detail, privacy policy, API health)
- `src/components/` — UI components (Header, Footer, sections, dialogs, shadcn-style `ui/*`)
- `src/lib/` — utilities and configuration (Sanity client, env helpers, Tailwind helpers)
- `src/services/` — Sanity GROQ queries (`blogService.ts`)
- `src/hooks/` — TanStack Query hooks
- `src/assets/` — images and SVGs
- `public/` — static assets, `sitemap.xml`, `robots.txt`

## Styling

- Tailwind 4 is configured via `postcss.config.mjs` with `@tailwindcss/postcss`.
- Typography plugin is enabled in `src/index.css`:
  - `@plugin "@tailwindcss/typography";`
- Animation utilities via `tw-animate-css` (imported in `src/index.css`).

## SVG as React components

SVG-to-React is enabled in `next.config.js` via `@svgr/webpack` for imports using the `?react` query.

Example:

```ts
import LogoSvg from "@/assets/logo.svg?react";

export default function HeaderLogo() {
  return <LogoSvg aria-label="Transatron" />;
}
```

## Content and data

- Blog content is fetched from Sanity using GROQ queries in `src/services/blogService.ts`.
- Portable Text rendering is handled by `@portabletext/react` in `src/components/PortableTextRenderer.tsx`.
- Client-side data fetching and caching use TanStack Query (`src/hooks/hooks.ts`).

## SEO and analytics

- Reusable `<SeoHead />` component sets meta, Open Graph, and canonical tags.
- Structured data via `src/components/JsonLd.tsx`.
- Sitemaps generated on `postbuild` using `next-sitemap` and `NEXT_PUBLIC_*` envs.
- Vercel Speed Insights via `@vercel/speed-insights/next` in `pages/_app.tsx`.

## Forms and EmailJS

User dialogs (`ContactUsDialog`, `PricingQuoteDialog`, `UnderAttackDialog`) submit via EmailJS. Ensure EmailJS public keys are set in `.env.local`.

## Deployment

- Optimized for Vercel. A minimal `vercel.json` (`{"framework":"nextjs"}`) is included.
- Set the same environment variables in your Vercel project (Build & Runtime).
- Build command: `npm run build` (postbuild will generate sitemaps).

## Troubleshooting

- Ensure Node 20+ locally and in CI.
- If SVG components fail to render, confirm the `?react` import and `@svgr/webpack` rule in `next.config.js`.
- If blog content is empty, verify Sanity project ID, dataset, and published documents.
- If toasts are unstyled, check Tailwind and `tw-animate-css` imports in `src/index.css`.

## Housekeeping

- This project was migrated from Vite CSR to Next.js SSR. Any Vite-specific configs or scripts are no longer used.
- Recommended commands before PRs: `npm run lint` and `npm run format:check`.

---

Copyright © Transatron
