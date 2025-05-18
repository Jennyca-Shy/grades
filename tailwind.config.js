/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      gridTemplateColumns: {
        '70/30': '70% 28%',
      },
      colors: {
        newWhite: '#fffffa',
        darkBlue: '#0d5c63',
        newBlue: '#44a1a0',
        lightBlue: '#78cdd7',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  safelist: {
    pattern: /after:.*/,
  },
}
