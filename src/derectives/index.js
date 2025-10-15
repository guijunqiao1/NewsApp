/**
 * 全局注册指令
 */
export default {
  install(app) {
    //需要区分和自定义组件注册的区别
    //需要区分import.meta.glob和下方的方法的区别
    const directives = import.meta.glob('./modules/*.js')
    for (const [key, value ] of Object.entries(directives)){
      const arr = key.split('/')
      const directiveName = arr[arr.length - 1].replace('.js', '')
      app.directive(directiveName, value.default)
    }
  }
}