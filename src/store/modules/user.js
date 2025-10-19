import { loginUser } from '@/api/sys'
import md5 from 'md5'

export default {
  namespaced: true,
  state: () => ({
    // 登录之后的 token
    token: ''
  }),
  mutations: {
    /**
     * 保存 token
     */
    setToken(state, newToken) {
      state.token = newToken
    }
  },
  actions: {
    /**
     * 登录
     */
    async login(context, payload) {
      const { password } = payload
      //调用登陆api
      const data = await loginUser({
        ...payload,
        password: password ? md5(password) : ''//md5加密post请求体
      })
      console.log(data);
      context.commit('setToken', data.token)
    }
  }
}