<!-- .vuepress/components/BlogHero.vue -->
<script setup lang="ts">
console.log("BlogHero.vue");
import { Blog as BlogHero } from "vuepress-theme-hope/blog";
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