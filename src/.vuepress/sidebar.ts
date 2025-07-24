import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "/",
    {
      text: "前端",
      icon: "laptop-code",
      prefix: "Front/",
      link: "Front/",
      collapsible: true,
      children:["layout.md","markdown.md","page.md","Vue.md"]
    },
    {
      text: "算法",
      icon: "book",
      prefix: "Algorithm/",
      link: "Algorithm/",
      collapsible: true,
      children: [
        "C.md",
        "Disc&FT.md",
        "DP:L&I&T.md",
        "GA.md",
        "K-DP.md",
        "LIS.md",
        "SA.md",
        "string.md",]
    },
    {
      text: "后端",
      icon: "book",
      prefix: "Back/",
      link: "Back/",
    },
    {
      text: "Linux操作系统",
      icon: "book",
      prefix: "Linux/",
      link: "Linux/",
      children: ["shell.md"]
    },
    {
      text: "其他",
      icon: "book",
      prefix: "Other/",
      link: "Other/",
      children: ["git.md"]
    },
  ],
});
