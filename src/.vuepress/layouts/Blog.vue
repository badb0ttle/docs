<script setup lang="ts">
import { Blog } from "vuepress-theme-hope/blog";
import HitokotoBlogHero from "vuepress-theme-hope/presets/HitokotoBlogHero.js";
</script>

<template>
  <Blog>
    <template #heroInfo="data">
      <ClientOnly>
        <HitokotoBlogHero v-bind="data" />
      </ClientOnly>
    </template>
  </Blog>
</template>
