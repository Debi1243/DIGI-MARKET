import type { Metadata } from "next";
import { Eye, Compass, Heart } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Intro from "@/components/sections/Intro";
import Reveal from "@/components/ui/Reveal";
import Timeline from "@/components/sections/Timeline";
import WhyUs from "@/components/sections/WhyUs";
import Cta from "@/components/sections/Cta";

export const metadata: Metadata = { title: "About" };

const pillars = [
  { icon: Compass, title: "Mission", text: "Give every growing business access to world-class digital products and marketing, without enterprise price tags." },
  { icon: Eye, title: "Vision", text: "To be the most trusted technology partner for ambitious companies across India and beyond." },
  { icon: Heart, title: "Values", text: "Quality over shortcuts, radical transparency, and measuring our success by the success of the businesses we work with." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A new studio built for what comes next"
        highlight={["next"]}
        text="We are designers, engineers and marketers who love turning complex problems into simple, beautiful products. Curious by nature, obsessed with results."
      />
      <Intro />
      <section className="py-12">
        <div className="mx-auto grid max-w-7xl gap-5 px-6 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <div className="group h-full rounded-[1.75rem] border border-white/10 bg-ink-2 p-8 transition-colors duration-500 hover:border-lime/40">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/5 text-accent transition-all duration-500 group-hover:rotate-12 group-hover:bg-lime group-hover:text-ink">
                  <p.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-8 font-display text-3xl font-semibold">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <Timeline />
      <WhyUs />
      <Cta />
    </>
  );
}
