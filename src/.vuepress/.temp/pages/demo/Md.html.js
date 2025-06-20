import comp from "/Users/mac/Desktop/bloggggg/docs/src/.vuepress/.temp/pages/demo/Md.html.vue"
const data = JSON.parse("{\"path\":\"/demo/Md.html\",\"title\":\"Markdown\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Markdown\",\"icon\":\"lock\",\"category\":[\"使用指南\"],\"tag\":[\"md\"],\"gitInclude\":[],\"description\":\"0x01 基础介绍\"},\"headers\":[{\"level\":2,\"title\":\"0x01 基础介绍\",\"slug\":\"_0x01-基础介绍\",\"link\":\"#_0x01-基础介绍\",\"children\":[]}],\"readingTime\":{\"minutes\":0.05,\"words\":16},\"filePathRelative\":\"demo/Md.md\",\"excerpt\":\"<h2>0x01 基础介绍</h2>\\n\",\"autoDesc\":true}")
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
