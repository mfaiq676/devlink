export type CategoryId = "ui" | "backend" | "icons" | "ai";
export type CategoryFilter = CategoryId | "all";

export interface Category {
  id: CategoryFilter;
  label: string;
  /** Mantine color used for the category badge */
  color: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: CategoryId;
  tags: string[];
  url: string;
  docsUrl: string;
  pricing: string;
  installCommand: string;
  /** Ids of related resources shown in the quick-view modal */
  related: string[];
}

export interface Filters {
  category: CategoryFilter;
  search: string;
  savedOnly: boolean;
}
