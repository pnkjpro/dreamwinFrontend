import { createApp } from 'vue';
import { createPinia } from 'pinia';
import '@mdi/font/css/materialdesignicons.css';
import './assets/main.css'; // Import Tailwind CSS
// main.js or main.ts
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

import config from './config/config';


import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.provide('config', config);

app.mount('#app');
