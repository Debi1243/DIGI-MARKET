# Orbitra — Digital Marketing & IT Services Website

A Next.js 15 (App Router, TypeScript, Tailwind CSS v4) agency site inspired by the structure of itinfoways.com/services, with original copy and branding.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Pages
- `/` Home: hero, clients marquee, scroll-scrubbed intro + counters, services hover list, pinned horizontal process, stacking "why us" cards, work showcase, tech marquee, testimonials carousel, FAQ, clip-path CTA
- `/services` All 15 services with animated category filter and 3D tilt + spotlight cards
- `/services/[slug]` 15 statically generated service pages (stats, features, deliverables, process, FAQ, related)
- `/about` Mission/vision/values, scroll-drawn timeline
- `/work` Portfolio with parallax browser mockups
- `/contact` Animated form with floating labels, chips, budget selector, validation and success state

## Animation stack
- **Lenis** smooth scrolling synced to the GSAP ticker (`src/components/SmoothScroll.tsx`)
- **GSAP + ScrollTrigger** pinned horizontal process and scrubbed text reveal
- **Framer Motion** split-text reveals, magnetic buttons, custom cursor, page transitions, layout animations, parallax, preloader
- Respects `prefers-reduced-motion`

## Customise
- All copy, services, stats, projects and testimonials live in `src/lib/data.ts`.
- Brand colours are tokens in `src/app/globals.css` (`--color-lime`, `--color-violet`, `--color-cyan`, …).
- The contact form currently simulates submission (`src/components/sections/ContactForm.tsx`); wire it to an API route, Formspree, Resend, etc.
