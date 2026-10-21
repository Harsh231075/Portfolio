import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'image.similarpng.com' },
      { protocol: 'https', hostname: 'static.vecteezy.com' },
      { protocol: 'https', hostname: 'images.rawpixel.com' },
    ],
  },
  serverExternalPackages: ['puppeteer'],
};

export default nextConfig;
