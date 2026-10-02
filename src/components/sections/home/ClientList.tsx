import { clients } from "@/lib/data";

export default function ClientList() {
  return (
    <section aria-labelledby="clients-title" className="container-page grid gap-6 py-12 md:py-16 lg:grid-cols-12 lg:gap-10">
      <h2 id="clients-title" className="label text-muted lg:col-span-3 lg:pt-1.5">
        Trusted by
      </h2>
      <ul className="flex flex-wrap gap-x-8 gap-y-3 lg:col-span-9">
        {clients.map((c) => (
          <li key={c} className="font-display text-xl font-medium tracking-[-0.02em] text-muted md:text-2xl">
            {c}
          </li>
        ))}
      </ul>
    </section>
  );
}
