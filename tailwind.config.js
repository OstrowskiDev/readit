/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
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
        '2col-filter': '860px',
        '2col': { min: '900px', max: '1297px' },
        '2xl': { min: '1535px' },
        '3xl': { min: '1919px' },
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
