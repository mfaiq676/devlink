import { Suspense } from "react";
import { Center, Loader } from "@mantine/core";
import { ResourceHub } from "@/components/ResourceHub";

export default function HomePage() {
  // useSearchParams needs a Suspense boundary in the App Router.
  return (
    <Suspense
      fallback={
        <Center h="100vh">
          <Loader aria-label="Loading resources" />
        </Center>
      }
    >
      <ResourceHub />
    </Suspense>
  );
}
