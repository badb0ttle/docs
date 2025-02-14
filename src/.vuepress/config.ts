import { defineUserConfig } from "vuepress";
import { getDirname, path } from "vuepress/utils";
import theme from "./theme.js";

const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
  base: "/docs/",
  lang: "zh-CN",
  title: "Badbottle's blog",
  description: "Blnk is infinite.",
  
  theme,
 
  // 配置 favicon.ico 路径
  head: [
    ['link', { rel: 'icon', href: 'https://s11.aconvert.com/convert/p3r68-cdx67/flx18-4i3af-001.ico' }]
  ],

  // 配置别名
  alias: {
    "@theme-hope/modules/blog/components/BlogHero": path.resolve(
      __dirname,
      "./components/BlogHero.vue"
    ),
  },

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
