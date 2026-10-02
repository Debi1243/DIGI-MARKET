import Link from "next/link";
import Logo from "../ui/Logo";
import { brand, categories, servicesIn } from "@/lib/data";
import { primaryNav } from "@/lib/site";

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-page grid gap-12 py-16 md:py-20 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-5 max-w-[34ch] text-sm leading-relaxed text-muted">
            {brand.tagline} A full-service digital studio for ambitious businesses, based in Bhubaneswar.
          </p>
          <address className="mt-8 space-y-1.5 text-sm not-italic">
            <a href={`mailto:${brand.email}`} className="link-underline block w-fit">{brand.email}</a>
            <a href={`tel:${brand.phone.replace(/\s/g, "")}`} className="link-underline block w-fit">{brand.phone}</a>
            <span className="block text-muted">{brand.address}</span>
          </address>
        </div>

        <nav aria-label="Company" className="lg:col-span-2">
          <h2 className="label text-muted">Company</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {[{ href: "/", label: "Home" }, ...primaryNav].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="link-underline">{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Services" className="grid gap-10 sm:grid-cols-2 lg:col-span-6">
          {categories.map((c) => (
            <div key={c.slug}>
              <h2 className="label text-muted">
                <Link href={`/services#${c.slug}`} className="hover:text-fg">{c.name}</Link>
              </h2>
              <ul className="mt-5 space-y-3 text-sm">
                {servicesIn(c.name).map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className="link-underline">{s.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {brand.full}. All rights reserved.</p>
          <a href="#main" className="link-underline w-fit">Back to top</a>
        </div>
      </div>
    </footer>
  );
}
