import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import { ProjectCard } from "@/components/sections/WorkShowcase";
import FoundingOffer from "@/components/sections/FoundingOffer";
import Industries from "@/components/sections/Industries";
import Cta from "@/components/sections/Cta";
import { projects } from "@/lib/data";

export const metadata: Metadata = { title: "Work" };

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="What we build"
        title="Ideas we can bring to life for you"
        highlight={["life"]}
        text="We are a new studio, so instead of a long client list here are examples of the websites, apps and software we design and build. Your project could be the first case study on this page."
      />
      <section className="pb-24">
        <div className="mx-auto grid max-w-7xl gap-x-10 gap-y-16 px-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} p={p} i={i} />
          ))}
        </div>
      </section>
      <Industries />
      <FoundingOffer />
      <Cta />
    </>
  );
}
