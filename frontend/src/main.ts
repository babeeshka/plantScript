import { createApp } from 'vue'
import App from './App.vue'
import router from './router'; // You should add this line after setting up Vue Router

const app = createApp(App);
app.use(router); // Use the router instance in your Vue app
app.mount('#app');
