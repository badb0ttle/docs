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
      children:["layout.md","page.md","Vue.md"]
    },
    {
      text: "算法",
      icon: "calculator",
      prefix: "Algorithm/",
      link: "Algorithm/",
      collapsible: true,
      children: [
        "BG.md",
        "C.md",
        "Disc&FT.md",
        "DP:L&I&T.md",
        "DSU.md",
        "ExGcd.md",
        "GA.md",
        "HLD.md",
        "HM.md",
        "K-DP.md",
        "LCA.md",
        "LIS.md",
        "Manacher.md",
        "mod.md",
        "MST.md",
        "Pr_queue.md",
        "SA.md",
        "SDC.md",
        "SegTree.md",
        "SP.md",
        "ST.md",
        "StressTest.md",
        "string.md"
      ]
    },
    {
      text: "后端",
      icon: "server",
      prefix: "Back/",
      link: "Back/",
      collapsible: true,
      children: [
        "SpringBoot.md",
        "MyBatis-Plus.md",
        "cq.md"
      ]
    },
    {
      text: "Linux操作系统",
      icon: "terminal",
      prefix: "Linux/",
      link: "Linux/",
      collapsible: true,
      children: ["FixIssue.md", "hbase.md", "nmcli.md", "shell.md", "vim.md"]
    },
    {
      text: "其他",
      icon: "ellipsis",
      prefix: "Other/",
      link: "Other/",
      collapsible: true,
      children: ["docker.md", "git.md", "markdown.md", "qt.md", "redis.md"]
    },
  ],
});
