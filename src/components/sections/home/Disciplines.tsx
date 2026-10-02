import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { TextLink } from "@/components/ui/Button";
import { categories, services, servicesIn } from "@/lib/data";

export default function Disciplines() {
  return (
    <section aria-labelledby="disciplines-title" className="section-y border-t border-border">
      <div className="container-page">
        <SectionHeader
          id="disciplines-title"
          label="What we do"
          title="Four disciplines. One accountable team."
          intro="Most growing businesses juggle an agency, a developer and a software vendor. We bring all of it under one roof, so strategy, design and engineering pull in the same direction."
          action={<TextLink href="/services">All {services.length} services</TextLink>}
        />

        <div className="mt-14 grid gap-px bg-border md:mt-20 md:grid-cols-2 xl:grid-cols-4">
          {categories.map((c, i) => (
            <article key={c.slug} className="reveal flex flex-col bg-bg py-8 md:py-10 md:odd:pr-8 md:even:pl-8 xl:px-8 xl:first:pl-0 xl:last:pr-0">
              <p className="label text-muted">0{i + 1}</p>
              <h3 className="mt-6 font-display text-h3 font-medium">
                <Link href={`/services#${c.slug}`} className="hover:text-accent">{c.name}</Link>
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{c.summary}</p>
              <ul className="mt-8 border-t border-border">
                {servicesIn(c.name).map((s) => (
                  <li key={s.slug} className="border-b border-border">
                    <Link
                      href={`/services/${s.slug}`}
                      className="group flex items-center justify-between gap-4 py-3 text-[0.9375rem] transition-colors hover:text-accent"
                    >
                      {s.title}
                      <ArrowUpRight
                        aria-hidden
                        className="size-4 shrink-0 text-muted opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent group-hover:opacity-100 group-focus-visible:opacity-100"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
