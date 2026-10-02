"use client";

import { motion } from "framer-motion";
import { BadgePercent, Handshake, LifeBuoy } from "lucide-react";
import { foundingPerks } from "@/lib/data";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import TiltCard from "../ui/TiltCard";
import Button from "../ui/Button";

const icons = [BadgePercent, Handshake, LifeBuoy];

export default function FoundingOffer() {
  return (
    <section className="relative overflow-hidden py-24">
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/15 blur-[140px]"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Founding clients"
          title="We're new, and that works in your favour"
          highlight={["favour"]}
          align="center"
          text="सृजEX is just getting started. Our first clients get our full attention, launch pricing and the people who actually build the work."
        />
        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {foundingPerks.map((p, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={p.title} delay={i * 0.1}>
                <TiltCard max={6} className="h-full">
                  <div className="group relative h-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-ink-2 p-8">
                    <div className="spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" />
                    <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-lime text-ink transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="relative mt-8 font-display text-2xl font-semibold tracking-tight">{p.title}</h3>
                    <p className="relative mt-3 leading-relaxed text-muted">{p.text}</p>
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={0.3} className="mt-12 flex justify-center">
          <Button href="/contact">Become a founding client</Button>
        </Reveal>
      </div>
    </section>
  );
}
