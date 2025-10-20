<template>
  <m-popover class="flex items-center" placement="bottom-left">
    <!-- 外观插槽部分 -->
    <template #reference>
      <div
        v-if="store.getters.token"
        class="guide-my relative flex items-center p-0.5 rounded cursor-pointer duration-200 outline-none hover:bg-zinc-100 dark:hover:bg-zinc-900"
        >
        <!-- 头像 -->
        <img
          v-lazy
          :src="store.getters.userInfo.avatar"
          class="w-3 h-3 rounded-sm"
        />
        <!-- 下箭头 -->
        <m-svg-icon
          class="h-1.5 w-1.5 ml-0.5"
          name="down-arrow"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></m-svg-icon>
        <!-- vip -->
        <m-svg-icon
          v-if="true"
          class="h-1.5 w-1.5 absolute right-[16px] bottom-0"
          name="vip"
          fillClass="fill-zinc-900"
        ></m-svg-icon>
        
      </div>
      <div v-else>
        <m-button icon="profile" iconColor="#fff" @click="onToLogin"></m-button>
      </div>
    </template>
    <!-- 默认插槽弹窗部分 -->
    <div v-if="store.getters.token" class="w-[140px] overflow-hidden">
      <div
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
        v-for="item in menuArr"
        :key="item.id"
        @click="onItemClick(item.path)"
      >
        <m-svg-icon
          :name="item.icon"
          class="w-1.5 h-1.5 mr-1"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></m-svg-icon>
        <span class="text-sm text-zinc-800 dark:text-zinc-300">{{ item.title }}</span>
      </div>
    </div>
  </m-popover>
</template>

<script setup>
  import { useStore } from "vuex";
  import { useRouter } from 'vue-router'
  //引入库全局确认自助生成组件方法
  import { confirm } from '@/libs'


  const store = useStore();

  
  
  // 构建meun 数据源
  const menuArr = [
    {
      id: 0,
      title: '个人资料',
      icon: 'profile',
      path: '/profile'
    },
    {
      id: 1,
      title: '升级 VIP',
      icon: 'vip-profile',
      path: '/member'
    },
    {
      id: 2,
      title: '退出登录',
      icon: 'logout',
      path: ''
    }
  ]

  const router = useRouter()

  /**
   * 登录点击
   */
  const onToLogin = () => {
    router.push('/login')
  }


  /**
   * menu Item 点击事件，也可以根据其他的 key 作为判定，比如 name
   */
  const onItemClick = (path) => {
    // 有路径则进行路径跳转
    if (path) {
      // 配置跳转方式
      router.push(path)
      return
    }
    // 无路径则为退出登录
    confirm('您确定要退出登录吗？').then(() => {
      // 退出登录不存在跳转路径--需要注意调用的是状态中的方法
      store.dispatch('user/logout')
    })
  }


</script>

<style lang="scss" scoped>

</style>