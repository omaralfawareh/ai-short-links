import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ["@lmnr-ai/lmnr"],
  reactCompiler: true,
};

export default nextConfig;

initOpenNextCloudflareForDev();
