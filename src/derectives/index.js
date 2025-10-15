import lazy from './modules/lazy';
//需要注意的是此处为内容引入的书写方式

/**
 * 全局注册指令
 */
export default {
  install(app) {
    //需要区分和自定义组件注册的区别
    app.directive('lazy', lazy)
  }
}