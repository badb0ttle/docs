import comp from "/Users/mac/Desktop/bloggggg/docs/src/.vuepress/.temp/pages/article/index.html.vue"
const data = JSON.parse("{\"path\":\"/article/\",\"title\":\"文章\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"文章\",\"dir\":{\"index\":false},\"index\":false,\"feed\":false,\"sitemap\":false,\"blog\":{\"type\":\"type\",\"key\":\"article\"},\"layout\":\"BlogType\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://mister-hope.github.io/docs/article/\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Badbottle's blog\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"文章\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"website\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"WebPage\\\",\\\"name\\\":\\\"文章\\\"}\"]]},\"readingTime\":{\"minutes\":0,\"words\":0},\"filePathRelative\":null,\"excerpt\":\"\"}")
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
