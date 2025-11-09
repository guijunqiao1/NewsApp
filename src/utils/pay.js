// import store from '@/store'
import { getAliPay } from '@/api/pay'
import { isMobile } from '@/utils/flexible'

/**
 * 触发支付宝支付
 * @param {*} title 支付标题
 * @param {*} desc 支付描述
 */
export const alipay = async (title, desc) => {
  // encode 的支付地址
  const { encodeURI } = await getAliPay(
    title,
    '0.01',
    desc,
    isMobile.value
  )
  // 解构--跳转网页
  window.location.href = decodeURIComponent(encodeURI);//可提前传递参数进行响应结果的预知--存放在route中-和pay下的index.vue相互配合
}