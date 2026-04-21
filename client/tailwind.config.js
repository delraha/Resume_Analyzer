/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cyan': '#00f5ff',
        'cyan-dim': '#00b8c4',
        'cyan-dark': '#003d42',
        'magenta': '#ff006e',
        'mag-dim': '#c0004f',
        'green': '#39ff14',
        'green-dim': '#1a7a07',
        'bg-void': '#020408',
        'bg-deep': '#040c12',
        'bg-panel': '#071520',
        'bg-card': '#0a1e2e',
        'bg-hover': '#0d2840',
        'border': '#0d3a4a',
        'border-bright': '#00f5ff33',
        'text-primary': '#E6F1FF',
        'text-sec': '#A8CFFF',
        'text-muted': '#3a6470',
      },
      fontFamily: {
        display: ['Orbitron', 'monospace'],
        ui: ['Exo 2', 'sans-serif'],
        mono: ['Share Tech Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
