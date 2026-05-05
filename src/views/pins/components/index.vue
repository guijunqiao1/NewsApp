<template>
  <div
    data-pins-panel
    ref="scroll_all"
    class="pins-page"
  >
    <m-navbar
      v-if="isMobile"
      :clickLeft="onPop"
      :clickRight="onShare"
      sticky
    >
      <span class="pins-mobile-title">{{ now_item.src || now_item.category }}</span>
      <template #right>
        <m-svg-icon
          name="share"
          class="w-3 h-3"
          fillClass="fill-zinc-900 dark:fill-zinc-200"
        ></m-svg-icon>
      </template>
    </m-navbar>

    <main v-if="now_item.title" class="pins-shell">
      <section class="pins-media-panel">
        <img
          ref="img_ele"
          :class="imageClass"
          :src="now_item.pic"
          alt=""
        />
      </section>
      
      <section class="pins-info-panel">
        <div class="pins-toolbar">
          <button
            class="pins-icon-button"
            aria-label="分享"
            @click="onShare"
          >
          <m-svg-icon
            name="share"
              class="w-3 h-3"
              fillClass="fill-zinc-900 dark:fill-zinc-200"
            ></m-svg-icon>
          </button>
          <button
            class="pins-icon-button"
            aria-label="收藏"
          >
            <m-svg-icon
              name="heart"
              class="w-3 h-3"
            fillClass="fill-zinc-900 dark:fill-zinc-200"
          ></m-svg-icon>
          </button>
          <button
            v-if="!isMobile"
            class="pins-icon-button"
            aria-label="关闭"
            @click="onPop"
          >
            <m-svg-icon
              name="close"
              class="w-3 h-3"
              fillClass="fill-zinc-900 dark:fill-zinc-200"
            ></m-svg-icon>
          </button>
        </div>

        <header class="pins-header">
          <h1 class="pins-title">{{ now_item.title }}</h1>
          <div class="pins-meta">
            <span>{{ now_item.category }}</span>
            <span>{{ now_item.src }}</span>
        </div>
        </header>

        <a
          :href="now_item.weburl"
          class="pins-source-link"
          target="_blank"
          rel="noreferrer"
        >
          <span>查看原文</span>
          <m-svg-icon
            name="transport"
            class="w-2.5 h-2.5"
            fillClass="fill-zinc-900 dark:fill-zinc-200"
          ></m-svg-icon>
        </a>

        <article ref="contentRef" class="pins-content content"></article>
      </section>
    </main>

    <scroll-back
      :isShow="isScrollBackVisible && isMobile"
      @backTop="backTop"
    ></scroll-back>
  </div>
</template>

<script>
  export default {
    name: 'pins-detail'
  }
</script>

