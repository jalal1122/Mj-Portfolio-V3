import dbConnect from "@/lib/dbConnect";
import Experience from "@/models/Experience";
import HomeContent from "@/models/HomeContent";
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

export const fallbackHomeContent = {
  heroImageUrl: "/jkimage.png",
  trustedCompanies: [
    { name: "Tech4edges", color: "var(--primary)" },
    { name: "Anora", color: "var(--secondary)" },
    { name: "Nextt", color: "#8B5CF6" },
    { name: "DevMates", color: "#F59E0B" },
  ],
  testimonials: [
    {
      text: "Muhammad's technical expertise and dedication to delivering quality solutions made our collaboration seamless. His MERN stack skills are top-notch.",
      name: "Sarah Johnson",
      role: "Product Manager at Tech4edges",
    },
    {
      text: "Working with Jalal on our event platform was a game-changer. He brought innovative solutions and maintained excellent code quality throughout the project.",
      name: "Ahmed Khan",
      role: "Co-founder at Nextt",
    },
    {
      text: "His ability to scale applications and manage complex systems is impressive. A reliable developer who consistently delivers beyond expectations.",
      name: "Emily Chen",
      role: "CTO at StartupHub",
    },
  ],
};

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

export async function getHomeContent() {
  try {
    await dbConnect();
    const content = await HomeContent.findOne().sort({ updatedAt: -1 }).lean();
    return content ?? fallbackHomeContent;
  } catch {
    return fallbackHomeContent;
  }
}
