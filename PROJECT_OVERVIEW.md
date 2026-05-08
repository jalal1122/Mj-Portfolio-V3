# mjportfoliov3 — Complete Project Overview

This document is an end-to-end reference for the `mjportfoliov3` codebase: what it is, how it is built, every directory and file, the libraries and tools that power it, the UI behavior, the data flow, the security model, and the performance characteristics.

> **Project**: `mjportfoliov3`
> **Type**: Personal portfolio + lightweight CMS
> **Owner**: Muhammad Jalal — Junior MERN Stack Developer
> **Stack**: Next.js 16 (App Router) · React 19 · TypeScript 5 · Tailwind CSS 4 · MongoDB (Mongoose) · Framer Motion · Cloudinary · Nodemailer

---

## 1. What this project is

A premium, animated developer portfolio with a **self-hosted admin CMS** (no third-party CMS). It exposes:

- A public-facing portfolio site (Home, Journey, Work, Project Detail, Metrics, Contact)
- A protected `/admin` area to manage Projects, Technologies, Experiences, and Homepage content (trusted companies + testimonials)
- A REST-style API layer under `/api/*` that the admin UI uses to read/write MongoDB
- A live GitHub metrics page
- A Nodemailer-powered contact form

The site is fully **server-rendered** for public pages with **fallback content** baked into `lib/content.ts` so the site still renders correctly when the database is unreachable or empty.

---

## 2. Tech stack at a glance

### Runtime & framework
| Tool | Version | Why it's used |
| --- | --- | --- |
| **Next.js** | `16.2.3` | App Router, server components, route handlers, image optimization, middleware |
| **React** | `19.2.4` | UI |
| **React DOM** | `19.2.4` | DOM renderer |
| **TypeScript** | `^5` | Strict typing, alias `@/*` maps to project root |

### Styling & motion
| Tool | Version | Why |
| --- | --- | --- |
| **Tailwind CSS** | `^4` | Utility-first styling (via `@tailwindcss/postcss`) |
| **Framer Motion** | `^12.38.0` | Page-level + component-level animations and scroll progress effects |
| **clsx** | `^2.1.1` | Conditional class composition (used by `cn()` helper) |

### Icons & graphics
| Tool | Version | Why |
| --- | --- | --- |
| **lucide-react** | `^1.8.0` | Primary icon set across the app |
| **react-icons** | `^5.6.0` | Brand icons (LinkedIn, GitHub, Instagram) via `fa6` set |
| **Recharts** | `^3.8.1` | Pie chart for the GitHub language breakdown on `/metrics` |

### Data, content & media
| Tool | Version | Why |
| --- | --- | --- |
| **Mongoose** | `^9.4.1` | MongoDB ORM for all CMS content |
| **next-cloudinary** | `^6.17.5` | `CldUploadWidget` for image uploads inside the admin |
| **cloudinary** | `^2.9.0` | Cloudinary SDK (companion to `next-cloudinary`) |
| **Nodemailer** | `^8.0.5` | Sends contact-form emails via SMTP |

### Theming, animations (peripheral)
| Tool | Version | Status |
| --- | --- | --- |
| **next-themes** | `^0.4.6` | Listed in deps but the project ships its **own** `ThemeProvider`. Effectively unused unless re-introduced. |
| **lottie-react** | `^2.4.1` | Listed in deps but not currently imported anywhere. |
| **@splinetool/react-spline** | `^4.1.0` | Listed in deps but not currently imported anywhere. |

### Tooling
| Tool | Version | Why |
| --- | --- | --- |
| **ESLint** | `^9` (flat config) | `eslint-config-next` core-web-vitals + typescript |
| **eslint-config-next** | `16.2.3` | Next.js linting presets |
| **PostCSS** | implicit | `@tailwindcss/postcss` plugin only |
| **@types/node, @types/react, @types/react-dom, @types/nodemailer** | latest | Type definitions |

### NPM scripts (`package.json`)
- `dev`     → `next dev`
- `build`   → `next build`
- `start`   → `next start`
- `lint`    → `eslint`

> **No** `test`, `format`, or `typecheck` script is defined.

---

## 3. Top-level directory map

