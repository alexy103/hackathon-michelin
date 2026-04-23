import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  runtimeConfig: {
    public: {
      apiBase: "http://localhost:3003",
    },
  },
  devtools: { enabled: false },
  css: ["@/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  modules: ["@nuxt/fonts", "@nuxt/icon"],
  icon: {
    mode: "css",
    cssLayer: "base",
  },
});
