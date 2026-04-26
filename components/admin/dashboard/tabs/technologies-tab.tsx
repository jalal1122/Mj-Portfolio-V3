"use client";

import { Plus, Trash2 } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { CollapsibleSectionCard, ColorSwatches, SearchField } from "@/components/admin/dashboard/admin-ui";
import type { TechnologyEntity, TechnologyFormState } from "@/components/admin/dashboard/types";

type TechnologiesTabProps = {
  technologyForm: TechnologyFormState;
  setTechnologyForm: Dispatch<SetStateAction<TechnologyFormState>>;
  filteredTechnologies: TechnologyEntity[];
  technologySearch: string;
  setTechnologySearch: Dispatch<SetStateAction<string>>;
  technologyCategoryFilter: string;
  setTechnologyCategoryFilter: Dispatch<SetStateAction<string>>;
  technologyCategories: string[];
  colorPresets: string[];
  editingTechnologyId: string;
  setEditingTechnologyId: Dispatch<SetStateAction<string>>;
  panelOpen: { technologyForm: boolean; technologyList: boolean };
  onTogglePanel: (key: "technologyForm" | "technologyList") => void;
  onSave: () => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onUpdateOrder: (id: string, displayOrder: number) => Promise<void>;
  setStatus: (value: string) => void;
  resetForm: () => void;
};

export function TechnologiesTab({
  technologyForm,
  setTechnologyForm,
  filteredTechnologies,
  technologySearch,
  setTechnologySearch,
  technologyCategoryFilter,
  setTechnologyCategoryFilter,
  technologyCategories,
  colorPresets,
  editingTechnologyId,
  setEditingTechnologyId,
  panelOpen,
  onTogglePanel,
  onSave,
  onDelete,
  onUpdateOrder,
  setStatus,
  resetForm,
}: TechnologiesTabProps) {
  return (
    <div className="space-y-6">
      <CollapsibleSectionCard title="Technology Form" isOpen={panelOpen.technologyForm} onToggle={() => onTogglePanel("technologyForm")}>
        <div className="grid sm:grid-cols-2 gap-3">
          <input className="w-full rounded-xl border border-[var(--card-border)] bg-transparent px-3 py-2" placeholder="Name" value={technologyForm.name} onChange={(event) => setTechnologyForm((state) => ({ ...state, name: event.target.value }))} />
          <input className="w-full rounded-xl border border-[var(--card-border)] bg-transparent px-3 py-2" placeholder="Category" value={technologyForm.category} onChange={(event) => setTechnologyForm((state) => ({ ...state, category: event.target.value }))} />
        </div>
        <input
          className="w-full rounded-xl border border-[var(--card-border)] bg-transparent px-3 py-2"
          type="number"
          min={0}
          placeholder="Display order (0 = top)"
          value={technologyForm.displayOrder}
          onChange={(event) => setTechnologyForm((state) => ({ ...state, displayOrder: Number(event.target.value) || 0 }))}
        />
        <div className="space-y-2">
          <p className="text-sm font-medium">Technology Color</p>
          <ColorSwatches colors={colorPresets} value={technologyForm.color} onSelect={(color) => setTechnologyForm((state) => ({ ...state, color }))} />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() =>
              onSave()
                .then(() => setStatus(editingTechnologyId ? "Technology updated." : "Technology created."))
                .catch((error: unknown) => setStatus(error instanceof Error ? error.message : "Unable to save technology."))
            }
            className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)] text-white px-4 py-2 text-sm"
          >
            <Plus className="h-4 w-4" />
            {editingTechnologyId ? "Update Technology" : "Add Technology"}
          </button>
          {editingTechnologyId ? (
            <button
              onClick={() => {
                setEditingTechnologyId("");
                resetForm();
              }}
              className="rounded-full border border-[var(--card-border)] px-4 py-2 text-sm"
            >
              Cancel Edit
            </button>
          ) : null}
        </div>
      </CollapsibleSectionCard>

      <CollapsibleSectionCard title="Technology List" isOpen={panelOpen.technologyList} onToggle={() => onTogglePanel("technologyList")}>
        <div className="grid md:grid-cols-[1fr_220px] gap-3">
          <SearchField value={technologySearch} onChange={setTechnologySearch} placeholder="Search technologies" />
          <select value={technologyCategoryFilter} onChange={(event) => setTechnologyCategoryFilter(event.target.value)} className="rounded-xl border border-[var(--card-border)] bg-transparent px-3 py-2 text-sm">
            <option value="all">All categories</option>
            {technologyCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2 max-h-[420px] overflow-auto pr-1">
          {filteredTechnologies.map((technology) => (
            <div key={technology._id} className="rounded-lg border border-[var(--card-border)] px-3 py-2 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm flex items-center gap-2">
                    {technology.name}
                    {technology.color ? <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: technology.color }} /> : null}
                  </p>
                  <p className="text-xs text-[var(--text-secondary)]">{technology.category}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditingTechnologyId(technology._id);
                      setTechnologyForm({
                        name: technology.name ?? "",
                        category: technology.category ?? "",
                        color: technology.color ?? "",
                        displayOrder: technology.displayOrder ?? 0,
                      });
                    }}
                    className="text-xs text-[var(--primary)]"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      onDelete(technology._id)
                        .then(() => setStatus("Technology deleted."))
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
                  defaultValue={technology.displayOrder ?? 0}
                  onBlur={(event) => {
                    const nextValue = Number(event.currentTarget.value) || 0;
                    if (nextValue !== (technology.displayOrder ?? 0)) {
                      onUpdateOrder(technology._id, nextValue).catch((error: unknown) => setStatus(error instanceof Error ? error.message : "Unable to update order."));
                    }
                  }}
                />
                <span className="text-xs text-[var(--text-secondary)] self-center">Display order</span>
              </div>
            </div>
          ))}
          {!filteredTechnologies.length ? <p className="text-sm text-[var(--text-secondary)]">No technologies match current search/filter.</p> : null}
        </div>
      </CollapsibleSectionCard>
    </div>
  );
}
