import { createApp } from 'vue'
import App from './App.vue'
import router from './router'; 

// create the Vue application instance
const app = createApp(App);

// use the router with the Vue application
app.use(router);

// mount the Vue application to the DOM
app.mount('#app');