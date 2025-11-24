/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  // Configure allowed external image sources for `next/image`
  images: {
    // Use remotePatterns to allow images from Unsplash (and add more hosts if needed)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
    // Preferred output formats
    formats: ['image/avif', 'image/webp'],
  },
  // If you use the new app router and React server components, you may
  // want to enable the experimental serverActions or other flags here.
};

export default nextConfig;
