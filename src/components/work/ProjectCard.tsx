import { TextLink } from "@/components/ui/Button";
import Tag from "@/components/ui/Tag";
import ProjectCover from "./ProjectCover";
import { getService, type Project } from "@/lib/data";
import { cn } from "@/lib/cn";

type Props = { project: Project; layout?: "stacked" | "feature"; headingLevel?: "h2" | "h3" };

export default function ProjectCard({ project, layout = "stacked", headingLevel: Heading = "h3" }: Props) {
  const service = getService(project.service);
  const feature = layout === "feature";

  return (
    <article className={cn("reveal grid gap-6", feature && "lg:grid-cols-12 lg:items-end lg:gap-10")}>
      <div className={cn(feature && "lg:col-span-8")}>
        <ProjectCover project={project} size={feature ? "lg" : "md"} />
      </div>
      <div className={cn(feature && "lg:col-span-4 lg:pb-2")}>
        <p className="label text-muted">{project.category}</p>
        <Heading className="mt-3 font-display text-h3 font-medium">{project.title}</Heading>
        <p className="mt-3 max-w-[46ch] text-[0.9375rem] leading-relaxed text-muted">{project.summary}</p>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Stack">
          {project.tags.map((t) => (
            <li key={t}>
              <Tag>{t}</Tag>
            </li>
          ))}
        </ul>
        {service && (
          <TextLink href={`/services/${service.slug}`} className="mt-6">
            {service.title}
          </TextLink>
        )}
      </div>
    </article>
  );
}
