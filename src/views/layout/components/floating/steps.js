// 封装步骤调度对象
export default [
  {
    // 在哪个元素中高亮
    element: '.guide-home',
    // 配置对象
    popover: {
      // 标题
      title: 'logo',
      // 描述
      description: '点击可返回首页'
    }
  },
  {
    // 使用稳定锚点：避免 flex 子项宽度过窄时高亮区域为 0 导致 driver 不渲染气泡与按钮
    element: '[data-app-guide="search"]',
    popover: {
      title: '搜索',
      description: '搜索您期望的图片'
    }
  },
  {
    // 必须与「头部主题切换」唯一对应；勿复用 .guide-theme（搜索下拉里也有同名 class 且常处于 display:none）
    element: '[data-app-guide="theme"]',
    popover: {
      title: '风格',
      description: '选择一个您喜欢的风格',
      // 弹出的位置
      position: 'left'
    }
  },
  {
    element: '.guide-my',
    popover: {
      title: '账户',
      description: '这里标记了您的账户信息',
      position: 'left'
    }
  },
  {
    element: '.guide-start',
    popover: {
      title: '引导',
      description: '这里可再次查看引导信息',
      position: 'left'
    }
  },
  {
    // 锚点须在可见且有尺寸的节点上；m-popover 根节点包 fixed 子元素时父级常为 0×0，driver 会跳过气泡
    element: '[data-app-guide="feedback"]',
    popover: {
      title: '反馈',
      description: '您的任何不满都可以在这里告诉我们',
      position: 'left'
    }
  }
]