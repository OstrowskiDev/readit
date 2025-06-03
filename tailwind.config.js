/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
    './src/ui/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        xs: '481px',
        'below-xs': { max: '480px' },
        'below-md': { max: '768px' },
        'just-md': { min: '481px', max: '768px' },
        '2col-filter': '860px',
        '2col': { min: '900px', max: '1297px' },
        '2xl': { min: '1535px' },
        '3xl': { min: '1919px' },
      },
      spacing: {
        'plus-32px': 'calc(100% + 32px)',
        'plus-48px': 'calc(100% + 48px)',
      },
      colors: {
        app: {
          blue: {
            DEFAULT: 'rgba(163, 244, 255)', // #A3F4FF
            text: 'rgba(156, 222, 254)', // (147, 197, 253), (163, 244, 255)
            100: 'rgb(219, 234, 254)',
            200: 'rgb(191, 219, 254)',
            300: 'rgb(147, 197, 253)',
            400: 'rgb(96, 165, 250)',
            500: 'rgb(59, 130, 246)',
            600: 'rgb(37, 99, 235)',
          },
          orange: {
            100: 'rgb(255, 248, 241)',
            200: 'rgb(255, 241, 227)',
            300: 'rgb(255, 233, 213)',
            400: 'rgb(255, 226, 199)',
            500: 'rgb(255, 226, 199)',
            600: 'rgb(255, 212, 171)',
            alpha: 'rgb(255, 183, 115)',
          },
          strongorange: {
            100: 'rgb(255, 236, 222)',
            200: 'rgb(255, 217, 191)',
            300: 'rgb(255, 198, 159)',
            400: 'rgb(255, 168, 112)',
            500: 'rgb(250, 125, 58)', // #FA7D3A
            600: 'rgb(217, 99, 36)',
            700: 'rgb(184, 77, 27)',
            800: 'rgb(151, 62, 22)',
            900: 'rgb(117, 48, 17)',
          },
          superorange: {
            alpha: 'rgb(234, 88, 12)', // #ea580c
          },
        },
      },
    },
  },
  variants: {
    extend: {
      boxShadow: ['responsive'],
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.shadow-center-md': {
          boxShadow: '3px 3px 10px 1px rgba(0,0,0,0.3)',
        },
        '.shadow-center-lg': {
          boxShadow: '4px 4px 10px 2px rgba(0,0,0,0.4)',
        },
      }

      addUtilities(newUtilities, ['responsive'])
    },
  ],
}
