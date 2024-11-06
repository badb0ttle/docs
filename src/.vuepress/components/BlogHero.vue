<!-- .vuepress/components/BlogHero.vue -->
<script setup lang="ts">
console.log("BlogHero.vue");
import BlogHero from "vuepress-theme-hope/blog/components/BlogHero.js";
import HitokotoBlogHero from "vuepress-theme-hope/presets/HitokotoBlogHero.js";
</script>

<template>
  <BlogHero>
    <template #info="info">
      <HitokotoBlogHero v-bind="info" />
      <div>这是测试内容，用于检查 Hitokoto 组件是否加载</div>
    </template>
  </BlogHero>
</template>