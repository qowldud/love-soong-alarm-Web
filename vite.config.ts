import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import * as path from "path";
import { VitePWA } from "vite-plugin-pwa";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      mode: "production",
      manifest: {
        name: "좋아하면 숭리는",
        short_name: "좋아하면 숭리는",
        description:
          "축제 공간 내에서 관심사를 기반으로 원하는 상대를 탐색하고 연결하는 위치 기반 매칭 서비스",
        start_url: "/",
        display: "standalone",
        background_color: "#eb427b",
        theme_color: "#ffffff",
        lang: "ko",
        icons: [
          {
            src: "icons/Logo_purple.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "cons/Logo_purple.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