<script setup>
  import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
  import { useRouter } from 'vue-router'
  import { isMobile } from '@/utils/flexible.js'
  import { weiboShare } from '@/utils/share'
  import scrollBack from '@/views/main/components/scroll-back/index.vue'

  const props = defineProps({
    now_item: {
        type: Object,
        required: true
    },
    img_type: {
      type: String,
      required: true
    }
  })

  const imageClass = computed(() => {
    return [
      'pins-image',
      props.img_type === 'shu' ? 'pins-image-portrait' : 'pins-image-landscape'
    ]
  })

  const router = useRouter()
  const onPop = () => {
    router.back()
  }

  const onShare = () => {
    weiboShare(props.now_item.pic, window.location.href)
  }

  const contentRef = ref(null)

  // 填充内容的函数
  const fillContent = () => {
    nextTick(() => {
      if (contentRef.value) {
        contentRef.value.innerHTML = props.now_item.content || ''
      }
    })
  }

  onMounted(() => {
    fillContent()
  })

  watch(
    () => props.now_item,
    () => {
      fillContent()
    },
    { deep: true }
  )

  const scroll_all = ref()
  const isScrollBackVisible = ref(false)

  const backTop = () => {
    if (scroll_all.value) {
      scroll_all.value.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }

  const handleScroll = () => {
    if (!scroll_all.value) return
    
    const scrollTop = scroll_all.value.scrollTop
    const scrollHeight = scroll_all.value.scrollHeight
    const clientHeight = scroll_all.value.clientHeight
    isScrollBackVisible.value = scrollTop > (scrollHeight - clientHeight) / 2
  }

  onMounted(() => {
    if (scroll_all.value) {
      scroll_all.value.addEventListener('scroll', handleScroll)
    }
  })

  onUnmounted(() => {
    if (scroll_all.value) {
      scroll_all.value.removeEventListener('scroll', handleScroll)
    }
  })
</script>

<style lang="scss" scoped>
  .pins-page {
    position: fixed;
    inset: 0;
    z-index: 20;
    overflow-y: auto;
    background:
      linear-gradient(180deg, rgb(244 244 245) 0%, rgb(228 228 231) 100%);
  }

  :global(.dark) .pins-page {
    background:
      linear-gradient(180deg, rgb(24 24 27) 0%, rgb(9 9 11) 100%);
  }

  .pins-mobile-title {
    display: block;
    max-width: 62vw;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .pins-shell {
    display: grid;
    min-height: calc(100dvh - 40px);
    background: rgb(255 255 255);
  }

  .pins-media-panel {
    display: flex;
    min-height: 42vh;
    align-items: center;
    justify-content: center;
    background: #020617;
  }

  .pins-image {
    display: block;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 72vh;
    object-fit: contain;
  }

  .pins-image-landscape {
    width: 100%;
  }

  .pins-image-portrait {
    max-height: 72vh;
  }

  .pins-info-panel {
    background: rgb(255 255 255);
    color: rgb(24 24 27);
    padding: 18px 16px 28px;
  }

  :global(.dark) .pins-info-panel {
    background: rgb(24 24 27);
    color: rgb(244 244 245);
  }

  .pins-toolbar {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-bottom: 14px;
  }

  .pins-icon-button {
    display: flex;
    width: 36px;
    height: 36px;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    background: rgb(244 244 245);
    transition:
      background-color 180ms ease,
      transform 180ms ease;
  }

  :global(.dark) .pins-icon-button {
    background: rgb(39 39 42);
  }

  .pins-icon-button:hover {
    transform: translateY(-1px);
    background: rgb(228 228 231);
  }

  :global(.dark) .pins-icon-button:hover {
    background: rgb(63 63 70);
  }

  .pins-header {
    padding-bottom: 16px;
    border-bottom: 1px solid rgb(228 228 231);
  }

  :global(.dark) .pins-header {
    border-bottom-color: rgb(63 63 70);
  }

  .pins-title {
    font-size: 22px;
    line-height: 1.35;
    font-weight: 700;
    color: rgb(24 24 27);
  }

  :global(.dark) .pins-title {
    color: rgb(244 244 245);
  }

  .pins-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 12px;
    color: rgb(113 113 122);
    font-size: 13px;
  }

  .pins-meta span {
    display: inline-flex;
    align-items: center;
    min-height: 26px;
    padding: 0 10px;
    border-radius: 8px;
    background: rgb(244 244 245);
  }

  :global(.dark) .pins-meta span {
    color: rgb(212 212 216);
    background: rgb(39 39 42);
  }

  .pins-source-link {
    display: flex;
    height: 42px;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 16px;
    border-radius: 8px;
    background: rgb(24 24 27);
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    transition:
      transform 180ms ease,
      background-color 180ms ease;
  }

  .pins-source-link:hover {
    transform: translateY(-1px);
    background: rgb(39 39 42);
  }

  :global(.dark) .pins-source-link {
    background: rgb(244 244 245);
    color: rgb(24 24 27);
  }

  .pins-content {
    margin-top: 18px;
    color: rgb(63 63 70);
    font-size: 15px;
    line-height: 1.85;
  }

  :global(.dark) .pins-content {
    color: rgb(212 212 216);
  }

  .pins-content :deep(p) {
    margin: 0 0 14px;
  }

  .pins-content :deep(img) {
    max-width: 100%;
    height: auto;
    margin: 14px auto;
    border-radius: 8px;
  }

  .pins-content :deep(a) {
    color: rgb(37 99 235);
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  @media (min-width: 1280px) {
    .pins-page {
      padding: 12px;
    }

    .pins-shell {
      grid-template-columns: minmax(0, 3fr) minmax(360px, 2fr);
      height: calc(100dvh - 24px);
      min-height: 0;
      max-width: 1280px;
      margin: 0 auto;
      overflow: hidden;
      border: 1px solid rgb(228 228 231);
      border-radius: 8px;
      box-shadow: 0 20px 60px rgb(15 23 42 / 12%);
    }

    :global(.dark) .pins-shell {
      border-color: rgb(63 63 70);
      box-shadow: 0 20px 60px rgb(0 0 0 / 32%);
    }

    .pins-media-panel {
      min-height: 0;
      height: 100%;
    }

    .pins-image {
      max-width: 100%;
      max-height: 100%;
    }

    .pins-image-landscape {
      width: 100%;
      height: auto;
    }

    .pins-image-portrait {
      height: 100%;
      max-height: 100%;
    }

    .pins-info-panel {
      overflow-y: auto;
      padding: 18px 20px 28px;
    }
  }
</style>
