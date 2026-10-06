export interface ArtifactItem {
  index: string;
  period: string;
  category?: string;
  title: string;
  summary: string;
  refs: string[];
  tags: string[];
}

export interface ArtifactRefDoc {
  uuid: string;
  title: string;
  href: string;
  date?: string;
  rawDate?: string;
  summary?: string;
  tags?: string[];
}

export interface ArtifactWithRefs extends ArtifactItem {
  displayTitle: string;
  cleanTags: string[];
  refDocs: ArtifactRefDoc[];
}
