import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";//自动索引到其中的index.js
import { useREM } from './utils/flexible'


createApp(App).use(router).mount('#app');

//设置根元素的字体大小便于使用rem单位
useREM()