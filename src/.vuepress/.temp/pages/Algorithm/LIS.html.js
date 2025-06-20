import comp from "/Users/mac/Desktop/bloggggg/docs/src/.vuepress/.temp/pages/Algorithm/LIS.html.vue"
const data = JSON.parse("{\"path\":\"/Algorithm/LIS.html\",\"title\":\"Longest Increasing Subsequence(最长上升子序列）\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Longest Increasing Subsequence(最长上升子序列）\",\"order\":4,\"editLink\":false,\"category\":[\"算法知识\"],\"tag\":[\"知识点\"],\"description\":\"最长上升子序列（Longest Increasing Subsequence，LIS） 原文oi wiki:LIS 简单情形 在最长上升子序列问题中，我们引入两个关键变量 i 和 j。这里，i 表示以其作为结尾的最长上升子序列的长度，而 j 则作为连接点，在构建最长上升子序列的过程中起着重要作用。 需要特别注意的是，dp[mx] 并不一定就是最终答案。...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://mister-hope.github.io/docs/Algorithm/LIS.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Badbottle's blog\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Longest Increasing Subsequence(最长上升子序列）\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"最长上升子序列（Longest Increasing Subsequence，LIS） 原文oi wiki:LIS 简单情形 在最长上升子序列问题中，我们引入两个关键变量 i 和 j。这里，i 表示以其作为结尾的最长上升子序列的长度，而 j 则作为连接点，在构建最长上升子序列的过程中起着重要作用。 需要特别注意的是，dp[mx] 并不一定就是最终答案。...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"知识点\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"Longest Increasing Subsequence(最长上升子序列）\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"ℬ𝒶𝒹𝒷0𝓉𝓉𝓁ℯ\\\",\\\"url\\\":\\\"https://mister-hope.com\\\"}]}\"]]},\"readingTime\":{\"minutes\":3.18,\"words\":955},\"filePathRelative\":\"Algorithm/LIS.md\",\"excerpt\":\"\\n<p>原文oi wiki:<a href=\\\"https://oi-wiki.org/dp/basic/\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\">LIS</a></p>\\n<h2>简单情形</h2>\\n<p>在最长上升子序列问题中，我们引入两个关键变量 <code>i</code> 和 <code>j</code>。这里，<code>i</code> 表示以其作为结尾的最长上升子序列的长度，而 <code>j</code> 则作为连接点，在构建最长上升子序列的过程中起着重要作用。</p>\\n<p>需要特别注意的是，<code>dp[mx]</code> 并不一定就是最终答案。在得出所有以不同元素结尾的最长上升子序列长度后，我们需要遍历整个结果数组，才能找出真正的最长上升子序列长度。</p>\",\"autoDesc\":true}")
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
