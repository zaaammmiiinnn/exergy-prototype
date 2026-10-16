/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        "exergy-solutions.neuralwaves.workers.dev",
        "*.workers.dev",
        "localhost:3000",
        "localhost:3001",
      ],
    },
  },
};

export default nextConfig;
