import type { NextConfig } from "next";

function getStrapiRemotePattern() {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
  if (!strapiUrl) return null;

  try {
    const parsed = new URL(strapiUrl);
    return {
      protocol: parsed.protocol.replace(":", "") as "http" | "https",
      hostname: parsed.hostname,
      port: parsed.port,
      pathname: "/uploads/**",
    };
  } catch {
    return null;
  }
}

const strapiPattern = getStrapiRemotePattern();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "1337",
        pathname: "/uploads/**",
      },
      ...(strapiPattern ? [strapiPattern] : []),
    ],
  },
};

export default nextConfig;
