import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Anchor Turbopack to this project (a stray lockfile exists in $HOME).
    root: __dirname,
  },
};

export default nextConfig;
