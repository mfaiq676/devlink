"use client";

import {
  ActionIcon,
  Anchor,
  Badge,
  Button,
  Code,
  CopyButton,
  Divider,
  Group,
  Modal,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import { IconCheck, IconCopy, IconExternalLink, IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { getCategory } from "@/data/categories";
import { getResourceById } from "@/data/resources";
import type { Resource } from "@/types/resource";

interface QuickViewModalProps {
  resource: Resource | null;
  bookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onNavigate: (id: string) => void;
  onClose: () => void;
}

export function QuickViewModal({
  resource,
  bookmarked,
  onToggleBookmark,
  onNavigate,
  onClose,
}: QuickViewModalProps) {
  const related = (resource?.related ?? [])
    .map(getResourceById)
    .filter((r): r is Resource => r !== null);

  return (
    <Modal
      opened={resource !== null}
      onClose={onClose}
      title={resource?.title}
      size="lg"
      centered
      transitionProps={{ transition: "fade", duration: 150 }}
      styles={{ title: { fontWeight: 700, fontSize: "var(--mantine-font-size-xl)" } }}
    >
      {resource && (
        <Stack gap="md">
          <Badge color={getCategory(resource.category).color} variant="light" w="fit-content">
            {getCategory(resource.category).label}
          </Badge>

          <Text>{resource.description}</Text>

          <Group gap="xl" align="flex-start">
            <div>
              <Text fz="xs" c="dimmed" fw={600}>
                Pricing
              </Text>
              <Text fz="sm">{resource.pricing}</Text>
            </div>
            <div>
              <Text fz="xs" c="dimmed" fw={600}>
                Official docs
              </Text>
              <Anchor href={resource.docsUrl} target="_blank" rel="noopener noreferrer" fz="sm">
                <Group gap={4} component="span">
                  Read the docs <IconExternalLink size={14} aria-hidden />
                </Group>
              </Anchor>
            </div>
          </Group>

          <div>
            <Text fz="xs" c="dimmed" fw={600} mb={4}>
              Install
            </Text>
            <Group gap="xs" wrap="nowrap" align="stretch">
              <Code block flex={1} style={{ overflowX: "auto", whiteSpace: "pre" }}>
                {resource.installCommand}
              </Code>
              <CopyButton value={resource.installCommand} timeout={1500}>
                {({ copied, copy }) => (
                  <Tooltip label={copied ? "Copied" : "Copy command"}>
                    <ActionIcon
                      variant="default"
                      size="lg"
                      onClick={copy}
                      aria-label="Copy install command"
                    >
                      {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                    </ActionIcon>
                  </Tooltip>
                )}
              </CopyButton>
            </Group>
          </div>

          {related.length > 0 && (
            <>
              <Divider />
              <div>
                <Text fz="xs" c="dimmed" fw={600} mb="xs">
                  Related tools
                </Text>
                <Group gap="xs">
                  {related.map((r) => (
                    <Button key={r.id} size="xs" variant="default" onClick={() => onNavigate(r.id)}>
                      {r.title}
                    </Button>
                  ))}
                </Group>
              </div>
            </>
          )}

          <Group justify="flex-end" mt="sm">
            <Button
              variant={bookmarked ? "light" : "default"}
              color="red"
              aria-pressed={bookmarked}
              leftSection={bookmarked ? <IconHeartFilled size={16} /> : <IconHeart size={16} />}
              onClick={() => onToggleBookmark(resource.id)}
            >
              {bookmarked ? "Saved" : "Save"}
            </Button>
            <Button
              component="a"
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              rightSection={<IconExternalLink size={16} />}
            >
              Visit site
            </Button>
          </Group>
        </Stack>
      )}
    </Modal>
  );
}
