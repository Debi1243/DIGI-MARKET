export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://orbitra.studio").replace(/\/$/, "");

export const primaryNav = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function absoluteUrl(path = "/") {
  return `${siteUrl}${path === "/" ? "" : path}`;
}
