const isProd = process.env.NODE_ENV === "production";

// Must match your GitHub repository name. Use "" if the repo is <username>.github.io
const repoName = "/devlink";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export", // static export for GitHub Pages
  images: { unoptimized: true },
  basePath: isProd ? repoName : "",
  assetPrefix: isProd ? `${repoName}/` : "",
  trailingSlash: true,
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks", "@tabler/icons-react"],
  },
};

export default nextConfig;
