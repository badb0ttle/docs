import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  "/demo/",
  {
    text: "Algorithm",
    icon: "pen-to-square",
    prefix: "/posts/",
    children: [
      {
        text: "Core",
        icon: "pen-to-square",
        prefix: "apple/",
        children: [
          { text: "Main Topics", icon: "pen-to-square", link: "1" },
          {text: "Mini Topics", icon: "pen-to-square", link: "2"},
          // { text: "苹果2", icon: "pen-to-square", link: "2" },
          // "3",
          // "4",
        ],
      },
      {
        text: "Templates",
        icon: "pen-to-square",
        prefix: "banana/",
        children: [
          {
            text: "Algorithm Snippets",
            icon: "pen-to-square",
            link: "1",
          },
          // {
          //   text: "香蕉 2",
          //   icon: "pen-to-square",
          //   link: "2",
          // },
          // "3",
          // "4",
        ],
      },
      // { text: "樱桃", icon: "pen-to-square", link: "cherry" },
      // { text: "火龙果", icon: "pen-to-square", link: "dragonfruit" },
      // "tomato",
      // "strawberry",
    ],
  },
  // {
  //   text: "V2 文档",
  //   icon: "book",
  //   link: "https://theme-hope.vuejs.press/zh/",
  // },
]);
