"use client";

import {
  ActionIcon,
  Group,
  Text,
  Title,
  Tooltip,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";

export function Header() {
  const { setColorScheme } = useMantineColorScheme();
  const computed = useComputedColorScheme("light", { getInitialValueInEffect: true });
  const next = computed === "dark" ? "light" : "dark";

  return (
    <Group justify="space-between" align="flex-start" wrap="nowrap" component="header">
      <div>
        <Title order={1} fz={{ base: 36, sm: 52 }} lh={1} style={{ letterSpacing: "-0.03em" }}>
          DevLink
        </Title>
        <Text c="dimmed" mt="sm" maw={520} fz="lg">
          Tools, libraries and APIs worth knowing about. Search, save your favourites and share a
          filtered link.
        </Text>
      </div>
      <Tooltip label={`Switch to ${next} mode`}>
        <ActionIcon
          variant="default"
          size="lg"
          aria-label={`Switch to ${next} mode`}
          onClick={() => setColorScheme(next)}
        >
          {computed === "dark" ? <IconSun size={18} /> : <IconMoon size={18} />}
        </ActionIcon>
      </Tooltip>
    </Group>
  );
}
