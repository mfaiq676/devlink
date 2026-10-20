import { SimpleGrid } from "@mantine/core";
import { ResourceCard } from "./ResourceCard";
import type { Resource } from "@/types/resource";

interface ResourceGridProps {
  resources: Resource[];
  isBookmarked: (id: string) => boolean;
  onToggleBookmark: (id: string) => void;
  onOpen: (id: string) => void;
}

export function ResourceGrid({ resources, isBookmarked, onToggleBookmark, onOpen }: ResourceGridProps) {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
      {resources.map((r) => (
        <ResourceCard
          key={r.id}
          resource={r}
          bookmarked={isBookmarked(r.id)}
          onToggleBookmark={onToggleBookmark}
          onOpen={onOpen}
        />
      ))}
    </SimpleGrid>
  );
}
