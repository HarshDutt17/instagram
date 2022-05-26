module.exports = {

  future: {
    removeDeprecatedGapUtilities: true
  },

  content: ['./src/**/*.js', './src/**/**/*.js'],

  theme: {
    fill: (theme) => ({
      red: theme('colors.red.primary')
    }),
    colors: {
      white: '#ffffff',
      blue: {
        medium: '#005c98'
      },
      black: {
        light: '#262626',
        faded: '#00000059'
      },
      gray: {
        base: '#616161',
        background: '#fafafa',
        primary: '#dbdbdb'
      },
      red: {
        primary: '#ed4956'
      }
    },
    extend: {
      screens: {

        'mobiles': { 'max': '767px' },
        // => @media (max-width: 767px) { ... }

      },
    },
  },
  variants: {
    display: ['group-hover']
  }

}


// TODO : add to tailwind config
// text-blue-medium
// bg-blue-medium
// text-red-primary
// text-sm text-gray-base
// border-gray-primary