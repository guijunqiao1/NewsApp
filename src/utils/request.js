import axios from "axios";
import https from "https";

//前情提要：utils专门用于存放封装的方法(以及接口请求拦截器) 

const appcode = '5caf6b27a0614b56b40155be96f68da9';  // 替换成你自己的 AppCode

// 请求头
const headers = {
  'Content-Type': 'application/json; charset=UTF-8',
};

console.log("location",import.meta.env.VITE_BASE_API);

//配置并封装接口基地址
const service = axios.create({
  //我的AppCode：5caf6b27a0614b56b40155be96f68da9
  // 根据项目状态，自动切换请求的服务地址
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000,
  method:'get',
  headers:headers
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    //链式追加
    config.headers.Authorization = `APPCODE ${appcode}`;
    // if (store.getters.token) {
    //   // 如果token存在 注入token
    //     if (config.headers.Authorization) {
    //     // 如果 Authorization 已经存在，就追加新的 Authorization 值
    //       config.headers.Authorization = `Bearer ${store.getters.token} ${config.headers.Authorization}`;
    //     } else {
    //       config.headers.Authorization = `Bearer ${store.getters.token}`
    //     }
    //   }
    return config // 必须返回配置
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * 响应拦截器，响应数据之后，所有的then之前被调用
 */
service.interceptors.response.use((response)=>{
  const {success, message, data} = response.data
  if(success){
    return data
  }
  //统一拦截错误响应
  return Promise.reject(new Error(message))
})

export default service;