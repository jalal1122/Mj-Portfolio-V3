import type {
  ExperienceFormState,
  HomeContentEntity,
  PanelKey,
  ProjectFormState,
  TechnologyFormState,
} from "./types";

export const colorPresets = [
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

export const defaultProject: ProjectFormState = {
  title: "",
  description: "",
  slug: "",
  cloudinaryImageUrl: "",
  techStack: [],
  githubLink: "",
  liveLink: "",
  displayOrder: 0,
};

export const defaultExperience: ExperienceFormState = {
  role: "",
  company: "",
  timeframe: "",
  description: "",
  color: "",
  displayOrder: 0,
};

export const defaultTechnology: TechnologyFormState = {
  name: "",
  category: "",
  color: "",
  displayOrder: 0,
};

export const defaultHomeContent: HomeContentEntity = {
  heroImageUrl: "/jkimage.jpeg",
  trustedCompanies: [{ name: "", color: "" }],
  testimonials: [{ text: "", name: "", role: "" }],
};

export const defaultPanelOpenState: Record<PanelKey, boolean> = {
  homeForm: true,
  homeList: true,
  projectForm: true,
  projectList: true,
  technologyForm: true,
  technologyList: true,
  experienceForm: true,
  experienceList: true,
  security: true,
};
