import { ButtonLink } from "@/components/ui/Button";
import { brand } from "@/lib/data";

type Props = { title?: string; text?: string };

export default function ClosingCta({
  title = "Tell us what you're building.",
  text = "Share your goals and we will come back within one business day with ideas, a timeline and a transparent quote.",
}: Props) {
  return (
    <section aria-labelledby="cta-title" className="surface-inverse">
      <div className="container-page grid gap-y-10 py-20 md:py-28 lg:grid-cols-12 lg:gap-x-10">
        <p className="label text-inverse-muted lg:col-span-3 lg:pt-3">Start a project</p>
        <div className="lg:col-span-9">
          <h2 id="cta-title" className="max-w-[16ch] font-display text-h1 font-medium">
            {title}
          </h2>
          <p className="mt-6 max-w-[52ch] text-lead text-inverse-muted">{text}</p>
          <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-center">
            <ButtonLink href="/contact" size="lg">Book a strategy call</ButtonLink>
            <div className="text-sm">
              <a href={`mailto:${brand.email}`} className="link-underline block w-fit">{brand.email}</a>
              <a href={`tel:${brand.phone.replace(/\s/g, "")}`} className="link-underline mt-1 block w-fit text-inverse-muted">
                {brand.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
