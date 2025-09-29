import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// import fs from "fs"; // Uncomment this line to enable HTTPS with self-signed certificates

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables so we can read VITE_BASE when building for GitHub Pages
  const env = loadEnv(mode, process.cwd(), "");
  const base = env.VITE_BASE || "./";

  return {
    plugins: [react(), tailwindcss()],
    base,
    server: {
      port: 5173,
      host: true, // Enable binding to all network interfaces for dev container access

      // uncomment the following lines to enable HTTPS
      // https: {
      //   key: fs.readFileSync("localhost-key.pem"),
      //   cert: fs.readFileSync("localhost.pem"),
      // },
    },
  };
});
