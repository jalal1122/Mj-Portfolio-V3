"use client";

import { Briefcase, FolderKanban, Home, ShieldCheck, Wrench } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DashboardHeaderCard, InlineToast, SidebarTabs } from "@/components/admin/dashboard/admin-ui";
import {
  colorPresets,
  defaultExperience,
  defaultHomeContent,
  defaultPanelOpenState,
  defaultProject,
  defaultTechnology,
} from "@/components/admin/dashboard/constants";
import { ExperiencesTab } from "@/components/admin/dashboard/tabs/experiences-tab";
import { HomeTab } from "@/components/admin/dashboard/tabs/home-tab";
import { ProjectsTab } from "@/components/admin/dashboard/tabs/projects-tab";
import { SecurityTab } from "@/components/admin/dashboard/tabs/security-tab";
import { TechnologiesTab } from "@/components/admin/dashboard/tabs/technologies-tab";
import type {
  ExperienceEntity,
  ExperienceFormState,
  HomeContentEntity,
  PanelKey,
  ProjectEntity,
  ProjectFormState,
  TabItem,
  TabKey,
  TechnologyEntity,
  TechnologyFormState,
} from "@/components/admin/dashboard/types";

async function fetchEntity<T>(route: string) {
  const response = await fetch(`/api/${route}`, { cache: "no-store" });
  const payload = await response.json();
  return (payload.data ?? []) as T;
}

