import Hero from "@/components/sections/Hero";
import Industries from "@/components/sections/Industries";
import Intro from "@/components/sections/Intro";
import ServicesHoverList from "@/components/sections/ServicesHoverList";
import Process from "@/components/sections/Process";
import WhyUs from "@/components/sections/WhyUs";
import WorkShowcase from "@/components/sections/WorkShowcase";
import TechStack from "@/components/sections/TechStack";
import FoundingOffer from "@/components/sections/FoundingOffer";
import Faq from "@/components/sections/Faq";
import Cta from "@/components/sections/Cta";

const faqs = [
  { q: "You're a new company. Why should we trust you?", a: "Because we have everything to prove. You get senior people on your project, fixed quotes, weekly demos, full ownership of the code and 60 days of free support. If we don't deliver, you keep everything we've built." },
  { q: "What kinds of businesses do you work with?", a: "Startups, SMEs and enterprises across healthcare, education, hospitality, retail and professional services. If you have customers online, we can help you reach more of them." },
  { q: "How much does a website or campaign cost?", a: "Websites start from a fixed-scope package and marketing runs on monthly retainers. After a free discovery call you get a transparent quote with no hidden hours." },
  { q: "Can you take over an existing project?", a: "Yes. We start with a technical and marketing audit, stabilise what is there and then plan improvements with you." },
  { q: "Do you sign NDAs and hand over source code?", a: "Always. You own everything we create for you, including code, designs and ad accounts." },
];

export default function Home() {
  return (
    <>
      <Hero />
      <Industries />
      <Intro />
      <ServicesHoverList />
      <Process />
      <WhyUs />
      <WorkShowcase />
      <TechStack />
      <FoundingOffer />
      <Faq items={faqs} />
      <Cta />
    </>
  );
}
