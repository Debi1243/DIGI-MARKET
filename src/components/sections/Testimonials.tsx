import { testimonials } from "@/lib/data";

export default function Testimonials() {
  const [lead, ...rest] = testimonials;
  return (
    <section aria-labelledby="testimonials-title" className="section-y border-t border-border">
      <div className="container-page grid gap-y-14 lg:grid-cols-12 lg:gap-x-10">
        <h2 id="testimonials-title" className="label text-muted lg:col-span-3 lg:pt-3">
          In our clients&apos; words
        </h2>
        <figure className="reveal lg:col-span-9">
          <blockquote className="max-w-[28ch] font-display text-[clamp(1.75rem,1.2rem+2.2vw,3rem)] font-medium leading-[1.12] tracking-[-0.025em]">
            <p>&ldquo;{lead.quote}&rdquo;</p>
          </blockquote>
          <figcaption className="mt-8 flex items-center gap-4 text-sm">
            <span aria-hidden className="h-px w-8 bg-fg" />
            <span>
              <span className="font-medium">{lead.name}</span>
              <span className="text-muted">, {lead.role}</span>
            </span>
          </figcaption>
        </figure>

        <ul className="grid gap-px bg-border md:grid-cols-3 lg:col-span-9 lg:col-start-4">
          {rest.map((t) => (
            <li key={t.name} className="reveal bg-bg py-8 md:px-6 md:first:pl-0 md:last:pr-0">
              <figure>
                <blockquote className="text-[0.9375rem] leading-relaxed">
                  <p>&ldquo;{t.quote}&rdquo;</p>
                </blockquote>
                <figcaption className="mt-5 text-sm">
                  <span className="block font-medium">{t.name}</span>
                  <span className="block text-muted">{t.role}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
