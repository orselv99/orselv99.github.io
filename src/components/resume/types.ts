export interface ResumeRefDoc {
  uuid: string;
  title: string;
  href: string;
  date?: string;
  rawDate?: string;
  summary?: string;
}

export interface TaskDetail {
  description?: string;
  href: string;
  title?: string;
  date?: string;
}

export interface Project {
  title: string;
  period: string;
  description: string;
  refs?: string[];
  refDocs?: ResumeRefDoc[];
  tasks?: TaskDetail[];
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
