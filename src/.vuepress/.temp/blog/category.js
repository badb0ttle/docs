export const categoriesMap = JSON.parse("{\"category\":{\"/\":{\"path\":\"/category/\",\"map\":{\"算法知识\":{\"path\":\"/category/%E7%AE%97%E6%B3%95%E7%9F%A5%E8%AF%86/\",\"indexes\":[0,1,2,3,4,5,6,7,8,9,10,11,12,13]},\"知识点\":{\"path\":\"/category/%E7%9F%A5%E8%AF%86%E7%82%B9/\",\"indexes\":[14,15,16,17,18]},\"使用指南\":{\"path\":\"/category/%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97/\",\"indexes\":[19,20,21,22,16,17]},\"使用工具\":{\"path\":\"/category/%E4%BD%BF%E7%94%A8%E5%B7%A5%E5%85%B7/\",\"indexes\":[23]},\"云计算\":{\"path\":\"/category/%E4%BA%91%E8%AE%A1%E7%AE%97/\",\"indexes\":[24]},\"工具\":{\"path\":\"/category/%E5%B7%A5%E5%85%B7/\",\"indexes\":[25]},\"课内知识\":{\"path\":\"/category/%E8%AF%BE%E5%86%85%E7%9F%A5%E8%AF%86/\",\"indexes\":[26,27,28]}}}},\"tag\":{\"/\":{\"path\":\"/tag/\",\"map\":{\"知识点\":{\"path\":\"/tag/%E7%9F%A5%E8%AF%86%E7%82%B9/\",\"indexes\":[0,1,2,3,4,5,7,8,9,11,13,21,22]},\"前端\":{\"path\":\"/tag/%E5%89%8D%E7%AB%AF/\",\"indexes\":[14]},\"布局\":{\"path\":\"/tag/%E5%B8%83%E5%B1%80/\",\"indexes\":[19,20,17]},\"控制系统\":{\"path\":\"/tag/%E6%8E%A7%E5%88%B6%E7%B3%BB%E7%BB%9F/\",\"indexes\":[15,16]},\"语言\":{\"path\":\"/tag/%E8%AF%AD%E8%A8%80/\",\"indexes\":[17,18]}}}}}");

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogCategory)
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoriesMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ categoriesMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoriesMap);
  });

