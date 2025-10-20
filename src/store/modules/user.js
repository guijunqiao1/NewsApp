import { loginUser,getProfile,registerUser } from '@/api/sys'
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
      console.log("old_userInfo:",state.userInfo);
      console.log("now_props_get_newInfo:",newInfo);
      state.userInfo = newInfo
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
    },
    /**
     * 退出登录
     */
    logout(context) {
      context.commit('setToken', '')
      context.commit('setUserInfo', {})
      // 退出登录之后，重新刷新下页面，因为对于前台项目而言，用户是否登录（是否为 VIP）看到的数据可能不同--即数据源可能需要重新请求
      location.reload()
    },
    /**
     * 注册
     */
    async register(context, payload) {
      const { password } = payload
      // 注册
      return await registerUser({
        ...payload,
        password: password ? md5(password) : ''
      })
    }
  }
}