```
mjportfoliov3/
├── app/                      # Next.js App Router (pages, layouts, route handlers)
│   ├── about/page.tsx              -> /about      ("Journey")
│   ├── admin/                      -> /admin
│   │   ├── page.tsx
│   │   └── loading.tsx             (skeleton)
│   ├── api/                        # Route handlers (server)
│   │   ├── contact/route.ts        POST /api/contact
│   │   ├── experiences/route.ts    GET, POST /api/experiences
│   │   ├── experiences/[id]/route.ts        PATCH, DELETE
│   │   ├── home-content/route.ts            GET, POST
│   │   ├── home-content/[id]/route.ts       GET, PATCH, DELETE
│   │   ├── projects/route.ts                GET, POST
│   │   ├── projects/[id]/route.ts           GET, PATCH, DELETE
│   │   ├── technologies/route.ts            GET, POST
│   │   └── technologies/[id]/route.ts       PATCH, DELETE
│   ├── contact/page.tsx            -> /contact
│   ├── metrics/page.tsx            -> /metrics
│   ├── projects/                   -> /projects (work index)
│   │   ├── page.tsx
│   │   └── loading.tsx             (skeleton)
│   ├── work/[slug]/page.tsx        -> /work/[slug] (project detail)
│   ├── favicon.ico
│   ├── globals.css                 (Tailwind v4 + theme tokens)
│   ├── layout.tsx                  (root shell)
│   └── page.tsx                    -> /          (Home)
│
├── components/
│   ├── admin/
│   │   ├── admin-dashboard.tsx     (main client component)
│   │   └── dashboard/
│   │       ├── admin-ui.tsx        (DashboardHeaderCard, SidebarTabs, CollapsibleSectionCard, SearchField, ColorSwatches, InlineToast)
│   │       ├── constants.ts        (colorPresets, default form states)
│   │       ├── types.ts            (entity + form-state types)
│   │       └── tabs/
│   │           ├── home-tab.tsx          (hero image upload, trusted companies, testimonials)
│   │           ├── projects-tab.tsx      (CRUD + drag reorder + Cloudinary upload)
│   │           ├── technologies-tab.tsx  (CRUD + drag reorder)
│   │           ├── experiences-tab.tsx   (CRUD + drag reorder)
│   │           └── security-tab.tsx      (admin token + actor name)
│   ├── contact/
│   │   └── contact-form.tsx        (intent templates, validation, fetch /api/contact)
│   ├── home/
│   │   ├── home-view.tsx           (composes home sections, manages testimonial expand state)
│   │   └── home-sections.tsx       (HeroSection, BuildStackDNASection, CoreTechnologiesSection, TrustedCompaniesSection, TestimonialsSection)
│   ├── journey/
│   │   ├── journey-view.tsx        (animated vertical timeline, scroll-driven gradient line)
│   │   └── journey-timeline-item.tsx
│   ├── layout/
│   │   ├── navbar.tsx              (fixed glass nav + active indicator + mobile menu)
│   │   ├── footer.tsx
│   │   └── footer-sections.tsx     (FooterProfileSection, FooterExploreSection, FooterConnectSection)
│   ├── metrics/
│   │   ├── metrics-view.tsx        (composition)
│   │   └── metrics-sections.tsx    (ContributionsCard, LanguageBreakdownCard, ImpactCard, RoleSkillMapCard)
│   ├── providers/
│   │   └── theme-provider.tsx      (custom light/dark provider w/ localStorage)
│   ├── ui/
│   │   ├── aurora-background.tsx   (NOT mounted; commented out in layout)
│   │   ├── custom-cursor.tsx       (RAF-driven dot + ring; auto-disabled on touch)
│   │   ├── floating-shapes.tsx     (animated SVG shapes background)
│   │   ├── spotlight-card.tsx      (glassmorphic card with mouse-tracked glow)
│   │   ├── tech-marquee.tsx        (infinite horizontal marquee row)
│   │   └── theme-toggle.tsx        (Sun/Moon button, hydration-safe)
│   └── work/
│       ├── project-detail-view.tsx
│       └── project-detail-sections.tsx (ProjectHeroBanner, ProjectOverviewAndInnovations, ProjectResultsSection, ProjectStoryMode, ProjectToc, ProjectMetaCard)
│
├── lib/
│   ├── api-helpers.ts              (jsonError, isMutationAllowed, getMutationActor)
│   ├── content-types.ts            (TS shapes for projects, technologies, home content)
│   ├── content.ts                  (server-side data loaders + fallbacks)
│   ├── dbConnect.js                (cached Mongoose connection)
│   ├── github.ts                   (GitHub REST aggregator with revalidation)
│   ├── image.ts                    (getSafeImageSrc allowlist)
│   ├── serialize.ts                (toPlainData via JSON round-trip)
│   ├── site-data.ts                (coreTechs list; timelinePoints — currently unused)
│   └── utils.ts                    (cn() = clsx)
│
├── models/                         (Mongoose schemas)
│   ├── Experience.js
│   ├── HomeContent.js
│   ├── Project.js
│   └── Technology.js
│
├── public/
│   ├── jkimage.jpeg                (default hero portrait + fallback)
│   ├── file.svg
│   ├── window.svg
│   └── vercel.svg
│
├── AGENTS.md / CLAUDE.md           (agent instructions: read Next docs in node_modules)
├── eslint.config.mjs               (flat ESLint config)
├── middleware.ts                   (Basic-auth gate for /admin/*)
├── next.config.ts                  (next/image remote patterns)
├── package.json
├── postcss.config.mjs
├── README.md                       (boilerplate from create-next-app)
└── tsconfig.json                   (strict, paths: @/* -> ./*)
```

