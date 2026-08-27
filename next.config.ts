import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/araclar/goc-idaresi-rehberi",
        destination: "/araclar/goc-idaresi-bul",
        permanent: true,
      },
      {
        source: "/araclar/tehdit-kodlari",
        destination: "/araclar/tahdit-kodlari",
        permanent: true,
      },
    ];
  },
  // Toplu döküman yükleme (10 dosya x 10MB)
  experimental: {
    serverActions: {
      bodySizeLimit: "100mb",
    },
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "flagcdn.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
};

export default nextConfig;
