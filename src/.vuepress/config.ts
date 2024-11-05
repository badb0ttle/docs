import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { getDirname, path } from "vuepress/utils";
const __dirname = getDirname(import.meta.url);
export default defineUserConfig({
  base: "/docs/",
  lang: "zh-CN",
  title: "Badbottle's blog",
  description: "Blnk is infinite.",
  alias: {
    "@theme-hope/modules/blog/components/BlogHero": path.resolve(
      __dirname,
      "./components/BlogHero.vue",
    ),
  },
  theme,

  // 配置 favicon.ico 路径
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
