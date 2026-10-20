import { Button, Stack, Text } from "@mantine/core";
import { IconMoodEmpty } from "@tabler/icons-react";

interface EmptyStateProps {
  savedOnly: boolean;
  onClear: () => void;
}

export function EmptyState({ savedOnly, onClear }: EmptyStateProps) {
  return (
    <Stack align="center" gap="xs" py={64}>
      <IconMoodEmpty size={40} stroke={1.5} aria-hidden />
      <Text fw={600}>
        {savedOnly ? "No saved resources match these filters" : "No resources match your search"}
      </Text>
      <Text c="dimmed" fz="sm">
        Try a different keyword or category.
      </Text>
      <Button variant="light" mt="xs" onClick={onClear}>
        Clear filters
      </Button>
    </Stack>
  );
}
