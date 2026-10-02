import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import ProjectCard from "@/components/work/ProjectCard";
import Testimonials from "@/components/sections/Testimonials";
import ClosingCta from "@/components/sections/ClosingCta";
import { projects } from "@/lib/data";

const description =
  "Websites, apps, campaigns and software we have designed, built and grown with our clients, and the results they produced.";

export const metadata: Metadata = {
  title: "Work",
  description,
  alternates: { canonical: "/work" },
  openGraph: { title: "Work", description, url: "/work" },
};

export default function WorkPage() {
  const [feature, ...rest] = projects;
  return (
    <>
      <PageHero
        label="Work"
        title="Work that moves the needle."
        intro="A selection of websites, apps, campaigns and software we have designed, built and grown with our clients."
      />
      <section aria-label="Projects" className="border-t border-border section-y">
        <div className="container-page space-y-16 md:space-y-24">
          <ProjectCard project={feature} layout="feature" headingLevel="h2" />
          <div className="grid gap-x-10 gap-y-16 md:grid-cols-2 md:gap-y-8">
            {rest.map((p, i) => (
              <div key={p.title} className={i % 2 === 1 ? "md:mt-24" : undefined}>
                <ProjectCard project={p} headingLevel="h2" />
              </div>
            ))}
          </div>
        </div>
      </section>
      <Testimonials />
      <ClosingCta />
    </>
  );
}
