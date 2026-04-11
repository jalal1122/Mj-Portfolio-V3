"use client";

import dynamic from "next/dynamic";
import { Plus, Trash2, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { SpotlightCard } from "@/components/ui/spotlight-card";

type Entity = Record<string, any>;
type CloudinaryResult = { info?: { secure_url?: string } };

const CldUploadWidget = dynamic(
  () => import("next-cloudinary").then((module) => module.CldUploadWidget),
  { ssr: false },
);

const defaultProject = {
  title: "",
  description: "",
  slug: "",
  cloudinaryImageUrl: "",
  techStack: "",
  githubLink: "",
  liveLink: "",
};

const defaultExperience = {
  role: "",
  company: "",
  timeframe: "",
  description: "",
};

const defaultTechnology = {
  name: "",
  category: "",
  cloudinarySvgUrl: "",
};

async function fetchEntity(route: string) {
  const response = await fetch(`/api/${route}`, { cache: "no-store" });
  const payload = await response.json();
  return payload.data ?? [];
}

export function AdminDashboard() {
  const [projects, setProjects] = useState<Entity[]>([]);
  const [technologies, setTechnologies] = useState<Entity[]>([]);
  const [experiences, setExperiences] = useState<Entity[]>([]);
  const [projectForm, setProjectForm] = useState(defaultProject);
  const [experienceForm, setExperienceForm] = useState(defaultExperience);
  const [technologyForm, setTechnologyForm] = useState(defaultTechnology);
  const [adminToken, setAdminToken] = useState("");
  const [status, setStatus] = useState("");
  const [editingProjectId, setEditingProjectId] = useState("");
  const [editingTechnologyId, setEditingTechnologyId] = useState("");
  const [editingExperienceId, setEditingExperienceId] = useState("");

  const getHeaders = () => {
    const baseHeaders: Record<string, string> = { "Content-Type": "application/json" };
    if (adminToken) {
      baseHeaders["x-admin-token"] = adminToken;
    }
    return baseHeaders;
  };

  const refresh = async () => {
    const [proj, tech, exp] = await Promise.all([fetchEntity("projects"), fetchEntity("technologies"), fetchEntity("experiences")]);
    setProjects(proj);
    setTechnologies(tech);
    setExperiences(exp);
  };

  useEffect(() => {
    void refresh();
  }, []);

  const createEntity = async (route: string, body: Record<string, unknown>) => {
    const response = await fetch(`/api/${route}`, { method: "POST", headers: getHeaders(), body: JSON.stringify(body) });
    if (!response.ok) {
      throw new Error("Request failed");
    }
  };

  const patchEntity = async (route: string, id: string, body: Record<string, unknown>) => {
    const response = await fetch(`/api/${route}/${id}`, { method: "PATCH", headers: getHeaders(), body: JSON.stringify(body) });
    if (!response.ok) {
      throw new Error("Update failed");
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
      techStack: projectForm.techStack
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
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
    if (editingTechnologyId) {
      await patchEntity("technologies", editingTechnologyId, technologyForm);
      setEditingTechnologyId("");
    } else {
      await createEntity("technologies", technologyForm);
    }
    setTechnologyForm(defaultTechnology);
    await refresh();
  };

  return (
    <div className="section-wrap space-y-6">
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

      <SpotlightCard className="p-5">
        <p className="text-sm text-[var(--text-secondary)]">Admin mutation token (required only when `ADMIN_TOKEN` is enabled)</p>
        <input
          value={adminToken}
          onChange={(event) => setAdminToken(event.target.value)}
          placeholder="Paste admin token"
          className="mt-2 w-full rounded-xl border border-[var(--card-border)] bg-transparent px-4 py-2"
        />
        {status ? <p className="text-sm text-[var(--text-secondary)] mt-2">{status}</p> : null}
      </SpotlightCard>

      <div className="grid gap-6 xl:grid-cols-3">
        <SpotlightCard className="p-5 space-y-3">
          <h2 className="font-semibold text-lg">Projects Manager</h2>
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
          <input className="w-full rounded-xl border border-[var(--card-border)] bg-transparent px-3 py-2" placeholder="Tech IDs (comma-separated)" value={projectForm.techStack} onChange={(event) => setProjectForm((state) => ({ ...state, techStack: event.target.value }))} />
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
                        techStack: (project.techStack ?? []).map((tech: Entity) => tech._id ?? tech).join(","),
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
        </SpotlightCard>

        <SpotlightCard className="p-5 space-y-3">
          <h2 className="font-semibold text-lg">Technologies Manager</h2>
          <input className="w-full rounded-xl border border-[var(--card-border)] bg-transparent px-3 py-2" placeholder="Name" value={technologyForm.name} onChange={(event) => setTechnologyForm((state) => ({ ...state, name: event.target.value }))} />
          <input className="w-full rounded-xl border border-[var(--card-border)] bg-transparent px-3 py-2" placeholder="Category" value={technologyForm.category} onChange={(event) => setTechnologyForm((state) => ({ ...state, category: event.target.value }))} />
          <div className="flex gap-2">
            <input
              className="w-full rounded-xl border border-[var(--card-border)] bg-transparent px-3 py-2"
              placeholder="Cloudinary SVG URL"
              value={technologyForm.cloudinarySvgUrl}
              onChange={(event) => setTechnologyForm((state) => ({ ...state, cloudinarySvgUrl: event.target.value }))}
            />
            <CldUploadWidget
              uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
              onSuccess={(result) => {
                const secureUrl = (result as CloudinaryResult).info?.secure_url ?? "";
                setTechnologyForm((state) => ({ ...state, cloudinarySvgUrl: secureUrl }));
              }}
            >
              {({ open }) => (
                <button type="button" onClick={() => open()} className="rounded-xl border border-[var(--card-border)] px-3">
                  <Upload className="h-4 w-4" />
                </button>
              )}
            </CldUploadWidget>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() =>
                createTechnology()
                  .then(() => setStatus(editingTechnologyId ? "Technology updated." : "Technology created."))
                  .catch(() => setStatus("Unable to save technology."))
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
                  <p className="text-sm">{technology.name}</p>
                  <p className="text-xs text-[var(--text-secondary)]">{technology.category}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditingTechnologyId(technology._id);
                      setTechnologyForm({
                        name: technology.name ?? "",
                        category: technology.category ?? "",
                        cloudinarySvgUrl: technology.cloudinarySvgUrl ?? "",
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
        </SpotlightCard>

        <SpotlightCard className="p-5 space-y-3">
          <h2 className="font-semibold text-lg">Experiences Manager</h2>
          <input className="w-full rounded-xl border border-[var(--card-border)] bg-transparent px-3 py-2" placeholder="Role" value={experienceForm.role} onChange={(event) => setExperienceForm((state) => ({ ...state, role: event.target.value }))} />
          <input className="w-full rounded-xl border border-[var(--card-border)] bg-transparent px-3 py-2" placeholder="Company" value={experienceForm.company} onChange={(event) => setExperienceForm((state) => ({ ...state, company: event.target.value }))} />
          <input className="w-full rounded-xl border border-[var(--card-border)] bg-transparent px-3 py-2" placeholder="Timeframe" value={experienceForm.timeframe} onChange={(event) => setExperienceForm((state) => ({ ...state, timeframe: event.target.value }))} />
          <textarea className="w-full rounded-xl border border-[var(--card-border)] bg-transparent px-3 py-2" placeholder="Description" value={experienceForm.description} onChange={(event) => setExperienceForm((state) => ({ ...state, description: event.target.value }))} />

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
                  <p className="text-sm">{experience.role}</p>
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
        </SpotlightCard>
      </div>
    </div>
  );
}
