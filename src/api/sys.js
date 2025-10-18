import request from '@/utils/request'
import axios from "axios";

/**
 * 人类行为验证--后端接口分析轨迹、操作时间数据以验证
 */
export const getCaptcha = (data) => {
  return axios.post("http://localhost:4000/news/captcha",data)
}