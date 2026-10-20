"use client";

import { useMemo, useState } from "react";
import { Container, Stack, Text } from "@mantine/core";
import { RESOURCES, getResourceById } from "@/data/resources";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useResourceFilters } from "@/hooks/useResourceFilters";
import { filterResources } from "@/lib/filterResources";
import { EmptyState } from "./EmptyState";
import { FilterBar } from "./FilterBar";
import { Header } from "./Header";
import { QuickViewModal } from "./QuickViewModal";
import { ResourceGrid } from "./ResourceGrid";

export function ResourceHub() {
  const { filters, query, setQuery, setCategory, setSavedOnly, clearFilters } = useResourceFilters();
  const { bookmarks, isBookmarked, toggleBookmark } = useBookmarks();
  const [openId, setOpenId] = useState<string | null>(null);

  const results = useMemo(
    () => filterResources(RESOURCES, filters, bookmarks),
    // filters is rebuilt each render, so depend on its fields
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filters.category, filters.search, filters.savedOnly, bookmarks],
  );

  return (
    <Container size="lg" py={{ base: "xl", sm: 48 }} component="main">
      <Stack gap="xl">
        <Header />

        <FilterBar
          query={query}
          onQueryChange={setQuery}
          category={filters.category}
          onCategoryChange={setCategory}
          savedOnly={filters.savedOnly}
          onSavedOnlyChange={setSavedOnly}
          savedCount={bookmarks.length}
        />

        <Text c="dimmed" fz="sm" aria-live="polite">
          {results.length} {results.length === 1 ? "resource" : "resources"}
        </Text>

        {results.length === 0 ? (
          <EmptyState savedOnly={filters.savedOnly} onClear={clearFilters} />
        ) : (
          <ResourceGrid
            resources={results}
            isBookmarked={isBookmarked}
            onToggleBookmark={toggleBookmark}
            onOpen={setOpenId}
          />
        )}
      </Stack>

      <QuickViewModal
        resource={getResourceById(openId)}
        bookmarked={openId ? isBookmarked(openId) : false}
        onToggleBookmark={toggleBookmark}
        onNavigate={setOpenId}
        onClose={() => setOpenId(null)}
      />
    </Container>
  );
}
