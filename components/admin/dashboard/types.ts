import type { LucideIcon } from "lucide-react";

export type CloudinaryResult = { info?: { secure_url?: string } };

export type TrustedCompany = { name: string; color?: string };
export type Testimonial = { text: string; name: string; role: string };

export type HomeContentEntity = {
  _id?: string;
  heroImageUrl?: string;
  trustedCompanies?: TrustedCompany[];
  testimonials?: Testimonial[];
};

export type TechnologyEntity = {
  _id: string;
  name: string;
  category: string;
  color?: string;
  displayOrder?: number;
};

export type TechRef = string | TechnologyEntity;

export type ProjectEntity = {
  _id: string;
  title: string;
  description: string;
  slug: string;
  cloudinaryImageUrl: string;
  techStack?: TechRef[];
  githubLink?: string;
  liveLink?: string;
  displayOrder?: number;
};

export type ExperienceEntity = {
  _id: string;
  role: string;
  company: string;
  timeframe: string;
  description: string;
  color?: string;
  displayOrder?: number;
};

export type ProjectFormState = {
  title: string;
  description: string;
  slug: string;
  cloudinaryImageUrl: string;
  techStack: string[];
  githubLink: string;
  liveLink: string;
  displayOrder: number;
};

export type ExperienceFormState = {
  role: string;
  company: string;
  timeframe: string;
  description: string;
  color: string;
  displayOrder: number;
};

export type TechnologyFormState = {
  name: string;
  category: string;
  color: string;
  displayOrder: number;
};

export type TabKey = "home" | "projects" | "technologies" | "experiences" | "security";

export type PanelKey =
  | "homeForm"
  | "homeList"
  | "projectForm"
  | "projectList"
  | "technologyForm"
  | "technologyList"
  | "experienceForm"
  | "experienceList"
  | "security";

export type TabItem = {
  key: TabKey;
  label: string;
  icon: LucideIcon;
};
