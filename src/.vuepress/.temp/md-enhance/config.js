import CodeDemo from "/Users/mac/Desktop/bloggggg/docs/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.74_markdown-it@14.1.0_sass-embedded@1.85.1_sass-loa_284621be74ec2302c5194c6381a30c91/node_modules/vuepress-plugin-md-enhance/lib/client/components/CodeDemo.js";
import MdDemo from "/Users/mac/Desktop/bloggggg/docs/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.74_markdown-it@14.1.0_sass-embedded@1.85.1_sass-loa_284621be74ec2302c5194c6381a30c91/node_modules/vuepress-plugin-md-enhance/lib/client/components/MdDemo.js";

export default {
  enhance: ({ app }) => {
    app.component("CodeDemo", CodeDemo);
    app.component("MdDemo", MdDemo);
  },
};
