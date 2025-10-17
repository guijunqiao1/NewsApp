module.exports = {//没有设置type:module故使用commonjs正常--没有设置支持ESM和commonjs混用，以下为混用前提规则：
    // 如果你没有设置 type: "module"，Node.js 默认使用 CommonJS，你可以在 CommonJS 中使用 require()，而不能直接在其中使用 import。
    // 如果你想从 CommonJS 导入 ESM，你需要使用动态导入（import()）。
    // 如果你想从 ESM 导入 CommonJS，你会访问到 CommonJS 模块的 default 导出。
  content: ['./index.html', './src/**/*.{vue,js}'],
  // 黑暗模式
  darkMode: 'class',
  theme: {
    extend: {
      fontSize: {
        xs: ['0.25rem','0.35rem'],//取值为实际的fontSize的取值
        sm: ['0.35rem','0.45rem'],
        base: ['0.45rem','0.55rem'],
        lg: ['0.55rem','0.65rem'],
        xl: ['0.65rem','0.75rem'],
      },
      // 定义了一个 自定义的阴影效果 l-white，其值为 '-10px 0 10px white'
      boxShadow: {
        'l-white':'-10px 0 10px white',//取值为实际的boxShadow的取值
        'l-zinc':'-10px 0 10px #18181b',
      },
      height:{
        header:'72px',
        // 利用了 calc() 函数来进行动态计算。值为 视口高度（100vh）减去一个固定的像素value
        main:'calc(100vh - 72px)'//floating部分为浮动部分不占据额外的height
      },
      colors:{
        main: '#f44c58',
        'hover-main': '#f32836',
        'success-100': '#F2F9EC',
        'success-200': '#E4F2DB',
        'success-300': '#7EC050',
        'warn-100': '#FCF6ED',
        'warn-200': '#F8ECDA',
        'warn-300': '#DCA550',
        'error-100': '#ED7456',
        'error-200': '#f3471c',
        'error-300': '#ffffff'
      },
      variants: {//自定义拓展应用场景，注意和tailwind变量定义的区别--和拓展配合使用
        scrollbar: ['dark']
        // 启用滚动条样式在暗黑模式下的变体。
        // 解释：
        // 允许你在 dark 模式中使用滚动条相关样式
      }
    }
  },
  plugins: [require('tailwind-scrollbar')]
  // 补充解释：
  // tailwind-scrollbar 是一个 Tailwind CSS 插件，
  // 用于给网页的滚动条（scrollbar）添加可定制样式
   
}
// 配置文件解释：
// extend：这个关键字表示 扩展 默认的主题，而不是替换默认的配置。
// fontSize：我们在这里定义了不同的字体大小（xs、sm、base、lg、xl）。每个字体大小对应的是一个 数组，数组的第一个值是 字体大小，第二个值是 行高。
// 具体配置如下：

// xs：0.25rem 的字体大小，0.35rem 的行高。
// sm：0.35rem 的字体大小，0.45rem 的行高。
// base：0.45rem 的字体大小，0.55rem 的行高。
// lg：0.55rem 的字体大小，0.65rem 的行高。
// xl：0.65rem 的字体大小，0.75rem 的行高。
// 在 Tailwind 中，fontSize 可以通过如 text-xs、text-sm 等类来使用，使用时 Tailwind 会应用这些字体大小和行高。例如：

// <p class="text-xs">这是一个小字体的文本。</p>
// 会应用 0.25rem 的字体大小和 0.35rem 的行高。