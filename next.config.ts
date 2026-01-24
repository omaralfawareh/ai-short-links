import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  rewrites: async () => {
    return [
      {
        source: "/:id",
        destination: "https://redirect.gotolnk.net/:id",
      },
    ];
  },
};

export default nextConfig;

initOpenNextCloudflareForDev();
