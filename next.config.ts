import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  experimental: {
    serverActions: {
      allowedOrigins: [
        "sturdy-garbanzo-6v5w7gp4977crw6-3000.app.github.dev",
      ],
    },
  },
};

export default nextConfig;