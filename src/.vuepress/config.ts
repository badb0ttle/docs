import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/docs/",
  lang: "zh-CN",
  title: "Badbottle's blog",
  description: "Blnk is infinite.",

  theme,

  // 配置 favicon.ico 路径
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
