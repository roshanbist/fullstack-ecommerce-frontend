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

      // backgroundColor: {
      //   'primary': 'var(--color-bg-primary)',
      //   'bg-secondary': 'var(--color-bg-secondary)',
      // }

      colors: {
        // text: '#2d2c36',
        'brown-50': '#a3651d',
        'brown-80': '#804d11',
        'gray-700': '#383733',
        // 'light-white': '#ece6db',

        primary: 'var(--color-text-primary)',
        secondary: 'var(--color-text-secondary)',
        'bkg-primary': 'var(--color-bg-primary)',
        'bkg-secondary': 'var(--color-bg-secondary)',
      },

      backgroundImage: {
        banner: "url('assets/images/banner.jpg')",
      },
    },
  },
  plugins: [],
  // darkMode: 'class',
};
