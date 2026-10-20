"use client";

import { useCallback } from "react";
import { useLocalStorage } from "@mantine/hooks";

const STORAGE_KEY = "devlink:bookmarks";

/**
 * Bookmarks persisted in localStorage. Reading is deferred to an effect so the
 * server-rendered HTML and the first client render always match.
 */
export function useBookmarks() {
  const [bookmarks, setBookmarks] = useLocalStorage<string[]>({
    key: STORAGE_KEY,
    defaultValue: [],
    getInitialValueInEffect: true,
  });

  const isBookmarked = useCallback((id: string) => bookmarks.includes(id), [bookmarks]);

  const toggleBookmark = useCallback(
    (id: string) =>
      setBookmarks((current) =>
        current.includes(id) ? current.filter((x) => x !== id) : [...current, id],
      ),
    [setBookmarks],
  );

  return { bookmarks, isBookmarked, toggleBookmark };
}
