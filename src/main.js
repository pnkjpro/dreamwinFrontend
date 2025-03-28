import { createApp } from 'vue';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { createPinia } from 'pinia';
import '@mdi/font/css/materialdesignicons.css';
import './assets/main.css'; // Import Tailwind CSS
// main.js or main.ts
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

import config from './config/config';
import lifeline from './config/lifeline';


import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(Toast);
app.use(router);

app.provide('config', config);
app.provide('lifeline', lifeline);

app.mount('#app');
