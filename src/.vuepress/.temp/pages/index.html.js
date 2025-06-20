import comp from "/Users/mac/Desktop/bloggggg/docs/src/.vuepress/.temp/pages/index.html.vue"
const data = JSON.parse("{\"path\":\"/\",\"title\":\"Home\",\"lang\":\"zh-CN\",\"frontmatter\":{\"home\":true,\"layout\":\"BlogHome\",\"title\":\"Home\",\"heroImage\":\"/gogo.gif\",\"heroText\":\"✌︎(ツ)ɔ\",\"editLink\":false,\"heroFullScreen\":true,\"tagline\":null,\"bgImage\":\"bgImg.png\",\"projects\":null,\"footer\":\"XP\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://mister-hope.github.io/docs/\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Badbottle's blog\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Home\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"website\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"WebPage\\\",\\\"name\\\":\\\"Home\\\"}\"]]},\"readingTime\":{\"minutes\":0.7,\"words\":209},\"filePathRelative\":\"README.md\",\"excerpt\":\"<!-- \\n这是一个博客主页的案例。\\n\\n要使用此布局，你应该在页面前端设置 `layout: BlogHome` 和 `home: true`。\\n\\n相关配置文档请见 [博客主页](https://theme-hope.vuejs.press/zh/guide/blog/home.html)。 -->\\n\"}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
