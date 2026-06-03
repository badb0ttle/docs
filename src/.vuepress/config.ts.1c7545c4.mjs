// src/.vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { viteBundler } from "@vuepress/bundler-vite";
import { getDirname } from "vuepress/utils";

// src/.vuepress/theme.ts
import { hopeTheme } from "vuepress-theme-hope";

// src/.vuepress/navbar.ts
import { navbar } from "vuepress-theme-hope";
var navbar_default = navbar([
  { text: "\u9996\u9875", link: "/", icon: "house" },
  { text: "\u7B97\u6CD5", link: "/Algorithm/", icon: "calculator" },
  { text: "\u540E\u7AEF", link: "/Backend/", icon: "server" },
  { text: "\u524D\u7AEF", link: "/Frontend/", icon: "code" },
  { text: "\u6570\u636E\u5E93", link: "/Database/", icon: "database" },
  { text: "\u8FD0\u7EF4", link: "/DevOps/", icon: "linux" },
  { text: "\u8BED\u8A00", link: "/Languages/", icon: "code" },
  { text: "\u5DE5\u5177", link: "/Tools/", icon: "tools" },
  { text: "AI", link: "/AI/", icon: "robot" },
  { text: "Linux", link: "/Linux/", icon: "terminal" },
  { text: "\u66F4\u65B0\u65E5\u5FD7", link: "/timeline/", icon: "history" },
  { text: "???", link: "/M/", icon: "question" }
]);

// src/.vuepress/sidebar.ts
import { sidebar } from "vuepress-theme-hope";
var sidebar_default = sidebar({
  "/": [
    "",
    {
      text: "\u7B97\u6CD5",
      icon: "calculator",
      prefix: "Algorithm/",
      link: "Algorithm/",
      collapsible: true,
      children: "structure"
    },
    {
      text: "\u540E\u7AEF",
      icon: "server",
      prefix: "Backend/",
      link: "Backend/",
      collapsible: true,
      children: "structure"
    },
    {
      text: "\u524D\u7AEF",
      icon: "laptop-code",
      prefix: "Frontend/",
      link: "Frontend/",
      collapsible: true,
      children: "structure"
    },
    {
      text: "\u6570\u636E\u5E93",
      icon: "database",
      prefix: "Database/",
      link: "Database/",
      collapsible: true,
      children: "structure"
    },
    {
      text: "\u8FD0\u7EF4 & \u90E8\u7F72",
      icon: "linux",
      prefix: "DevOps/",
      link: "DevOps/",
      collapsible: true,
      children: "structure"
    },
    {
      text: "Linux",
      icon: "terminal",
      prefix: "Linux/",
      link: "Linux/",
      collapsible: true,
      children: "structure"
    },
    {
      text: "\u7F16\u7A0B\u8BED\u8A00",
      icon: "code",
      prefix: "Languages/",
      link: "Languages/",
      collapsible: true,
      children: "structure"
    },
    {
      text: "AI",
      icon: "robot",
      prefix: "AI/",
      link: "AI/",
      collapsible: true,
      children: "structure"
    },
    {
      text: "\u5DE5\u5177",
      icon: "tools",
      prefix: "Tools/",
      link: "Tools/",
      collapsible: true,
      children: "structure"
    }
  ]
});

