import request from '@/utils/request'

/**
 * 获取 VIP 支付数据
 */
export const getVipPayList = () => {
    //真实请求接口
    //   return request({
    //     url: '/user/vip/pay/list'
    //   })

    // 模拟接口
    return Promise.resolve({
        desc:'a vip message',
        id:1,
        title:'1111',
        price:21,
        oldPrice:99,
        isHot:false
    })
}
