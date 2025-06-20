import { hasGlobalComponent } from "/Users/mac/Desktop/bloggggg/docs/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.82_vuepress@2.0.0-rc.20_@vuepress+bundler-webpack@2.0.0-rc.20_vue@3.5.13_/node_modules/@vuepress/helper/lib/client/index.js";
import Badge from "/Users/mac/Desktop/bloggggg/docs/node_modules/.pnpm/vuepress-plugin-components@2.0.0-rc.74_sass-embedded@1.85.1_sass-loader@16.0.5_sass-emb_c0026b8f5b6a93d5be53773ec01cc995/node_modules/vuepress-plugin-components/lib/client/components/Badge.js";
import VPCard from "/Users/mac/Desktop/bloggggg/docs/node_modules/.pnpm/vuepress-plugin-components@2.0.0-rc.74_sass-embedded@1.85.1_sass-loader@16.0.5_sass-emb_c0026b8f5b6a93d5be53773ec01cc995/node_modules/vuepress-plugin-components/lib/client/components/VPCard.js";
import VidStack from "/Users/mac/Desktop/bloggggg/docs/node_modules/.pnpm/vuepress-plugin-components@2.0.0-rc.74_sass-embedded@1.85.1_sass-loader@16.0.5_sass-emb_c0026b8f5b6a93d5be53773ec01cc995/node_modules/vuepress-plugin-components/lib/client/components/VidStack.js";

import "/Users/mac/Desktop/bloggggg/docs/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.82_vuepress@2.0.0-rc.20_@vuepress+bundler-webpack@2.0.0-rc.20_vue@3.5.13_/node_modules/@vuepress/helper/lib/client/styles/sr-only.css";

export default {
  enhance: ({ app }) => {
    if(!hasGlobalComponent("Badge")) app.component("Badge", Badge);
    if(!hasGlobalComponent("VPCard")) app.component("VPCard", VPCard);
    if(!hasGlobalComponent("VidStack")) app.component("VidStack", VidStack);
    
  },
  setup: () => {

  },
  rootComponents: [

  ],
};
