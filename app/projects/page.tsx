import Image from "next/image";
import Link from "next/link";
import type { ProjectSummary } from "@/lib/content-types";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { getProjects } from "@/lib/content";
import { getSafeImageSrc } from "@/lib/image";

export default async function ProjectsPage() {
  const projects = (await getProjects()) as ProjectSummary[];

  return (
    <div className="section-wrap">
      <section className="space-y-5">
        <p className="text-3xl md:text-5xl font-semibold tracking-tight">The Work</p>
        <h1 className="sub-heading ">Full-stack systems built with modern technologies and scalable architectures.</h1>
        <div className="columns-1 md:columns-2 gap-5 space-y-5">
          {projects.map((project) => (
            <Link href={`/work/${project.slug}`} key={project._id}>
            <SpotlightCard key={project._id} className="break-inside-avoid mb-3 rounded-2xl overflow-hidden">
              <div className="relative aspect-[16/10]">
                <Image
                  src={getSafeImageSrc(project.cloudinaryImageUrl)}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-5 space-y-3">
                <h2 className="text-xl font-semibold">{project.title}</h2>
                <p className="text-sm text-[var(--muted)]">{project.description.slice(0, 130)}...</p>
                <div className="flex flex-wrap gap-2">
                  {(project.techStack ?? []).slice(0, 4).map((tech, idx) => {
                    const label = typeof tech === "string" ? tech : tech.name;
                    const color = typeof tech === "string" ? "" : tech.color || "";
                    return (
                      <span
                        key={`${label}-${idx}`}
                        className="px-3 py-1 rounded-full border border-[var(--card-border)] text-xs text-[var(--foreground)]"
                        style={
                          color
                            ? {
                                color,
                                background: `color-mix(in srgb, ${color} 12%, transparent)`,
                                borderColor: `color-mix(in srgb, ${color} 30%, transparent)`,
                              }
                            : undefined
                        }
                      >
                        {label}
                      </span>
                    );
                  })}
                </div>
              </div>
            </SpotlightCard>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