---

## 4. Routes (URL map)

| URL | File | Type | Notes |
| --- | --- | --- | --- |
| `/` | `app/page.tsx` | Server | Loads projects, technologies, home content in parallel; renders `HomeView` |
| `/about` | `app/about/page.tsx` | Server | "Journey" — pulls experiences, renders `JourneyView` |
| `/projects` | `app/projects/page.tsx` | Server | Masonry grid of `SpotlightCard`s; uses `getSafeImageSrc` |
| `/work/[slug]` | `app/work/[slug]/page.tsx` | Server | Dynamic project detail; `params` is a `Promise` (Next 16 convention); `notFound()` if missing |
| `/metrics` | `app/metrics/page.tsx` | Server | Pulls live GitHub metrics via `lib/github.ts` |
| `/contact` | `app/contact/page.tsx` | Server | Renders client `ContactForm` |
| `/admin` | `app/admin/page.tsx` | Server | Renders client `AdminDashboard` (gated by middleware) |

### API endpoints (route handlers)

| Method | Path | Auth | Purpose |
| --- | --- | --- | --- |
| GET | `/api/projects` | none | List all projects (populated `techStack`) |
| POST | `/api/projects` | `x-admin-token` (if `ADMIN_TOKEN` set) | Create project |
| GET | `/api/projects/[id]` | none | Get one project |
| PATCH | `/api/projects/[id]` | `x-admin-token` | Update project |
| DELETE | `/api/projects/[id]` | `x-admin-token` | Delete project |
| GET | `/api/technologies` | none | List technologies |
| POST | `/api/technologies` | `x-admin-token` | Create (handles 11000 dup-key + ValidationError) |
| PATCH | `/api/technologies/[id]` | `x-admin-token` | Update |
| DELETE | `/api/technologies/[id]` | `x-admin-token` | Delete |
| GET | `/api/experiences` | none | List experiences |
| POST | `/api/experiences` | `x-admin-token` | Create |
| PATCH | `/api/experiences/[id]` | `x-admin-token` | Update |
| DELETE | `/api/experiences/[id]` | `x-admin-token` | Delete |
| GET | `/api/home-content` | none | Latest home content document |
| POST | `/api/home-content` | `x-admin-token` | Create new home content doc |
| GET | `/api/home-content/[id]` | none | Get specific home content |
| PATCH | `/api/home-content/[id]` | `x-admin-token` | Update home content |
| DELETE | `/api/home-content/[id]` | `x-admin-token` | Delete |
| POST | `/api/contact` | none + IP rate-limit | Send email via Nodemailer SMTP (60s window per IP) |

### Auth flow
- `middleware.ts` matches `/admin/:path*`. If `ADMIN_USERNAME` and `ADMIN_PASSWORD` env vars are both set, it requires HTTP Basic auth. **If either is missing, the route is open** (development-friendly).
- `lib/api-helpers.ts::isMutationAllowed` requires header `x-admin-token` to match `process.env.ADMIN_TOKEN`. **If `ADMIN_TOKEN` is unset, mutations are allowed** (also dev-friendly). The `x-admin-user` header is stored in the document's `changedBy` field for audit.

---

## 5. Data layer (MongoDB via Mongoose)

### `lib/dbConnect.js`
- Reads `MONGODB_URI`. Throws if missing.
- Caches the connection on `global.mongoose` to survive Next.js hot-reload and serverless invocations.
- `bufferCommands: false` to fail fast when the DB isn't connected.

### Models (all in `models/*.js`, with `timestamps: true`)

#### `models/Project.js`
```text
title          String, required, trimmed
description    String, required, trimmed
slug           String, required, unique, lowercase, trimmed
cloudinaryImageUrl  String, required
techStack      [ObjectId ref "Technology"]
displayOrder   Number, default 0, min 0
githubLink     String, default ""
liveLink       String, default ""
changedBy      String, default "Portfolio Admin"
```

