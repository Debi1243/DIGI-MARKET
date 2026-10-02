import SectionHeader from "@/components/ui/SectionHeader";
import { TextLink } from "@/components/ui/Button";
import ProjectCard from "@/components/work/ProjectCard";
import { projects } from "@/lib/data";

export default function SelectedWork() {
  const [feature, ...rest] = projects.slice(0, 3);
  return (
    <section aria-labelledby="work-title" className="section-y border-t border-border">
      <div className="container-page">
        <SectionHeader
          id="work-title"
          label="Selected work"
          title="Results we're proud to put our name on."
          action={<TextLink href="/work">View all work</TextLink>}
        />
        <div className="mt-14 space-y-16 md:mt-20 md:space-y-24">
          <ProjectCard project={feature} layout="feature" />
          <div className="grid gap-16 md:grid-cols-2 md:gap-10">
            {rest.map((p, i) => (
              <div key={p.title} className={i === 1 ? "md:mt-24" : undefined}>
                <ProjectCard project={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
