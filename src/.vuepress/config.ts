import { defineUserConfig } from "vuepress";
import { webpackBundler } from "@vuepress/bundler-webpack";
import { getDirname, path } from "vuepress/utils";
import { createRequire } from "node:module";
import theme from "./theme.js";

const __dirname = getDirname(import.meta.url);
const require = createRequire(import.meta.url);
const slimsearchPkgPath = require.resolve("@vuepress/plugin-slimsearch/package.json");
const slimsearchWorkerPath = path.join(
  path.dirname(slimsearchPkgPath),
  "dist/client/worker.js",
);

export default defineUserConfig({
  base: "/",
  lang: "zh-CN",
  title: "Badbottle's blog",
  description: "Blnk is infinite.",
  shouldPrefetch: false,

  theme,

  // 配置 favicon.ico 路径
  head: [
    //     // <link rel="preconnect" href="https://fonts.googleapis.com">
    // <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    // <link href="https://fonts.googleapis.com/css2?family=Limelight&display=swap" rel="stylesheet">
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    [
      "link",
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    ],
    [
      "link",
      {
        href: "https://fonts.googleapis.com/css2?family=Funnel+Display:wght@300..800&family=Limelight&display=swap",
        rel: "stylesheet",
      },
    ],
    ['link', { rel: 'icon', href: 'assets/icon/logo.ico' }]
  ],


  // 和 PWA 一起启用
  // shouldPrefetch: false,

  bundler: webpackBundler({
    configureWebpack: () => ({
      ignoreWarnings: [
        (warning) =>
          typeof warning.message === "string" &&
          warning.message.includes("The Sass if() syntax is deprecated") &&
          warning.message.includes("vuepress-theme-hope/lib/client/styles/_code.scss"),
        (warning) =>
          typeof warning.message === "string" &&
          warning.message.includes("The Sass if() syntax is deprecated") &&
          warning.message.includes("vuepress-shared/styles/svg.scss"),
      ],
      resolve: {
        alias: {
          // plugin-slimsearch on the current dependency set resolves `worker.js`
          // from the package root, but the emitted file lives in `dist/client`.
          "worker.js$": slimsearchWorkerPath,
        },
      },
    }),
    scss: {
      sassOptions: {
        quietDeps: true,
        silenceDeprecations: ["if-function", "import", "legacy-js-api"],
      },
    },
  }),
});
