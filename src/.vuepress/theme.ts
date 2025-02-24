import { hopeTheme } from "vuepress-theme-hope";

import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
  hostname: "https://mister-hope.github.io",

  author: {
    name: "ℬ𝒶𝒹𝒷0𝓉𝓉𝓁ℯ",
    url: "https://mister-hope.com",
  },

  logo: "/gogo.gif",
  repo: "vuepress-theme-hope/vuepress-theme-hope",
  docsDir: "src",
  navbar,
  sidebar,
  footer: "hehehe",
  displayFooter: true,

  encrypt: {
    config: {
      "/M/": {
        password: ["114514", "221"],
        hint: "後藤ひとり",
      },
    },
  },

  blog: {
    description: "Blnk is infinite",
    intro: "https://github.com/badb0ttle",
    timeline: "更新日志",
    medias: {
      GitHub: "https://github.com/badb0ttle",
      Steam: "https://steamcommunity.com/profiles/76561198406594357",
    },
  },

  markdown: {
    math: {
      type: "katex",
    },
    tasklist: true,
    component: true,
    vPre: true,
    include: true,
    align: true,
    attrs: true,
    mark: true,
    spoiler: true,
    sup: true,
    sub: true,
    stylize: [
      {
        matcher: "Recommended",
        replacer: ({ tag }) => {
          if (tag === "em")
            return {
              tag: "Badge",
              attrs: { type: "tip" },
              content: "Recommended",
            };
        },
      },
    ],
    plantuml: true,
    demo: true,
    tabs: true,
    codeTabs: true,
  },

  plugins: {
    blog: true,
    icon: {
      assets: "fontawesome",
    },
    slimsearch: {
      indexContent: true,
      suggestion: true,
      customFields: [
        {
          getter: (page) => page.frontmatter.title,
          formatter: '标题：$content',
        },
      ],
    },
    comment: {
      provider: "Giscus",
      repo: "badb0ttle/docs",
      repoId: "R_kgDONKD9gg",
      category: "Announcements",
      categoryId: "DIC_kwDONKD9gs4CnRBz",
    },
    components: {
      components: ["Badge", "VPCard", "VidStack"],
    },
  },
}, { custom: true });