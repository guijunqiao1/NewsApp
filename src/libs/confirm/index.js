import { h, render } from 'vue'
import confirmComponent from './index.vue'
/**
 * @param {*} title 标题
 * @param {*} content 文本
 * @param {*} cancelText 取消按钮文本
 * @param {*} confirmText 确定按钮文本
 * @returns
 */
export const confirm = (
  title,
  content,
  cancelText = '取消',
  confirmText = '确定'
) => {
  return new Promise((resolve, reject) => {
    // 允许只传递 content
    if (title && !content) {
      content = title
      title = ''
    }

    // 关闭弹层事件
    const close = () => {
      // 第一个参数为 null 会执行 unmount 方法，卸载 dom
      render(null, document.body)
      // Vue 3 官方提供的卸载组件的方法--调用一定发生在虚拟组件节点身上，所以卸载的是组件自身
    }

    // 取消按钮事件--取消后续回调事件在调用confirm的时候添加即可
    const cancelHandler = () => {
      console.log("取消登陆");
    }

    // 确定按钮事件--确认后续回调事件在调用confirm的时候添加即可
    const confirmHandler = () => {
      resolve()
    }

    // 1. vnode
    const vnode = h(confirmComponent, {
      title,
      content,
      cancelText,
      confirmText,
      confirmHandler,
      cancelHandler,
      close
    })
    // 2. render
    render(vnode, document.body)
  })
}