/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
  reactStrictMode: true,
  output: "standalone",
  images: {
    domains: ["images.unsplash.com"],
  },
};

export default nextConfig;
