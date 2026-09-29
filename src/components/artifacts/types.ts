export interface ArtifactItem {
  index: string;
  period: string;
  category: string;
  title: string;
  summary: string;
  tags: string[];
  refs: string[];
  techStack: string[];
}

export interface ArtifactRefDoc {
  uuid: string;
  title: string;
  href: string;
  date?: string;
  summary?: string;
  tags?: string[];
}

export interface ArtifactWithRefs extends ArtifactItem {
  displayTitle: string;
  cleanTags: string[];
  cleanTechStack: string[];
  refDocs: ArtifactRefDoc[];
}
