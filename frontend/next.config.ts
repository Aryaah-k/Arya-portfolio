import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Local Development Patterns
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/**",
      },
      // Azure Production Pattern
      {
        protocol: "https", // Azure apps use secure HTTPS by default
        hostname: "arya-portfolio-backend-d4hmfqbjfpfrb2dv.southindia-01.azurewebsites.net", // 👈 Replace with your actual Azure backend domain
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;