import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";//自动索引到其中的index.js

createApp(App).use(router).mount('#app');
