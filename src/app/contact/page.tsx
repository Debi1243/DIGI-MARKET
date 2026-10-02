import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import ContactForm from "@/components/sections/ContactForm";
import Reveal from "@/components/ui/Reveal";
import { brand } from "@/lib/data";

export const metadata: Metadata = { title: "Contact" };

const info = [
  { icon: Mail, label: "Email", value: brand.email, href: `mailto:${brand.email}` },
  { icon: Phone, label: "Phone", value: brand.phone, href: `tel:${brand.phone.replace(/\s/g, "")}` },
  { icon: MapPin, label: "Studio", value: brand.address },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's start something great together"
        highlight={["great"]}
        text="Share a few details and we will come back with ideas, a timeline and a transparent quote. No pressure, no jargon."
      />
      <section className="pb-32">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1fr_1.6fr]">
          <div className="space-y-4">
            {info.map((i, k) => (
              <Reveal key={i.label} delay={k * 0.1}>
                <a href={i.href} className="group flex items-center gap-5 rounded-2xl border border-white/10 p-6 transition-colors hover:border-lime/50">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/5 text-accent transition-all duration-500 group-hover:scale-110 group-hover:bg-lime group-hover:text-ink">
                    <i.icon className="h-6 w-6" />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-[0.2em] text-muted">{i.label}</span>
                    <span className="mt-1 block text-lg">{i.value}</span>
                  </span>
                </a>
              </Reveal>
            ))}
            <Reveal delay={0.3}>
              <div className="relative overflow-hidden rounded-2xl border border-white/10 p-6">
                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-lime/20 blur-3xl" />
                <p className="text-xs uppercase tracking-[0.2em] text-muted">Response time</p>
                <p className="mt-2 font-display text-4xl font-semibold">&lt; 24 hours</p>
                <p className="mt-2 text-sm text-muted">Mon to Sat, 9:30 AM to 7:00 PM IST</p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
