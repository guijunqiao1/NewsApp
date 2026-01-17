import js from "@eslint/js";
import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // ESLint 官方推荐的 JS 规则集
  js.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,vue}"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {
      "no-console": "warn",
    },
  },
  // 允许 server 目录使用 console
  {
    files: ["server/**/*.js"],
    rules: {
      "no-console": "off",
    },
  },
  // Vue 规则配置
  ...pluginVue.configs["flat/essential"],
  {
    files: ["**/*.vue"],
    rules: {
      // 允许单单词组件名（很多组件如 index、header 等都是单单词）
      "vue/multi-word-component-names": "off",
    },
  },
]);
