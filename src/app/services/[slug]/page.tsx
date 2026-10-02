import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services } from "@/lib/data";
import ServiceDetail from "@/components/sections/ServiceDetail";
import Process from "@/components/sections/Process";
import Faq from "@/components/sections/Faq";
import Cta from "@/components/sections/Cta";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  return s ? { title: s.title, description: s.short } : {};
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) notFound();
  return (
    <>
      <ServiceDetail slug={slug} />
      <Process />
      <Faq items={s.faqs} />
      <Cta />
    </>
  );
}
