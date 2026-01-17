import js from "@eslint/js";
import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // 允许 server 目录使用 console
  {
    files: ["server/**/*.js"],
    rules: {
      "no-console": "off",
    },
  },
  {
		rules: {
			"no-console": "warn",
		},
	},
  pluginVue.configs["flat/essential"],
]);
