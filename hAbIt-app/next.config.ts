import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript:{
    ignoreBuildErrors: true,
  },
  eslint:{
    ignoreDuringBuilds: true,
  },

  rewrites: async () => {
    return [
      {
        source: "/backend/:path*",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:8000/backend/:path*"
            : "/backend/",
      },
    ];
  },
};

export default nextConfig;
