"use client";

import { Briefcase, FolderKanban, Home, ShieldCheck, Wrench } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DashboardHeaderCard, SidebarTabs } from "@/components/admin/dashboard/admin-ui";
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
  const [status, setStatus] = useState("");
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

  const setStatusSafe = useCallback((value: string) => {
    if (!isMountedRef.current) return;
    setStatus(value);
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
    return baseHeaders;
  };

  const togglePanel = (key: PanelKey) => {
    setPanelOpen((state) => ({ ...state, [key]: !state[key] }));
  };

  const refresh = async () => {
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
  };

  useEffect(() => {
    isMountedRef.current = true;
    void refresh();
    return () => {
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
  };

  const updateTechnologyOrder = async (id: string, displayOrder: number) => {
    await patchEntity("technologies", id, { displayOrder });
    await refresh();
  };

  const updateExperienceOrder = async (id: string, displayOrder: number) => {
    await patchEntity("experiences", id, { displayOrder });
    await refresh();
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
      <DashboardHeaderCard onRefresh={() => void refresh()} />

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
              setStatus={setStatusSafe}
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
              setStatus={setStatusSafe}
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
              setStatus={setStatusSafe}
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
              setStatus={setStatusSafe}
              resetForm={() => setExperienceForm(defaultExperience)}
            />
          ) : null}

          {activeTab === "security" ? (
            <SecurityTab
              adminToken={adminToken}
              setAdminToken={setAdminToken}
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
