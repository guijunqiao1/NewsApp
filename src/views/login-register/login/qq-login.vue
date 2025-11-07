<template>
  <div>
    <span id="qqLoginBtn" v-show="false"></span>
    <m-svg-icon
      class="w-4 cursor-pointer"
      name="qq"
      @click="onQQLogin"
    ></m-svg-icon>
  </div>
</template>

<script>
  // QQ 登录的 URL
  const QQ_LOGIN_URL =
    'https://graph.qq.com/oauth2.0/authorize?client_id=101998494&response_type=token&scope=all&redirect_uri=https%3A%2F%2Fimooc-front.lgdsunday.club%2Flogin'
</script>

<script setup>
import { onMounted } from 'vue'
import { isMobile } from '@/utils/flexible'
import brodacast from './brodacast'
import { oauthLogin } from './oauth'
import { LOGIN_TYPE_QQ } from '@/constants'

// QQ 登录挂起
onMounted(() => {
  // 全局index.html引入的qq的sdk故可直接使用上该全局的sdk的配置对象来监听当前sdk组件的登陆事件以及进一步调用其中的方法(如登出)
  QC.Login(
    {
      btnId: 'qqLoginBtn' //插入按钮的节点id
    },
    // 登录成功之后的回调，但是需要注意，这个回调只会在《登录回调页面中被执行》
    // 登录存在缓存，登录成功一次之后，下次进入会自动重新登录（即：触发该方法，我们应该在离开登录页面时，注销登录）
    (data, opts) => {
      console.log('QQ登录成功')
      // 1. 注销登录，否则在后续登录中会直接触发该回调
      QC.Login.signOut()
      // 2. 获取当前用户唯一标识，作为判断用户是否已注册的依据
      const accessToken = /access_token=((.*))&expires_in/.exec(
        window.location.hash
        // 补充：获取当前页面 URL 中的 哈希值（#后面的部分）。
      )[1]

      // 此处进行exec方法的补充：
      // exec() 方法是正则表达式对象的一个方法，用于执行匹配并返回匹配的结果。
      // exec(window.location.hash) 会返回一个数组，其中：
      // 第一个元素是匹配到的完整字符串（即 access_token=abc123&expires_in=3600）。
      // 第二个元素是第一个捕获组的内容，也就是 access_token 后面的值（即 abc123）。

      // 例如，在 URL 哈希为 #access_token=abc123&expires_in=3600 时： access_token=abc123 这个部分会被正则匹配并捕获。

      // 3. 拼接请求对象
      const oauthObj = {
        nickname: data.nickname,
        figureurl_qq_2: data.figureurl_qq_2,
        accessToken
      }
      // 4. 完成跨页面传输
      brodacast.send(oauthObj)

      // 针对于 移动端而言：通过移动端触发 QQ 登录会展示三个页面，原页面、QQ 吊起页面、回调页面。并且移动端一个页面展示整屏内容，且无法直接通过 window.close() 关闭，所以在移动端中，我们需要在当前页面继续进行后续操作。
      oauthLogin(LOGIN_TYPE_QQ, oauthObj)

      // 5. 在 PC 端下，关闭第三方窗口
      // window.close()
    }
  )
})

/**
 * 登录按钮事件
 */
const onQQLogin = () => {
  openQQWindow()
}

/**
 * 处理 QQ 登录视窗
 */

const openQQWindow = async () => {
  window.open(
    QQ_LOGIN_URL,
    'oauth2Login_10609',
    'height=525,width=585, toolbar=no, menubar=no, scrollbars=no, status=no, location=yes, resizable=yes'
  )
  // 打开视窗之后开始等待
  brodacast.wait().then(async (oauthObj) => {
    alert("222");
    // 登录成功,关闭通知
    console.log("当前·成功登录！！！！！");
    // brodacast.clear()
    // TODO：执行登录操作
    oauthLogin(LOGIN_TYPE_QQ, oauthObj)
  })
}
</script>