// src/.vuepress/theme.ts
var theme_default = hopeTheme({
  hostname: "https://badb0ttle.github.io",
  darkmode: "auto",
  author: {
    name: "\u212C\u{1D4B6}\u{1D4B9}\u{1D4B7}0\u{1D4C9}\u{1D4C9}\u{1D4C1}\u212F",
    url: "https://github.com/badb0ttle"
  },
  fullscreen: true,
  logo: "/gogo.gif",
  repo: "badb0ttle/docs",
  docsDir: "src",
  lastUpdated: false,
  contributors: false,
  navbar: navbar_default,
  sidebar: sidebar_default,
  footer: "hehehe",
  displayFooter: true,
  encrypt: {
    config: {
      "/M/": {
        password: ["114514", "221"],
        hint: "\u5F8C\u85E4\u3072\u3068\u308A"
      }
    }
  },
  blog: {
    description: "Blnk is infinite",
    intro: "https://github.com/badb0ttle",
    timeline: "\u66F4\u65B0\u65E5\u5FD7",
    medias: {
      GitHub: "https://github.com/badb0ttle",
      Steam: "https://steamcommunity.com/profiles/76561198406594357",
      Bilibili: "https://space.bilibili.com/187724779"
    },
    articleInfo: ["Author", "Original", "Date", "PageView", "Category", "Tag", "ReadingTime"]
  },
  markdown: {
    math: {
      type: "katex"
    },
    tasklist: true,
    imgLazyload: true,
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
              content: "Recommended"
            };
        }
      }
    ],
    plantuml: true,
    demo: true,
    tabs: true,
    codeTabs: true
  },
  plugins: {
    blog: true,
    icon: {
      assets: "fontawesome"
    },
    slimsearch: {
      indexContent: true,
      suggestion: true,
      worker: "slimsearch.worker.v2.js",
      customFields: [
        {
          getter: (page) => page.frontmatter.title,
          formatter: "\u6807\u9898\uFF1A$content"
        }
      ]
    },
    comment: {
      provider: "Giscus",
      repo: "badb0ttle/docs",
      repoId: "R_kgDONKD9gg",
      category: "Announcements",
      categoryId: "DIC_kwDONKD9gs4CnRBz"
    },
    components: {
      components: ["Badge", "VPCard", "VidStack"]
    }
  }
}, { custom: true });

