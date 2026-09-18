import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/Platforms",
        destination: "/Products/Platforms",
        permanent: true,
      },
      {
        source: "/Industries",
        destination: "/Products/Industries",
        permanent: true,
      },
      {
        source: "/privacy-policy",
        destination: "/Privacy",
        permanent: true,
      },
      {
        source: "/terms-of-service",
        destination: "/Terms",
        permanent: true,
      },
      {
        source: "/terms-and-conditions",
        destination: "/Terms",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