#### `models/Technology.js`
```text
name           String, required, unique (index)
category       String, required
cloudinarySvgUrl  String, default ""    (legacy "https://placeholder.invalid/tech.svg" used at write time)
color          String, default ""
displayOrder   Number, default 0
changedBy      String, default "Portfolio Admin"
```

#### `models/Experience.js`
```text
role, company, timeframe, description   String, required
color          String, default ""
displayOrder   Number, default 0
changedBy      String, default "Portfolio Admin"
```

#### `models/HomeContent.js`
```text
heroImageUrl       String, default "/jkimage.jpeg"
trustedCompanies   [{ name, color }]   (sub-schema, no _id)
testimonials       [{ text, name, role }]   (sub-schema, no _id)
```

### `lib/content.ts` — server reads with fallbacks
Each loader (`getProjects`, `getProjectBySlug`, `getExperiences`, `getTechnologies`, `getHomeContent`):
1. Calls `dbConnect()`
2. Runs the Mongoose query with `.lean()` and `.sort({ displayOrder: 1, createdAt: -1 })`
3. Pipes the result through `toPlainData` (`JSON.parse(JSON.stringify(...))`) so server components can safely pass it to client components without "non-plain object" warnings.
4. On any error or empty result, returns the **hardcoded fallback** baked into the same file (e.g. `fallbackProjects`, `fallbackHomeContent`, `fallbackTech`).

This guarantees the site **always renders** even with no DB.

---

## 6. UI architecture

### Root shell — `app/layout.tsx`
- HTML lang `en`, suppressed hydration warning, `Plus_Jakarta_Sans` font wired via `next/font/google` and the `--font-plus-jakarta` CSS variable.
- Metadata title/description set globally.
- Mounts in order: `ThemeProvider` → `FloatingShapes` (animated background) → `CustomCursor` → `Navbar` → `<main>{children}</main>` → `Footer`.
- The `AuroraBackground` import exists but is intentionally commented out.

### Theme system — `components/providers/theme-provider.tsx`
- Custom React Context (`useTheme`) — does **not** use `next-themes`.
- Detects initial theme from `localStorage.theme` then `prefers-color-scheme`.
- Toggling sets `document.documentElement.classList` (`dark` on/off) and persists to `localStorage`.
- `theme-toggle.tsx` uses `useSyncExternalStore` to render a placeholder button until hydration to prevent flash.

### Design tokens — `app/globals.css`
- Tailwind v4 entry point (`@import "tailwindcss"`).
- Light + dark token sets via CSS variables (`--background`, `--foreground`, `--primary`, `--secondary`, `--muted`, `--text-secondary`, `--glass-bg`, `--glass-border`, `--card-border`, `--shadow-float`, `--shadow-glow`, `--grid-line`, `--border`, `--input-background`).
- `@theme inline` block re-exposes tokens to Tailwind via `--color-background`, `--color-foreground`, `--font-sans`.
- Utility classes:
  - `.glass-panel` — translucent background, soft border, `backdrop-filter: blur(16px)`, floating shadow
  - `.tech-grid-bg` — graph-paper style grid
  - `.interactive-card` + `.interactive-glow` — wraps cards with a mouse-tracked spotlight glow (uses CSS variables `--mouse-x` / `--mouse-y` set by JS)
  - `.section-wrap`, `.ui-page-space`, `.ui-card-pad` — consistent layout containers
  - `.sub-heading` — small uppercase eyebrow type
- Honors `prefers-reduced-motion` (forces near-instant animations) and `pointer: coarse` (hides the custom cursor on touch devices).

### Global UI primitives — `components/ui/`

| Component | Behavior |
| --- | --- |
| `SpotlightCard` | Glass card with hover spotlight. On `pointermove`, sets `--mouse-x` / `--mouse-y` so the CSS `.interactive-glow::before` follows the cursor. Always tagged `data-cursor-hover="true"` so the custom cursor reacts. |
| `CustomCursor` | RAF loop animates a 6×6 dot (instant) and a 30×30 ring (lerped at 0.18). Ring expands to 36×36 over interactive elements (anchors, buttons, inputs, `[data-cursor-hover='true']`). Auto-disabled on touch via `(pointer: coarse)`. Uses `transform: translate3d` and `will-change` for smooth GPU compositing. |
| `FloatingShapes` | 9 animated SVG/div shapes (hexagons, circles, triangles, squares) with infinite `rotate + scale + opacity` loops. Pinned full-screen, `pointer-events: none`, `z-0`. Opacity stays in `[0.03, 0.08]` so it's a faint background texture. |
| `TechMarquee` | Duplicates the tag list and animates `x` from `0%` to `-50%` (or reversed) over 24s for an infinite scrolling row. |
| `ThemeToggle` | Sun/Moon switch with a hydration-safe placeholder. |
| `AuroraBackground` | (Available but unmounted) Three colored radial blobs gently drifting via Framer Motion. |

