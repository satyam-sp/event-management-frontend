/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#facc15", // Tailwind yellow-400
          dark: "#eab308", // yellow-500
          light: "#fef9c3", // yellow-100
        },
      },
    },
  },
  plugins: [],
}

