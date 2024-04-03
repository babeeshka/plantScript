import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import '@/style.css'

const app = createApp(App);

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
  },
});

app.use(router);
app.use(vuetify);
app.mount('#app');