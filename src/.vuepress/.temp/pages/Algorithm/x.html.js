import comp from "/Users/mac/Desktop/bloggggg/docs/src/.vuepress/.temp/pages/Algorithm/x.html.vue"
const data = JSON.parse("{\"path\":\"/Algorithm/x.html\",\"title\":\"DP:Linear, Interval, Tree (线性、区间、树形dp)\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"DP:Linear, Interval, Tree (线性、区间、树形dp)\",\"order\":4,\"editLink\":false,\"category\":[\"算法知识\"],\"tag\":[\"知识点\"],\"gitInclude\":[],\"description\":\"线性、区间、树形 DP 1. 线性 DP 每个状态只依赖于前一个或前几个状态，且状态转移是线性的（即没有复杂的依赖关系）。通常用于解决序列或数组上的问题。 dp[i][j]: 到第 i 种为止，总数为 j 的总方案数。 例题: P1077 2. 区间 DP 区间 DP 是指状态转移方程中，每个状态表示一个区间 [i, j] 上的某种性质，且状态转移依赖...\"},\"headers\":[{\"level\":2,\"title\":\"线性、区间、树形 DP\",\"slug\":\"线性、区间、树形-dp\",\"link\":\"#线性、区间、树形-dp\",\"children\":[{\"level\":3,\"title\":\"1. 线性 DP\",\"slug\":\"_1-线性-dp\",\"link\":\"#_1-线性-dp\",\"children\":[]},{\"level\":3,\"title\":\"2. 区间 DP\",\"slug\":\"_2-区间-dp\",\"link\":\"#_2-区间-dp\",\"children\":[]},{\"level\":3,\"title\":\"3. 树形 DP\",\"slug\":\"_3-树形-dp\",\"link\":\"#_3-树形-dp\",\"children\":[]}]}],\"readingTime\":{\"minutes\":1.63,\"words\":489},\"filePathRelative\":\"Algorithm/x.md\",\"excerpt\":\"\\n<h2>线性、区间、树形 DP</h2>\\n<h3>1. 线性 DP</h3>\\n<p>每个状态只依赖于前一个或前几个状态，且状态转移是线性的（即没有复杂的依赖关系）。通常用于解决序列或数组上的问题。</p>\\n<p><code>dp[i][j]</code>: 到第 <code>i</code> 种为止，总数为 <code>j</code> 的总方案数。</p>\\n<p><strong>例题</strong>: <a href=\\\"https://www.luogu.com.cn/problem/P1077\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\">P1077</a></p>\",\"autoDesc\":true}")
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
