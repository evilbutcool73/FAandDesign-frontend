export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      sanity: {
        projectId: process.env.SANITY_PROJECT_ID,
        dataset: process.env.SANITY_DATASET,
        apiVersion: "2023-01-01", // Assurez-vous que cette version est toujours valide
        useCdn: false,
        studioUrl: process.env.SANITY_STUDIO_URL || "https://your-sanity-studio-url.sanity.build" // Utilisation d'une URL de studio déployée
      }
    }
  },
  modules: [
    '@nuxtjs/tailwindcss',
    "@nuxtjs/sanity"
  ],

  compatibilityDate: "2025-03-06",
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }
      ]
    }
  }
});
