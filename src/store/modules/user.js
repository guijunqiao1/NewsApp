import { loginUser,getProfile } from '@/api/sys'
import md5 from 'md5'
import { message } from '@/libs';//调用库全局暴露的message组件生产方法用于快速生成并调用message方法使得指定信息生成

export default {
  namespaced: true,
  state: () => ({
    // 登录之后的 token
    token: '1',
    // 获取用户信息
    userInfo: {}
  }),
  mutations: {
    /**
     * 保存 token
     */
    setToken(state, newToken) {
      state.token = newToken
    },
    /**
     * 保存用户信息
     */
    setUserInfo(state, newInfo) {
      state.userInfo = newInfo
      // console.log("state_userinfo",state.userInfo);
      // console.log("newinfo:",newInfo);
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
      // console.log(data);
      context.commit('setToken', data.token)
            context.dispatch('profile')
    },
    /**
     * 获取用户信息
     */
    async profile(context) {
      const data = await getProfile()
      context.commit('setUserInfo', data)
      // console.log("dataaaaaa:",data);
      // 欢迎
      message(
        'success',
        `欢迎您 ${
          data.vipLevel
            ? '尊贵的 VIP' + data.vipLevel + ' 用户 ' + data.nickname
            : data.nickname
        } `,
        6000
      )
    }
  }
}