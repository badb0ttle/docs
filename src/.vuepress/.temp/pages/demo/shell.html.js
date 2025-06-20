import comp from "/Users/mac/Desktop/bloggggg/docs/src/.vuepress/.temp/pages/demo/shell.html.vue"
const data = JSON.parse("{\"path\":\"/demo/shell.html\",\"title\":\"Shell\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Shell\",\"icon\":\"gears\",\"order\":4,\"category\":[\"使用指南\"],\"tag\":[\"知识点\"],\"gitInclude\":[]},\"headers\":[],\"readingTime\":{\"minutes\":0.05,\"words\":15},\"filePathRelative\":\"demo/shell.md\",\"excerpt\":\"\"}")
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
