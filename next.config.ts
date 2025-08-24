// next.config.ts
import type { NextConfig } from "next";
import withPWAInit from "next-pwa";

const withPWA = withPWAInit({
  dest: "public",                       // gera sw/manifest na pasta public
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development", // desativa no dev
});

const nextConfig = {
  reactStrictMode: true,
  // se usar App Router, pode manter configs aqui
  // experimental: { typedRoutes: true },
};

export default withPWA(nextConfig);