### Layout — `components/layout/`
- **Navbar** (`navbar.tsx`)
  - Fixed at the top with a glass pill container.
  - Desktop: 5 items (Home, Journey, Work, Metrics, Contact), `motion.div` `layoutId="navbar-indicator"` smoothly slides between active items.
  - Mobile: hamburger (`Menu` / `X`) opens a 2-column grid menu with `AnimatePresence`.
  - Always shows the `ThemeToggle`.
- **Footer** (`footer.tsx` + `footer-sections.tsx`)
  - 3 columns: profile (with copy-email button using `navigator.clipboard`), explore links (active highlighted via `usePathname`), connect (LinkedIn/GitHub/Instagram via `react-icons/fa6`).
  - Glass background and dynamic copyright year.

### Home page — `components/home/`
- `HomeView`
  - Receives `projects`, `technologies`, `homeContent` from the server.
  - Builds `trustCards` by zipping homepage trusted-company entries with cycling icons (`Globe2`, `Zap`, `Activity`, `Code2`).
  - Tracks expanded state per testimonial in `useState<Record<number, boolean>>`.
  - Renders five sections in order:
    1. **HeroSection** — animated headline, eyebrow, two stat chips (`projectCount+ production-ready builds`, `Typical response: under 24 hours`), Explore Work + Contact Me CTAs, hero portrait `next/image priority` with optional reduced-motion-aware glow pulse.
    2. **BuildStackDNASection** — preferred architecture combos in a `TechMarquee`.
    3. **CoreTechnologiesSection** — two opposing infinite marquees of tech badges (42s/38s) inside a `SpotlightCard`, plus a "Current Focus" card.
    4. **TrustedCompaniesSection** — desktop infinite marquee at 34s; mobile two-row marquee (forward 26s + reverse 24s); animated radial blob background that respects `useReducedMotion`.
    5. **TestimonialsSection** — 3-column grid of `SpotlightCard`s, "More / Show less" toggle when text > 180 chars, 5-star row, and a quote glyph.

### Journey page — `components/journey/`
- `JourneyView` uses `useScroll({ target: containerRef, offset: ["start start", "end end"] })` to compute `lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])`. The vertical line fills as you scroll.
- Each `JourneyTimelineItem` is a glass card with a glowing colored circle + Briefcase icon, animating in on viewport enter (`whileInView`).

### Work pages — `components/work/`
- `/projects` is a CSS columns masonry layout with `SpotlightCard`s. Each card has the project image (`next/image fill`, `getSafeImageSrc`), trimmed description, derived meta (role/year/status/duration based on `displayOrder`), tech badges with color-mixed backgrounds, and a "View Case Study" pill.
- `/work/[slug]` — `ProjectDetailView`:
  - **ProjectHeroBanner**: 70vh hero with parallax (`y: 0%→50%`) and fading opacity tied to scroll, gradient bottom mask, big title, tagline, "Back to Work" pill.
  - **ProjectOverviewAndInnovations**: prose + 3 feature cards (`SpotlightCard`).
  - **ProjectResultsSection**: 3 KPIs (Page Speed, Engagement, Delivery) with derived static values.
  - **ProjectStoryMode**: optional toggle revealing Problem / Constraints / Approach / Result step cards.
  - **ProjectToc**: sticky in-page navigation.
  - **ProjectMetaCard**: role, timeline, tech chips, conditional Live Preview / Source Code buttons.

### Metrics page — `components/metrics/`
- `MetricsView` lays out four cards:
  - **ContributionsCard**: 365-cell heatmap (7 rows × 53 cols) generated from event data. Each cell animates in with a `delay: index * 0.001` cascade. Color level computed in `lib/github.ts::countToLevel`.
  - **LanguageBreakdownCard**: Recharts donut (`PieChart`/`Pie`/`Cell`) for top-4 repo languages.
  - **ImpactCard**: animated big numbers for repos and stars.
  - **RoleSkillMapCard**: 4 capability clusters (Frontend / Backend / DevOps / AI) with animated progress bars.