// src/.vuepress/config.ts
var __vite_injected_original_import_meta_url = "file:///Users/mac/Desktop/Blog/docs/src/.vuepress/config.ts";
var __dirname = getDirname(__vite_injected_original_import_meta_url);
var config_default = defineUserConfig({
  base: "/",
  lang: "zh-CN",
  title: "Badbottle's blog",
  description: "Blnk is infinite.",
  shouldPrefetch: false,
  theme: theme_default,
  // 配置 favicon.ico 路径
  head: [
    //     // <link rel="preconnect" href="https://fonts.googleapis.com">
    // <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    // <link href="https://fonts.googleapis.com/css2?family=Limelight&display=swap" rel="stylesheet">
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    [
      "link",
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" }
    ],
    [
      "link",
      {
        href: "https://fonts.googleapis.com/css2?family=Funnel+Display:wght@300..800&family=Limelight&display=swap",
        rel: "stylesheet"
      }
    ],
    ["link", { rel: "icon", href: "assets/icon/logo.ico" }]
  ],
  // 和 PWA 一起启用
  // shouldPrefetch: false,
  bundler: viteBundler({})
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjLy52dWVwcmVzcy9jb25maWcudHMiLCAic3JjLy52dWVwcmVzcy90aGVtZS50cyIsICJzcmMvLnZ1ZXByZXNzL25hdmJhci50cyIsICJzcmMvLnZ1ZXByZXNzL3NpZGViYXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbWFjL0Rlc2t0b3AvQmxvZy9kb2NzL3NyYy8udnVlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9tYWMvRGVza3RvcC9CbG9nL2RvY3Mvc3JjLy52dWVwcmVzcy9jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL21hYy9EZXNrdG9wL0Jsb2cvZG9jcy9zcmMvLnZ1ZXByZXNzL2NvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZVVzZXJDb25maWcgfSBmcm9tIFwidnVlcHJlc3NcIjtcbmltcG9ydCB7IHZpdGVCdW5kbGVyIH0gZnJvbSBcIkB2dWVwcmVzcy9idW5kbGVyLXZpdGVcIjtcbmltcG9ydCB7IGdldERpcm5hbWUgfSBmcm9tIFwidnVlcHJlc3MvdXRpbHNcIjtcbmltcG9ydCB0aGVtZSBmcm9tIFwiLi90aGVtZS5qc1wiO1xuXG5jb25zdCBfX2Rpcm5hbWUgPSBnZXREaXJuYW1lKGltcG9ydC5tZXRhLnVybCk7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZVVzZXJDb25maWcoe1xuICBiYXNlOiBcIi9cIixcbiAgbGFuZzogXCJ6aC1DTlwiLFxuICB0aXRsZTogXCJCYWRib3R0bGUncyBibG9nXCIsXG4gIGRlc2NyaXB0aW9uOiBcIkJsbmsgaXMgaW5maW5pdGUuXCIsXG4gIHNob3VsZFByZWZldGNoOiBmYWxzZSxcblxuICB0aGVtZSxcblxuICAvLyBcdTkxNERcdTdGNkUgZmF2aWNvbi5pY28gXHU4REVGXHU1Rjg0XG4gIGhlYWQ6IFtcbiAgICAvLyAgICAgLy8gPGxpbmsgcmVsPVwicHJlY29ubmVjdFwiIGhyZWY9XCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tXCI+XG4gICAgLy8gPGxpbmsgcmVsPVwicHJlY29ubmVjdFwiIGhyZWY9XCJodHRwczovL2ZvbnRzLmdzdGF0aWMuY29tXCIgY3Jvc3NvcmlnaW4+XG4gICAgLy8gPGxpbmsgaHJlZj1cImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9TGltZWxpZ2h0JmRpc3BsYXk9c3dhcFwiIHJlbD1cInN0eWxlc2hlZXRcIj5cbiAgICBbXCJsaW5rXCIsIHsgcmVsOiBcInByZWNvbm5lY3RcIiwgaHJlZjogXCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tXCIgfV0sXG4gICAgW1xuICAgICAgXCJsaW5rXCIsXG4gICAgICB7IHJlbDogXCJwcmVjb25uZWN0XCIsIGhyZWY6IFwiaHR0cHM6Ly9mb250cy5nc3RhdGljLmNvbVwiLCBjcm9zc29yaWdpbjogXCJcIiB9LFxuICAgIF0sXG4gICAgW1xuICAgICAgXCJsaW5rXCIsXG4gICAgICB7XG4gICAgICAgIGhyZWY6IFwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1GdW5uZWwrRGlzcGxheTp3Z2h0QDMwMC4uODAwJmZhbWlseT1MaW1lbGlnaHQmZGlzcGxheT1zd2FwXCIsXG4gICAgICAgIHJlbDogXCJzdHlsZXNoZWV0XCIsXG4gICAgICB9LFxuICAgIF0sXG4gICAgWydsaW5rJywgeyByZWw6ICdpY29uJywgaHJlZjogJ2Fzc2V0cy9pY29uL2xvZ28uaWNvJyB9XVxuICBdLFxuXG5cbiAgLy8gXHU1NDhDIFBXQSBcdTRFMDBcdThENzdcdTU0MkZcdTc1MjhcbiAgLy8gc2hvdWxkUHJlZmV0Y2g6IGZhbHNlLFxuXG4gIGJ1bmRsZXI6IHZpdGVCdW5kbGVyKHt9KSxcbn0pO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbWFjL0Rlc2t0b3AvQmxvZy9kb2NzL3NyYy8udnVlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9tYWMvRGVza3RvcC9CbG9nL2RvY3Mvc3JjLy52dWVwcmVzcy90aGVtZS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvbWFjL0Rlc2t0b3AvQmxvZy9kb2NzL3NyYy8udnVlcHJlc3MvdGhlbWUudHNcIjtpbXBvcnQgeyBob3BlVGhlbWUgfSBmcm9tIFwidnVlcHJlc3MtdGhlbWUtaG9wZVwiO1xuXG5pbXBvcnQgbmF2YmFyIGZyb20gXCIuL25hdmJhci5qc1wiO1xuaW1wb3J0IHNpZGViYXIgZnJvbSBcIi4vc2lkZWJhci5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBob3BlVGhlbWUoe1xuICBob3N0bmFtZTogXCJodHRwczovL2JhZGIwdHRsZS5naXRodWIuaW9cIixcbiAgZGFya21vZGU6XCJhdXRvXCIsXG4gIGF1dGhvcjoge1xuICAgIG5hbWU6IFwiXHUyMTJDXHVEODM1XHVEQ0I2XHVEODM1XHVEQ0I5XHVEODM1XHVEQ0I3MFx1RDgzNVx1RENDOVx1RDgzNVx1RENDOVx1RDgzNVx1RENDMVx1MjEyRlwiLFxuICAgIHVybDogXCJodHRwczovL2dpdGh1Yi5jb20vYmFkYjB0dGxlXCIsXG4gIH0sXG4gIGZ1bGxzY3JlZW46IHRydWUsXG4gIGxvZ286IFwiL2dvZ28uZ2lmXCIsXG4gIHJlcG86IFwiYmFkYjB0dGxlL2RvY3NcIixcbiAgZG9jc0RpcjogXCJzcmNcIixcbiAgbGFzdFVwZGF0ZWQ6IGZhbHNlLFxuICBjb250cmlidXRvcnM6IGZhbHNlLFxuICBuYXZiYXIsXG4gIHNpZGViYXIsXG4gIGZvb3RlcjogXCJoZWhlaGVcIixcbiAgZGlzcGxheUZvb3RlcjogdHJ1ZSxcbiAgZW5jcnlwdDoge1xuICAgIGNvbmZpZzoge1xuICAgICAgXCIvTS9cIjoge1xuICAgICAgICBwYXNzd29yZDogW1wiMTE0NTE0XCIsIFwiMjIxXCJdLFxuICAgICAgICBoaW50OiBcIlx1NUY4Q1x1ODVFNFx1MzA3Mlx1MzA2OFx1MzA4QVwiLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuXG4gIGJsb2c6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJCbG5rIGlzIGluZmluaXRlXCIsXG4gICAgaW50cm86IFwiaHR0cHM6Ly9naXRodWIuY29tL2JhZGIwdHRsZVwiLFxuICAgIHRpbWVsaW5lOiBcIlx1NjZGNFx1NjVCMFx1NjVFNVx1NUZEN1wiLFxuICAgIG1lZGlhczoge1xuICAgICAgR2l0SHViOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9iYWRiMHR0bGVcIixcbiAgICAgIFN0ZWFtOiBcImh0dHBzOi8vc3RlYW1jb21tdW5pdHkuY29tL3Byb2ZpbGVzLzc2NTYxMTk4NDA2NTk0MzU3XCIsXG4gICAgICBCaWxpYmlsaTpcImh0dHBzOi8vc3BhY2UuYmlsaWJpbGkuY29tLzE4NzcyNDc3OVwiLFxuICAgIH0sXG4gICAgYXJ0aWNsZUluZm86W1wiQXV0aG9yXCIsIFwiT3JpZ2luYWxcIiwgXCJEYXRlXCIsIFwiUGFnZVZpZXdcIiwgXCJDYXRlZ29yeVwiLCBcIlRhZ1wiLCBcIlJlYWRpbmdUaW1lXCJdLFxuICB9LFxuICBtYXJrZG93bjoge1xuICAgIG1hdGg6IHtcbiAgICAgIHR5cGU6IFwia2F0ZXhcIixcbiAgICB9LFxuICAgIHRhc2tsaXN0OiB0cnVlLFxuICAgIGltZ0xhenlsb2FkOiB0cnVlLFxuICAgIGNvbXBvbmVudDogdHJ1ZSxcbiAgICB2UHJlOiB0cnVlLFxuICAgIGluY2x1ZGU6IHRydWUsXG4gICAgYWxpZ246IHRydWUsXG4gICAgYXR0cnM6IHRydWUsXG4gICAgbWFyazogdHJ1ZSxcbiAgICBzcG9pbGVyOiB0cnVlLFxuICAgIHN1cDogdHJ1ZSxcbiAgICBzdWI6IHRydWUsXG4gICAgc3R5bGl6ZTogW1xuICAgICAge1xuICAgICAgICBtYXRjaGVyOiBcIlJlY29tbWVuZGVkXCIsXG4gICAgICAgIHJlcGxhY2VyOiAoeyB0YWcgfSkgPT4ge1xuICAgICAgICAgIGlmICh0YWcgPT09IFwiZW1cIilcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHRhZzogXCJCYWRnZVwiLFxuICAgICAgICAgICAgICBhdHRyczogeyB0eXBlOiBcInRpcFwiIH0sXG4gICAgICAgICAgICAgIGNvbnRlbnQ6IFwiUmVjb21tZW5kZWRcIixcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIF0sXG4gICAgcGxhbnR1bWw6IHRydWUsXG4gICAgZGVtbzogdHJ1ZSxcbiAgICB0YWJzOiB0cnVlLFxuICAgIGNvZGVUYWJzOiB0cnVlLFxuICB9LFxuXG4gIHBsdWdpbnM6IHtcbiAgICBibG9nOiB0cnVlLFxuICAgIGljb246IHtcbiAgICAgIGFzc2V0czogXCJmb250YXdlc29tZVwiLFxuICAgIH0sXG4gICAgc2xpbXNlYXJjaDoge1xuICAgICAgaW5kZXhDb250ZW50OiB0cnVlLFxuICAgICAgc3VnZ2VzdGlvbjogdHJ1ZSxcbiAgICAgIHdvcmtlcjogXCJzbGltc2VhcmNoLndvcmtlci52Mi5qc1wiLFxuICAgICAgY3VzdG9tRmllbGRzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBnZXR0ZXI6IChwYWdlKSA9PiBwYWdlLmZyb250bWF0dGVyLnRpdGxlLFxuICAgICAgICAgIGZvcm1hdHRlcjogJ1x1NjgwN1x1OTg5OFx1RkYxQSRjb250ZW50JyxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICBjb21tZW50OiB7XG4gICAgICBwcm92aWRlcjogXCJHaXNjdXNcIixcbiAgICAgIHJlcG86IFwiYmFkYjB0dGxlL2RvY3NcIixcbiAgICAgIHJlcG9JZDogXCJSX2tnRE9OS0Q5Z2dcIixcbiAgICAgIGNhdGVnb3J5OiBcIkFubm91bmNlbWVudHNcIixcbiAgICAgIGNhdGVnb3J5SWQ6IFwiRElDX2t3RE9OS0Q5Z3M0Q25SQnpcIixcbiAgICB9LFxuICAgIGNvbXBvbmVudHM6IHtcbiAgICAgIGNvbXBvbmVudHM6IFtcIkJhZGdlXCIsIFwiVlBDYXJkXCIsIFwiVmlkU3RhY2tcIl0sXG4gICAgfSxcbiAgfSxcbn0sIHsgY3VzdG9tOiB0cnVlIH0pO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbWFjL0Rlc2t0b3AvQmxvZy9kb2NzL3NyYy8udnVlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9tYWMvRGVza3RvcC9CbG9nL2RvY3Mvc3JjLy52dWVwcmVzcy9uYXZiYXIudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL21hYy9EZXNrdG9wL0Jsb2cvZG9jcy9zcmMvLnZ1ZXByZXNzL25hdmJhci50c1wiO2ltcG9ydCB7IG5hdmJhciB9IGZyb20gXCJ2dWVwcmVzcy10aGVtZS1ob3BlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IG5hdmJhcihbXG4gIHsgdGV4dDogXCJcdTk5OTZcdTk4NzVcIiwgbGluazogXCIvXCIsIGljb246IFwiaG91c2VcIiB9LCBcbiAgeyB0ZXh0OiBcIlx1N0I5N1x1NkNENVwiLCBsaW5rOiBcIi9BbGdvcml0aG0vXCIsIGljb246IFwiY2FsY3VsYXRvclwiIH0sXG4gIHsgdGV4dDogXCJcdTU0MEVcdTdBRUZcIiwgbGluazogXCIvQmFja2VuZC9cIiwgaWNvbjogXCJzZXJ2ZXJcIiB9LCAgXG4gIHsgdGV4dDogXCJcdTUyNERcdTdBRUZcIiwgbGluazogXCIvRnJvbnRlbmQvXCIsIGljb246IFwiY29kZVwiIH0sIFxuICB7IHRleHQ6IFwiXHU2NTcwXHU2MzZFXHU1RTkzXCIsIGxpbms6IFwiL0RhdGFiYXNlL1wiLCBpY29uOiBcImRhdGFiYXNlXCIgfSxcbiAgeyB0ZXh0OiBcIlx1OEZEMFx1N0VGNFwiLCBsaW5rOiBcIi9EZXZPcHMvXCIsIGljb246IFwibGludXhcIiB9LFxuICB7IHRleHQ6IFwiXHU4QkVEXHU4QTAwXCIsIGxpbms6IFwiL0xhbmd1YWdlcy9cIiwgaWNvbjogXCJjb2RlXCIgfSxcbiAgeyB0ZXh0OiBcIlx1NURFNVx1NTE3N1wiLCBsaW5rOiBcIi9Ub29scy9cIiwgaWNvbjogXCJ0b29sc1wiIH0sXG4gIHsgdGV4dDogXCJBSVwiLCBsaW5rOiBcIi9BSS9cIiwgaWNvbjogXCJyb2JvdFwiIH0sXG4gIHsgdGV4dDogXCJMaW51eFwiLCBsaW5rOiBcIi9MaW51eC9cIiwgaWNvbjogXCJ0ZXJtaW5hbFwiIH0sXG4gIHsgdGV4dDogXCJcdTY2RjRcdTY1QjBcdTY1RTVcdTVGRDdcIiwgbGluazogXCIvdGltZWxpbmUvXCIsIGljb246IFwiaGlzdG9yeVwiIH0sXG4gIHsgdGV4dDogXCI/Pz9cIiwgbGluazogXCIvTS9cIiwgaWNvbjogXCJxdWVzdGlvblwiIH0sXG5dKTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL21hYy9EZXNrdG9wL0Jsb2cvZG9jcy9zcmMvLnZ1ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvbWFjL0Rlc2t0b3AvQmxvZy9kb2NzL3NyYy8udnVlcHJlc3Mvc2lkZWJhci50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvbWFjL0Rlc2t0b3AvQmxvZy9kb2NzL3NyYy8udnVlcHJlc3Mvc2lkZWJhci50c1wiO2ltcG9ydCB7IHNpZGViYXIgfSBmcm9tIFwidnVlcHJlc3MtdGhlbWUtaG9wZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBzaWRlYmFyKHtcbiAgXCIvXCI6IFtcbiAgICBcIlwiLFxuICAgIHtcbiAgICAgIHRleHQ6IFwiXHU3Qjk3XHU2Q0Q1XCIsXG4gICAgICBpY29uOiBcImNhbGN1bGF0b3JcIixcbiAgICAgIHByZWZpeDogXCJBbGdvcml0aG0vXCIsXG4gICAgICBsaW5rOiBcIkFsZ29yaXRobS9cIixcbiAgICAgIGNvbGxhcHNpYmxlOiB0cnVlLFxuICAgICAgY2hpbGRyZW46IFwic3RydWN0dXJlXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB0ZXh0OiBcIlx1NTQwRVx1N0FFRlwiLFxuICAgICAgaWNvbjogXCJzZXJ2ZXJcIixcbiAgICAgIHByZWZpeDogXCJCYWNrZW5kL1wiLFxuICAgICAgbGluazogXCJCYWNrZW5kL1wiLFxuICAgICAgY29sbGFwc2libGU6IHRydWUsXG4gICAgICBjaGlsZHJlbjogXCJzdHJ1Y3R1cmVcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHRleHQ6IFwiXHU1MjREXHU3QUVGXCIsXG4gICAgICBpY29uOiBcImxhcHRvcC1jb2RlXCIsXG4gICAgICBwcmVmaXg6IFwiRnJvbnRlbmQvXCIsXG4gICAgICBsaW5rOiBcIkZyb250ZW5kL1wiLFxuICAgICAgY29sbGFwc2libGU6IHRydWUsXG4gICAgICBjaGlsZHJlbjogXCJzdHJ1Y3R1cmVcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHRleHQ6IFwiXHU2NTcwXHU2MzZFXHU1RTkzXCIsXG4gICAgICBpY29uOiBcImRhdGFiYXNlXCIsXG4gICAgICBwcmVmaXg6IFwiRGF0YWJhc2UvXCIsXG4gICAgICBsaW5rOiBcIkRhdGFiYXNlL1wiLFxuICAgICAgY29sbGFwc2libGU6IHRydWUsXG4gICAgICBjaGlsZHJlbjogXCJzdHJ1Y3R1cmVcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHRleHQ6IFwiXHU4RkQwXHU3RUY0ICYgXHU5MEU4XHU3RjcyXCIsXG4gICAgICBpY29uOiBcImxpbnV4XCIsXG4gICAgICBwcmVmaXg6IFwiRGV2T3BzL1wiLFxuICAgICAgbGluazogXCJEZXZPcHMvXCIsXG4gICAgICBjb2xsYXBzaWJsZTogdHJ1ZSxcbiAgICAgIGNoaWxkcmVuOiBcInN0cnVjdHVyZVwiLFxuICAgIH0sXG4gICAge1xuICAgICAgdGV4dDogXCJMaW51eFwiLFxuICAgICAgaWNvbjogXCJ0ZXJtaW5hbFwiLFxuICAgICAgcHJlZml4OiBcIkxpbnV4L1wiLFxuICAgICAgbGluazogXCJMaW51eC9cIixcbiAgICAgIGNvbGxhcHNpYmxlOiB0cnVlLFxuICAgICAgY2hpbGRyZW46IFwic3RydWN0dXJlXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB0ZXh0OiBcIlx1N0YxNlx1N0EwQlx1OEJFRFx1OEEwMFwiLFxuICAgICAgaWNvbjogXCJjb2RlXCIsXG4gICAgICBwcmVmaXg6IFwiTGFuZ3VhZ2VzL1wiLFxuICAgICAgbGluazogXCJMYW5ndWFnZXMvXCIsXG4gICAgICBjb2xsYXBzaWJsZTogdHJ1ZSxcbiAgICAgIGNoaWxkcmVuOiBcInN0cnVjdHVyZVwiLFxuICAgIH0sXG4gICAge1xuICAgICAgdGV4dDogXCJBSVwiLFxuICAgICAgaWNvbjogXCJyb2JvdFwiLFxuICAgICAgcHJlZml4OiBcIkFJL1wiLFxuICAgICAgbGluazogXCJBSS9cIixcbiAgICAgIGNvbGxhcHNpYmxlOiB0cnVlLFxuICAgICAgY2hpbGRyZW46IFwic3RydWN0dXJlXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB0ZXh0OiBcIlx1NURFNVx1NTE3N1wiLFxuICAgICAgaWNvbjogXCJ0b29sc1wiLFxuICAgICAgcHJlZml4OiBcIlRvb2xzL1wiLFxuICAgICAgbGluazogXCJUb29scy9cIixcbiAgICAgIGNvbGxhcHNpYmxlOiB0cnVlLFxuICAgICAgY2hpbGRyZW46IFwic3RydWN0dXJlXCIsXG4gICAgfSxcbiAgXSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFzUyxTQUFTLHdCQUF3QjtBQUN2VSxTQUFTLG1CQUFtQjtBQUM1QixTQUFTLGtCQUFrQjs7O0FDRnlRLFNBQVMsaUJBQWlCOzs7QUNBeEIsU0FBUyxjQUFjO0FBRTdULElBQU8saUJBQVEsT0FBTztBQUFBLEVBQ3BCLEVBQUUsTUFBTSxnQkFBTSxNQUFNLEtBQUssTUFBTSxRQUFRO0FBQUEsRUFDdkMsRUFBRSxNQUFNLGdCQUFNLE1BQU0sZUFBZSxNQUFNLGFBQWE7QUFBQSxFQUN0RCxFQUFFLE1BQU0sZ0JBQU0sTUFBTSxhQUFhLE1BQU0sU0FBUztBQUFBLEVBQ2hELEVBQUUsTUFBTSxnQkFBTSxNQUFNLGNBQWMsTUFBTSxPQUFPO0FBQUEsRUFDL0MsRUFBRSxNQUFNLHNCQUFPLE1BQU0sY0FBYyxNQUFNLFdBQVc7QUFBQSxFQUNwRCxFQUFFLE1BQU0sZ0JBQU0sTUFBTSxZQUFZLE1BQU0sUUFBUTtBQUFBLEVBQzlDLEVBQUUsTUFBTSxnQkFBTSxNQUFNLGVBQWUsTUFBTSxPQUFPO0FBQUEsRUFDaEQsRUFBRSxNQUFNLGdCQUFNLE1BQU0sV0FBVyxNQUFNLFFBQVE7QUFBQSxFQUM3QyxFQUFFLE1BQU0sTUFBTSxNQUFNLFFBQVEsTUFBTSxRQUFRO0FBQUEsRUFDMUMsRUFBRSxNQUFNLFNBQVMsTUFBTSxXQUFXLE1BQU0sV0FBVztBQUFBLEVBQ25ELEVBQUUsTUFBTSw0QkFBUSxNQUFNLGNBQWMsTUFBTSxVQUFVO0FBQUEsRUFDcEQsRUFBRSxNQUFNLE9BQU8sTUFBTSxPQUFPLE1BQU0sV0FBVztBQUMvQyxDQUFDOzs7QUNmdVMsU0FBUyxlQUFlO0FBRWhVLElBQU8sa0JBQVEsUUFBUTtBQUFBLEVBQ3JCLEtBQUs7QUFBQSxJQUNIO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sUUFBUTtBQUFBLE1BQ1IsTUFBTTtBQUFBLE1BQ04sYUFBYTtBQUFBLE1BQ2IsVUFBVTtBQUFBLElBQ1o7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixRQUFRO0FBQUEsTUFDUixNQUFNO0FBQUEsTUFDTixhQUFhO0FBQUEsTUFDYixVQUFVO0FBQUEsSUFDWjtBQUFBLElBQ0E7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLFFBQVE7QUFBQSxNQUNSLE1BQU07QUFBQSxNQUNOLGFBQWE7QUFBQSxNQUNiLFVBQVU7QUFBQSxJQUNaO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sUUFBUTtBQUFBLE1BQ1IsTUFBTTtBQUFBLE1BQ04sYUFBYTtBQUFBLE1BQ2IsVUFBVTtBQUFBLElBQ1o7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixRQUFRO0FBQUEsTUFDUixNQUFNO0FBQUEsTUFDTixhQUFhO0FBQUEsTUFDYixVQUFVO0FBQUEsSUFDWjtBQUFBLElBQ0E7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLFFBQVE7QUFBQSxNQUNSLE1BQU07QUFBQSxNQUNOLGFBQWE7QUFBQSxNQUNiLFVBQVU7QUFBQSxJQUNaO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sUUFBUTtBQUFBLE1BQ1IsTUFBTTtBQUFBLE1BQ04sYUFBYTtBQUFBLE1BQ2IsVUFBVTtBQUFBLElBQ1o7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixRQUFRO0FBQUEsTUFDUixNQUFNO0FBQUEsTUFDTixhQUFhO0FBQUEsTUFDYixVQUFVO0FBQUEsSUFDWjtBQUFBLElBQ0E7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLFFBQVE7QUFBQSxNQUNSLE1BQU07QUFBQSxNQUNOLGFBQWE7QUFBQSxNQUNiLFVBQVU7QUFBQSxJQUNaO0FBQUEsRUFDRjtBQUNGLENBQUM7OztBRnpFRCxJQUFPLGdCQUFRLFVBQVU7QUFBQSxFQUN2QixVQUFVO0FBQUEsRUFDVixVQUFTO0FBQUEsRUFDVCxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixLQUFLO0FBQUEsRUFDUDtBQUFBLEVBQ0EsWUFBWTtBQUFBLEVBQ1osTUFBTTtBQUFBLEVBQ04s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
