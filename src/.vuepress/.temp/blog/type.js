export const typesMap = JSON.parse("{\"article\":{\"/\":{\"path\":\"/article/\",\"indexes\":[19,0,1,2,3,4,5,6,7,8,29,9,10,11,12,13,30,14,20,31,23,32,24,25,21,22,33,26,27,28,34,15,16,17,18]}},\"star\":{\"/\":{\"path\":\"/star/\",\"indexes\":[19]}},\"timeline\":{\"/\":{\"path\":\"/timeline/\",\"indexes\":[19]}}}");

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogType)
    __VUE_HMR_RUNTIME__.updateBlogType(typesMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ typesMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogType(typesMap);
  });

