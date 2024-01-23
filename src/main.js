import {createApp} from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from "./router"
import './index.css'
import { createHead } from '@vueuse/head';

const pinia = createPinia();
createApp(App).use(pinia).use(router).use(createHead()).mount('#app')
