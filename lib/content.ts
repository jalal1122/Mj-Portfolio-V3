import dbConnect from "@/lib/dbConnect";
import Experience from "@/models/Experience";
import Project from "@/models/Project";
import Technology from "@/models/Technology";

const fallbackTech = [
  { _id: "nextjs", name: "Next.js", category: "framework", cloudinarySvgUrl: "" },
  { _id: "typescript", name: "TypeScript", category: "language", cloudinarySvgUrl: "" },
  { _id: "tailwindcss", name: "Tailwind CSS", category: "styling", cloudinarySvgUrl: "" },
  { _id: "mongodb", name: "MongoDB", category: "database", cloudinarySvgUrl: "" },
  { _id: "mern", name: "MERN", category: "stack", cloudinarySvgUrl: "" },
  { _id: "nextjs", name: "Next.js", category: "framework", cloudinarySvgUrl: "" },
  { _id: "python", name: "Python", category: "language", cloudinarySvgUrl: "" },
];

const fallbackProjects = [
  {
    _id: "attendx",
    title: "AttendX",
    description:
      "A comprehensive solution designed to scale gracefully while providing a hyper-intuitive user experience. Built with cutting-edge stack to guarantee performance and security.",
    slug: "attendx",
    cloudinaryImageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80",
    techStack: fallbackTech.slice(0, 4),
    githubLink: "https://github.com",
    liveLink: "https://example.com",
  },
  {
    _id: "kite-platform",
    title: "Kite Full-Stack Web Platform",
    description: "A full-stack operations platform built for Mohsin Match Industries with scalable architecture.",
    slug: "kite-full-stack-web-platform",
    cloudinaryImageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1400&q=80",
    techStack: fallbackTech,
    githubLink: "",
    liveLink: "",
  },
  {
    _id: "qr-generator",
    title: "QR Code Generator",
    description: "Fast QR generation tool with lightweight UX for personal and business workflows.",
    slug: "qr-code-generator",
    cloudinaryImageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1400&q=80",
    techStack: fallbackTech,
    githubLink: "",
    liveLink: "",
  },
];

const fallbackExperiences = [
  {
    _id: "exp-tech4edges",
    role: "Junior MERN Stack Developer",
    company: "Tech4Edges",
    timeframe: "Current",
    description: "Delivering MERN and Next.js products with performance-driven interfaces.",
  },
];

export async function getProjects() {
  try {
    await dbConnect();
    const projects = await Project.find().populate("techStack").sort({ createdAt: -1 }).lean();
    return projects.length ? projects : fallbackProjects;
  } catch {
    return fallbackProjects;
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    await dbConnect();
    const project = await Project.findOne({ slug }).populate("techStack").lean();
    return project ?? fallbackProjects.find((item) => item.slug === slug) ?? null;
  } catch {
    return fallbackProjects.find((project) => project.slug === slug) ?? null;
  }
}

export async function getExperiences() {
  try {
    await dbConnect();
    return await Experience.find().sort({ createdAt: -1 }).lean();
  } catch {
    return fallbackExperiences;
  }
}

export async function getTechnologies() {
  try {
    await dbConnect();
    return await Technology.find().sort({ createdAt: -1 }).lean();
  } catch {
    return fallbackTech;
  }
}
