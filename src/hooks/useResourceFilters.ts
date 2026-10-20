"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { parseCategory } from "@/lib/params";
import type { CategoryFilter, Filters } from "@/types/resource";

const SEARCH_DEBOUNCE_MS = 250;

/**
 * Keeps filters in sync with the URL (?category=ui&search=tailwind&saved=1).
 * The URL is the source of truth; the search box keeps a local value so typing
 * stays instant while the URL update is debounced.
 */
export function useResourceFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const category = parseCategory(searchParams.get("category"));
  const urlSearch = searchParams.get("search") ?? "";
  const savedOnly = searchParams.get("saved") === "1";

  const [query, setQuery] = useState(urlSearch);

  const updateUrl = useCallback(
    (changes: Record<string, string | null>) => {
      const next = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(changes)) {
        if (!value || value === "all") next.delete(key);
        else next.set(key, value);
      }
      const qs = next.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  // Back/forward navigation or a shared link changes the URL: mirror it in the input.
  useEffect(() => setQuery(urlSearch), [urlSearch]);

  // Push typed text into the URL after a short pause.
  useEffect(() => {
    if (query.trim() === urlSearch) return;
    const timer = setTimeout(() => updateUrl({ search: query.trim() }), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const setCategory = (value: CategoryFilter) => updateUrl({ category: value });
  const setSavedOnly = (value: boolean) => updateUrl({ saved: value ? "1" : null });
  const clearFilters = () => {
    setQuery("");
    router.replace(pathname, { scroll: false });
  };

  // Filters used for the grid react to the typed value immediately.
  const filters: Filters = { category, search: query, savedOnly };
  const hasActiveFilters = category !== "all" || query.trim() !== "" || savedOnly;

  return { filters, query, setQuery, setCategory, setSavedOnly, clearFilters, hasActiveFilters };
}
