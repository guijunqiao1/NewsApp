import { createApp } from 'vue'
import './styles/index.scss'
import App from './App.vue'
import router from "./router";//自动索引到其中的index.js
import { useREM } from './utils/flexible'
import mLibs from './libs'//应用注册的svg-icon组件
// 通常与使用 Vite 和 svg-icons 插件 相关。注册在项目中使用的 SVG 图标。--在vite-config-js中指定范围
import 'virtual:svg-icons-register'



createApp(App).use(router).use(mLibs).mount('#app');

//设置根元素的字体大小便于使用rem单位
useREM()