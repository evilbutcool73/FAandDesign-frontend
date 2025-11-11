export default {
  content: [
    "./app.vue",
    "./components/*.{vue,js,ts}",
    "./nuxt.config.ts"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "dorrure": "url('/dorrure.png')", // Vérifie si l'image est bien dans "public/"
      },
      fontFamily: {
        caveat: ["Caveat", "sans-serif"], // Correction format array
      },
      colors: {
        "gold": "rgb(216,159,83)", // Correction format string
      },
    },
  },
  plugins: [],
};
