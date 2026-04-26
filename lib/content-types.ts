export type TechnologySummary = {
  _id: string;
  name: string;
  category: string;
  color?: string;
  displayOrder?: number;
};

export type ProjectSummary = {
  _id: string;
  title: string;
  description: string;
  slug: string;
  cloudinaryImageUrl: string;
  techStack?: Array<TechnologySummary | string>;
  githubLink?: string;
  liveLink?: string;
  displayOrder?: number;
};

export type HomeContentSummary = {
  heroImageUrl?: string;
  trustedCompanies?: { name: string; color?: string }[];
  testimonials?: { text: string; name: string; role: string }[];
};
