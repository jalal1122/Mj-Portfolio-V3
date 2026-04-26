"use client";

import dynamic from "next/dynamic";
import { Plus, Trash2, Upload, ArrowDown, ArrowUp } from "lucide-react";
import { useMemo, useState, type Dispatch, type SetStateAction } from "react";
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
  onQuickUpdate: (id: string, body: Partial<ProjectEntity>) => Promise<void>;
  onBulkDelete: (ids: string[]) => Promise<void>;
  onBulkReorder: (ids: string[], direction: "up" | "down") => Promise<void>;
  onReorderByDrag: (draggedId: string, targetId: string) => Promise<void>;
  setStatus: (value: string, tone?: "success" | "error" | "info") => void;
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
  onQuickUpdate,
  onBulkDelete,
  onBulkReorder,
  onReorderByDrag,
  setStatus,
  resetForm,
}: ProjectsTabProps) {
  const [saving, setSaving] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [inlineEditingId, setInlineEditingId] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const hasMinimumFields = projectForm.title.trim() && projectForm.slug.trim() && projectForm.description.trim();
  const allSelected = useMemo(
    () => filteredProjects.length > 0 && filteredProjects.every((project) => selected.includes(project._id)),
    [filteredProjects, selected],
  );

  const toggleSelected = (id: string) => {
    setSelected((state) => (state.includes(id) ? state.filter((item) => item !== id) : [...state, id]));
  };

  const selectAll = () => {
    setSelected(allSelected ? [] : filteredProjects.map((project) => project._id));
  };

  const runSave = async () => {
    setSaving(true);
    try {
      await onSave();
      setStatus(editingProjectId ? "Project updated." : "Project created.", "success");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to save project.", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <CollapsibleSectionCard title="Project Form" isOpen={panelOpen.projectForm} onToggle={() => onTogglePanel("projectForm")}>
        <div className="grid sm:grid-cols-2 gap-3">
          <input className="w-full rounded-xl border border-[var(--card-border)] bg-transparent px-3 py-2" placeholder="Title" value={projectForm.title} onChange={(event) => setProjectForm((state) => ({ ...state, title: event.target.value }))} />
          <input className="w-full rounded-xl border border-[var(--card-border)] bg-transparent px-3 py-2" placeholder="Slug" value={projectForm.slug} onChange={(event) => setProjectForm((state) => ({ ...state, slug: event.target.value }))} />
        </div>
        <textarea className="w-full rounded-xl border border-[var(--card-border)] bg-transparent px-3 py-2" placeholder="Description" value={projectForm.description} onChange={(event) => setProjectForm((state) => ({ ...state, description: event.target.value }))} />
        {!hasMinimumFields ? <p className="text-xs text-amber-400">Title, slug, and description are required before saving.</p> : null}
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
            onClick={() => void runSave()}
            disabled={saving || !hasMinimumFields}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)] text-white px-4 py-2 text-sm disabled:opacity-60"
          >
            <Plus className="h-4 w-4" />
            {saving ? "Saving..." : editingProjectId ? "Update Project" : "Add Project"}
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
        <div className="flex flex-wrap items-center gap-2">
          <label className="inline-flex items-center gap-2 text-sm">
            <input type="checkbox" checked={allSelected} onChange={selectAll} />
            Select all
          </label>
          <button
            type="button"
            onClick={() => void onBulkDelete(selected).then(() => setSelected([]))}
            disabled={!selected.length}
            className="rounded-full border border-[var(--card-border)] px-3 py-1.5 text-xs disabled:opacity-50"
          >
            Bulk delete
          </button>
          <button
            type="button"
            onClick={() => void onBulkReorder(selected, "up")}
            disabled={!selected.length}
            className="rounded-full border border-[var(--card-border)] px-3 py-1.5 text-xs disabled:opacity-50 inline-flex items-center gap-1"
          >
            <ArrowUp className="h-3.5 w-3.5" />
            Bulk up
          </button>
          <button
            type="button"
            onClick={() => void onBulkReorder(selected, "down")}
            disabled={!selected.length}
            className="rounded-full border border-[var(--card-border)] px-3 py-1.5 text-xs disabled:opacity-50 inline-flex items-center gap-1"
          >
            <ArrowDown className="h-3.5 w-3.5" />
            Bulk down
          </button>
        </div>
        <div className="space-y-2 max-h-[420px] overflow-auto pr-1">
          {filteredProjects.map((project) => (
            <div
              key={project._id}
              draggable
              onDragStart={() => setDraggingId(project._id)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={() => {
                if (!draggingId || draggingId === project._id) return;
                void onReorderByDrag(draggingId, project._id).catch((error: unknown) =>
                  setStatus(error instanceof Error ? error.message : "Unable to reorder by drag and drop.", "error"),
                );
                setDraggingId(null);
              }}
              className="rounded-lg border border-[var(--card-border)] px-3 py-2 space-y-2 cursor-grab"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <input type="checkbox" checked={selected.includes(project._id)} onChange={() => toggleSelected(project._id)} />
                  {inlineEditingId === project._id ? (
                    <input
                      className="text-sm rounded-lg border border-[var(--card-border)] bg-transparent px-2 py-1 min-w-[170px]"
                      defaultValue={project.title}
                      onBlur={(event) =>
                        onQuickUpdate(project._id, { title: event.currentTarget.value })
                          .then(() => setStatus("Project title updated.", "success"))
                          .catch((error: unknown) => setStatus(error instanceof Error ? error.message : "Inline update failed.", "error"))
                      }
                    />
                  ) : (
                    <span className="text-sm truncate max-w-[240px]">{project.title}</span>
                  )}
                </div>
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
                        .then(() => setStatus("Project deleted.", "success"))
                        .catch((error: unknown) => setStatus(error instanceof Error ? error.message : "Delete failed.", "error"))
                    }
                  >
                    <Trash2 className="h-4 w-4 text-red-400" />
                  </button>
                  <button type="button" className="text-xs text-[var(--primary)]" onClick={() => setInlineEditingId((state) => (state === project._id ? null : project._id))}>
                    Quick Edit
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
                      onUpdateOrder(project._id, nextValue).catch((error: unknown) => setStatus(error instanceof Error ? error.message : "Unable to update order.", "error"));
                    }
                  }}
                />
                <span className="text-xs text-[var(--text-secondary)] self-center">Display order</span>
              </div>
              <p className="text-[11px] text-[var(--text-secondary)]">
                Updated: {project.updatedAt ? new Date(project.updatedAt).toLocaleString() : "N/A"} | Changed by: {project.changedBy || "You"}
              </p>
            </div>
          ))}
          {!filteredProjects.length ? <p className="text-sm text-[var(--text-secondary)]">No projects yet - add your flagship build.</p> : null}
        </div>
      </CollapsibleSectionCard>
    </div>
  );
}
