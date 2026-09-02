/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  distDir: 'dist',
  turbopack: {
    root: process.cwd(),
  },
  images: { unoptimized: true },
};

export default nextConfig;
