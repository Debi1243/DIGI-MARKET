import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ServicesGrid from "@/components/sections/ServicesGrid";
import Process from "@/components/sections/Process";
import TechStack from "@/components/sections/TechStack";
import Cta from "@/components/sections/Cta";

export const metadata: Metadata = { title: "Services" };

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Fifteen ways we help your business grow"
        highlight={["grow"]}
        text="From the first impression to the back office. Pick a single service or let us run the whole digital stack, from marketing and design to apps and industry software."
      />
      <ServicesGrid />
      <Process />
      <TechStack />
      <Cta />
    </>
  );
}
