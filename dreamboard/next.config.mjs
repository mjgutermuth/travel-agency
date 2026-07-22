/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/dreamboard",
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
