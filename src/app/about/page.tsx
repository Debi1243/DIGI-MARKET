import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import ClosingCta from "@/components/sections/ClosingCta";
import { formatStat, milestones, pillars, stats, whyUs } from "@/lib/data";

const description =
  "Designers, engineers and marketers in Bhubaneswar who have spent more than a decade turning complex problems into simple, useful products.";

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: { canonical: "/about" },
  openGraph: { title: "About", description, url: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About"
        title="A young team with a decade of experience."
        intro="We are designers, engineers and marketers who love turning complex problems into simple, beautiful products. Curious by nature, obsessed with results."
      />

      <section aria-labelledby="story-title" className="border-t border-border section-y">
        <div className="container-page grid gap-y-12 lg:grid-cols-12 lg:gap-x-10">
          <h2 id="story-title" className="label text-muted lg:col-span-3 lg:pt-3">
            Our story
          </h2>
          <div className="lg:col-span-9">
            <p className="max-w-[30ch] font-display text-[clamp(1.625rem,1.2rem+1.8vw,2.75rem)] font-medium leading-[1.15] tracking-[-0.025em]">
              For more than a decade we have partnered with startups, hospitals, schools, hotels and retailers to turn bold
              ideas into software and campaigns that people love to use.
            </p>
            <p className="mt-6 text-lead text-muted">One team. Every channel. Measurable growth.</p>
            <dl className="mt-14 grid grid-cols-2 gap-px bg-border md:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col-reverse gap-2 bg-bg py-6 pr-4 even:pl-5 md:even:pl-6 md:[&:nth-child(3)]:pl-6">
                  <dt className="text-sm text-muted">{s.label}</dt>
                  <dd className="tabular font-display text-[2.5rem] font-medium leading-none tracking-[-0.03em]">{formatStat(s)}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section aria-label="Mission, vision and values" className="border-t border-border section-y">
        <div className="container-page grid gap-px bg-border md:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.title} className="reveal bg-bg py-8 md:px-8 md:first:pl-0 md:last:pr-0">
              <h2 className="label text-muted">{p.title}</h2>
              <p className="mt-6 font-display text-[1.375rem] font-medium leading-snug tracking-[-0.015em]">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="journey-title" className="border-t border-border section-y">
        <div className="container-page grid gap-y-10 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-3">
            <p className="label text-muted lg:pt-3">Our journey</p>
          </div>
          <div className="lg:col-span-9">
            <h2 id="journey-title" className="font-display text-h2 font-medium">
              A decade of shipping.
            </h2>
            <ol className="mt-12 border-t border-border md:mt-16">
              {milestones.map((m) => (
                <li key={m.year} className="reveal grid gap-2 border-b border-border py-7 md:grid-cols-[10rem_1fr_1.4fr] md:items-baseline md:gap-8">
                  <p className="tabular font-display text-3xl font-medium tracking-[-0.03em] text-muted md:text-4xl">{m.year}</p>
                  <h3 className="font-display text-h3 font-medium">{m.title}</h3>
                  <p className="leading-relaxed text-muted">{m.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section aria-labelledby="why-title" className="surface-inverse">
        <div className="container-page section-y grid gap-y-10 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-3">
            <p className="label text-inverse-muted lg:pt-3">Why Orbitra</p>
          </div>
          <div className="lg:col-span-9">
            <h2 id="why-title" className="max-w-[20ch] font-display text-h2 font-medium">
              Four reasons teams stay with us for years.
            </h2>
            <p className="mt-6 max-w-[58ch] text-lead text-inverse-muted">
              We are not the cheapest and we are not the biggest. We are the partner who answers the phone, ships on time and
              cares about your numbers as much as you do.
            </p>
            <ol className="mt-12 grid gap-px bg-inverse-border md:mt-16 md:grid-cols-2">
              {whyUs.map((w, i) => (
                <li key={w.title} className="bg-inverse py-8 md:odd:pr-10 md:even:pl-10">
                  <p className="label tabular text-inverse-muted">0{i + 1}</p>
                  <h3 className="mt-6 font-display text-h3 font-medium">{w.title}</h3>
                  <p className="mt-3 max-w-[42ch] leading-relaxed text-inverse-muted">{w.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
