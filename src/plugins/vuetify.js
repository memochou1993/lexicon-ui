import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors';
import '@mdi/font/css/materialdesignicons.css';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: '#061D30',
        secondary: colors.grey,
        accent: colors.indigo,
        error: colors.red,
        info: colors.blue,
        success: colors.green,
        warning: colors.orange,
      },
    },
  },
});
