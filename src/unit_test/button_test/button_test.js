import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import Button from '@/libs/button/index.vue'

describe('Button.vue', () => {
  it('should render default button with correct classes based on type and size', () => {
    const wrapper = mount(Button, {
      props: {
        type: 'primary',
        size: 'default',
      },
    })
    
    // 验证按钮的类名是否正确渲染
    expect(wrapper.classes()).toContain('text-white')
    expect(wrapper.classes()).toContain('bg-zinc-800')
    expect(wrapper.classes()).toContain('w-8')
    expect(wrapper.classes()).toContain('h-4')
  })

  it('should render button with icon size classes when icon prop is passed', () => {
    const wrapper = mount(Button, {
      props: {
        icon: 'check',
        size: 'default',
      },
    })

    // 验证按钮的类名是否包含 icon 按钮的大小
    expect(wrapper.classes()).toContain('w-8')
    expect(wrapper.classes()).toContain('h-4')

    // 验证是否渲染图标
    const icon = wrapper.find('m-svg-icon')
    expect(icon.exists()).toBe(true)
  })

  it('should render loading state and show loading icon when loading is true', () => {
    const wrapper = mount(Button, {
      props: {
        loading: true,
      },
    })

    // 验证是否渲染 loading 图标
    const loadingIcon = wrapper.find('m-svg-icon[name="loading"]')
    expect(loadingIcon.exists()).toBe(true)

    // 验证按钮是否有 disabled 属性（根据需要可以添加）
    const button = wrapper.find('button')
    expect(button.attributes('disabled')).toBeDefined()
  })

  it('should not emit click event when button is in loading state', async () => {
    const emitClick = vi.fn() // 创建一个模拟的函数
    const wrapper = mount(Button, {
      props: {
        loading: true,
      },
      emit: ['click'], // 监听 click 事件
    })

    // 按钮点击事件
    await wrapper.trigger('click')

    // 验证按钮是否没有触发点击事件
    expect(emitClick).not.toHaveBeenCalled()
  })

  it('should emit click event when button is clicked and not loading', async () => {
    const emitClick = vi.fn() // 创建一个模拟的函数
    const wrapper = mount(Button, {
      props: {
        loading: false,
      },
      emit: ['click'], // 监听 click 事件
    })

    // 按钮点击事件
    await wrapper.trigger('click')

    // 验证按钮点击后是否触发了事件
    expect(emitClick).toHaveBeenCalled()
  })

  it('should render icon button when icon prop is passed', () => {
    const wrapper = mount(Button, {
      props: {
        icon: 'check',
        size: 'icon-default',
      },
    })

    // 验证按钮是否渲染了图标
    const icon = wrapper.find('m-svg-icon')
    expect(icon.exists()).toBe(true)

    // 验证按钮类是否符合 icon 的大小
    expect(wrapper.classes()).toContain('w-4')
    expect(wrapper.classes()).toContain('h-4')
  })

  it('should apply correct size classes when size prop is passed', () => {
    const wrapper = mount(Button, {
      props: {
        size: 'small',
      },
    })

    // 验证按钮大小类名
    expect(wrapper.classes()).toContain('w-7')
    expect(wrapper.classes()).toContain('h-3')
  })

  it('should apply correct active scale animation class when isActiveAnim is true', async () => {
    const wrapper = mount(Button, {
      props: {
        isActiveAnim: true,
      },
    })

    // 验证是否有 active scale 动画类
    expect(wrapper.classes()).toContain('active:scale-[1.05]')
  })

  it('should not apply active scale animation class when isActiveAnim is false', async () => {
    const wrapper = mount(Button, {
      props: {
        isActiveAnim: false,
      },
    })

    // 验证是否没有 active scale 动画类
    expect(wrapper.classes()).not.toContain('active:scale-[1.05]')
  })
})
