import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "/",
    {
      text: "如何使用",
      icon: "laptop-code",
      prefix: "FEDev/",
      link: "FEDev/",
    },
    {
      text: "算法",
      icon: "book",
      prefix: "Algorithm/",
      link: "Algorithm/",
    },
    {
      text: "板子",
      icon: "book",
      prefix: "Templates/",
      link: "Templates/",
    },
  ],
});
