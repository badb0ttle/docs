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

  head: [
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    [
      "link",
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    ],
    ["link", { rel: "preconnect", href: "https://v1.hitokoto.cn" }],
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Funnel+Display:wght@300..800&family=Noto+Serif+SC:wght@600;700&display=swap",
      },
    ],
    ["link", { rel: "icon", href: "/assets/icon/logo.ico" }],
    ["meta", { name: "theme-color", content: "#f7f3e9" }],
    [
      "meta",
      { name: "theme-color", media: "(prefers-color-scheme: dark)", content: "#14120f" },
    ],
  ],

  bundler: viteBundler({}),
});
