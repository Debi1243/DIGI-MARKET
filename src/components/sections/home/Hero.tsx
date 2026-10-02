import { ButtonLink } from "@/components/ui/Button";
import OrbitDiagram from "./OrbitDiagram";
import { formatStat, stats } from "@/lib/data";

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative">
      <div className="container-page grid items-center gap-y-14 pb-16 pt-12 md:pt-16 lg:grid-cols-12 lg:gap-x-10 lg:pb-24 lg:pt-20">
        <div className="lg:col-span-7">
          <p className="label flex flex-wrap items-center gap-x-3 gap-y-1 text-muted">
            <span className="inline-flex items-center gap-2 text-fg">
              <span aria-hidden className="size-1.5 rounded-full bg-primary" />
              Digital studio
            </span>
            <span aria-hidden>/</span>
            <span>Bhubaneswar, India</span>
            <span aria-hidden className="hidden sm:inline">/</span>
            <span className="hidden sm:inline">Since 2014</span>
          </p>
          <h1 id="hero-title" className="mt-7 max-w-[13ch] font-display text-display font-medium">
            Websites, marketing and software, built by one team.
          </h1>
          <p className="mt-7 max-w-[52ch] text-lead text-muted">
            Orbitra designs and builds websites, runs SEO and ad campaigns, ships mobile apps and deploys the software
            that runs hospitals, schools, hotels and shops. One senior partner, measured against your numbers.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact" size="lg">Book a strategy call</ButtonLink>
            <ButtonLink href="/work" size="lg" variant="secondary" arrow={false}>See our work</ButtonLink>
          </div>
        </div>
        <div className="lg:col-span-5">
          <OrbitDiagram />
        </div>
      </div>

      <div className="border-y border-border">
        <div className="container-page">
          <dl className="grid grid-cols-2 gap-px bg-border lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse gap-2 bg-bg py-7 pr-4 even:pl-5 md:py-9 md:even:pl-8 lg:[&:nth-child(3)]:pl-8">
                <dt className="text-sm text-muted">{s.label}</dt>
                <dd className="tabular font-display text-[clamp(2rem,1.5rem+2vw,3.25rem)] font-medium leading-none tracking-[-0.03em]">
                  {formatStat(s)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
