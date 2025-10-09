import { defineAsyncComponent } from 'vue'

export default{
  // 自动化注册组件
  install(app) {
    // 1. 获取当前路径下所有文件夹的 index.vue--特定正则指定了
    const components = import.meta.glob('./*/index.vue')//按需加载组件
    // 2. 遍历过去的组件模块
    for(let key in components){
      // console.log("key:",key);
      const componentName = 'm-' + key.replace('./', '').split('/')[0]
      // 3. 利用 app.component 进行注册
      app.component(componentName, defineAsyncComponent(components[key]))
    }
  }
}


// 补充：
// defineAsyncComponent → 只有在模板里真正用到组件时才加载(注册)对应的 .vue 文件(组件)。
