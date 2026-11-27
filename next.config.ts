import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Hide the on-screen dev route indicator; compile and runtime errors still surface.
  devIndicators: false,
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
