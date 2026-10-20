import type { Category } from "@/types/resource";

export const CATEGORIES: Category[] = [
  { id: "all", label: "All", color: "gray" },
  { id: "ui", label: "UI Libraries", color: "blue" },
  { id: "backend", label: "Backend & APIs", color: "teal" },
  { id: "icons", label: "Icons & Assets", color: "orange" },
  { id: "ai", label: "AI Tools", color: "grape" },
];

export const getCategory = (id: string): Category =>
  CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[0];
