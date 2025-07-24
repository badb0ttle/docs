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
    </template>
    <template #avatar>
      <img class="vp-blogger-avatar" src="/assets/icon/known.jpg" alt="Blogger Avatar" loading="lazy" />
    </template>
  </BlogHero>
  
</template>