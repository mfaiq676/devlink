import type { Filters, Resource } from "@/types/resource";

/** Pure filter used by the grid: category, saved-only and free-text search. */
export function filterResources(
  resources: Resource[],
  { category, search, savedOnly }: Filters,
  bookmarks: string[],
): Resource[] {
  const q = search.trim().toLowerCase();

  return resources.filter((r) => {
    if (category !== "all" && r.category !== category) return false;
    if (savedOnly && !bookmarks.includes(r.id)) return false;
    if (!q) return true;

    return (
      r.title.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  });
}
