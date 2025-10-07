import axios from "axios";
import https from "https";

//前情提要：utils专门用于存放封装的方法(以及接口请求拦截器) 

const appcode = '5caf6b27a0614b56b40155be96f68da9';  // 替换成你自己的 AppCode

// 请求头
const headers = {
  'Content-Type': 'application/json; charset=UTF-8',
};

//配置并封装接口基地址
const service = axios.create({
  //我的AppCode：5caf6b27a0614b56b40155be96f68da9
  baseURL: '/news',
  timeout: 5000,
  method:'get',
  headers:headers
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `APPCODE ${appcode}`
    // if (store.getters.token) {
    //   // 如果token存在 注入token
    //   config.headers.Authorization = `Bearer ${store.getters.token}`
    // }
    return config // 必须返回配置
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default service;