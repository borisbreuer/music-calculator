/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import colors from 'vuetify/lib/util/colors'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  defaults: {
    VBtn: { variant: 'outlined' },
    VTextField: { variant: 'outlined' },
  },
  theme: {
    defaultTheme: 'dark',
    // themes: {
    //   dark: {
    //     colors: {
    //       grey: colors.grey.darken1
    //     },
    //   },
    // },
  },
})
