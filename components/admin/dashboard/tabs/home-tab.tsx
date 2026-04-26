"use client";

import dynamic from "next/dynamic";
import { MoveDown, MoveUp, Plus, Trash2, Upload } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { ColorSwatches, CollapsibleSectionCard, SearchField } from "@/components/admin/dashboard/admin-ui";
import type { CloudinaryResult, HomeContentEntity } from "@/components/admin/dashboard/types";

const CldUploadWidget = dynamic(() => import("next-cloudinary").then((module) => module.CldUploadWidget), { ssr: false });

type HomeTabProps = {
  homeContentForm: HomeContentEntity;
  setHomeContentForm: Dispatch<SetStateAction<HomeContentEntity>>;
  trustedSearch: string;
  setTrustedSearch: Dispatch<SetStateAction<string>>;
  reviewSearch: string;
  setReviewSearch: Dispatch<SetStateAction<string>>;
  colorPresets: string[];
  panelOpen: { homeForm: boolean; homeList: boolean };
  onTogglePanel: (key: "homeForm" | "homeList") => void;
  onSave: () => Promise<void>;
  setStatus: (value: string) => void;
  isEditing: boolean;
};

function moveItem<T>(list: T[], from: number, to: number) {
  if (to < 0 || to >= list.length) return list;
  const copy = [...list];
  const [item] = copy.splice(from, 1);
  copy.splice(to, 0, item);
  return copy;
}

