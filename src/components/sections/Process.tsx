"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Lightbulb, Palette, FlaskConical, Rocket, Check } from "lucide-react";
import { process } from "@/lib/data";
import SectionHeading from "../ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger, useGSAP);
const icons = [Lightbulb, Palette, FlaskConical, Rocket];

export default function Process() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - window.innerWidth + 48;
        const tween = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
        gsap.to(".process-bar", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: section.current, start: "top top", end: () => `+=${distance()}`, scrub: true },
        });
        gsap.utils.toArray<HTMLElement>(".process-card").forEach((card) => {
          gsap.from(card.querySelectorAll(".pc-anim"), {
            y: 40,
            opacity: 0,
            stagger: 0.08,
            scrollTrigger: { trigger: card, containerAnimation: tween, start: "left 80%" },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: section },
  );

  return (
    <section ref={section} className="relative overflow-hidden bg-ink-2 py-24 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:py-0">
      <div className="mx-auto w-full max-w-7xl px-6">
        <SectionHeading eyebrow="How we work" title="A proven process from first call to lift-off" highlight={["lift-off"]} />
        <div className="mt-8 hidden h-px w-full bg-white/10 lg:block">
          <div className="process-bar h-full origin-left scale-x-0 bg-gradient-to-r from-lime via-cyan to-violet" />
        </div>
      </div>
      <div ref={track} className="mt-12 flex flex-col gap-6 px-6 lg:w-max lg:flex-row lg:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] lg:pr-24">
        {process.map((p, i) => {
          const Icon = icons[i];
          return (
            <article
              key={p.step}
              className="process-card glass relative flex shrink-0 flex-col overflow-hidden rounded-[2rem] p-8 lg:h-[26rem] lg:w-[34rem] lg:p-10"
            >
              <span className="pc-anim absolute -right-4 -top-10 font-display text-[10rem] font-bold leading-none text-white/[0.04]">{p.step}</span>
              <span className="pc-anim grid h-14 w-14 place-items-center rounded-2xl bg-lime text-ink">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="pc-anim mt-8 font-display text-3xl font-semibold tracking-tight">{p.title}</h3>
              <p className="pc-anim mt-4 max-w-sm leading-relaxed text-muted">{p.text}</p>
              <ul className="mt-auto flex flex-wrap gap-2 pt-8">
                {p.points.map((pt) => (
                  <li key={pt} className="pc-anim inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-xs">
                    <Check className="h-3.5 w-3.5 text-lime" /> {pt}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}