### Contact page — `components/contact/contact-form.tsx`
- Sticky info column + 3 small "Response Window / Based In / Best For" cards.
- 4 intent quick-templates (`Hire`, `Freelance`, `Internship`, `Collab`) prefill the textarea.
- Inline validation: `name >= 2 chars`, regex email check.
- Submits JSON to `/api/contact`. States: `idle | loading | success | error` with messages.
- Animated Mail icon, copy-email button, social icons row at the bottom.

### Admin — `components/admin/`
- **`AdminDashboard`** orchestrates everything:
  - Maintains entity lists, form states, edit IDs, search/filter strings, panel-open state, last-saved timestamp, and refresh state.
  - `getHeaders()` injects `x-admin-token` (from the Security tab input) and `x-admin-user` (actor name) into every mutation request.
  - `refresh()` parallel-fetches `/api/projects`, `/api/technologies`, `/api/experiences`, `/api/home-content` with `cache: "no-store"`.
  - CRUD helpers `createEntity` / `patchEntity` / `deleteEntity` plus dedicated handlers for projects, technologies, experiences, and home content.
  - **Bulk operations**: `bulkDelete` (parallel deletes) and `bulkReorder` (parallel PATCH `displayOrder` ±1).
  - **Drag reorder** (`reorderByDrag`): sort by `displayOrder`, splice in memory, then persist new orders in parallel.
  - Memoized `filteredProjects`, `filteredTechnologies`, `filteredExperiences` driven by search/filter state; memoized `technologyCategories` and `experienceTimeframes` derived from data.
  - `isMountedRef` guards prevent state updates after unmount.

- **Tabs**:
  - `home-tab.tsx` — Hero image URL field with Cloudinary `CldUploadWidget` (loaded via `next/dynamic` with `ssr: false`); editable lists for trusted companies and testimonials with up/down move + delete + add; live preview pane.
  - `projects-tab.tsx` — Form (title/description/slug/image/links/displayOrder/techStack chips) + Cloudinary upload + filter/search list with native HTML5 drag-and-drop reordering (`draggable`, `onDragOver`, `onDrop`).
  - `technologies-tab.tsx` — Same pattern (name/category/color) with drag reorder.
  - `experiences-tab.tsx` — Same pattern (role/company/timeframe/description/color) with drag reorder.
  - `security-tab.tsx` — Inputs for `adminToken` and `adminActor` (no persistence; they live in component state for the session).

- **Shared admin UI** (`admin-ui.tsx`):
  - `DashboardHeaderCard` (title + Refresh button + last-saved label)
  - `SidebarTabs` (sticky on desktop)
  - `CollapsibleSectionCard` (chevron toggle)
  - `SearchField` (search-icon prefixed input)
  - `ColorSwatches` (preset palette)
  - `InlineToast` (success/error/info banner)

- **Defaults** in `constants.ts` give every form a clean starting state and keep all panels expanded by default.

---

## 7. Helpers (`lib/`) in detail

| File | Exports | Purpose |
| --- | --- | --- |
| `api-helpers.ts` | `jsonError`, `isMutationAllowed`, `getMutationActor` | Standardize error responses and admin-write auth |
| `content-types.ts` | `TechnologySummary`, `ProjectSummary`, `HomeContentSummary` | Frontend-facing types matching the slim shapes returned by `lib/content.ts` |
| `content.ts` | `getProjects`, `getProjectBySlug`, `getExperiences`, `getTechnologies`, `getHomeContent`, `fallbackHomeContent` | Server-only data loaders with hardcoded fallbacks |
| `dbConnect.js` | `default` | Cached Mongoose connection |
| `github.ts` | `getGitHubMetrics`, `GitHubMetrics` | Aggregates user info, top 100 repos, and 3 pages of public events into contribution levels, top-4 language slices, and impact totals. Uses `next: { revalidate: 3600 }` for ISR; falls back to a mocked dataset on failure. Adds `Authorization` header only if `GITHUB_TOKEN` is set. |
| `image.ts` | `getSafeImageSrc` | Allowlist-based image guard. Allows only `res.cloudinary.com` and `images.unsplash.com`, plus paths starting with `/`. Maps legacy `jkimage.*` references to the canonical `/jkimage.jpeg`. |
| `serialize.ts` | `toPlainData<T>` | Strips Mongoose internals via JSON round-trip so server components can safely hand objects to client components |
| `site-data.ts` | `coreTechs`, `timelinePoints` | Hardcoded fallbacks. `coreTechs` is consumed when DB has no Technology docs; `timelinePoints` is currently unreferenced in the codebase. |
| `utils.ts` | `cn` | Thin clsx wrapper (no `tailwind-merge` dependency) |

---

## 8. Configuration & deployment

