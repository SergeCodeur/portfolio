import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "standalone", // Uncomment for Docker/Coolify deployment
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  compress: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
      {
        source:
          "/:path*\\.(jpg|jpeg|png|gif|ico|svg|webp|avif|woff|woff2|ttf|eot)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  productionBrowserSourceMaps: false,
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react", "framer-motion"],
  },

  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.sergecodeur.com",
          },
        ],
        destination: "https://sergecodeur.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
