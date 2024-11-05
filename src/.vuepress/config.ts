import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/docs/",

  lang: "zh-CN",
  title: "Badbottle's blog",
  description: "Blnk is infinite.",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
