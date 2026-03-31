import { defineUserConfig } from "vuepress";
import { viteBundler } from "@vuepress/bundler-vite";
import { getDirname } from "vuepress/utils";
import theme from "./theme.js";

const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
  base: "/",
  lang: "zh-CN",
  title: "Badbottle's blog",
  description: "Blnk is infinite.",
  shouldPrefetch: false,

  theme,

  // 配置 favicon.ico 路径
  head: [
    //     // <link rel="preconnect" href="https://fonts.googleapis.com">
    // <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    // <link href="https://fonts.googleapis.com/css2?family=Limelight&display=swap" rel="stylesheet">
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    [
      "link",
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    ],
    [
      "link",
      {
        href: "https://fonts.googleapis.com/css2?family=Funnel+Display:wght@300..800&family=Limelight&display=swap",
        rel: "stylesheet",
      },
    ],
    ['link', { rel: 'icon', href: 'assets/icon/logo.ico' }]
  ],


  // 和 PWA 一起启用
  // shouldPrefetch: false,

  bundler: viteBundler({}),
});
