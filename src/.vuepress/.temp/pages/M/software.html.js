import comp from "/Users/mac/Desktop/bloggggg/docs/src/.vuepress/.temp/pages/M/software.html.vue"
const data = JSON.parse("{\"path\":\"/M/software.html\",\"title\":\"软件工程\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"软件工程\",\"index\":false,\"editLink\":false,\"icon\":\"terminal\",\"category\":[\"课内知识\"],\"feed\":false,\"seo\":false,\"head\":[]},\"readingTime\":{\"minutes\":1.04,\"words\":311},\"filePathRelative\":\"M/software.md\"}")
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
