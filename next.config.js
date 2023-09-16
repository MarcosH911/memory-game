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
  async redirects() {
    return [
      {
        source: "/",
        destination: "/jugar",
        permanent: true,
      },
    ];
  },

  // experimental: { serverActions: true },
};

module.exports = nextConfig;
