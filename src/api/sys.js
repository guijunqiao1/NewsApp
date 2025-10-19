import request from '@/utils/request'
import axios from "axios";

/**
 * 人类行为验证--后端接口分析轨迹、操作时间数据以验证
 */
export const getCaptcha = (data) => {
  return axios.post("http://localhost:4000/captcha",data)
}

/**
 * 登录
 */
export const loginUser = (data) => {

  // 封装内容对象
  const res_obj = {
    result:'ok'
  }

  //实际的请求接口，没有做数据库存储逻辑，主攻核心前端逻辑
  // return request({
  //   url: '/login',
  //   method: 'POST',
  //   data
  // })

  return Promise.resolve(res_obj);
}