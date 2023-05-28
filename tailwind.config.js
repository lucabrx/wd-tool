/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "text" : "#fffefe",
        "cta1" : "#1d4ed0",
        "cta2" : "#3b82f6",
        "bg" : "#2F3135",
        "categoryCard" : "#757473",
        "smText" : "#949392",
        "cardContainer" : "#242425"
      }
    },
  },
  plugins: [],
}
