import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import ProcessSteps from "@/components/sections/ProcessSteps";
import ClosingCta from "@/components/sections/ClosingCta";
import { categories, services, servicesIn, tech } from "@/lib/data";

const description =
  "Fifteen services across marketing, design, development and industry software. Pick one, or let one team run your whole digital stack.";

export const metadata: Metadata = {
  title: "Services",
  description,
  alternates: { canonical: "/services" },
  openGraph: { title: "Services", description, url: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Services"
        title={`${services.length} ways we help your business grow.`}
        intro="From the first impression to the back office. Pick a single service, or let us run the whole digital stack, from marketing and design to apps and industry software."
      >
        <nav aria-label="Service categories" className="mt-10">
          <ul className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <li key={c.slug}>
                <a
                  href={`#${c.slug}`}
                  className="inline-flex h-10 items-center gap-2 rounded-md border border-border px-4 text-sm transition-colors hover:border-fg"
                >
                  {c.name}
                  <span className="tabular text-muted">{servicesIn(c.name).length}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      {categories.map((c, ci) => (
        <section key={c.slug} id={c.slug} aria-labelledby={`${c.slug}-title`} className="border-t border-border py-14 md:py-20">
          <div className="container-page grid gap-y-8 lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-3">
              <div className="lg:sticky lg:top-28">
                <p className="label text-muted">0{ci + 1}</p>
                <h2 id={`${c.slug}-title`} className="mt-4 font-display text-[clamp(1.875rem,1.5rem+1.1vw,2.5rem)] font-medium leading-[1.05] tracking-[-0.025em]">
                  {c.name}
                </h2>
                <p className="mt-4 max-w-[32ch] text-sm leading-relaxed text-muted">{c.summary}</p>
              </div>
            </div>
            <ul className="border-t border-border lg:col-span-9 lg:border-t-0">
              {servicesIn(c.name).map((s) => {
                const Icon = s.icon;
                return (
                  <li key={s.slug} className="border-b border-border lg:first:border-t">
                    <Link
                      href={`/services/${s.slug}`}
                      className="group grid grid-cols-[auto_1fr_auto] items-start gap-x-5 gap-y-2 py-6 md:grid-cols-[auto_minmax(0,1fr)_minmax(0,1.1fr)_auto] md:items-center md:gap-x-8 md:py-7"
                    >
                      <span className="grid size-10 place-items-center rounded-md border border-border text-muted transition-colors group-hover:border-fg group-hover:text-fg">
                        <Icon aria-hidden className="size-4.5" strokeWidth={1.5} />
                      </span>
                      <span className="font-display text-xl font-medium tracking-[-0.015em] transition-colors group-hover:text-accent md:text-2xl">
                        {s.title}
                      </span>
                      <span className="col-start-2 row-start-2 text-sm leading-relaxed text-muted md:col-start-3 md:row-start-1">
                        {s.short}
                      </span>
                      <ArrowUpRight
                        aria-hidden
                        className="col-start-3 row-start-1 mt-1 size-5 text-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent md:col-start-4 md:mt-0"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      ))}

      <ProcessSteps />

      <section aria-labelledby="tools-title" className="border-t border-border py-14 md:py-20">
        <div className="container-page grid gap-y-6 lg:grid-cols-12 lg:gap-x-10">
          <h2 id="tools-title" className="label text-muted lg:col-span-3 lg:pt-1.5">
            Tools we work with
          </h2>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 lg:col-span-9">
            {tech.map((t) => (
              <li key={t} className="font-display text-lg font-medium tracking-[-0.01em] text-muted md:text-xl">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
