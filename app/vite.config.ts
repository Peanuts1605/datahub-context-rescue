import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/datahub-context-rescue/",
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true
  }
});
