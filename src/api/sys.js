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
    token:true
  }

  //实际的请求接口，没有做数据库存储逻辑，主攻核心前端逻辑
  // return request({
  //   url: '/login',
  //   method: 'POST',
  //   data
  // })

  return Promise.resolve(res_obj);
}

/**
 * 获取用户信息
 */
export const getProfile = () => {

  return Promise.resolve({
    vipLevel:true,
    nickname:'22222',
    avatar:"https://img0.baidu.com/it/u=4192635450,3692849998&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1698944400&t=e6510ab4c0f3e3539f179ad601fd0669",
    title:'33333',
    compony:'44444',
    homePage:"55555",
    introduction:'66666'
  });


  //实际请求的接口
  // return request({
  //   url: '/user/profile'
  // })
}

/**
 * 注册
 */
export const registerUser = (data) => {

  return Promise.resolve({
    a:1
  });


  // 实际请求的接口
  // return request({
  //   url: '/sys/register',
  //   method: 'POST',
  //   data
  // })
}