<script setup lang="ts">
import { Blog } from "vuepress-theme-hope/blog";
import CategoryIndex from "../components/CategoryIndex.vue";
import ZineHero from "../components/ZineHero.vue";
</script>

<template>
  <Blog>
    <template #heroInfo="data">
      <ClientOnly>
        <ZineHero v-bind="data" />
      </ClientOnly>
    </template>

    <template #articlesBefore>
      <CategoryIndex />
    </template>
  </Blog>
</template>
