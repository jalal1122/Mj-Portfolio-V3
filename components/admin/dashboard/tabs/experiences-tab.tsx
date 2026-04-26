"use client";

import { Plus, Trash2 } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
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
  setStatus: (value: string) => void;
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
  setStatus,
  resetForm,
}: ExperiencesTabProps) {
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
        <div className="space-y-2">
          <p className="text-sm font-medium">Experience Color</p>
          <ColorSwatches colors={colorPresets} value={experienceForm.color} onSelect={(color) => setExperienceForm((state) => ({ ...state, color }))} />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() =>
              onSave()
                .then(() => setStatus(editingExperienceId ? "Experience updated." : "Experience created."))
                .catch((error: unknown) => setStatus(error instanceof Error ? error.message : "Unable to save experience."))
            }
            className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)] text-white px-4 py-2 text-sm"
          >
            <Plus className="h-4 w-4" />
            {editingExperienceId ? "Update Experience" : "Add Experience"}
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
        <div className="space-y-2 max-h-[420px] overflow-auto pr-1">
          {filteredExperiences.map((experience) => (
            <div key={experience._id} className="rounded-lg border border-[var(--card-border)] px-3 py-2 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm flex items-center gap-2">
                    {experience.role}
                    {experience.color ? <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: experience.color }} /> : null}
                  </p>
                  <p className="text-xs text-[var(--text-secondary)]">{experience.company}</p>
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
                        .then(() => setStatus("Experience deleted."))
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
                  defaultValue={experience.displayOrder ?? 0}
                  onBlur={(event) => {
                    const nextValue = Number(event.currentTarget.value) || 0;
                    if (nextValue !== (experience.displayOrder ?? 0)) {
                      onUpdateOrder(experience._id, nextValue).catch((error: unknown) => setStatus(error instanceof Error ? error.message : "Unable to update order."));
                    }
                  }}
                />
                <span className="text-xs text-[var(--text-secondary)] self-center">Display order</span>
              </div>
            </div>
          ))}
          {!filteredExperiences.length ? <p className="text-sm text-[var(--text-secondary)]">No experiences match current search/filter.</p> : null}
        </div>
      </CollapsibleSectionCard>
    </div>
  );
}
