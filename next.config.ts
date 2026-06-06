import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  // Transpile Three.js ESM packages for SSR compatibility (required for Safari)
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  // Permanent redirect: bare domain → www (eliminates the +134ms redirect round-trip)
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "agenciadnegocios.com" }],
        destination: "https://www.agenciadnegocios.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
