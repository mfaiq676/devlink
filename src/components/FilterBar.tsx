"use client";

import { Group, Stack, Switch, Tabs, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { CATEGORIES } from "@/data/categories";
import type { CategoryFilter } from "@/types/resource";

interface FilterBarProps {
  query: string;
  onQueryChange: (value: string) => void;
  category: CategoryFilter;
  onCategoryChange: (value: CategoryFilter) => void;
  savedOnly: boolean;
  onSavedOnlyChange: (value: boolean) => void;
  savedCount: number;
}

export function FilterBar({
  query,
  onQueryChange,
  category,
  onCategoryChange,
  savedOnly,
  onSavedOnlyChange,
  savedCount,
}: FilterBarProps) {
  return (
    <Stack gap="md">
      <Group align="center" justify="space-between" gap="md">
        <TextInput
          flex={1}
          miw={260}
          size="md"
          type="search"
          aria-label="Search resources"
          placeholder="Search by name, tag or description"
          leftSection={<IconSearch size={16} />}
          value={query}
          onChange={(e) => onQueryChange(e.currentTarget.value)}
        />
        <Switch
          size="md"
          label={`Show saved only (${savedCount})`}
          checked={savedOnly}
          onChange={(e) => onSavedOnlyChange(e.currentTarget.checked)}
        />
      </Group>

      <Tabs value={category} onChange={(v) => onCategoryChange((v ?? "all") as CategoryFilter)}>
        <Tabs.List aria-label="Categories" style={{ flexWrap: "wrap" }}>
          {CATEGORIES.map((c) => (
            <Tabs.Tab key={c.id} value={c.id}>
              {c.label}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>
    </Stack>
  );
}
