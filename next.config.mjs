/** @type {import('next').NextConfig} */
const basePath = '/Aakash27'

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath,
  assetPrefix: `${basePath}/`,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com', 'raw.githubusercontent.com'],
    formats: ['image/avif', 'image/webp'],
  },
};
export default nextConfig;
