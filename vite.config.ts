import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/MovieTheater-in-React/", // זה צריך להיות הנתיב של הפרויקט ב-GitHub Pages
});
