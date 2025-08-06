import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['image.similarpng.com', 'static.vecteezy.com', 'https://images.rawpixel.com'],
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-poppins)'],
      },
    },
  },
  experimental: {
    serverComponentsExternalPackages: ["puppeteer"],
  },
};

export default nextConfig;
