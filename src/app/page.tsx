import Hero from "@/components/sections/home/Hero";
import ClientList from "@/components/sections/home/ClientList";
import Disciplines from "@/components/sections/home/Disciplines";
import SelectedWork from "@/components/sections/home/SelectedWork";
import Industries from "@/components/sections/home/Industries";
import ProcessSteps from "@/components/sections/ProcessSteps";
import Testimonials from "@/components/sections/Testimonials";
import Faq from "@/components/sections/Faq";
import ClosingCta from "@/components/sections/ClosingCta";
import JsonLd from "@/components/shared/JsonLd";
import { brand, homeFaqs, services } from "@/lib/data";
import { absoluteUrl, siteUrl } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientList />
      <Disciplines />
      <SelectedWork />
      <Industries />
      <ProcessSteps />
      <Testimonials />
      <Faq items={homeFaqs} />
      <ClosingCta />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "@id": `${siteUrl}/#organization`,
          name: brand.full,
          alternateName: brand.name,
          url: siteUrl,
          logo: absoluteUrl("/icon.svg"),
          email: brand.email,
          telephone: brand.phone.replace(/\s/g, ""),
          foundingDate: "2014",
          slogan: brand.tagline,
          address: {
            "@type": "PostalAddress",
            streetAddress: "Tech Park",
            addressLocality: "Bhubaneswar",
            addressRegion: "Odisha",
            addressCountry: "IN",
          },
          areaServed: "IN",
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Services",
            itemListElement: services.map((s) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: s.title, url: absoluteUrl(`/services/${s.slug}`) },
            })),
          },
        }}
      />
    </>
  );
}
