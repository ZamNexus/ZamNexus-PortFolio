import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Duplicate consolidation
      {
        source: "/Platforms",
        destination: "/Services#platforms",
        permanent: true,
      },
      {
        source: "/Products/Platforms",
        destination: "/Services#platforms",
        permanent: true,
      },
      {
        source: "/Products/Industries",
        destination: "/Industries",
        permanent: true,
      },

      // Legacy solution aliases
      {
        source: "/Solutions/ai-powered-business",
        destination: "/Services#ai-intelligent",
        permanent: true,
      },
      {
        source: "/Solutions/ai-powered",
        destination: "/Services#ai-intelligent",
        permanent: true,
      },
      {
        source: "/Solutions/intelligent-automation",
        destination: "/Services#intelligent-automation",
        permanent: true,
      },
      {
        source: "/Solutions/saas-platforms",
        destination: "/Services#saas-development",
        permanent: true,
      },
      {
        source: "/Solutions/saas-development",
        destination: "/Services#saas-development",
        permanent: true,
      },
      {
        source: "/Solutions/cloud-native-solutions",
        destination: "/Services#cloud-native",
        permanent: true,
      },
      {
        source: "/Solutions/cloud-native",
        destination: "/Services#cloud-native",
        permanent: true,
      },
      {
        source: "/Solutions/connected-enterprise",
        destination: "/Services#connected-enterprise",
        permanent: true,
      },
      {
        source: "/Solutions/digital-transformation",
        destination: "/Services#digital-transformation",
        permanent: true,
      },
      {
        source: "/Solutions",
        destination: "/Services",
        permanent: true,
      },
      {
        source: "/Solutions/:path*",
        destination: "/Services",
        permanent: true,
      },

      // Legal aliases
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
