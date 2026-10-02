import Link from "next/link";
import { brand, services } from "@/lib/data";
import Logo from "./ui/Logo";
import Button from "./ui/Button";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-ink-2 pt-24">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-violet/20 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-10 border-b border-white/5 pb-16 md:flex-row md:items-end">
          <h2 className="max-w-2xl font-display text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            Have an idea? <span className="text-gradient">Let&apos;s launch it.</span>
          </h2>
          <Button href="/contact">Book a free strategy call</Button>
        </div>

        <div className="grid gap-12 py-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">{brand.tagline} A full-service digital studio for ambitious businesses.</p>
            <div className="mt-6 space-y-1 text-sm">
              <a href={`mailto:${brand.email}`} className="block hover:text-lime">{brand.email}</a>
              <a href={`tel:${brand.phone.replace(/\s/g, "")}`} className="block hover:text-lime">{brand.phone}</a>
              <p className="text-muted">{brand.address}</p>
            </div>
          </div>
          <div className="md:col-span-2">
            <h3 className="text-xs uppercase tracking-[0.2em] text-muted">Company</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {[["About", "/about"], ["Services", "/services"], ["Work", "/work"], ["Contact", "/contact"]].map(([l, h]) => (
                <li key={h}><Link href={h} className="hover:text-lime">{l}</Link></li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-6">
            <h3 className="text-xs uppercase tracking-[0.2em] text-muted">Services</h3>
            <ul className="mt-5 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
              {services.map((s) => (
                <li key={s.slug}><Link href={`/services/${s.slug}`} className="text-paper/80 hover:text-lime">{s.title}</Link></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="relative select-none overflow-hidden">
        <p className="outline-text whitespace-nowrap text-center font-display text-[22vw] font-bold leading-[0.8] tracking-tighter">{brand.name}</p>
      </div>
      <div className="relative mx-auto flex max-w-7xl flex-col justify-between gap-3 px-6 py-8 text-xs text-muted md:flex-row">
        <p>© {new Date().getFullYear()} {brand.full}. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-lime">Instagram</a>
          <a href="#" className="hover:text-lime">LinkedIn</a>
          <a href="#" className="hover:text-lime">Behance</a>
        </div>
      </div>
    </footer>
  );
}
