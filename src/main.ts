import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './assets/main.css';

import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import 'primeicons/primeicons.css';

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);

app.use(router);
app.use(Toast);

app.mount('#app');
