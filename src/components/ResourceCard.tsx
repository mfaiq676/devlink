"use client";

import { ActionIcon, Anchor, Badge, Card, Group, Stack, Text, UnstyledButton } from "@mantine/core";
import { IconExternalLink, IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { getCategory } from "@/data/categories";
import type { Resource } from "@/types/resource";

interface ResourceCardProps {
  resource: Resource;
  bookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onOpen: (id: string) => void;
}

export function ResourceCard({ resource, bookmarked, onToggleBookmark, onOpen }: ResourceCardProps) {
  const category = getCategory(resource.category);

  return (
    <Card
      withBorder
      padding="lg"
      h="100%"
      style={{ cursor: "pointer" }}
      onClick={() => onOpen(resource.id)}
    >
      <Stack justify="space-between" h="100%" gap="md">
        <Stack gap="xs">
          <Group justify="space-between" wrap="nowrap" align="flex-start">
            <Badge color={category.color} variant="light">
              {category.label}
            </Badge>
            <ActionIcon
              variant="subtle"
              color="red"
              aria-pressed={bookmarked}
              aria-label={bookmarked ? `Remove ${resource.title} from saved` : `Save ${resource.title}`}
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark(resource.id);
              }}
            >
              {bookmarked ? <IconHeartFilled size={20} /> : <IconHeart size={20} />}
            </ActionIcon>
          </Group>

          <UnstyledButton
            onClick={(e) => {
              e.stopPropagation();
              onOpen(resource.id);
            }}
            aria-label={`View details for ${resource.title}`}
          >
            <Text fw={700} fz="lg">
              {resource.title}
            </Text>
          </UnstyledButton>

          <Text c="dimmed" fz="sm" lineClamp={3}>
            {resource.description}
          </Text>
        </Stack>

        <Stack gap="sm">
          <Group gap={6}>
            {resource.tags.map((tag) => (
              <Badge key={tag} size="sm" variant="outline" color="gray" tt="none">
                {tag}
              </Badge>
            ))}
          </Group>
          <Anchor
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            fz="sm"
            fw={600}
            onClick={(e) => e.stopPropagation()}
          >
            <Group gap={4} component="span">
              Visit site <IconExternalLink size={14} aria-hidden />
            </Group>
          </Anchor>
        </Stack>
      </Stack>
    </Card>
  );
}
