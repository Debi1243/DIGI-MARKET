import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import ContactForm from "@/components/forms/ContactForm";
import { brand } from "@/lib/data";

const description =
  "Tell us about your project. You will hear back within one business day with ideas, a timeline and a transparent quote.";

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact", description, url: "/contact" },
};

const details = [
  { label: "Email", value: brand.email, href: `mailto:${brand.email}` },
  { label: "Phone", value: brand.phone, href: `tel:${brand.phone.replace(/\s/g, "")}` },
  { label: "Studio", value: brand.address },
  { label: "Hours", value: "Mon to Sat, 9:30 AM to 7:00 PM IST" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Contact"
        title="Let's start something great together."
        intro="Share a few details and we will come back with ideas, a timeline and a transparent quote. No pressure, no jargon."
      />
      <section aria-label="Get in touch" className="border-t border-border pb-24 pt-12 md:pb-32 md:pt-16">
        <div className="container-page grid gap-y-12 lg:grid-cols-12 lg:gap-x-10">
          <aside className="lg:col-span-3">
            <dl className="space-y-7">
              {details.map((d) => (
                <div key={d.label}>
                  <dt className="label text-muted">{d.label}</dt>
                  <dd className="mt-2 text-[0.9375rem]">
                    {d.href ? (
                      <a href={d.href} className="link-underline">{d.value}</a>
                    ) : (
                      d.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-10 border-t border-border pt-7">
              <p className="label text-muted">Response time</p>
              <p className="mt-3 font-display text-h3 font-medium">Under 24 hours</p>
            </div>
          </aside>
          <div className="lg:col-span-9">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
