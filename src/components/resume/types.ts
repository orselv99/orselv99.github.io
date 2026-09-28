export interface TaskDetail {
  description: string;
  href: string;
}

export interface Project {
  title: string;
  period: string;
  description: string;
  tasks: TaskDetail[];
  techStack?: string[];
}

export interface Experience {
  id: string;
  index: string;
  company: string;
  period: string;
  role: string;
  location: string;
  category: "platform" | "systems" | "client" | "etc";
  isCurrent?: boolean;
  projects: Project[];
}
