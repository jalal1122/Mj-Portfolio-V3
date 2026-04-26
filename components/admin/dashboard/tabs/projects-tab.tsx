"use client";

import dynamic from "next/dynamic";
import { Plus, Trash2, Upload } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { CollapsibleSectionCard, SearchField } from "@/components/admin/dashboard/admin-ui";
import type { CloudinaryResult, ProjectEntity, ProjectFormState, TechnologyEntity } from "@/components/admin/dashboard/types";

const CldUploadWidget = dynamic(() => import("next-cloudinary").then((module) => module.CldUploadWidget), { ssr: false });

type ProjectsTabProps = {
  projectForm: ProjectFormState;
  setProjectForm: Dispatch<SetStateAction<ProjectFormState>>;
  technologies: TechnologyEntity[];
  filteredProjects: ProjectEntity[];
  projectSearch: string;
  setProjectSearch: Dispatch<SetStateAction<string>>;
  projectTechFilter: string;
  setProjectTechFilter: Dispatch<SetStateAction<string>>;
  editingProjectId: string;
  setEditingProjectId: Dispatch<SetStateAction<string>>;
  panelOpen: { projectForm: boolean; projectList: boolean };
  onTogglePanel: (key: "projectForm" | "projectList") => void;
  onToggleProjectTech: (techId: string) => void;
  onSave: () => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onUpdateOrder: (id: string, displayOrder: number) => Promise<void>;
  setStatus: (value: string) => void;
  resetForm: () => void;
};

