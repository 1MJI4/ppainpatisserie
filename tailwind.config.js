/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        chocolate: {
          DEFAULT: '#3a2618',
          light: '#5a4638',
          dark: '#281a10',
        },
        gold: {
          DEFAULT: '#b69d74',
          light: '#d8c4a9',
          dark: '#96804f',
        },
        cream: '#faf7f2',
      },
      fontFamily: {
        'playfair': ['"Playfair Display"', 'serif'],
        'sans': ['"Poppins"', 'sans-serif'],
      },
      height: {
        '128': '32rem',
      },
      backgroundImage: {
        'subtle-pattern': "url('/subtle-pattern.png')",
      },
      boxShadow: {
        'gold': '0 4px 14px 0 rgba(182, 157, 116, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 1.2s ease-out forwards',
        'slide-up': 'slideUp 1s ease-out forwards',
      },
    },
  },
  plugins: [],
}
