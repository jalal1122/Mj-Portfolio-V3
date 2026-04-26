"use client";

import { Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { useMemo, useState, type Dispatch, type SetStateAction } from "react";
import { CollapsibleSectionCard, ColorSwatches, SearchField } from "@/components/admin/dashboard/admin-ui";
import type { ExperienceEntity, ExperienceFormState } from "@/components/admin/dashboard/types";

type ExperiencesTabProps = {
  experienceForm: ExperienceFormState;
  setExperienceForm: Dispatch<SetStateAction<ExperienceFormState>>;
  filteredExperiences: ExperienceEntity[];
  experienceSearch: string;
  setExperienceSearch: Dispatch<SetStateAction<string>>;
  experienceTimeframeFilter: string;
  setExperienceTimeframeFilter: Dispatch<SetStateAction<string>>;
  experienceTimeframes: string[];
  colorPresets: string[];
  editingExperienceId: string;
  setEditingExperienceId: Dispatch<SetStateAction<string>>;
  panelOpen: { experienceForm: boolean; experienceList: boolean };
  onTogglePanel: (key: "experienceForm" | "experienceList") => void;
  onSave: () => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onUpdateOrder: (id: string, displayOrder: number) => Promise<void>;
  onQuickUpdate: (id: string, body: Partial<ExperienceEntity>) => Promise<void>;
  onBulkDelete: (ids: string[]) => Promise<void>;
  onBulkReorder: (ids: string[], direction: "up" | "down") => Promise<void>;
  onReorderByDrag: (draggedId: string, targetId: string) => Promise<void>;
  setStatus: (value: string, tone?: "success" | "error" | "info") => void;
  resetForm: () => void;
};

export function ExperiencesTab({
  experienceForm,
  setExperienceForm,
  filteredExperiences,
  experienceSearch,
  setExperienceSearch,
  experienceTimeframeFilter,
  setExperienceTimeframeFilter,
  experienceTimeframes,
  colorPresets,
  editingExperienceId,
  setEditingExperienceId,
  panelOpen,
  onTogglePanel,
  onSave,
  onDelete,
  onUpdateOrder,
  onQuickUpdate,
  onBulkDelete,
  onBulkReorder,
  onReorderByDrag,
  setStatus,
  resetForm,
}: ExperiencesTabProps) {
  const [saving, setSaving] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const hasMinimumFields = experienceForm.role.trim() && experienceForm.company.trim() && experienceForm.description.trim();
  const allSelected = useMemo(
    () => filteredExperiences.length > 0 && filteredExperiences.every((item) => selected.includes(item._id)),
    [filteredExperiences, selected],
  );

  const runSave = async () => {
    setSaving(true);
    try {
      await onSave();
      setStatus(editingExperienceId ? "Experience updated." : "Experience created.", "success");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to save experience.", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <CollapsibleSectionCard title="Experience Form" isOpen={panelOpen.experienceForm} onToggle={() => onTogglePanel("experienceForm")}>
        <div className="grid sm:grid-cols-2 gap-3">
          <input className="w-full rounded-xl border border-[var(--card-border)] bg-transparent px-3 py-2" placeholder="Role" value={experienceForm.role} onChange={(event) => setExperienceForm((state) => ({ ...state, role: event.target.value }))} />
          <input className="w-full rounded-xl border border-[var(--card-border)] bg-transparent px-3 py-2" placeholder="Company" value={experienceForm.company} onChange={(event) => setExperienceForm((state) => ({ ...state, company: event.target.value }))} />
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <input className="w-full rounded-xl border border-[var(--card-border)] bg-transparent px-3 py-2" placeholder="Timeframe" value={experienceForm.timeframe} onChange={(event) => setExperienceForm((state) => ({ ...state, timeframe: event.target.value }))} />
          <input
            className="w-full rounded-xl border border-[var(--card-border)] bg-transparent px-3 py-2"
            type="number"
            min={0}
            placeholder="Display order (0 = top)"
            value={experienceForm.displayOrder}
            onChange={(event) => setExperienceForm((state) => ({ ...state, displayOrder: Number(event.target.value) || 0 }))}
          />
        </div>
        <textarea className="w-full rounded-xl border border-[var(--card-border)] bg-transparent px-3 py-2" placeholder="Description" value={experienceForm.description} onChange={(event) => setExperienceForm((state) => ({ ...state, description: event.target.value }))} />
        {!hasMinimumFields ? <p className="text-xs text-amber-400">Role, company, and description are required.</p> : null}
        <div className="space-y-2">
          <p className="text-sm font-medium">Experience Color</p>
          <ColorSwatches colors={colorPresets} value={experienceForm.color} onSelect={(color) => setExperienceForm((state) => ({ ...state, color }))} />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => void runSave()}
            disabled={saving || !hasMinimumFields}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)] text-white px-4 py-2 text-sm disabled:opacity-60"
          >
            <Plus className="h-4 w-4" />
            {saving ? "Saving..." : editingExperienceId ? "Update Experience" : "Add Experience"}
          </button>
          {editingExperienceId ? (
            <button
              onClick={() => {
                setEditingExperienceId("");
                resetForm();
              }}
              className="rounded-full border border-[var(--card-border)] px-4 py-2 text-sm"
            >
              Cancel Edit
            </button>
          ) : null}
        </div>
      </CollapsibleSectionCard>

      <CollapsibleSectionCard title="Experience List" isOpen={panelOpen.experienceList} onToggle={() => onTogglePanel("experienceList")}>
        <div className="grid md:grid-cols-[1fr_220px] gap-3">
          <SearchField value={experienceSearch} onChange={setExperienceSearch} placeholder="Search role or company" />
          <select value={experienceTimeframeFilter} onChange={(event) => setExperienceTimeframeFilter(event.target.value)} className="rounded-xl border border-[var(--card-border)] bg-transparent px-3 py-2 text-sm">
            <option value="all">All timeframes</option>
            {experienceTimeframes.map((timeframe) => (
              <option key={timeframe} value={timeframe}>
                {timeframe}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <label className="inline-flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={() => setSelected(allSelected ? [] : filteredExperiences.map((item) => item._id))}
            />
            Select all
          </label>
          <button type="button" onClick={() => void onBulkDelete(selected).then(() => setSelected([]))} disabled={!selected.length} className="rounded-full border border-[var(--card-border)] px-3 py-1.5 text-xs disabled:opacity-50">Bulk delete</button>
          <button type="button" onClick={() => void onBulkReorder(selected, "up")} disabled={!selected.length} className="rounded-full border border-[var(--card-border)] px-3 py-1.5 text-xs disabled:opacity-50 inline-flex items-center gap-1"><ArrowUp className="h-3.5 w-3.5" />Bulk up</button>
          <button type="button" onClick={() => void onBulkReorder(selected, "down")} disabled={!selected.length} className="rounded-full border border-[var(--card-border)] px-3 py-1.5 text-xs disabled:opacity-50 inline-flex items-center gap-1"><ArrowDown className="h-3.5 w-3.5" />Bulk down</button>
        </div>
        <div className="space-y-2 max-h-[420px] overflow-auto pr-1">
          {filteredExperiences.map((experience) => (
            <div
              key={experience._id}
              draggable
              onDragStart={() => setDraggingId(experience._id)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={() => {
                if (!draggingId || draggingId === experience._id) return;
                void onReorderByDrag(draggingId, experience._id).catch((error: unknown) =>
                  setStatus(error instanceof Error ? error.message : "Unable to reorder by drag and drop.", "error"),
                );
                setDraggingId(null);
              }}
              className="rounded-lg border border-[var(--card-border)] px-3 py-2 space-y-2 cursor-grab"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm flex items-center gap-2">
                    <input type="checkbox" checked={selected.includes(experience._id)} onChange={() => setSelected((state) => (state.includes(experience._id) ? state.filter((id) => id !== experience._id) : [...state, experience._id]))} />
                    <input
                      defaultValue={experience.role}
                      className="rounded-md border border-transparent bg-transparent px-1 py-0.5 text-sm focus:border-[var(--card-border)]"
                      onBlur={(event) =>
                        onQuickUpdate(experience._id, { role: event.currentTarget.value })
                          .then(() => setStatus("Experience role updated.", "success"))
                          .catch((error: unknown) => setStatus(error instanceof Error ? error.message : "Inline update failed.", "error"))
                      }
                    />
                    {experience.color ? <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: experience.color }} /> : null}
                  </p>
                  <input
                    defaultValue={experience.company}
                    className="mt-1 rounded-md border border-transparent bg-transparent px-1 py-0.5 text-xs text-[var(--text-secondary)] focus:border-[var(--card-border)]"
                    onBlur={(event) => {
                      const nextCompany = event.currentTarget.value;
                      if (nextCompany !== experience.company) {
                        onQuickUpdate(experience._id, { company: nextCompany }).catch((error: unknown) => setStatus(error instanceof Error ? error.message : "Company update failed.", "error"));
                      }
                    }}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditingExperienceId(experience._id);
                      setExperienceForm({
                        role: experience.role ?? "",
                        company: experience.company ?? "",
                        timeframe: experience.timeframe ?? "",
                        description: experience.description ?? "",
                        color: experience.color ?? "",
                        displayOrder: experience.displayOrder ?? 0,
                      });
                    }}
                    className="text-xs text-[var(--primary)]"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      onDelete(experience._id)
                        .then(() => setStatus("Experience deleted.", "success"))
                        .catch((error: unknown) => setStatus(error instanceof Error ? error.message : "Delete failed.", "error"))
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
                  defaultValue={experience.displayOrder ?? 0}
                  onBlur={(event) => {
                    const nextValue = Number(event.currentTarget.value) || 0;
                    if (nextValue !== (experience.displayOrder ?? 0)) {
                      onUpdateOrder(experience._id, nextValue).catch((error: unknown) => setStatus(error instanceof Error ? error.message : "Unable to update order.", "error"));
                    }
                  }}
                />
                <span className="text-xs text-[var(--text-secondary)] self-center">Display order</span>
              </div>
              <p className="text-[11px] text-[var(--text-secondary)]">Updated: {experience.updatedAt ? new Date(experience.updatedAt).toLocaleString() : "N/A"} | Changed by: {experience.changedBy || "You"}</p>
            </div>
          ))}
          {!filteredExperiences.length ? <p className="text-sm text-[var(--text-secondary)]">No experiences yet - add the milestones that shaped your craft.</p> : null}
        </div>
      </CollapsibleSectionCard>
    </div>
  );
}
