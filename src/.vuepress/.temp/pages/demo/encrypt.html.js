import comp from "/Users/mac/Desktop/bloggggg/docs/src/.vuepress/.temp/pages/demo/encrypt.html.vue"
const data = JSON.parse("{\"path\":\"/demo/encrypt.html\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{\"icon\":\"lock\",\"category\":[\"使用指南\"],\"tag\":[\"加密\"],\"gitInclude\":[]},\"headers\":[],\"readingTime\":{\"minutes\":0.03,\"words\":10},\"filePathRelative\":\"demo/encrypt.md\",\"excerpt\":\"\"}")
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
