/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#00f2ff',
        dark: '#000000',
        surface: '#0a0a0a',
        card: '#0d1117',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        display: ['"Orbitron"', 'monospace'],
        body: ['"Syne"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
