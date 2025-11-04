import request from '@/utils/request'
import { service_api } from '@/utils/request';
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

  return service_api({
    url: '/login',
    method: 'POST',
    data
  })

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
    introduction:'66666',
    username:'guijunqiao'
  });

  


  //实际请求的接口
  // return request({
  //   url: '/user/profile'
  // })
}

/**
 * 修改用户信息
 */
export const putProfile = (data) => {
  // 实际请求的接口
  // return request({
  //   url: '/user/profile',
  //   method: 'PUT',
  //   data
  // })

  return Promise.resolve({msg:'ok'});

  //该接口理应和服务端的数据库相结合
}

/**
 * 注册
 */
export const registerUser = (data) => {
  return service_api({
    url: '/sys/register',
    method: 'POST',
    data
  })
}




/**
 * 获取 OSS 上传凭证
 */
export const getSts = () => {
  return axios.get("http://localhost:4000/sts");
  //该接口理应和服务端的数据库相结合
}