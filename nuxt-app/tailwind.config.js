/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,vue,ts}', './components/**/*.{js,vue,ts}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9f5',
          100: '#dcf2e7',
          200: '#bce5d0',
          300: '#8fd1b0',
          400: '#5bb58a',
          500: '#1B8354',
          600: '#1B8354',
          700: '#156d45',
          800: '#15573a',
          900: '#134830',
          950: '#0a2819',
        },
      },
    },
  },
  plugins: [],
};
