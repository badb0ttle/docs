import { navbar } from "vuepress-theme-hope";

export default navbar([
  { text: "首页", link: "/", icon: "house" },  // fa-solid fa-house
  { text: "前端", link: "/Front/", icon: "code" },  // fa-solid fa-code
  { text: "算法", link: "/Algorithm/", icon: "calculator" },  // fa-solid fa-calculator
  { text: "后端", link: "/Back/", icon: "server" },  // fa-solid fa-server
  { text: "Linux", link: "/Linux/", icon: "terminal" },  // fa-brands fa-linux
  { text: "其他", link: "/Other/", icon: "ellipsis" }, 
  // {
  //   text: "Algorithm",
  //   icon: "/assets/icon/home.ico", 
  //   prefix: "/posts/",
  //   children: [
  //     {
  //       text: "Core",
  //       icon: "pen-to-square",
  //       prefix: "apple/",
  //       children: [
  //         { text: "Main Topics", icon: "pen-to-square", link: "1" },
  //         {text: "Mini Topics", icon: "pen-to-square", link: "2"},
  //         // { text: "苹果2", icon: "pen-to-square", link: "2" },
  //         // "3",
  //         // "4",
  //       ],
  //     },
  //     {
  //       text: "Templates",
  //       icon: "pen-to-square",
  //       prefix: "banana/",
  //       children: [
  //         {
  //           text: "Algorithm Snippets",
  //           icon: "pen-to-square",
  //           link: "1",
  //         },
  //         // {
  //         //   text: "香蕉 2",
  //         //   icon: "pen-to-square",
  //         //   link: "2",
  //         // },
  //         // "3",
  //         // "4",
  //       ],
  //     },
  //     // { text: "樱桃", icon: "pen-to-square", link: "cherry" },
  //     // { text: "火龙果", icon: "pen-to-square", link: "dragonfruit" },
  //     // "tomato",
  //     // "strawberry",
  //   ],
  // },
  // {
  //   text: "CodeCraft Chronicles",
  //   icon: "/assets/icon/home.ico", 
  //   prefix: "/posts/",
  //   children: [
  //     {
  //       text: "Vue",
  //       icon: "pen-to-square",
  //       prefix: "apple/",
  //       children: [
  //         { text: "Vue Visions", icon: "pen-to-square", link: "1" },
  //         {text: "Shell Scripts", icon: "pen-to-square", link: "2"},
  //         { text: "Git Grooves", icon: "pen-to-square", link: "3" },
  //         { text: "Markdown Magic", icon: "pen-to-square", link: "4" },
  //         // "3",
  //         // "4",
  //       ],
  //     },
  //     // { text: "樱桃", icon: "pen-to-square", link: "cherry" },
  //     // { text: "火龙果", icon: "pen-to-square", link: "dragonfruit" },
  //     // "tomato",
  //     // "strawberry",
  //   ],
  // },
  // {
  //   text: "V2 文档",
  //   icon: "book",
  //   link: "https://theme-hope.vuejs.press/zh/",
  // },
]);
