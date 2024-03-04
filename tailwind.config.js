/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontSize: {
      sm: ['14px', '20px'],
      base: ['16px', '20px'],
      lg: ['20px', '24px'],
      xl: ['24px', '29px'],
      '2xl': ['30px', '35px'],
      '3xl': ['48px', '58px'],
      '4xl': ['96px', '106px'],
    },
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },

      colors: {
        baseColor: '#434d5d',
        'blue-500': '#007fff',
        'blue-600': '#1272d3',
        'gray-700': '#101418',

        'color-primary': 'rgb(var(--color-text-primary) / <alpha-value>)',
        'color-secondary': 'rgb(var(--color-text-secondary) / <alpha-value>)',
        'palette-primary': 'rgb(var(--color-bg-primary) / <alpha-value>)',
        'palette-secondary': 'rgb(var(--color-bg-secondary) / <alpha-value>)',
        'palette-accent': 'rgb(var(--color-bg-accent) / <alpha-value>)',
        'palette-ebony': 'rgb(var(--color-bg-ebony) / <alpha-value>)',
        'palette-darkGray': 'rgb(var(--color-bg-darkGray) / <alpha-value>)',
      },

      boxShadow: {
        xl: 'rgb(229, 234, 242) 0px -1px 1px 0px inset',
      },

      backgroundImage: {
        banner: "url('assets/images/banner.jpg')",
      },

      animation: {
        fade: 'fadeIn .5s ease-in-out',
      },

      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
  // darkMode: 'class',
};
