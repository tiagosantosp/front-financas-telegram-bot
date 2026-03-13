/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f3f4ff',
          100: '#e9e7ff',
          200: '#c6c3ff',
          300: '#9c8bff',
          400: '#7d5cff',
          500: '#5b3bff',
          600: '#4a2ad6',
          700: '#3e23aa',
          800: '#362082',
          900: '#2d1b65',
        },
        night: {
          50: '#f4f5ff',
          100: '#e2e6f7',
          200: '#bfc7e4',
          300: '#9ca4d2',
          400: '#7b7fbe',
          500: '#5f61aa',
          600: '#4d4d8a',
          700: '#3c3c6d',
          800: '#2f2f51',
          900: '#24253f',
        },
      },
      boxShadow: {
        card: '0 10px 25px rgba(0,0,0,0.4)',
        soft: '0 4px 14px rgba(0,0,0,0.25)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
}

