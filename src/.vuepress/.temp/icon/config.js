import { hasGlobalComponent } from "/Users/mac/Desktop/bloggggg/docs/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.82_vuepress@2.0.0-rc.20_@vuepress+bundler-webpack@2.0.0-rc.20_vue@3.5.13_/node_modules/@vuepress/helper/lib/client/index.js";
import { useScriptTag } from "/Users/mac/Desktop/bloggggg/docs/node_modules/.pnpm/@vueuse+core@12.8.2/node_modules/@vueuse/core/index.mjs";
import { h } from "vue";
import { VPIcon } from "/Users/mac/Desktop/bloggggg/docs/node_modules/.pnpm/@vuepress+plugin-icon@2.0.0-rc.82_markdown-it@14.1.0_vuepress@2.0.0-rc.20_@vuepress+bun_3ba0f2116ff78c095e195791f544cd4b/node_modules/@vuepress/plugin-icon/lib/client/index.js"

export default {
  enhance: ({ app }) => {
    if(!hasGlobalComponent("VPIcon")) {
      app.component(
        "VPIcon",
        (props) =>
          h(VPIcon, {
            type: "fontawesome",
            prefix: "",
            ...props,
          })
      )
    }
  },
  setup: () => {
    useScriptTag(
  `https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6/js/solid.min.js`,
  () => {},
  { attrs: { "data-auto-replace-svg": "nest" } }
);

    useScriptTag(
  `https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6/js/regular.min.js`,
  () => {},
  { attrs: { "data-auto-replace-svg": "nest" } }
);

    useScriptTag(
  `https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6/js/fontawesome.min.js`,
  () => {},
  { attrs: { "data-auto-replace-svg": "nest" } }
);

  },
}
