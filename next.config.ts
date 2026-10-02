import type { NextConfig } from "next";

// Set STATIC_EXPORT=1 (and optionally BASE_PATH) to build a static site for GitHub Pages.
const isStatic = process.env.STATIC_EXPORT === "1";
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = isStatic
  ? { output: "export", basePath, trailingSlash: true, images: { unoptimized: true } }
  : {};

export default nextConfig;
