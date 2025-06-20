import comp from "/Users/mac/Desktop/bloggggg/docs/src/.vuepress/.temp/pages/Algorithm/MST.html.vue"
const data = JSON.parse("{\"path\":\"/Algorithm/MST.html\",\"title\":\"Minimum Spanning Tree(最小生成树)\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Minimum Spanning Tree(最小生成树)\",\"order\":4,\"editLink\":false,\"category\":[\"算法知识\"],\"description\":\"最小生成树 原文oi wiki:MST 方法 1.Kruskal(按边) 2.Prim(按点) 1.Kruskal 思路很简单，为了造出一棵最小生成树，我们从最小边权的边开始，按边权从小到大依次加入，如果某次加边产生了环，就扔掉这条边，直到加入了n-1条边，即形成了一棵树。 时间复杂度 O(nlog(n)) code: 2.Prim 该算法的基本思想是...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://mister-hope.github.io/docs/Algorithm/MST.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Badbottle's blog\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Minimum Spanning Tree(最小生成树)\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"最小生成树 原文oi wiki:MST 方法 1.Kruskal(按边) 2.Prim(按点) 1.Kruskal 思路很简单，为了造出一棵最小生成树，我们从最小边权的边开始，按边权从小到大依次加入，如果某次加边产生了环，就扔掉这条边，直到加入了n-1条边，即形成了一棵树。 时间复杂度 O(nlog(n)) code: 2.Prim 该算法的基本思想是...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"Minimum Spanning Tree(最小生成树)\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"ℬ𝒶𝒹𝒷0𝓉𝓉𝓁ℯ\\\",\\\"url\\\":\\\"https://mister-hope.com\\\"}]}\"]]},\"readingTime\":{\"minutes\":1.8,\"words\":541},\"filePathRelative\":\"Algorithm/MST.md\",\"excerpt\":\"\\n<h2>最小生成树</h2>\\n<p>原文oi wiki:<a href=\\\"https://oi-wiki.org/graph/mst/\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\">MST</a></p>\\n<h2>方法</h2>\\n<p><strong>1.Kruskal(按边)</strong> <br>\\n<strong>2.Prim(按点)</strong></p>\\n<h2>1.Kruskal</h2>\\n<p>思路很简单，为了造出一棵最小生成树，我们从最小边权的边开始，按边权从小到大依次加入，如果某次加边产生了环，就扔掉这条边，直到加入了<strong>n-1</strong>条边，即形成了一棵树。\\n时间复杂度<code> O(nlog(n))</code>\\ncode:</p>\",\"autoDesc\":true}")
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