### `next.config.ts`
Allows remote `next/image` from:
- `res.cloudinary.com`
- `images.unsplash.com`

### `tsconfig.json`
- `strict: true`, `target: ES2017`, `module: esnext`, `moduleResolution: bundler`, `jsx: react-jsx`, `incremental: true`.
- `paths: { "@/*": ["./*"] }` — every import like `@/lib/...` resolves from the project root.

### `eslint.config.mjs`
- Flat config combining `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`.
- Restores standard ignores (`.next/**`, `out/**`, `build/**`, `next-env.d.ts`).

### `postcss.config.mjs`
- Single plugin: `@tailwindcss/postcss`.

### `middleware.ts`
- Matcher: `/admin/:path*`.
- Returns 401 with `WWW-Authenticate: Basic` if `ADMIN_USERNAME` + `ADMIN_PASSWORD` are set and the supplied Basic header is missing/wrong.

### Deployment
- The codebase is Vercel-ready (default Next.js project structure). No `vercel.json`, no Dockerfile.

### Environment variables
| Variable | Used by | Purpose |
| --- | --- | --- |
| `MONGODB_URI` | `lib/dbConnect.js` | Required to connect to MongoDB |
| `ADMIN_USERNAME` / `ADMIN_PASSWORD` | `middleware.ts` | Basic auth on `/admin/*`. Both must be set to enable. |
| `ADMIN_TOKEN` | `lib/api-helpers.ts` | Required header for all mutation endpoints; if unset, mutations are open. |
| `GITHUB_USERNAME` (opt) | `lib/github.ts` | Default falls back to `octocat` |
| `GITHUB_TOKEN` (opt) | `lib/github.ts` | Authenticated GitHub API requests |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | `app/api/contact/route.ts` | SMTP for contact form |
| `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | `app/api/contact/route.ts` | Recipient + sender |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | admin tabs | Cloudinary unsigned upload preset for `CldUploadWidget` |

---

## 9. Performance characteristics

### Server / data
- **Parallel fetching** in `app/page.tsx` via `Promise.all([getProjects(), getTechnologies(), getHomeContent()])`.
- **Cached DB connection** (`lib/dbConnect.js`) avoids reconnecting on every request.
- **`.lean()`** queries return plain objects — lighter and faster than full Mongoose docs.
- **GitHub data** is cached at the framework level with `next: { revalidate: 3600 }`, so `/metrics` is served from cache for an hour.
- **`Promise.allSettled`-style** parallelism in admin (`refresh`, `bulkDelete`, `bulkReorder`).
- **Per-IP rate limit** on `/api/contact` (60s window) via in-memory `Map`. Note: this Map resets per cold start and isn't shared across instances — fine for single-instance hosting, weaker on serverless.

### Client / rendering
- **`next/image`** everywhere with `fill`, `sizes`, and `priority` on the hero portrait.
- **Allowlisted hosts** in `next.config.ts` so Next can run optimization on Cloudinary/Unsplash assets.
- **Font optimization** through `next/font/google` with a CSS variable (`--font-plus-jakarta`).
- **`useReducedMotion`** is respected in heavy hero / trusted-companies animations; CSS at-rule also reduces durations to ~0 globally for `prefers-reduced-motion`.
- **GPU-friendly cursor**: `transform: translate3d` + `will-change` in `CustomCursor`.
- **Lazy-loaded** Cloudinary widget via `next/dynamic` with `ssr: false` so it doesn't bloat the initial admin bundle.
- **Code-split per route** by Next App Router — public pages don't ship admin code.
- **Skeleton `loading.tsx`** files for `/projects` and `/admin` improve perceived load time.

### Things to watch
- The contributions heatmap renders 365 motion divs with staggered delays — fine for desktop, but a slight layout cost on slow devices.
- `floating-shapes` runs 9 long-running infinite animations; cheap on desktop, also bypassed by reduced motion.
- The in-memory rate-limit Map is not horizontally scalable.
- `JSON.parse(JSON.stringify(...))` in `toPlainData` is simple but allocates — acceptable at portfolio scale.

---

## 10. Security model

| Layer | Mechanism | Risk if misconfigured |
| --- | --- | --- |
| Admin **page** access | Basic auth in `middleware.ts` (only when both env vars are set) | If `ADMIN_USERNAME`/`ADMIN_PASSWORD` are missing in prod, `/admin` is publicly viewable. |
| Admin **mutation** access | `x-admin-token` header check in `lib/api-helpers.ts` (only when `ADMIN_TOKEN` is set) | If `ADMIN_TOKEN` is missing in prod, anyone can POST/PATCH/DELETE through `/api/*`. |
| Image source guard | `lib/image.ts::getSafeImageSrc` allowlists Cloudinary + Unsplash hosts and falls back to `/jkimage.jpeg` | Defense-in-depth alongside `next.config.ts` remote patterns |
| Email abuse | In-memory IP-keyed throttle (60s) on `/api/contact` | Insufficient on multi-instance / serverless cold starts |
| Audit trail | `changedBy` field on Project, Technology, Experience documents (taken from the `x-admin-user` header) | Optional informational, not security |

> **Recommended for production**: set all three of `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and `ADMIN_TOKEN`.

---

## 11. Key UX / interaction features

- **Glassmorphism** (translucent cards + backdrop blur)
- **Mouse-tracked spotlight** glow on every `SpotlightCard`
- **Custom animated cursor** (dot + lerped ring) that grows on interactive elements; auto-disabled on touch
- **Animated scroll** timeline on `/about` (gradient line fills with `useScroll`)
- **Parallax + fade hero** on `/work/[slug]`
- **Story Mode toggle** for project case studies
- **Infinite marquees** (3 separate ones on home: build stack, core technologies, trusted companies)
- **Active route indicator** in the navbar (Framer `layoutId`)
- **Theme toggle** with localStorage persistence and OS-level preference fallback
- **Reduced-motion respect** at both CSS and Framer Motion levels
- **Drag-to-reorder** in admin (native HTML5 DnD)
- **Cloudinary image uploads** directly from the admin
- **Copy-to-clipboard** affordances on email addresses (footer + contact form)
- **Quick-start intent templates** in the contact form

---

## 12. Conventions, gaps & known tech debt

**Mixed JS/TS** — `models/*.js` and `lib/dbConnect.js` are JavaScript; everything else is TypeScript. `tsconfig.json` has `allowJs: true` so it works, but unifying to TypeScript would tighten safety.

**Unused dependencies** — `@splinetool/react-spline`, `lottie-react`, and `next-themes` are installed but not referenced in source. `cloudinary` (the base SDK) is installed but only `next-cloudinary` is used in the UI; the base SDK could be needed for server-side signed uploads in the future.

**Dead export** — `lib/site-data.ts::timelinePoints` is exported but unreferenced (the live timeline uses DB experiences).

**No tests** — no Jest/Vitest/Playwright; no `test` script.

**No formatter** — no Prettier config.

**Boilerplate README** — the `README.md` is the default `create-next-app` template. This `PROJECT_OVERVIEW.md` supersedes it.

**Rate limiting** — in-memory Map; replace with Redis/Upstash for serverless/multi-instance deployments.

**Admin token in component state** — `adminToken` lives in the `AdminDashboard` component state and is supplied via the Security tab; it is not persisted, which is intentional but means refreshing the page requires re-entry.

---

## 13. Onboarding path (where to start reading, in order)

1. `package.json` — see what you're working with
2. `app/layout.tsx` + `app/page.tsx` + `app/globals.css` — the app shell, theme tokens, and home entry
3. `lib/content.ts` + `lib/dbConnect.js` + one model (`models/Project.js`) — server data flow
4. `components/home/home-view.tsx` + `components/home/home-sections.tsx` — biggest UI composition example
5. `components/ui/spotlight-card.tsx` + `app/globals.css` (`.interactive-glow`) — the signature visual pattern
6. `app/api/projects/route.ts` + `lib/api-helpers.ts` + `middleware.ts` — request lifecycle and security
7. `components/admin/admin-dashboard.tsx` + one tab (e.g. `tabs/projects-tab.tsx`) — admin CMS pattern
8. `lib/github.ts` + `components/metrics/metrics-sections.tsx` — read-through caching and data viz

---

## 14. Quick command reference

```bash
# Install dependencies (npm/yarn/pnpm/bun all work)
npm install

# Run dev server (default http://localhost:3000)
npm run dev

# Production build + start
npm run build
npm start

# Lint
npm run lint
```

Required `.env.local` for full functionality:

```env
MONGODB_URI=mongodb+srv://...

ADMIN_USERNAME=...
ADMIN_PASSWORD=...
ADMIN_TOKEN=...

GITHUB_USERNAME=jalal1122
GITHUB_TOKEN=ghp_...        # optional but recommended

SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=...
SMTP_PASS=...
CONTACT_TO_EMAIL=jk4350649@gmail.com
CONTACT_FROM_EMAIL=no-reply@yourdomain.com

NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=...
```

---

_Generated as a single source of truth for the `mjportfoliov3` codebase._