export function HomeTab({
  homeContentForm,
  setHomeContentForm,
  trustedSearch,
  setTrustedSearch,
  reviewSearch,
  setReviewSearch,
  colorPresets,
  panelOpen,
  onTogglePanel,
  onSave,
  setStatus,
  isEditing,
}: HomeTabProps) {
  const trustedCompanies = homeContentForm.trustedCompanies ?? [];
  const testimonials = homeContentForm.testimonials ?? [];

  const filteredTrustedCompanies = trustedCompanies
    .map((company, index) => ({ company, index }))
    .filter(({ company }) => !trustedSearch.trim() || company.name.toLowerCase().includes(trustedSearch.trim().toLowerCase()));

  const filteredReviews = testimonials
    .map((testimonial, index) => ({ testimonial, index }))
    .filter(
      ({ testimonial }) =>
        !reviewSearch.trim() ||
        testimonial.name.toLowerCase().includes(reviewSearch.trim().toLowerCase()) ||
        testimonial.role.toLowerCase().includes(reviewSearch.trim().toLowerCase()) ||
        testimonial.text.toLowerCase().includes(reviewSearch.trim().toLowerCase()),
    );

  return (
    <div className="space-y-6">
      <CollapsibleSectionCard title="Homepage Content" isOpen={panelOpen.homeForm} onToggle={() => onTogglePanel("homeForm")}>
        <div className="space-y-2">
          <label className="text-sm">Hero Image URL</label>
          <div className="flex gap-2">
            <input
              className="w-full rounded-xl border border-[var(--card-border)] bg-transparent px-3 py-2"
              value={homeContentForm.heroImageUrl ?? ""}
              onChange={(event) => setHomeContentForm((state) => ({ ...state, heroImageUrl: event.target.value }))}
            />
            <CldUploadWidget
              uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
              onSuccess={(result) => {
                const secureUrl = (result as CloudinaryResult).info?.secure_url ?? "";
                setHomeContentForm((state) => ({ ...state, heroImageUrl: secureUrl }));
              }}
            >
              {({ open }) => (
                <button type="button" onClick={() => open()} className="rounded-xl border border-[var(--card-border)] px-3">
                  <Upload className="h-4 w-4" />
                </button>
              )}
            </CldUploadWidget>
          </div>
        </div>
        <button
          onClick={() =>
            onSave()
              .then(() => setStatus(isEditing ? "Homepage content updated." : "Homepage content created."))
              .catch((error: unknown) => setStatus(error instanceof Error ? error.message : "Unable to save homepage content."))
          }
          className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)] text-white px-4 py-2 text-sm"
        >
          <Plus className="h-4 w-4" />
          Save Homepage Content
        </button>
      </CollapsibleSectionCard>

      <CollapsibleSectionCard title="Trusted Companies & Reviews" isOpen={panelOpen.homeList} onToggle={() => onTogglePanel("homeList")}>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <p className="text-sm font-medium">Trusted Companies</p>
            <SearchField value={trustedSearch} onChange={setTrustedSearch} placeholder="Search companies" />
            {(filteredTrustedCompanies.length ? filteredTrustedCompanies : trustedCompanies.map((company, index) => ({ company, index }))).map(({ company, index }) => (
              <div key={`company-${index}`} className="space-y-2 rounded-xl border border-[var(--card-border)] p-3">
                <input
                  className="w-full rounded-xl border border-[var(--card-border)] bg-transparent px-3 py-2"
                  placeholder="Company name"
                  value={company.name}
                  onChange={(event) =>
                    setHomeContentForm((state) => ({
                      ...state,
                      trustedCompanies: trustedCompanies.map((item, itemIndex) => (itemIndex === index ? { ...item, name: event.target.value } : item)),
                    }))
                  }
                />
                <div className="flex items-center justify-between gap-3">
                  <ColorSwatches
                    colors={colorPresets}
                    value={company.color}
                    onSelect={(color) =>
                      setHomeContentForm((state) => ({
                        ...state,
                        trustedCompanies: trustedCompanies.map((item, itemIndex) => (itemIndex === index ? { ...item, color } : item)),
                      }))
                    }
                  />
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() =>
                        setHomeContentForm((state) => ({
                          ...state,
                          trustedCompanies: moveItem(trustedCompanies, index, index - 1),
                        }))
                      }
                      className="rounded-xl border border-[var(--card-border)] px-2 py-2"
                      aria-label="Move up"
                    >
                      <MoveUp className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setHomeContentForm((state) => ({
                          ...state,
                          trustedCompanies: moveItem(trustedCompanies, index, index + 1),
                        }))
                      }
                      className="rounded-xl border border-[var(--card-border)] px-2 py-2"
                      aria-label="Move down"
                    >
                      <MoveDown className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setHomeContentForm((state) => ({
                          ...state,
                          trustedCompanies: trustedCompanies.length > 1 ? trustedCompanies.filter((_, itemIndex) => itemIndex !== index) : trustedCompanies,
                        }))
                      }
                      className="rounded-xl border border-[var(--card-border)] px-2 py-2"
                      aria-label="Remove"
                    >
                      <Trash2 className="h-4 w-4 text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setHomeContentForm((state) => ({
                  ...state,
                  trustedCompanies: [...trustedCompanies, { name: "", color: "" }],
                }))
              }
              className="rounded-full border border-[var(--card-border)] px-4 py-2 text-sm"
            >
              Add Company
            </button>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium">Reviews</p>
            <SearchField value={reviewSearch} onChange={setReviewSearch} placeholder="Search reviews" />
            {(filteredReviews.length ? filteredReviews : testimonials.map((testimonial, index) => ({ testimonial, index }))).map(({ testimonial, index }) => (
              <div key={`review-${index}`} className="space-y-2 rounded-xl border border-[var(--card-border)] p-3">
                <textarea
                  className="w-full rounded-xl border border-[var(--card-border)] bg-transparent px-3 py-2"
                  placeholder="Review text"
                  value={testimonial.text}
                  onChange={(event) =>
                    setHomeContentForm((state) => ({
                      ...state,
                      testimonials: testimonials.map((item, itemIndex) => (itemIndex === index ? { ...item, text: event.target.value } : item)),
                    }))
                  }
                />
                <div className="grid md:grid-cols-2 gap-2">
                  <input
                    className="rounded-xl border border-[var(--card-border)] bg-transparent px-3 py-2"
                    placeholder="Reviewer name"
                    value={testimonial.name}
                    onChange={(event) =>
                      setHomeContentForm((state) => ({
                        ...state,
                        testimonials: testimonials.map((item, itemIndex) => (itemIndex === index ? { ...item, name: event.target.value } : item)),
                      }))
                    }
                  />
                  <input
                    className="rounded-xl border border-[var(--card-border)] bg-transparent px-3 py-2"
                    placeholder="Reviewer role"
                    value={testimonial.role}
                    onChange={(event) =>
                      setHomeContentForm((state) => ({
                        ...state,
                        testimonials: testimonials.map((item, itemIndex) => (itemIndex === index ? { ...item, role: event.target.value } : item)),
                      }))
                    }
                  />
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() =>
                      setHomeContentForm((state) => ({
                        ...state,
                        testimonials: moveItem(testimonials, index, index - 1),
                      }))
                    }
                    className="rounded-xl border border-[var(--card-border)] px-2 py-2"
                    aria-label="Move up"
                  >
                    <MoveUp className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setHomeContentForm((state) => ({
                        ...state,
                        testimonials: moveItem(testimonials, index, index + 1),
                      }))
                    }
                    className="rounded-xl border border-[var(--card-border)] px-2 py-2"
                    aria-label="Move down"
                  >
                    <MoveDown className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setHomeContentForm((state) => ({
                        ...state,
                        testimonials: testimonials.length > 1 ? testimonials.filter((_, itemIndex) => itemIndex !== index) : testimonials,
                      }))
                    }
                    className="rounded-xl border border-[var(--card-border)] px-2 py-2"
                    aria-label="Remove"
                  >
                    <Trash2 className="h-4 w-4 text-red-400" />
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setHomeContentForm((state) => ({
                  ...state,
                  testimonials: [...testimonials, { text: "", name: "", role: "" }],
                }))
              }
              className="rounded-full border border-[var(--card-border)] px-4 py-2 text-sm"
            >
              Add Review
            </button>
          </div>
        </div>
      </CollapsibleSectionCard>
    </div>
  );
}
