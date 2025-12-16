import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['', 'image.similarpng.com', 'static.vecteezy.com', 'https://images.rawpixel.com',],

  },
  serverExternalPackages: ["puppeteer"],

};

export default nextConfig;
