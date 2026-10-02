import IndustryTabs, { type IndustryItem } from "./IndustryTabs";
import { formatStat, getService, industries } from "@/lib/data";

export default function Industries() {
  const items: IndustryItem[] = industries.flatMap(({ label, service }) => {
    const s = getService(service);
    if (!s) return [];
    return [
      {
        label,
        slug: s.slug,
        title: s.title,
        intro: s.intro,
        features: s.features.map((f) => f.title),
        stats: s.stats.map((st) => ({ value: formatStat(st), label: st.label })),
      },
    ];
  });

  return (
    <section aria-labelledby="industries-title" className="surface-inverse">
      <div className="container-page section-y">
        <div className="grid gap-y-6 lg:grid-cols-12 lg:gap-x-10">
          <p className="label text-inverse-muted lg:col-span-3 lg:pt-3">Industry software</p>
          <div className="lg:col-span-9">
            <h2 id="industries-title" className="max-w-[20ch] font-display text-h2 font-medium">
              Software that already knows your industry.
            </h2>
            <p className="mt-6 max-w-[56ch] text-lead text-inverse-muted">
              Ready-to-deploy platforms, configured to how your team works, with migration, training and support included.
            </p>
          </div>
        </div>
        <IndustryTabs items={items} />
      </div>
    </section>
  );
}
