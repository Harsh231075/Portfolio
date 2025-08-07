import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['', 'image.similarpng.com', 'static.vecteezy.com', 'https://images.rawpixel.com',],

  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['IBM Plex Sans', 'var(--font-poppins)'],
        mono: ['IBM Plex Mono', 'var(--font-ibm-plex-mono)'],
      },
    },
  },
  experimental: {
    serverComponentsExternalPackages: ["puppeteer"],
  },

};

export default nextConfig;
