import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import ProcessSteps from "@/components/sections/ProcessSteps";
import Faq from "@/components/sections/Faq";
import ClosingCta from "@/components/sections/ClosingCta";
import { ButtonLink } from "@/components/ui/Button";
import JsonLd from "@/components/shared/JsonLd";
import { brand, categories, formatStat, getService, services } from "@/lib/data";
import { absoluteUrl, siteUrl } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  const path = `/services/${s.slug}`;
  return {
    title: s.title,
    description: s.short,
    alternates: { canonical: path },
    openGraph: { title: s.title, description: s.short, url: path },
  };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const category = categories.find((c) => c.name === s.category);
  const sameCategory = services.filter((x) => x.slug !== s.slug && x.category === s.category);
  const related = [...sameCategory, ...services.filter((x) => x.category !== s.category)].slice(0, 3);
  const Icon = s.icon;

  return (
    <>
      <PageHero
        label={s.title}
        crumbs={[
          { href: "/services", label: "Services" },
          { href: `/services#${category?.slug ?? ""}`, label: s.category },
        ]}
        title={s.title}
        intro={s.intro}
      >
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/contact" size="lg">Get a quote</ButtonLink>
          <ButtonLink href="/work" size="lg" variant="secondary" arrow={false}>See case studies</ButtonLink>
        </div>
      </PageHero>

      <section aria-label="At a glance" className="border-y border-border">
        <div className="container-page grid lg:grid-cols-12 lg:gap-x-10">
          <div className="hidden items-center gap-3 lg:col-span-3 lg:flex">
            <span className="grid size-10 place-items-center rounded-md border border-border">
              <Icon aria-hidden className="size-4.5" strokeWidth={1.5} />
            </span>
            <span className="label text-muted">{s.category}</span>
          </div>
          <dl className="grid gap-px bg-border sm:grid-cols-3 lg:col-span-9">
            {s.stats.map((st) => (
              <div key={st.label} className="flex flex-col-reverse gap-2 bg-bg py-7 sm:px-6 sm:first:pl-0 md:py-9">
                <dt className="text-sm text-muted">{st.label}</dt>
                <dd className="tabular font-display text-[clamp(2rem,1.5rem+2vw,3.25rem)] font-medium leading-none tracking-[-0.03em]">
                  {formatStat(st)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="included-title" className="section-y">
        <div className="container-page grid gap-y-12 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-3">
            <p className="label text-muted lg:pt-3">What&apos;s included</p>
          </div>
          <div className="lg:col-span-9">
            <h2 id="included-title" className="max-w-[20ch] font-display text-h2 font-medium">
              Built around your goals, not a template.
            </h2>
            <ol className="mt-12 grid gap-px bg-border md:mt-16 md:grid-cols-2">
              {s.features.map((f, i) => (
                <li key={f.title} className="reveal bg-bg py-8 md:odd:pr-10 md:even:pl-10">
                  <p className="label tabular text-muted">0{i + 1}</p>
                  <h3 className="mt-6 font-display text-h3 font-medium">{f.title}</h3>
                  <p className="mt-3 max-w-[42ch] leading-relaxed text-muted">{f.text}</p>
                </li>
              ))}
            </ol>

            <div className="mt-16 rounded-lg border border-border bg-surface p-6 md:mt-20 md:p-10">
              <h3 className="label text-muted">Deliverables</h3>
              <ul className="mt-6 grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
                {s.deliverables.map((d) => (
                  <li key={d} className="flex items-center gap-3 text-[0.9375rem]">
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-fg text-bg">
                      <Check aria-hidden className="size-3" strokeWidth={2.5} />
                    </span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ProcessSteps />
      <Faq items={s.faqs} />

      <section aria-labelledby="related-title" className="section-y border-t border-border">
        <div className="container-page grid gap-y-10 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-3">
            <p className="label text-muted lg:pt-3">Pairs well with</p>
          </div>
          <div className="lg:col-span-9">
            <h2 id="related-title" className="font-display text-h2 font-medium">Related services</h2>
            <ul className="mt-10 border-t border-border md:mt-14">
              {related.map((r) => (
                <li key={r.slug} className="border-b border-border">
                  <Link href={`/services/${r.slug}`} className="group flex items-center justify-between gap-6 py-6">
                    <span>
                      <span className="block font-display text-xl font-medium tracking-[-0.015em] transition-colors group-hover:text-accent md:text-2xl">
                        {r.title}
                      </span>
                      <span className="mt-1 block text-sm text-muted">{r.short}</span>
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      className="size-5 shrink-0 text-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ClosingCta title={`Let's talk about ${s.title}.`} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Service",
              name: s.title,
              description: s.intro,
              serviceType: s.category,
              url: absoluteUrl(`/services/${s.slug}`),
              areaServed: "IN",
              provider: { "@type": "ProfessionalService", "@id": `${siteUrl}/#organization`, name: brand.full },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
                { "@type": "ListItem", position: 2, name: "Services", item: absoluteUrl("/services") },
                { "@type": "ListItem", position: 3, name: s.title, item: absoluteUrl(`/services/${s.slug}`) },
              ],
            },
          ],
        }}
      />
    </>
  );
}
