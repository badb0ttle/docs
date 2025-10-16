<!-- .vuepress/components/BlogHero.vue -->
<script setup lang="ts">
import { Blog as BlogHero } from "vuepress-theme-hope/blog";
import HitokotoBlogHero from "vuepress-theme-hope/presets/HitokotoBlogHero.js";
</script>

<template>
  <BlogHero>
    <template #heroInfo="data">
      
      <HitokotoBlogHero v-bind="data" />
    </template>
  </BlogHero>
  
</template>