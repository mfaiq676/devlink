import { CATEGORIES } from "@/data/categories";
import type { CategoryFilter } from "@/types/resource";

/** Falls back to "all" for unknown values so shared links never break. */
export function parseCategory(value: string | null): CategoryFilter {
  return CATEGORIES.some((c) => c.id === value) ? (value as CategoryFilter) : "all";
}
