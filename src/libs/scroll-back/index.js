import { h, render } from 'vue'
import scrollBackComponent from './index.vue'

export const scrollBack = (isShow=false,place=document.body) => {
  const vnode = h(scrollBackComponent, {
    isShow
  })
  render(vnode, place)
}