export function ProjectsTab({
  projectForm,
  setProjectForm,
  technologies,
  filteredProjects,
  projectSearch,
  setProjectSearch,
  projectTechFilter,
  setProjectTechFilter,
  editingProjectId,
  setEditingProjectId,
  panelOpen,
  onTogglePanel,
  onToggleProjectTech,
  onSave,
  onDelete,
  onUpdateOrder,
  setStatus,
  resetForm,
}: ProjectsTabProps) {
  return (
    <div className="space-y-6">
      <CollapsibleSectionCard title="Project Form" isOpen={panelOpen.projectForm} onToggle={() => onTogglePanel("projectForm")}>
        <div className="grid sm:grid-cols-2 gap-3">
          <input className="w-full rounded-xl border border-[var(--card-border)] bg-transparent px-3 py-2" placeholder="Title" value={projectForm.title} onChange={(event) => setProjectForm((state) => ({ ...state, title: event.target.value }))} />
          <input className="w-full rounded-xl border border-[var(--card-border)] bg-transparent px-3 py-2" placeholder="Slug" value={projectForm.slug} onChange={(event) => setProjectForm((state) => ({ ...state, slug: event.target.value }))} />
        </div>
        <textarea className="w-full rounded-xl border border-[var(--card-border)] bg-transparent px-3 py-2" placeholder="Description" value={projectForm.description} onChange={(event) => setProjectForm((state) => ({ ...state, description: event.target.value }))} />
        <div className="grid sm:grid-cols-[1fr_auto] gap-2">
          <input className="w-full rounded-xl border border-[var(--card-border)] bg-transparent px-3 py-2" placeholder="Cloudinary image URL" value={projectForm.cloudinaryImageUrl} onChange={(event) => setProjectForm((state) => ({ ...state, cloudinaryImageUrl: event.target.value }))} />
          <CldUploadWidget
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
            onSuccess={(result) => {
              const secureUrl = (result as CloudinaryResult).info?.secure_url ?? "";
              setProjectForm((state) => ({ ...state, cloudinaryImageUrl: secureUrl }));
            }}
          >
            {({ open }) => (
              <button type="button" onClick={() => open()} className="rounded-xl border border-[var(--card-border)] px-3">
                <Upload className="h-4 w-4" />
              </button>
            )}
          </CldUploadWidget>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <input className="w-full rounded-xl border border-[var(--card-border)] bg-transparent px-3 py-2" type="number" min={0} placeholder="Display order (0 = top)" value={projectForm.displayOrder} onChange={(event) => setProjectForm((state) => ({ ...state, displayOrder: Number(event.target.value) || 0 }))} />
          <input className="w-full rounded-xl border border-[var(--card-border)] bg-transparent px-3 py-2" placeholder="Github link" value={projectForm.githubLink} onChange={(event) => setProjectForm((state) => ({ ...state, githubLink: event.target.value }))} />
        </div>
        <input className="w-full rounded-xl border border-[var(--card-border)] bg-transparent px-3 py-2" placeholder="Live link" value={projectForm.liveLink} onChange={(event) => setProjectForm((state) => ({ ...state, liveLink: event.target.value }))} />

        <div className="space-y-2">
          <p className="text-sm font-medium">Tech Stack</p>
          <div className="flex flex-wrap gap-2">
            {technologies.map((technology) => {
              const techId = String(technology._id);
              const isActive = projectForm.techStack.includes(techId);
              return (
                <button
                  key={techId}
                  type="button"
                  onClick={() => onToggleProjectTech(techId)}
                  className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                    isActive
                      ? "bg-[color-mix(in_srgb,var(--primary)_20%,transparent)] text-[var(--foreground)] border-[color-mix(in_srgb,var(--primary)_45%,transparent)]"
                      : "border-[var(--card-border)] text-[var(--text-secondary)]"
                  }`}
                >
                  {technology.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() =>
              onSave()
                .then(() => setStatus(editingProjectId ? "Project updated." : "Project created."))
                .catch((error: unknown) => setStatus(error instanceof Error ? error.message : "Unable to save project."))
            }
            className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)] text-white px-4 py-2 text-sm"
          >
            <Plus className="h-4 w-4" />
            {editingProjectId ? "Update Project" : "Add Project"}
          </button>
          {editingProjectId ? (
            <button
              onClick={() => {
                setEditingProjectId("");
                resetForm();
              }}
              className="rounded-full border border-[var(--card-border)] px-4 py-2 text-sm"
            >
              Cancel Edit
            </button>
          ) : null}
        </div>
      </CollapsibleSectionCard>

      <CollapsibleSectionCard title="Project List" isOpen={panelOpen.projectList} onToggle={() => onTogglePanel("projectList")}>
        <div className="grid md:grid-cols-[1fr_220px] gap-3">
          <SearchField value={projectSearch} onChange={setProjectSearch} placeholder="Search title or slug" />
          <select value={projectTechFilter} onChange={(event) => setProjectTechFilter(event.target.value)} className="rounded-xl border border-[var(--card-border)] bg-transparent px-3 py-2 text-sm">
            <option value="all">All technologies</option>
            {technologies.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2 max-h-[420px] overflow-auto pr-1">
          {filteredProjects.map((project) => (
            <div key={project._id} className="rounded-lg border border-[var(--card-border)] px-3 py-2 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm truncate max-w-[240px]">{project.title}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditingProjectId(project._id);
                      setProjectForm({
                        title: project.title ?? "",
                        description: project.description ?? "",
                        slug: project.slug ?? "",
                        cloudinaryImageUrl: project.cloudinaryImageUrl ?? "",
                        techStack: (project.techStack ?? []).map((tech) => (typeof tech === "string" ? tech : tech._id)).filter(Boolean),
                        githubLink: project.githubLink ?? "",
                        liveLink: project.liveLink ?? "",
                        displayOrder: project.displayOrder ?? 0,
                      });
                    }}
                    className="text-xs text-[var(--primary)]"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      onDelete(project._id)
                        .then(() => setStatus("Project deleted."))
                        .catch((error: unknown) => setStatus(error instanceof Error ? error.message : "Delete failed."))
                    }
                  >
                    <Trash2 className="h-4 w-4 text-red-400" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-[1fr_auto] gap-2">
                <input
                  type="number"
                  min={0}
                  className="rounded-xl border border-[var(--card-border)] bg-transparent px-3 py-2 text-sm"
                  defaultValue={project.displayOrder ?? 0}
                  onBlur={(event) => {
                    const nextValue = Number(event.currentTarget.value) || 0;
                    if (nextValue !== (project.displayOrder ?? 0)) {
                      onUpdateOrder(project._id, nextValue).catch((error: unknown) => setStatus(error instanceof Error ? error.message : "Unable to update order."));
                    }
                  }}
                />
                <span className="text-xs text-[var(--text-secondary)] self-center">Display order</span>
              </div>
            </div>
          ))}
          {!filteredProjects.length ? <p className="text-sm text-[var(--text-secondary)]">No projects match current search/filter.</p> : null}
        </div>
      </CollapsibleSectionCard>
    </div>
  );
}
