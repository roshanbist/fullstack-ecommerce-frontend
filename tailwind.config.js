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
        text: '#2D2C36',
        // 'brown-50': '#966b3a',
        // 'brown-80': '#70502c',
        'brown-50': '#a3651d',
        'brown-80': '#804d11',
        'brown-20': '#dab384',

        // 'light-white': '#f0f1f1',
        'light-white': '#ece6db',
        'gray-700': '#383733',
      },

      backgroundImage: {
        banner: "url('assets/images/banner.jpg')",
      },
    },
  },
  plugins: [],
};
