import svgIcon from './svg-icon/index.vue'

export default{
  //手动注册svg-icon组件
  install(app) {
    app.component('m-svg-icon', svgIcon);
  }
}