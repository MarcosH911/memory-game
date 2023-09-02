/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qfycdqwvwxzkicxufnbc.supabase.co",
      },
    ],
  },
};

module.exports = nextConfig;
