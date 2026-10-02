"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import Logo from "../ui/Logo";
import { ButtonLink } from "../ui/Button";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";
import { categories, servicesIn } from "@/lib/data";
import { primaryNav } from "@/lib/site";
import { cn } from "@/lib/cn";

const SCROLL_THRESHOLD = 8;

function subscribeScroll(cb: () => void) {
  window.addEventListener("scroll", cb, { passive: true });
  return () => window.removeEventListener("scroll", cb);
}

function useScrolled() {
  return useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > SCROLL_THRESHOLD,
    () => false,
  );
}

export function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function SiteHeader() {
  const pathname = usePathname();
  const scrolled = useScrolled();
  // Menus remember the path they were opened on, so navigating closes them without an effect.
  const [servicesOpenOn, setServicesOpenOn] = useState<string | null>(null);
  const [mobileOpenOn, setMobileOpenOn] = useState<string | null>(null);
  const servicesOpen = servicesOpenOn === pathname;
  const mobileOpen = mobileOpenOn === pathname;
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!servicesOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setServicesOpenOn(null);
        triggerRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setServicesOpenOn(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [servicesOpen]);

  const onMobileOpenChange = useCallback((next: boolean) => setMobileOpenOn(next ? pathname : null), [pathname]);

  const solid = scrolled || servicesOpen || mobileOpen;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[background-color,border-color] duration-300",
        solid ? "border-border bg-bg" : "border-transparent bg-bg",
      )}
    >
      <a
        href="#main"
        className="sr-only rounded-md bg-fg px-4 py-2 text-sm text-bg focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60]"
      >
        Skip to content
      </a>

      <div ref={navRef} onPointerLeave={(e) => e.pointerType === "mouse" && setServicesOpenOn(null)}>
        <div className="container-page flex h-16 items-center justify-between gap-6 md:h-[4.5rem]">
          <Logo />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {primaryNav.map((item) => {
                const active = isActive(pathname, item.href);
                if (item.href === "/services") {
                  return (
                    <li key={item.href} onPointerEnter={(e) => e.pointerType === "mouse" && setServicesOpenOn(pathname)}>
                      <button
                        ref={triggerRef}
                        type="button"
                        aria-expanded={servicesOpen}
                        aria-controls={panelId}
                        onClick={() => setServicesOpenOn(servicesOpen ? null : pathname)}
                        className={cn(
                          "relative inline-flex h-10 items-center gap-1 rounded-md px-3 text-sm transition-colors",
                          active || servicesOpen ? "text-fg" : "text-muted hover:text-fg",
                        )}
                      >
                        {item.label}
                        <ChevronDown aria-hidden className={cn("size-3.5 transition-transform duration-200", servicesOpen && "rotate-180")} />
                        {active && <ActiveMark />}
                      </button>
                    </li>
                  );
                }
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative inline-flex h-10 items-center rounded-md px-3 text-sm transition-colors",
                        active ? "text-fg" : "text-muted hover:text-fg",
                      )}
                    >
                      {item.label}
                      {active && <ActiveMark />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <ThemeToggle />
            </div>
            <div className="hidden sm:block">
              <ButtonLink href="/contact">Book a call</ButtonLink>
            </div>
            <MobileMenu
              open={mobileOpen}
              onOpenChange={onMobileOpenChange}
              pathname={pathname}
            />
          </div>
        </div>

        <AnimatePresence>
          {servicesOpen && (
            <motion.div
              id={panelId}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
              className="absolute inset-x-0 top-full hidden border-b border-border bg-bg shadow-md lg:block"
            >
              <div className="container-page grid grid-cols-12 gap-10 py-10">
                <div className="col-span-3 flex flex-col justify-between">
                  <div>
                    <p className="label text-muted">Services</p>
                    <p className="mt-4 max-w-[26ch] text-sm text-muted">
                      Fifteen services across four disciplines, run by one senior team.
                    </p>
                  </div>
                  <Link href="/services" className="link-underline mt-8 self-start text-sm font-medium">
                    View all services
                  </Link>
                </div>
                {categories.map((c) => (
                  <div key={c.slug} className={c.name === "Software" ? "col-span-3" : "col-span-2"}>
                    <Link href={`/services#${c.slug}`} className="label text-muted hover:text-fg">
                      {c.name}
                    </Link>
                    <ul className="mt-4 space-y-2.5">
                      {servicesIn(c.name).map((s) => (
                        <li key={s.slug}>
                          <Link
                            href={`/services/${s.slug}`}
                            aria-current={pathname === `/services/${s.slug}` ? "page" : undefined}
                            className="text-sm text-fg/85 hover:text-accent aria-[current=page]:text-accent"
                          >
                            {s.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

function ActiveMark() {
  return <span aria-hidden className="absolute inset-x-3 -bottom-px h-px bg-fg" />;
}
