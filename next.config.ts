import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yozbrydxdlcxghkphhtq.supabase.co",
        pathname: "/storage/v1/object/public/skips/**",
      },
    ],
  },
};

export default nextConfig;
