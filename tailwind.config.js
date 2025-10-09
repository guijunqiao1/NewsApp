module.exports = {//没有设置type:module故使用commonjs正常--没有设置支持ESM和commonjs混用，以下为混用前提规则：
    // 如果你没有设置 type: "module"，Node.js 默认使用 CommonJS，你可以在 CommonJS 中使用 require()，而不能直接在其中使用 import。
    // 如果你想从 CommonJS 导入 ESM，你需要使用动态导入（import()）。
    // 如果你想从 ESM 导入 CommonJS，你会访问到 CommonJS 模块的 default 导出。
  content: ['./index.html', './src/**/*.{vue,js}'],
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
      }
    }
  },
  plugins: [
    
  ]
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