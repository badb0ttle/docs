import { Layout, NotFound, injectDarkMode, setupDarkMode, setupSidebarItems, scrollPromise } from "/Users/mac/Desktop/bloggggg/docs/node_modules/.pnpm/vuepress-theme-hope@2.0.0-rc.74_@vuepress+plugin-docsearch@2.0.0-rc.0_@algolia+client-s_a7db7ae8a29a4fb58de8da374822fe5f/node_modules/vuepress-theme-hope/lib/client/export.js";

import { defineCatalogInfoGetter } from "/Users/mac/Desktop/bloggggg/docs/node_modules/.pnpm/@vuepress+plugin-catalog@2.0.0-rc.82_vuepress@2.0.0-rc.20_@vuepress+bundler-webpack@2.0.0-rc.20_vue@3.5.13_/node_modules/@vuepress/plugin-catalog/lib/client/index.js"
import { h } from "vue"
import { resolveComponent } from "vue"
import { BlogCategory, BlogHome, BlogType, BloggerInfo, SocialMedias, Timeline, setupBlog } from "/Users/mac/Desktop/bloggggg/docs/node_modules/.pnpm/vuepress-theme-hope@2.0.0-rc.74_@vuepress+plugin-docsearch@2.0.0-rc.0_@algolia+client-s_a7db7ae8a29a4fb58de8da374822fe5f/node_modules/vuepress-theme-hope/lib/client/modules/blog/export.js";
import "/Users/mac/Desktop/bloggggg/docs/node_modules/.pnpm/vuepress-theme-hope@2.0.0-rc.74_@vuepress+plugin-docsearch@2.0.0-rc.0_@algolia+client-s_a7db7ae8a29a4fb58de8da374822fe5f/node_modules/vuepress-theme-hope/lib/client/modules/blog/styles/layout.scss";
import { GlobalEncrypt, LocalEncrypt } from "/Users/mac/Desktop/bloggggg/docs/node_modules/.pnpm/vuepress-theme-hope@2.0.0-rc.74_@vuepress+plugin-docsearch@2.0.0-rc.0_@algolia+client-s_a7db7ae8a29a4fb58de8da374822fe5f/node_modules/vuepress-theme-hope/lib/client/modules/encrypt/export.js";

import "/Users/mac/Desktop/bloggggg/docs/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.82_vuepress@2.0.0-rc.20_@vuepress+bundler-webpack@2.0.0-rc.20_vue@3.5.13_/node_modules/@vuepress/helper/lib/client/styles/colors.css";
import "/Users/mac/Desktop/bloggggg/docs/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.82_vuepress@2.0.0-rc.20_@vuepress+bundler-webpack@2.0.0-rc.20_vue@3.5.13_/node_modules/@vuepress/helper/lib/client/styles/normalize.css";
import "/Users/mac/Desktop/bloggggg/docs/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.82_vuepress@2.0.0-rc.20_@vuepress+bundler-webpack@2.0.0-rc.20_vue@3.5.13_/node_modules/@vuepress/helper/lib/client/styles/sr-only.css";
import "/Users/mac/Desktop/bloggggg/docs/node_modules/.pnpm/vuepress-theme-hope@2.0.0-rc.74_@vuepress+plugin-docsearch@2.0.0-rc.0_@algolia+client-s_a7db7ae8a29a4fb58de8da374822fe5f/node_modules/vuepress-theme-hope/lib/client/styles/index.scss";

defineCatalogInfoGetter((meta) => {
  const title = meta.title;
  const shouldIndex = meta.index ?? true;
  const icon = meta.icon;

  return shouldIndex ? {
    title,
    content: icon ? () =>[h(resolveComponent("VPIcon"), { icon }), title] : null,
    order: meta.order,
    index: meta.index,
  } : null;
});

export default {
  enhance: ({ app, router }) => {
    const { scrollBehavior } = router.options;

    router.options.scrollBehavior = async (...args) => {
      await scrollPromise.wait();

      return scrollBehavior(...args);
    };

    // inject global properties
    injectDarkMode(app);

    app.component("BloggerInfo", BloggerInfo);
    app.component("SocialMedias", SocialMedias);
    app.component("GlobalEncrypt", GlobalEncrypt);
    app.component("LocalEncrypt", LocalEncrypt);
  },
  setup: () => {
    setupDarkMode();
    setupSidebarItems();
    setupBlog();
  },
  layouts: {
    Layout,
    NotFound,
    BlogCategory,
    BlogHome,
    BlogType,
    Timeline,
  }
};
