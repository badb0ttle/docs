import { navbar } from "vuepress-theme-hope";

export default navbar([
  { text: "首页", link: "/", icon: "house" }, 
  { text: "前端", link: "/Front/", icon: "code" }, 
  { text: "算法", link: "/Algorithm/", icon: "calculator" },
  { text: "后端", link: "/Back/", icon: "server" },  
  { text: "Linux", link: "/Linux/", icon: "terminal" },
  { text: "其他", link: "/Other/", icon: "ellipsis" }, 
  {text:"更新日志",link:"/timeline/",icon:"history"},
  {text:"???",link:"/M/",icon:"question"},
]);
