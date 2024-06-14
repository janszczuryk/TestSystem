/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import colors from 'vuetify/util/colors'

// Composables
import {createVuetify} from 'vuetify'

/*
Color palette:
'#009688'
'#CAE5FF'
'#89BBFE'
'#615D6C'
'#F1BF98'
*/

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: colors.teal.base,
          secondary: '#CAE5FF',
          accent: '#89BBFE',
          accent2: '#615D6C',
          accent3: colors.teal.darken2,
          background: colors.indigo.lighten5,
        },
      }
    }
  },
})