async function fetchHomeContentEntity() {
  const response = await fetch("/api/home-content", { cache: "no-store" });
  const payload = await response.json();
  return (payload.data ?? null) as HomeContentEntity | null;
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
  const isMountedRef = useRef(false);
  const [projects, setProjects] = useState<ProjectEntity[]>([]);
  const [technologies, setTechnologies] = useState<TechnologyEntity[]>([]);
  const [experiences, setExperiences] = useState<ExperienceEntity[]>([]);
  const [homeContent, setHomeContent] = useState<HomeContentEntity | null>(null);

  const [homeContentForm, setHomeContentForm] = useState<HomeContentEntity>(defaultHomeContent);
  const [projectForm, setProjectForm] = useState<ProjectFormState>(defaultProject);
  const [experienceForm, setExperienceForm] = useState<ExperienceFormState>(defaultExperience);
  const [technologyForm, setTechnologyForm] = useState<TechnologyFormState>(defaultTechnology);

  const [adminToken, setAdminToken] = useState("");
  const [adminActor, setAdminActor] = useState("Portfolio Admin");
  const [status, setStatus] = useState("");
  const [statusTone, setStatusTone] = useState<"success" | "error" | "info">("info");
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("home");
  const [editingProjectId, setEditingProjectId] = useState("");
  const [editingTechnologyId, setEditingTechnologyId] = useState("");
  const [editingExperienceId, setEditingExperienceId] = useState("");
  const [editingHomeContentId, setEditingHomeContentId] = useState("");
  const [panelOpen, setPanelOpen] = useState<Record<PanelKey, boolean>>(defaultPanelOpenState);

  const [projectSearch, setProjectSearch] = useState("");
  const [projectTechFilter, setProjectTechFilter] = useState("all");
  const [technologySearch, setTechnologySearch] = useState("");
  const [technologyCategoryFilter, setTechnologyCategoryFilter] = useState("all");
  const [experienceSearch, setExperienceSearch] = useState("");
  const [experienceTimeframeFilter, setExperienceTimeframeFilter] = useState("all");
  const [trustedSearch, setTrustedSearch] = useState("");
  const [reviewSearch, setReviewSearch] = useState("");

  const setStatusWithTone = useCallback((value: string, tone: "success" | "error" | "info" = "info") => {
    if (!isMountedRef.current) return;
    setStatusTone(tone);
    setStatus(value);
  }, []);

  const markSavedNow = useCallback(() => {
    if (!isMountedRef.current) return;
    setLastSavedAt(new Date().toLocaleTimeString());
  }, []);

  const tabItems: TabItem[] = [
    { key: "home", label: "Homepage", icon: Home },
    { key: "projects", label: "Projects", icon: FolderKanban },
    { key: "technologies", label: "Technologies", icon: Wrench },
    { key: "experiences", label: "Experiences", icon: Briefcase },
    { key: "security", label: "Security", icon: ShieldCheck },
  ];

  const getHeaders = () => {
    const baseHeaders: Record<string, string> = { "Content-Type": "application/json" };
    if (adminToken) baseHeaders["x-admin-token"] = adminToken;
    baseHeaders["x-admin-user"] = adminActor.trim() || "Portfolio Admin";
    return baseHeaders;
  };

  const togglePanel = (key: PanelKey) => {
    setPanelOpen((state) => ({ ...state, [key]: !state[key] }));
  };

  const refresh = async () => {
    if (isMountedRef.current) setIsRefreshing(true);
    const [proj, tech, exp, home] = await Promise.all([
      fetchEntity<ProjectEntity[]>("projects"),
      fetchEntity<TechnologyEntity[]>("technologies"),
      fetchEntity<ExperienceEntity[]>("experiences"),
      fetchHomeContentEntity(),
    ]);
    if (!isMountedRef.current) return;
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
    setIsRefreshing(false);
  };

  useEffect(() => {
    isMountedRef.current = true;
    const timer = setTimeout(() => {
      void refresh();
    }, 0);
    return () => {
      clearTimeout(timer);
      isMountedRef.current = false;
    };
  }, []);

  const createEntity = async (route: string, body: Record<string, unknown>) => {
    const response = await fetch(`/api/${route}`, { method: "POST", headers: getHeaders(), body: JSON.stringify(body) });
    if (!response.ok) throw new Error(await getErrorMessage(response));
  };

  const patchEntity = async (route: string, id: string, body: Record<string, unknown>) => {
    const response = await fetch(`/api/${route}/${id}`, { method: "PATCH", headers: getHeaders(), body: JSON.stringify(body) });
    if (!response.ok) throw new Error(await getErrorMessage(response));
  };

  const deleteEntity = async (route: string, id: string) => {
    const response = await fetch(`/api/${route}/${id}`, { method: "DELETE", headers: getHeaders() });
    if (!response.ok) throw new Error(await getErrorMessage(response));
    await refresh();
    markSavedNow();
  };

  const createProject = async () => {
    const payload = { ...projectForm, techStack: projectForm.techStack.filter(Boolean), displayOrder: Number(projectForm.displayOrder) || 0 };
    if (editingProjectId) {
      await patchEntity("projects", editingProjectId, payload);
      setEditingProjectId("");
    } else {
      await createEntity("projects", payload);
    }
    setProjectForm(defaultProject);
    await refresh();
    markSavedNow();
  };

  const createExperience = async () => {
    const payload = { ...experienceForm, displayOrder: Number(experienceForm.displayOrder) || 0 };
    if (editingExperienceId) {
      await patchEntity("experiences", editingExperienceId, payload);
      setEditingExperienceId("");
    } else {
      await createEntity("experiences", payload);
    }
    setExperienceForm(defaultExperience);
    await refresh();
    markSavedNow();
  };

  const createTechnology = async () => {
    const payload = {
      ...technologyForm,
      displayOrder: Number(technologyForm.displayOrder) || 0,
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
    markSavedNow();
  };

  const saveHomeContent = async () => {
    const payload = {
      heroImageUrl: homeContentForm.heroImageUrl?.trim() || "/jkimage.jpeg",
      trustedCompanies: (homeContentForm.trustedCompanies ?? []).filter((item) => item.name.trim()),
      testimonials: (homeContentForm.testimonials ?? []).filter((item) => item.text.trim() && item.name.trim() && item.role.trim()),
    };
    if (editingHomeContentId) await patchEntity("home-content", editingHomeContentId, payload);
    else await createEntity("home-content", payload);
    await refresh();
    markSavedNow();
  };

  const toggleProjectTech = (techId: string) => {
    setProjectForm((state) => ({
      ...state,
      techStack: state.techStack.includes(techId) ? state.techStack.filter((id) => id !== techId) : [...state.techStack, techId],
    }));
  };

  const updateProjectOrder = async (id: string, displayOrder: number) => {
    await patchEntity("projects", id, { displayOrder });
    await refresh();
    markSavedNow();
  };

  const updateTechnologyOrder = async (id: string, displayOrder: number) => {
    await patchEntity("technologies", id, { displayOrder });
    await refresh();
    markSavedNow();
  };

  const updateExperienceOrder = async (id: string, displayOrder: number) => {
    await patchEntity("experiences", id, { displayOrder });
    await refresh();
    markSavedNow();
  };

  const quickUpdateProject = async (id: string, body: Partial<ProjectEntity>) => {
    await patchEntity("projects", id, body as Record<string, unknown>);
    await refresh();
    markSavedNow();
  };

  const quickUpdateTechnology = async (id: string, body: Partial<TechnologyEntity>) => {
    await patchEntity("technologies", id, body as Record<string, unknown>);
    await refresh();
    markSavedNow();
  };

  const quickUpdateExperience = async (id: string, body: Partial<ExperienceEntity>) => {
    await patchEntity("experiences", id, body as Record<string, unknown>);
    await refresh();
    markSavedNow();
  };

  const bulkDelete = async (route: "projects" | "technologies" | "experiences", ids: string[]) => {
    await Promise.all(ids.map((id) => deleteEntity(route, id)));
    setStatusWithTone(`${ids.length} item(s) deleted.`, "success");
  };

  const bulkReorder = async (
    route: "projects" | "technologies" | "experiences",
    ids: string[],
    currentItems: Array<{ _id: string; displayOrder?: number }>,
    direction: "up" | "down",
  ) => {
    await Promise.all(
      ids.map((id) => {
        const item = currentItems.find((entry) => entry._id === id);
        const currentOrder = item?.displayOrder ?? 0;
        const nextOrder = direction === "up" ? Math.max(0, currentOrder - 1) : currentOrder + 1;
        return patchEntity(route, id, { displayOrder: nextOrder });
      }),
    );
    await refresh();
    markSavedNow();
    setStatusWithTone(`Bulk order updated (${direction}).`, "success");
  };

  const reorderByDrag = async (
    route: "projects" | "technologies" | "experiences",
    currentItems: Array<{ _id: string; displayOrder?: number }>,
    draggedId: string,
    targetId: string,
  ) => {
    const ordered = [...currentItems].sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
    const fromIndex = ordered.findIndex((item) => item._id === draggedId);
    const toIndex = ordered.findIndex((item) => item._id === targetId);
    if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) return;

    const copy = [...ordered];
    const [moved] = copy.splice(fromIndex, 1);
    copy.splice(toIndex, 0, moved);

    await Promise.all(
      copy.map((item, index) =>
        patchEntity(route, item._id, { displayOrder: index }),
      ),
    );
    await refresh();
    markSavedNow();
    setStatusWithTone("Drag reorder applied.", "success");
  };

  const technologyCategories = useMemo(
    () => Array.from(new Set(technologies.map((item) => item.category).filter(Boolean))).sort((a, b) => a.localeCompare(b)),
    [technologies],
  );
  const experienceTimeframes = useMemo(
    () => Array.from(new Set(experiences.map((item) => item.timeframe).filter(Boolean))).sort((a, b) => a.localeCompare(b)),
    [experiences],
  );

  const filteredProjects = useMemo(() => {
    const search = projectSearch.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesSearch = !search || project.title.toLowerCase().includes(search) || project.slug.toLowerCase().includes(search);
      const matchesTech =
        projectTechFilter === "all" ||
        (project.techStack ?? []).some((tech) => {
          const techId = typeof tech === "string" ? tech : tech._id;
          return String(techId) === projectTechFilter;
        });
      return matchesSearch && matchesTech;
    });
  }, [projectSearch, projectTechFilter, projects]);

  const filteredTechnologies = useMemo(() => {
    const search = technologySearch.trim().toLowerCase();
    return technologies.filter((item) => {
      const matchesSearch = !search || item.name.toLowerCase().includes(search) || item.category.toLowerCase().includes(search);
      const matchesCategory = technologyCategoryFilter === "all" || item.category === technologyCategoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [technologySearch, technologyCategoryFilter, technologies]);

  const filteredExperiences = useMemo(() => {
    const search = experienceSearch.trim().toLowerCase();
    return experiences.filter((item) => {
      const matchesSearch = !search || item.role.toLowerCase().includes(search) || item.company.toLowerCase().includes(search);
      const matchesTimeframe = experienceTimeframeFilter === "all" || item.timeframe === experienceTimeframeFilter;
      return matchesSearch && matchesTimeframe;
    });
  }, [experienceSearch, experienceTimeframeFilter, experiences]);

  return (
    <div className="section-wrap space-y-6">
      <DashboardHeaderCard onRefresh={() => void refresh()} isRefreshing={isRefreshing} lastSavedAt={lastSavedAt} />
      {status ? <InlineToast message={status} tone={statusTone} /> : null}

      <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        <SidebarTabs tabItems={tabItems} activeTab={activeTab} onSelect={setActiveTab} />

        <div className="space-y-6">
          {activeTab === "home" ? (
            <HomeTab
              homeContentForm={homeContentForm}
              setHomeContentForm={setHomeContentForm}
              trustedSearch={trustedSearch}
              setTrustedSearch={setTrustedSearch}
              reviewSearch={reviewSearch}
              setReviewSearch={setReviewSearch}
              colorPresets={colorPresets}
              panelOpen={{ homeForm: panelOpen.homeForm, homeList: panelOpen.homeList }}
              onTogglePanel={(key) => togglePanel(key)}
              onSave={saveHomeContent}
              setStatus={setStatusWithTone}
              isEditing={Boolean(homeContent?._id)}
            />
          ) : null}

          {activeTab === "projects" ? (
            <ProjectsTab
              projectForm={projectForm}
              setProjectForm={setProjectForm}
              technologies={technologies}
              filteredProjects={filteredProjects}
              projectSearch={projectSearch}
              setProjectSearch={setProjectSearch}
              projectTechFilter={projectTechFilter}
              setProjectTechFilter={setProjectTechFilter}
              editingProjectId={editingProjectId}
              setEditingProjectId={setEditingProjectId}
              panelOpen={{ projectForm: panelOpen.projectForm, projectList: panelOpen.projectList }}
              onTogglePanel={(key) => togglePanel(key)}
              onToggleProjectTech={toggleProjectTech}
              onSave={createProject}
              onDelete={(id) => deleteEntity("projects", id)}
              onUpdateOrder={updateProjectOrder}
              onQuickUpdate={quickUpdateProject}
              onBulkDelete={(ids) => bulkDelete("projects", ids)}
              onBulkReorder={(ids, direction) => bulkReorder("projects", ids, filteredProjects, direction)}
              onReorderByDrag={(draggedId: string, targetId: string) => reorderByDrag("projects", filteredProjects, draggedId, targetId)}
              setStatus={setStatusWithTone}
              resetForm={() => setProjectForm(defaultProject)}
            />
          ) : null}

          {activeTab === "technologies" ? (
            <TechnologiesTab
              technologyForm={technologyForm}
              setTechnologyForm={setTechnologyForm}
              filteredTechnologies={filteredTechnologies}
              technologySearch={technologySearch}
              setTechnologySearch={setTechnologySearch}
              technologyCategoryFilter={technologyCategoryFilter}
              setTechnologyCategoryFilter={setTechnologyCategoryFilter}
              technologyCategories={technologyCategories}
              colorPresets={colorPresets}
              editingTechnologyId={editingTechnologyId}
              setEditingTechnologyId={setEditingTechnologyId}
              panelOpen={{ technologyForm: panelOpen.technologyForm, technologyList: panelOpen.technologyList }}
              onTogglePanel={(key) => togglePanel(key)}
              onSave={createTechnology}
              onDelete={(id) => deleteEntity("technologies", id)}
              onUpdateOrder={updateTechnologyOrder}
              onQuickUpdate={quickUpdateTechnology}
              onBulkDelete={(ids) => bulkDelete("technologies", ids)}
              onBulkReorder={(ids, direction) => bulkReorder("technologies", ids, filteredTechnologies, direction)}
              onReorderByDrag={(draggedId: string, targetId: string) => reorderByDrag("technologies", filteredTechnologies, draggedId, targetId)}
              setStatus={setStatusWithTone}
              resetForm={() => setTechnologyForm(defaultTechnology)}
            />
          ) : null}

          {activeTab === "experiences" ? (
            <ExperiencesTab
              experienceForm={experienceForm}
              setExperienceForm={setExperienceForm}
              filteredExperiences={filteredExperiences}
              experienceSearch={experienceSearch}
              setExperienceSearch={setExperienceSearch}
              experienceTimeframeFilter={experienceTimeframeFilter}
              setExperienceTimeframeFilter={setExperienceTimeframeFilter}
              experienceTimeframes={experienceTimeframes}
              colorPresets={colorPresets}
              editingExperienceId={editingExperienceId}
              setEditingExperienceId={setEditingExperienceId}
              panelOpen={{ experienceForm: panelOpen.experienceForm, experienceList: panelOpen.experienceList }}
              onTogglePanel={(key) => togglePanel(key)}
              onSave={createExperience}
              onDelete={(id) => deleteEntity("experiences", id)}
              onUpdateOrder={updateExperienceOrder}
              onQuickUpdate={quickUpdateExperience}
              onBulkDelete={(ids) => bulkDelete("experiences", ids)}
              onBulkReorder={(ids, direction) => bulkReorder("experiences", ids, filteredExperiences, direction)}
              onReorderByDrag={(draggedId: string, targetId: string) => reorderByDrag("experiences", filteredExperiences, draggedId, targetId)}
              setStatus={setStatusWithTone}
              resetForm={() => setExperienceForm(defaultExperience)}
            />
          ) : null}

          {activeTab === "security" ? (
            <SecurityTab
              adminToken={adminToken}
              setAdminToken={setAdminToken}
              adminActor={adminActor}
              setAdminActor={setAdminActor}
              status={status}
              panelOpen={{ security: panelOpen.security }}
              onTogglePanel={() => togglePanel("security")}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
