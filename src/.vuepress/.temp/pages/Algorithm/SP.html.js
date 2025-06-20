import comp from "/Users/mac/Desktop/bloggggg/docs/src/.vuepress/.temp/pages/Algorithm/SP.html.vue"
const data = JSON.parse("{\"path\":\"/Algorithm/SP.html\",\"title\":\"SP(最短路)\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"SP(最短路)\",\"order\":4,\"editLink\":false,\"category\":[\"算法知识\"],\"description\":\"最短路径 原文oi wiki:SP 方法 1.Dijkstra 2.Floyd 1.Dijkstra 用于求 单源最短路径，只能处理非负权边。其核心思想是： 每次从未确定的点中选择当前距离源点最近的点加入集合，并用它来更新其他点的最短距离。 堆优化 Dijkstra 时间复杂度为 O((n + m)log n),适用于稀疏图 code: 2.Floyd...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://mister-hope.github.io/docs/Algorithm/SP.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Badbottle's blog\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"SP(最短路)\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"最短路径 原文oi wiki:SP 方法 1.Dijkstra 2.Floyd 1.Dijkstra 用于求 单源最短路径，只能处理非负权边。其核心思想是： 每次从未确定的点中选择当前距离源点最近的点加入集合，并用它来更新其他点的最短距离。 堆优化 Dijkstra 时间复杂度为 O((n + m)log n),适用于稀疏图 code: 2.Floyd...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"SP(最短路)\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"ℬ𝒶𝒹𝒷0𝓉𝓉𝓁ℯ\\\",\\\"url\\\":\\\"https://mister-hope.com\\\"}]}\"]]},\"readingTime\":{\"minutes\":1.43,\"words\":429},\"filePathRelative\":\"Algorithm/SP.md\",\"excerpt\":\"\\n<h2>最短路径</h2>\\n<p>原文oi wiki:<a href=\\\"https://oi-wiki.org/graph/shortest-path/\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\">SP</a></p>\\n<h2>方法</h2>\\n<p>1.<strong>Dijkstra</strong><br>\\n2.<strong>Floyd</strong></p>\\n<h2>1.Dijkstra</h2>\\n<p>用于求 <code>单源最短路径</code>，只能处理非负权边。其核心思想是：\\n每次从未确定的点中选择当前距离源点最近的点加入集合，并用它来更新其他点的最短距离。</p>\",\"autoDesc\":true}")
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
