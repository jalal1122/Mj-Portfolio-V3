"use client";

import dynamic from "next/dynamic";
import { ChevronDown, ChevronUp, LayoutDashboard, Plus, ShieldCheck, Trash2, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { SpotlightCard } from "@/components/ui/spotlight-card";

type Entity = Record<string, any>;
type CloudinaryResult = { info?: { secure_url?: string } };
type ProjectFormState = {
  title: string;
  description: string;
  slug: string;
  cloudinaryImageUrl: string;
  techStack: string[];
  githubLink: string;
  liveLink: string;
};
type ExperienceFormState = {
  role: string;
  company: string;
  timeframe: string;
  description: string;
  color: string;
};
type TechnologyFormState = {
  name: string;
  category: string;
  color: string;
};
type PanelKey = "home" | "projects" | "technologies" | "experiences" | "security";

const colorPresets = [
  "#6366F1",
  "#8B5CF6",
  "#D946EF",
  "#10B981",
  "#0EA5E9",
  "#F59E0B",
  "#EF4444",
  "#14B8A6",
  "#F97316",
  "#EC4899",
];

const CldUploadWidget = dynamic(
  () => import("next-cloudinary").then((module) => module.CldUploadWidget),
  { ssr: false },
);

const defaultProject: ProjectFormState = {
  title: "",
  description: "",
  slug: "",
  cloudinaryImageUrl: "",
  techStack: [],
  githubLink: "",
  liveLink: "",
};

const defaultExperience: ExperienceFormState = {
  role: "",
  company: "",
  timeframe: "",
  description: "",
  color: "",
};

const defaultTechnology: TechnologyFormState = {
  name: "",
  category: "",
  color: "",
};

const defaultHomeContent = {
  heroImageUrl: "/jkimage.jpeg",
  trustedCompanies: [{ name: "", color: "" }],
  testimonials: [{ text: "", name: "", role: "" }],
};

async function fetchEntity(route: string) {
  const response = await fetch(`/api/${route}`, { cache: "no-store" });
  const payload = await response.json();
  return payload.data ?? [];
}

async function fetchHomeContentEntity() {
  const response = await fetch("/api/home-content", { cache: "no-store" });
  const payload = await response.json();
  return payload.data ?? null;
}

async function getErrorMessage(response: Response) {
  try {
    const payload = await response.json();
    return payload?.error || payload?.message || `Request failed with status ${response.status}`;
  } catch {
    return `Request failed with status ${response.status}`;
  }
}

export function AdminDashboard() {
  const [projects, setProjects] = useState<Entity[]>([]);
  const [technologies, setTechnologies] = useState<Entity[]>([]);
  const [experiences, setExperiences] = useState<Entity[]>([]);
  const [homeContent, setHomeContent] = useState<Entity | null>(null);
  const [homeContentForm, setHomeContentForm] = useState(defaultHomeContent);
  const [projectForm, setProjectForm] = useState<ProjectFormState>(defaultProject);
  const [experienceForm, setExperienceForm] = useState<ExperienceFormState>(defaultExperience);
  const [technologyForm, setTechnologyForm] = useState<TechnologyFormState>(defaultTechnology);
  const [adminToken, setAdminToken] = useState("");
  const [status, setStatus] = useState("");
  const [editingProjectId, setEditingProjectId] = useState("");
  const [editingTechnologyId, setEditingTechnologyId] = useState("");
  const [editingExperienceId, setEditingExperienceId] = useState("");
  const [editingHomeContentId, setEditingHomeContentId] = useState("");
  const [panelOpen, setPanelOpen] = useState<Record<PanelKey, boolean>>({
    home: true,
    projects: true,
    technologies: true,
    experiences: true,
    security: false,
  });

  const getHeaders = () => {
    const baseHeaders: Record<string, string> = { "Content-Type": "application/json" };
    if (adminToken) {
      baseHeaders["x-admin-token"] = adminToken;
    }
    return baseHeaders;
  };

  const togglePanel = (key: PanelKey) => {
    setPanelOpen((state) => ({ ...state, [key]: !state[key] }));
  };

  const refresh = async () => {
    const [proj, tech, exp, home] = await Promise.all([
      fetchEntity("projects"),
      fetchEntity("technologies"),
      fetchEntity("experiences"),
      fetchHomeContentEntity(),
    ]);
    setProjects(proj);
    setTechnologies(tech);
    setExperiences(exp);
    setHomeContent(home);
    if (home?._id) {
      setEditingHomeContentId(home._id);
      setHomeContentForm({
        heroImageUrl: home.heroImageUrl || "/jkimage.jpeg",
        trustedCompanies: home.trustedCompanies?.length ? home.trustedCompanies : [{ name: "", color: "" }],
        testimonials: home.testimonials?.length ? home.testimonials : [{ text: "", name: "", role: "" }],
      });
    }
  };

  useEffect(() => {
    void refresh();
  }, []);

  const createEntity = async (route: string, body: Record<string, unknown>) => {
    const response = await fetch(`/api/${route}`, { method: "POST", headers: getHeaders(), body: JSON.stringify(body) });
    if (!response.ok) {
      throw new Error(await getErrorMessage(response));
    }
  };

  const patchEntity = async (route: string, id: string, body: Record<string, unknown>) => {
    const response = await fetch(`/api/${route}/${id}`, { method: "PATCH", headers: getHeaders(), body: JSON.stringify(body) });
    if (!response.ok) {
      throw new Error(await getErrorMessage(response));
    }
  };

  const deleteEntity = async (route: string, id: string) => {
    const response = await fetch(`/api/${route}/${id}`, { method: "DELETE", headers: getHeaders() });
    if (!response.ok) {
      throw new Error("Delete failed");
    }
    await refresh();
  };

  const createProject = async () => {
    const payload = {
      ...projectForm,
      techStack: projectForm.techStack.filter(Boolean),
    };
    if (editingProjectId) {
      await patchEntity("projects", editingProjectId, payload);
      setEditingProjectId("");
    } else {
      await createEntity("projects", payload);
    }
    setProjectForm(defaultProject);
    await refresh();
  };

  const toggleProjectTech = (techId: string) => {
    setProjectForm((state) => ({
      ...state,
      techStack: state.techStack.includes(techId)
        ? state.techStack.filter((id) => id !== techId)
        : [...state.techStack, techId],
    }));
  };

  const createExperience = async () => {
    if (editingExperienceId) {
      await patchEntity("experiences", editingExperienceId, experienceForm);
      setEditingExperienceId("");
    } else {
      await createEntity("experiences", experienceForm);
    }
    setExperienceForm(defaultExperience);
    await refresh();
  };

  const createTechnology = async () => {
    const payload = {
      ...technologyForm,
      // Keep compatibility if old runtime model still expects this field.
      cloudinarySvgUrl: "https://placeholder.invalid/tech.svg",
    };
    if (editingTechnologyId) {
      await patchEntity("technologies", editingTechnologyId, payload);
      setEditingTechnologyId("");
    } else {
      await createEntity("technologies", payload);
    }
    setTechnologyForm(defaultTechnology);
    await refresh();
  };

  const saveHomeContent = async () => {
    const payload = {
      heroImageUrl: homeContentForm.heroImageUrl.trim() || "/jkimage.jpeg",
      trustedCompanies: homeContentForm.trustedCompanies.filter((item) => item.name.trim()),
      testimonials: homeContentForm.testimonials.filter((item) => item.text.trim() && item.name.trim() && item.role.trim()),
    };
    if (editingHomeContentId) {
      await patchEntity("home-content", editingHomeContentId, payload);
    } else {
      await createEntity("home-content", payload);
    }
    await refresh();
  };

  const renderColorSwatches = (value: string, onSelect: (color: string) => void) => (
    <div className="flex flex-wrap items-center gap-2">
      {colorPresets.map((color) => {
        const active = value === color;
        return (
          <button
            key={color}
            type="button"
            aria-label={`Select color ${color}`}
            onClick={() => onSelect(color)}
            className={`h-7 w-7 rounded-md border transition-transform ${active ? "scale-105 border-white" : "border-white/20"}`}
            style={{ background: color }}
          />
        );
      })}
      <button
        type="button"
        onClick={() => onSelect("")}
        className={`h-7 rounded-md border px-2 text-xs ${value ? "border-white/20" : "border-white"}`}
      >
        None
      </button>
    </div>
  );

  return (
    <div className="section-wrap space-y-6">
      <SpotlightCard className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-secondary)]">Admin Dashboard</p>
            <h1 className="mt-1 text-2xl font-semibold flex items-center gap-2">
              <LayoutDashboard className="h-5 w-5 text-[var(--primary)]" />
              Portfolio Control Center
            </h1>
          </div>
          <button
            type="button"
            onClick={() => void refresh()}
            className="rounded-xl border border-[var(--card-border)] px-3 py-2 text-sm"
          >
            Refresh Data
          </button>
        </div>
      </SpotlightCard>

      <div className="grid md:grid-cols-3 gap-4">
        <SpotlightCard className="p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-[var(--text-secondary)]">Projects</p>
          <p className="mt-2 text-3xl font-semibold">{projects.length}</p>
        </SpotlightCard>
        <SpotlightCard className="p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-[var(--text-secondary)]">Technologies</p>
          <p className="mt-2 text-3xl font-semibold">{technologies.length}</p>
        </SpotlightCard>
        <SpotlightCard className="p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-[var(--text-secondary)]">Experiences</p>
          <p className="mt-2 text-3xl font-semibold">{experiences.length}</p>
        </SpotlightCard>
      </div>

      <SpotlightCard className="p-5 space-y-4">
        <button type="button" onClick={() => togglePanel("home")} className="w-full flex items-center justify-between gap-3">
          <div className="text-left">
            <h2 className="font-semibold text-lg">Homepage Content Manager</h2>
            <p className="text-sm text-[var(--text-secondary)]">Manage hero image, trusted cards, and reviews shown on the homepage.</p>
          </div>
          {panelOpen.home ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {panelOpen.home ? (
          <>
            <div className="space-y-2">
              <label className="text-sm">Hero Image URL</label>
              <div className="flex gap-2">
                <input
                  className="w-full rounded-xl border border-[var(--card-border)] bg-transparent px-3 py-2"
                  value={homeContentForm.heroImageUrl}
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

            <div className="space-y-3">
              <p className="text-sm font-medium">Trusted By The Best</p>
              {homeContentForm.trustedCompanies.map((company, index) => (
                <div key={`company-${index}`} className="space-y-2 rounded-xl border border-[var(--card-border)] p-3">
                  <input
                    className="rounded-xl border border-[var(--card-border)] bg-transparent px-3 py-2"
                    placeholder="Company name"
                    value={company.name}
                    onChange={(event) =>
                      setHomeContentForm((state) => ({
                        ...state,
                        trustedCompanies: state.trustedCompanies.map((item, itemIndex) => (itemIndex === index ? { ...item, name: event.target.value } : item)),
                      }))
                    }
                  />
                  <div className="flex items-center justify-between gap-3">
                    {renderColorSwatches(company.color ?? "", (color) =>
                      setHomeContentForm((state) => ({
                        ...state,
                        trustedCompanies: state.trustedCompanies.map((item, itemIndex) => (itemIndex === index ? { ...item, color } : item)),
                      }))
                    )}
                    <button
                      type="button"
                      onClick={() =>
                        setHomeContentForm((state) => ({
                          ...state,
                          trustedCompanies: state.trustedCompanies.length > 1 ? state.trustedCompanies.filter((_, itemIndex) => itemIndex !== index) : state.trustedCompanies,
                        }))
                      }
                      className="rounded-xl border border-[var(--card-border)] px-3 py-2"
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
                    trustedCompanies: [...state.trustedCompanies, { name: "", color: "" }],
                  }))
                }
                className="rounded-full border border-[var(--card-border)] px-4 py-2 text-sm"
              >
                Add Company
              </button>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium">Reviews</p>
              {homeContentForm.testimonials.map((testimonial, index) => (
                <div key={`testimonial-${index}`} className="space-y-2 rounded-xl border border-[var(--card-border)] p-3">
                  <textarea
                    className="w-full rounded-xl border border-[var(--card-border)] bg-transparent px-3 py-2"
                    placeholder="Review text"
                    value={testimonial.text}
                    onChange={(event) =>
                      setHomeContentForm((state) => ({
                        ...state,
                        testimonials: state.testimonials.map((item, itemIndex) => (itemIndex === index ? { ...item, text: event.target.value } : item)),
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
                          testimonials: state.testimonials.map((item, itemIndex) => (itemIndex === index ? { ...item, name: event.target.value } : item)),
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
                          testimonials: state.testimonials.map((item, itemIndex) => (itemIndex === index ? { ...item, role: event.target.value } : item)),
                        }))
                      }
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setHomeContentForm((state) => ({
                        ...state,
                        testimonials: state.testimonials.length > 1 ? state.testimonials.filter((_, itemIndex) => itemIndex !== index) : state.testimonials,
                      }))
                    }
                    className="rounded-full border border-[var(--card-border)] px-4 py-1.5 text-xs"
                  >
                    Remove Review
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setHomeContentForm((state) => ({
                    ...state,
                    testimonials: [...state.testimonials, { text: "", name: "", role: "" }],
                  }))
                }
                className="rounded-full border border-[var(--card-border)] px-4 py-2 text-sm"
              >
                Add Review
              </button>
            </div>

            <button
              onClick={() =>
                saveHomeContent()
                  .then(() => setStatus(homeContent?._id ? "Homepage content updated." : "Homepage content created."))
                  .catch(() => setStatus("Unable to save homepage content."))
              }
              className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)] text-white px-4 py-2 text-sm"
            >
              <Plus className="h-4 w-4" />
              Save Homepage Content
            </button>
          </>
        ) : null}
      </SpotlightCard>

      <SpotlightCard className="p-5">
        <button type="button" onClick={() => togglePanel("security")} className="w-full flex items-center justify-between gap-3">
          <div className="text-left">
            <p className="text-sm text-[var(--text-secondary)] flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[var(--secondary)]" />
              Admin mutation token (required only when `ADMIN_TOKEN` is enabled)
            </p>
          </div>
          {panelOpen.security ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        {panelOpen.security ? (
          <>
            <input
              value={adminToken}
              onChange={(event) => setAdminToken(event.target.value)}
              placeholder="Paste admin token"
              className="mt-2 w-full rounded-xl border border-[var(--card-border)] bg-transparent px-4 py-2"
            />
            {status ? <p className="text-sm text-[var(--text-secondary)] mt-2">{status}</p> : null}
          </>
        ) : null}
      </SpotlightCard>

      <div className="grid gap-6 xl:grid-cols-3">
        <SpotlightCard className="p-5 space-y-3">
          <button type="button" onClick={() => togglePanel("projects")} className="w-full flex items-center justify-between gap-3">
            <h2 className="font-semibold text-lg">Projects Manager</h2>
            {panelOpen.projects ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          {panelOpen.projects ? (
            <>
              <input className="w-full rounded-xl border border-[var(--card-border)] bg-transparent px-3 py-2" placeholder="Title" value={projectForm.title} onChange={(event) => setProjectForm((state) => ({ ...state, title: event.target.value }))} />
              <textarea className="w-full rounded-xl border border-[var(--card-border)] bg-transparent px-3 py-2" placeholder="Description" value={projectForm.description} onChange={(event) => setProjectForm((state) => ({ ...state, description: event.target.value }))} />
              <input className="w-full rounded-xl border border-[var(--card-border)] bg-transparent px-3 py-2" placeholder="Slug" value={projectForm.slug} onChange={(event) => setProjectForm((state) => ({ ...state, slug: event.target.value }))} />
              <div className="flex gap-2">
                <input
                  className="w-full rounded-xl border border-[var(--card-border)] bg-transparent px-3 py-2"
                  placeholder="Cloudinary image URL"
                  value={projectForm.cloudinaryImageUrl}
                  onChange={(event) => setProjectForm((state) => ({ ...state, cloudinaryImageUrl: event.target.value }))}
                />
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
                        onClick={() => toggleProjectTech(techId)}
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
                  {!technologies.length ? <p className="text-xs text-[var(--text-secondary)]">Add technologies first to select project stack.</p> : null}
                </div>
              </div>
              <input className="w-full rounded-xl border border-[var(--card-border)] bg-transparent px-3 py-2" placeholder="Github link" value={projectForm.githubLink} onChange={(event) => setProjectForm((state) => ({ ...state, githubLink: event.target.value }))} />
              <input className="w-full rounded-xl border border-[var(--card-border)] bg-transparent px-3 py-2" placeholder="Live link" value={projectForm.liveLink} onChange={(event) => setProjectForm((state) => ({ ...state, liveLink: event.target.value }))} />

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() =>
                    createProject()
                      .then(() => setStatus(editingProjectId ? "Project updated." : "Project created."))
                      .catch(() => setStatus("Unable to save project."))
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
                      setProjectForm(defaultProject);
                    }}
                    className="rounded-full border border-[var(--card-border)] px-4 py-2 text-sm"
                  >
                    Cancel Edit
                  </button>
                ) : null}
              </div>

              <div className="space-y-2 max-h-[320px] overflow-auto pr-1">
                {projects.map((project) => (
                  <div key={project._id} className="flex items-center justify-between rounded-lg border border-[var(--card-border)] px-3 py-2">
                    <span className="text-sm truncate max-w-[180px]">{project.title}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingProjectId(project._id);
                          setProjectForm({
                            title: project.title ?? "",
                            description: project.description ?? "",
                            slug: project.slug ?? "",
                            cloudinaryImageUrl: project.cloudinaryImageUrl ?? "",
                            techStack: (project.techStack ?? []).map((tech: Entity) => String(tech._id ?? tech)).filter(Boolean),
                            githubLink: project.githubLink ?? "",
                            liveLink: project.liveLink ?? "",
                          });
                        }}
                        className="text-xs text-[var(--primary)]"
                      >
                        Edit
                      </button>
                      <button onClick={() => deleteEntity("projects", project._id).then(() => setStatus("Project deleted.")).catch(() => setStatus("Delete failed."))}>
                        <Trash2 className="h-4 w-4 text-red-400" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </SpotlightCard>

        <SpotlightCard className="p-5 space-y-3">
          <button type="button" onClick={() => togglePanel("technologies")} className="w-full flex items-center justify-between gap-3">
            <h2 className="font-semibold text-lg">Technologies Manager</h2>
            {panelOpen.technologies ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          {panelOpen.technologies ? (
            <>
              <input className="w-full rounded-xl border border-[var(--card-border)] bg-transparent px-3 py-2" placeholder="Name" value={technologyForm.name} onChange={(event) => setTechnologyForm((state) => ({ ...state, name: event.target.value }))} />
              <input className="w-full rounded-xl border border-[var(--card-border)] bg-transparent px-3 py-2" placeholder="Category" value={technologyForm.category} onChange={(event) => setTechnologyForm((state) => ({ ...state, category: event.target.value }))} />
              <div className="space-y-2">
                <p className="text-sm font-medium">Technology Color</p>
                {renderColorSwatches(technologyForm.color, (color) => setTechnologyForm((state) => ({ ...state, color })))}
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() =>
                    createTechnology()
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
                      setTechnologyForm(defaultTechnology);
                    }}
                    className="rounded-full border border-[var(--card-border)] px-4 py-2 text-sm"
                  >
                    Cancel Edit
                  </button>
                ) : null}
              </div>

              <div className="space-y-2 max-h-[320px] overflow-auto pr-1">
                {technologies.map((technology) => (
                  <div key={technology._id} className="flex items-center justify-between rounded-lg border border-[var(--card-border)] px-3 py-2">
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
                          });
                        }}
                        className="text-xs text-[var(--primary)]"
                      >
                        Edit
                      </button>
                      <button onClick={() => deleteEntity("technologies", technology._id).then(() => setStatus("Technology deleted.")).catch(() => setStatus("Delete failed."))}>
                        <Trash2 className="h-4 w-4 text-red-400" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </SpotlightCard>

        <SpotlightCard className="p-5 space-y-3">
          <button type="button" onClick={() => togglePanel("experiences")} className="w-full flex items-center justify-between gap-3">
            <h2 className="font-semibold text-lg">Experiences Manager</h2>
            {panelOpen.experiences ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          {panelOpen.experiences ? (
            <>
              <input className="w-full rounded-xl border border-[var(--card-border)] bg-transparent px-3 py-2" placeholder="Role" value={experienceForm.role} onChange={(event) => setExperienceForm((state) => ({ ...state, role: event.target.value }))} />
              <input className="w-full rounded-xl border border-[var(--card-border)] bg-transparent px-3 py-2" placeholder="Company" value={experienceForm.company} onChange={(event) => setExperienceForm((state) => ({ ...state, company: event.target.value }))} />
              <input className="w-full rounded-xl border border-[var(--card-border)] bg-transparent px-3 py-2" placeholder="Timeframe" value={experienceForm.timeframe} onChange={(event) => setExperienceForm((state) => ({ ...state, timeframe: event.target.value }))} />
              <textarea className="w-full rounded-xl border border-[var(--card-border)] bg-transparent px-3 py-2" placeholder="Description" value={experienceForm.description} onChange={(event) => setExperienceForm((state) => ({ ...state, description: event.target.value }))} />
              <div className="space-y-2">
                <p className="text-sm font-medium">Experience Color</p>
                {renderColorSwatches(experienceForm.color, (color) => setExperienceForm((state) => ({ ...state, color })))}
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() =>
                    createExperience()
                      .then(() => setStatus(editingExperienceId ? "Experience updated." : "Experience created."))
                      .catch(() => setStatus("Unable to save experience."))
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
                      setExperienceForm(defaultExperience);
                    }}
                    className="rounded-full border border-[var(--card-border)] px-4 py-2 text-sm"
                  >
                    Cancel Edit
                  </button>
                ) : null}
              </div>

              <div className="space-y-2 max-h-[320px] overflow-auto pr-1">
                {experiences.map((experience) => (
                  <div key={experience._id} className="flex items-center justify-between rounded-lg border border-[var(--card-border)] px-3 py-2">
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
                          });
                        }}
                        className="text-xs text-[var(--primary)]"
                      >
                        Edit
                      </button>
                      <button onClick={() => deleteEntity("experiences", experience._id).then(() => setStatus("Experience deleted.")).catch(() => setStatus("Delete failed."))}>
                        <Trash2 className="h-4 w-4 text-red-400" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </SpotlightCard>
      </div>
    </div>
  );
}
