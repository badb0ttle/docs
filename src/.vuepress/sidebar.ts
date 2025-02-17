import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "/",
    {
      text: "前后端",
      icon: "laptop-code",
      prefix: "FEDev/",
      link: "FEDev/",
      collapsible: true,
      children:["git.md","layout.md","markdown.md","page.md","shell.md","Vue.md"]
    },
    {
      text: "算法",
      icon: "book",
      prefix: "Algorithm/",
      link: "Algorithm/",
      collapsible: true,
      "children": [
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
      text: "Qt",
      icon: "book",
      prefix: "Qt/",
      link: "Qt/",
    },
  ],
});
