"use client";

import { Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { useMemo, useState, type Dispatch, type SetStateAction } from "react";
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
  onQuickUpdate: (id: string, body: Partial<TechnologyEntity>) => Promise<void>;
  onBulkDelete: (ids: string[]) => Promise<void>;
  onBulkReorder: (ids: string[], direction: "up" | "down") => Promise<void>;
  onReorderByDrag: (draggedId: string, targetId: string) => Promise<void>;
  setStatus: (value: string, tone?: "success" | "error" | "info") => void;
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
  onQuickUpdate,
  onBulkDelete,
  onBulkReorder,
  onReorderByDrag,
  setStatus,
  resetForm,
}: TechnologiesTabProps) {
  const [saving, setSaving] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const hasMinimumFields = technologyForm.name.trim() && technologyForm.category.trim();
  const allSelected = useMemo(
    () => filteredTechnologies.length > 0 && filteredTechnologies.every((item) => selected.includes(item._id)),
    [filteredTechnologies, selected],
  );

  const runSave = async () => {
    setSaving(true);
    try {
      await onSave();
      setStatus(editingTechnologyId ? "Technology updated." : "Technology created.", "success");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to save technology.", "error");
    } finally {
      setSaving(false);
    }
  };

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
        {!hasMinimumFields ? <p className="text-xs text-amber-400">Technology name and category are required.</p> : null}
        <div className="space-y-2">
          <p className="text-sm font-medium">Technology Color</p>
          <ColorSwatches colors={colorPresets} value={technologyForm.color} onSelect={(color) => setTechnologyForm((state) => ({ ...state, color }))} />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => void runSave()}
            disabled={saving || !hasMinimumFields}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)] text-white px-4 py-2 text-sm disabled:opacity-60"
          >
            <Plus className="h-4 w-4" />
            {saving ? "Saving..." : editingTechnologyId ? "Update Technology" : "Add Technology"}
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
        <div className="flex flex-wrap items-center gap-2">
          <label className="inline-flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={() => setSelected(allSelected ? [] : filteredTechnologies.map((item) => item._id))}
            />
            Select all
          </label>
          <button type="button" onClick={() => void onBulkDelete(selected).then(() => setSelected([]))} disabled={!selected.length} className="rounded-full border border-[var(--card-border)] px-3 py-1.5 text-xs disabled:opacity-50">Bulk delete</button>
          <button type="button" onClick={() => void onBulkReorder(selected, "up")} disabled={!selected.length} className="rounded-full border border-[var(--card-border)] px-3 py-1.5 text-xs disabled:opacity-50 inline-flex items-center gap-1"><ArrowUp className="h-3.5 w-3.5" />Bulk up</button>
          <button type="button" onClick={() => void onBulkReorder(selected, "down")} disabled={!selected.length} className="rounded-full border border-[var(--card-border)] px-3 py-1.5 text-xs disabled:opacity-50 inline-flex items-center gap-1"><ArrowDown className="h-3.5 w-3.5" />Bulk down</button>
        </div>
        <div className="space-y-2 max-h-[420px] overflow-auto pr-1">
          {filteredTechnologies.map((technology) => (
            <div
              key={technology._id}
              draggable
              onDragStart={() => setDraggingId(technology._id)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={() => {
                if (!draggingId || draggingId === technology._id) return;
                void onReorderByDrag(draggingId, technology._id).catch((error: unknown) =>
                  setStatus(error instanceof Error ? error.message : "Unable to reorder by drag and drop.", "error"),
                );
                setDraggingId(null);
              }}
              className="rounded-lg border border-[var(--card-border)] px-3 py-2 space-y-2 cursor-grab"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm flex items-center gap-2">
                    <input type="checkbox" checked={selected.includes(technology._id)} onChange={() => setSelected((state) => (state.includes(technology._id) ? state.filter((id) => id !== technology._id) : [...state, technology._id]))} />
                    <input
                      defaultValue={technology.name}
                      className="rounded-md border border-transparent bg-transparent px-1 py-0.5 text-sm focus:border-[var(--card-border)]"
                      onBlur={(event) =>
                        onQuickUpdate(technology._id, { name: event.currentTarget.value })
                          .then(() => setStatus("Technology name updated.", "success"))
                          .catch((error: unknown) => setStatus(error instanceof Error ? error.message : "Inline update failed.", "error"))
                      }
                    />
                    {technology.color ? <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: technology.color }} /> : null}
                  </p>
                  <input
                    defaultValue={technology.category}
                    className="mt-1 rounded-md border border-transparent bg-transparent px-1 py-0.5 text-xs text-[var(--text-secondary)] focus:border-[var(--card-border)]"
                    onBlur={(event) => {
                      const nextCategory = event.currentTarget.value;
                      if (nextCategory !== technology.category) {
                        onQuickUpdate(technology._id, { category: nextCategory }).catch((error: unknown) => setStatus(error instanceof Error ? error.message : "Category update failed.", "error"));
                      }
                    }}
                  />
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
                        .then(() => setStatus("Technology deleted.", "success"))
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
                  defaultValue={technology.displayOrder ?? 0}
                  onBlur={(event) => {
                    const nextValue = Number(event.currentTarget.value) || 0;
                    if (nextValue !== (technology.displayOrder ?? 0)) {
                      onUpdateOrder(technology._id, nextValue).catch((error: unknown) => setStatus(error instanceof Error ? error.message : "Unable to update order.", "error"));
                    }
                  }}
                />
                <span className="text-xs text-[var(--text-secondary)] self-center">Display order</span>
              </div>
              <p className="text-[11px] text-[var(--text-secondary)]">Updated: {technology.updatedAt ? new Date(technology.updatedAt).toLocaleString() : "N/A"} | Changed by: {technology.changedBy || "You"}</p>
            </div>
          ))}
          {!filteredTechnologies.length ? <p className="text-sm text-[var(--text-secondary)]">No tech yet - define your signature stack first.</p> : null}
        </div>
      </CollapsibleSectionCard>
    </div>
  );
}
