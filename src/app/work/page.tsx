import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import { ProjectCard } from "@/components/sections/WorkShowcase";
import Testimonials from "@/components/sections/Testimonials";
import Clients from "@/components/sections/Clients";
import Cta from "@/components/sections/Cta";
import { projects } from "@/lib/data";

export const metadata: Metadata = { title: "Work" };

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Work that moves the needle"
        highlight={["needle"]}
        text="A selection of websites, apps, campaigns and software we have designed, built and grown with our clients."
      />
      <section className="pb-24">
        <div className="mx-auto grid max-w-7xl gap-x-10 gap-y-16 px-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} p={p} i={i} />
          ))}
        </div>
      </section>
      <Clients />
      <Testimonials />
      <Cta />
    </>
  );
}
