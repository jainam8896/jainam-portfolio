# Jainam Shah — Developer Portfolio

A static, single-page portfolio for a backend engineer. Dark by default with a
light mode, monospace accents, and an animated terminal in the hero that
"curls" an API describing me.

Built with **Vite + React + TypeScript**, **Tailwind CSS v4**, **Framer Motion**
and **lucide-react**. No backend, no database — it deploys to Vercel or Netlify
for free.

---

## Table of contents

- [Running it locally](#running-it-locally)
- [Editing the content](#editing-the-content)
- [Deploying to Vercel](#deploying-to-vercel)
- [Deploying to Netlify](#deploying-to-netlify)
- [Project structure](#project-structure)
- [How the performance and accessibility work](#how-the-performance-and-accessibility-work)
- [Measured scores](#measured-scores)
- [Troubleshooting](#troubleshooting)

---

## Running it locally

You need **Node.js 20.19+** (or 22.12+) and npm.

```bash
npm install
npm run dev
```

Open <http://localhost:5173>.

| Script            | What it does                                         |
| ----------------- | ---------------------------------------------------- |
| `npm run dev`     | Dev server with hot reload                            |
| `npm run build`   | Type-checks (`tsc -b`), then builds to `dist/`        |
| `npm run preview` | Serves the built `dist/` locally — test before deploy |
| `npm run lint`    | ESLint over the whole project                         |
| `npm run format`  | Prettier over the whole project                       |

Always run `npm run build` before deploying: it type-checks first, so a build
failure means there is a real TypeScript error to fix.

---

## Editing the content

**Everything you will want to change lives in one file: [`src/data/portfolio.ts`](src/data/portfolio.ts).**
You should not need to touch a component to update the site.

That file exports:

| Export         | Controls                                                           |
| -------------- | ------------------------------------------------------------------ |
| `site`         | Name, role, tagline, one-line pitch, location, resume path, URL     |
| `contact`      | Email, phone, LinkedIn, GitHub                                      |
| `navLinks`     | The navbar items (each `id` must match a section `id`)              |
| `heroCommand`  | The command typed in the hero terminal                              |
| `apiResponse`  | The JSON body the terminal "returns"                                |
| `about`        | The About paragraphs and the four stat cards                        |
| `jobs`         | The experience timeline                                             |
| `caseStudies`  | The four Featured Work cards, including their flow diagrams         |
| `skillGroups`  | The skills cards and their icons                                    |
| `education`    | The education cards                                                 |
| `seo`          | Title and meta description used by the SEO copy                     |

### Common edits

**Add a job.** Append an object to `jobs`. Set `current: true` on your newest
role to get the pulsing timeline dot and the "current" badge.

**Add a case study.** Append to `caseStudies`. The `flow` array draws the little
architecture diagram; each node takes a `kind` that controls its colour:

| `kind`    | Appearance              | Use for                      |
| --------- | ----------------------- | ---------------------------- |
| `source`  | Solid border            | Where the data comes from    |
| `process` | Muted                   | A transformation or step     |
| `store`   | Accent-coloured         | A datastore — the key step   |
| `output`  | Solid border            | Where the data ends up       |

Keep node labels short (roughly 18 characters or fewer). They wrap onto a second
row on wide screens and stack vertically on phones, but short labels look best.

**Change the accent colour.** Edit `--accent` (and `--accent-fg`,
`--accent-soft`, `--accent-ring`) in [`src/index.css`](src/index.css) — once
under `:root` for light mode and once under `.dark`. Everything else follows,
because no component hardcodes a colour.

**Change the SEO text.** `src/data/portfolio.ts` holds the copy, but the tags
the crawler actually reads are hand-written in [`index.html`](index.html) — this
is a static site with no runtime head management, so update both.

### The social preview image

`public/og-image.png` (1200×630) is already generated and is what the meta tags
point at. `public/og-image.svg` is its source artwork — **only re-export if you
change the design**, since social networks do not render SVG previews. Any of
these work:

```bash
# with ImageMagick
magick -background none public/og-image.svg -resize 1200x630 public/og-image.png

# with rsvg-convert
rsvg-convert -w 1200 -h 630 public/og-image.svg -o public/og-image.png
```

Or open the SVG in a browser sized to 1200×630 and screenshot it.

### Icons

Skill group icons come from [lucide-react](https://lucide.dev/icons). Import the
one you want at the top of `portfolio.ts` and set it as the group's `icon`.

### The contact section

There is no contact form — the Contact section is a single centred card listing
email, phone and LinkedIn, with copy-to-clipboard buttons and two call-to-action
buttons. Add or remove a channel by editing the `channels` array at the top of
[`Contact.tsx`](src/components/Contact.tsx); the GitHub row appears on its own
once `contact.github` is filled in. Because there is no form, the site needs no
environment variables and no `.env` file at all.

---

## Deploying to Vercel

**Before you deploy:** work through the TODOs in `src/data/portfolio.ts` and
replace `public/Jainam_Shah_Resume.pdf` with your current resume.

### Option A — from the dashboard (easiest)

1. Push this folder to a GitHub repository.

   ```bash
   git init
   git add .
   git commit -m "Portfolio site"
   git branch -M main
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```

2. Go to <https://vercel.com/new> and import the repository.
3. Vercel detects Vite automatically. Confirm the settings:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
   - **Install command:** `npm install`
4. Click **Deploy**. You get a `*.vercel.app` URL in about a minute.
   There are no environment variables to set.
5. **Settings → Domains** to attach a custom domain.
6. Now go back and update the live URL in three places, then redeploy:
   - `site.url` in `src/data/portfolio.ts`
   - the `canonical`, `og:url`, `og:image` and `twitter:image` tags plus the
     JSON-LD `url` in `index.html`
   - the `Sitemap:` line in `public/robots.txt` and the `<loc>` in
     `public/sitemap.xml`

Every push to `main` redeploys automatically.

### Option B — from the CLI

```bash
npm i -g vercel
vercel          # preview deployment, answers get saved
vercel --prod   # production deployment
```

### Why no `vercel.json`

This is a true single-page site with no client-side router, so it needs no
rewrite rules. Vercel's Vite preset handles the rest.

---

## Deploying to Netlify

Either drag the `dist/` folder onto <https://app.netlify.com/drop>, or connect
the repository with:

- **Build command:** `npm run build`
- **Publish directory:** `dist`

The site needs no environment variables.

---

## Project structure

```
.
├── public/
│   ├── Jainam_Shah_Resume.pdf   # TODO: replace with your current resume
│   ├── favicon.svg              # "JS" monogram
│   ├── og-image.svg             # source for the social preview image
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── Navbar.tsx  Hero.tsx  About.tsx  Experience.tsx
│   │   ├── Work.tsx  Skills.tsx  Education.tsx  Contact.tsx  Footer.tsx
│   │   └── ui/                  # reusable pieces
│   │       ├── Button.tsx       # Button + ButtonLink, three variants
│   │       ├── Card.tsx
│   │       ├── FlowDiagram.tsx  # the architecture diagrams
│   │       ├── LazySection.tsx  # defers below-the-fold sections
│   │       ├── Reveal.tsx       # scroll-into-view fade
│   │       ├── Section.tsx      # section landmark + page rhythm
│   │       ├── SectionHeading.tsx
│   │       ├── Tag.tsx          # Tag + TagList
│   │       ├── Terminal.tsx     # the hero terminal
│   │       └── ThemeToggle.tsx
│   ├── data/portfolio.ts        # ALL CONTENT LIVES HERE
│   ├── hooks/
│   │   ├── useActiveSection.ts  # navbar active-link tracking
│   │   ├── useInView.ts
│   │   └── useTheme.ts
│   ├── lib/
│   │   ├── deferredMount.ts     # shared "visitor has engaged" signal
│   │   ├── motionFeatures.ts    # async-loaded Framer Motion features
│   │   └── utils.ts             # cn(), copyToClipboard()
│   ├── types.ts                 # the shape of everything in portfolio.ts
│   ├── App.tsx
│   ├── index.css                # design tokens + base styles
│   └── main.tsx
├── index.html                   # SEO tags, JSON-LD, no-flash theme script
└── vite.config.ts
```

---

## How the performance and accessibility work

Worth knowing before you change things, so you do not undo it by accident.

**Nothing above the fold waits for JavaScript animation.** The hero's entrance
is a CSS keyframe (`.animate-rise` in `index.css`), and the headline, tagline
and pitch have no entrance animation at all. An element fading up from
`opacity: 0` does not count as painted, so animating the pitch paragraph — the
page's Largest Contentful Paint element — measurably delayed it (2.6s → 0.77s
once removed). If you add a fade back to those three elements, expect LCP to
regress.

**Framer Motion loads in its own chunk.** The app imports `m` plus `LazyMotion`
rather than `motion`, and the DOM feature bundle is fetched asynchronously via
`src/lib/motionFeatures.ts`. Importing `motion` directly anywhere would pull the
whole library back into the entry bundle. `LazyMotion` runs in `strict` mode, so
`motion.*` throws instead of silently regressing the bundle. Layout animations
(`layoutId`) need the bigger `domMax` bundle and are deliberately not used — the
navbar's active underline is a CSS transform instead.

**The 3D scroll effects live in three places**, and all three disable
themselves for `prefers-reduced-motion`:

| What | Where | Tuning |
| --- | --- | --- |
| Cards swing up in 3D as they scroll into view | `Reveal` with `variant="depth"` | `VARIANTS.depth` in [`Reveal.tsx`](src/components/ui/Reveal.tsx) — `rotateX` is the tilt angle |
| Cards tilt towards the mouse | `<Tilt>` wrapper + [`useTilt.ts`](src/hooks/useTilt.ts) | the `max` prop (degrees) on each `<Tilt>` |
| The hero terminal tips back as you scroll past | [`ScrollDepth.tsx`](src/components/ui/ScrollDepth.tsx) | its `rotate` and `lift` props in `Hero.tsx` |

Three rules worth keeping if you tune them:

- **Keep `variant="depth"` off body copy.** It is applied to card grids only.
  Rotating a paragraph while it fades makes it unreadable on the way past —
  `Reveal`'s default `fade` variant exists for prose and the timeline.
- **Pointer tilt never attaches on touch devices.** `useTilt` checks
  `(hover: hover) and (pointer: fine)` first, because a touchscreen has no
  "pointer leave" event, so a tapped card would stay stuck at an angle.
- **The element rect is measured on pointer *enter*, not on every move.**
  Calling `getBoundingClientRect()` inside a move handler forces a layout on
  every mouse event, which is how tilt effects end up janky.

Everything animates `transform` and `opacity` only — both composited, so
scrolling costs no layout or paint. Measured cost of the whole 3D layer:
about 20ms of blocking time, with LCP and CLS unchanged.

**Below-the-fold sections are code-split and mounted late.** Each is a
`React.lazy` chunk, mounted when it approaches the viewport *or* on the
visitor's first interaction, whichever comes first (`LazySection` +
`deferredMount.ts`). The interaction trigger exists because the navbar anchors
and the active-section observer need the real `<section id>` in the DOM. Each
placeholder reserves its approximate height, which is why CLS is ~0.

**The terminal animates through refs, not state.** Typing 44 characters through
`useState` would be 44 render passes in the first seconds of page life. It
writes to `textContent` and `style.opacity` directly instead.

**Accessibility.** Semantic landmarks, a skip link, labelled form fields, an
`aria-live` feedback on the copy-to-clipboard buttons,
`aria-expanded`/`aria-controls` on the hamburger, and visible focus rings. The terminal and the flow diagrams are
`aria-hidden` with a plain-sentence `sr-only` equivalent beside them, because
reading animated JSON punctuation aloud is miserable. `prefers-reduced-motion`
is honoured globally in `index.css` and through Framer Motion's
`MotionConfig reducedMotion="user"`; the terminal jumps straight to its finished
state.

---

## Measured scores

Lighthouse against `npm run preview`, Chrome headless:

| Category       | Desktop | Mobile |
| -------------- | ------- | ------ |
| Performance    | 99      | 94     |
| Accessibility  | 100     | 100    |
| Best Practices | 100     | 100    |
| SEO            | 100     | 100    |

Desktop was stable at 99 across runs (FCP/LCP ~0.22s, TBT ~90ms, CLS ~0).
Accessibility, Best Practices and SEO were 100 on every run.

The **mobile performance figure is the best of several runs and you should
re-measure it yourself.** Mobile Lighthouse applies a 4× CPU slowdown, which
makes Total Blocking Time extremely sensitive to whatever else the machine is
doing — identical builds scored anywhere from 79 to 94 on a developer machine
with a browser open. Measure on a quiet machine, or use
[PageSpeed Insights](https://pagespeed.web.dev) against the deployed URL, which
is what actually matters.

[axe-core](https://github.com/dequelabs/axe-core) reports **zero violations**
(WCAG 2.0/2.1 A and AA plus best-practice rules) in both themes at 375px and
1280px, colour contrast included.

---

## Troubleshooting

**The resume button downloads the wrong file.** Replace
`public/Jainam_Shah_Resume.pdf`. If you rename it, update `site.resumePath`.

**`npm audit` reports moderate vulnerabilities.** They all come from a
`minimatch` ReDoS advisory reached through ESLint. ESLint is a development
dependency — it is not part of the deployed site, and no patched release is
available upstream yet. `npm audit fix --force` would downgrade ESLint and break
linting; leave it.

**Fonts look wrong offline / in a fresh clone.** Run `npm install`. Inter and
JetBrains Mono are self-hosted through `@fontsource-variable`, not fetched from
Google Fonts.

---

Built with React, TypeScript and Tailwind CSS.
