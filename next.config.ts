// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com" }, // ✅ for Unsplash
      { hostname: "media.licdn.com" },
      { hostname: "www.datocms-assets.com" },
      { hostname: "www.opencolleges.edu.au" },
      { hostname: "www.iienstitu.com" },
    ],
  },
};

module.exports = nextConfig;
