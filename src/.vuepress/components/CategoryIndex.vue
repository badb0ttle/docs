<script setup lang="ts">
import { computed } from "vue";
import { RouteLink, useFrontmatter } from "vuepress/client";
import { useCategoryMap } from "vuepress-theme-hope/blog";

const META: Record<string, { icon: string; desc: string }> = {
  算法: { icon: "calculator", desc: "二分图 · DP · 图论" },
  知识点: { icon: "book", desc: "基础概念与常考技巧" },
  项目: { icon: "project-diagram", desc: "AI 后端与工程实践" },
  AI: { icon: "robot", desc: "Agent · Langfuse · 数字人" },
  使用指南: { icon: "compass", desc: "工具与流程说明" },
  算法知识: { icon: "calculator", desc: "数据结构与算法基础" },
  课内知识: { icon: "graduation-cap", desc: "课程笔记与复习" },
  DevOps: { icon: "linux", desc: "Docker · 部署 · 运维" },
  项目实战: { icon: "project-diagram", desc: "实战项目复盘" },
  云计算: { icon: "cloud", desc: "云服务与基础设施" },
  使用工具: { icon: "wrench", desc: "工具使用记录" },
  工具: { icon: "tools", desc: "效率工具与软件" },
  极难: { icon: "skull", desc: "高难度题目" },
  实习总结: { icon: "briefcase", desc: "实习复盘" },
};

// 首页前 8 个分类的固定顺序：改这里即可。
const FEATURED = [
  "算法",
  "知识点",
  "项目",
  "AI",
  "使用指南",
  "算法知识",
  "课内知识",
  "DevOps",
];

const frontmatter = useFrontmatter();
const categoryMap = useCategoryMap();

const categories = computed(() =>
  FEATURED.flatMap((name) => {
    const data = categoryMap.value.map[name];

    if (!data) return [];

    const meta = META[name] ?? { icon: "folder", desc: "文章集合" };

    return [
      {
        name,
        path: data.path,
        count: data.items.length,
        ...meta,
      },
    ];
  }),
);

const total = computed(() => Object.keys(categoryMap.value.map).length);
const allPath = computed(() => categoryMap.value.path || "/category/");
</script>

<template>
  <div
    v-if="frontmatter.home"
    class="vp-project-panel category-index"
    aria-label="分类索引"
  >
    <RouteLink
      v-for="(item, index) in categories"
      :key="item.name"
      :to="item.path"
      class="vp-project-card"
      :class="`color${index % 9}`"
    >
      <i class="vp-icon fas vp-project-icon" :class="`fa-${item.icon}`" />
      <div class="vp-project-name">
        {{ item.name }}
        <span class="category-count">{{ item.count }} 篇</span>
      </div>
      <div class="vp-project-desc">{{ item.desc }}</div>
    </RouteLink>

    <RouteLink :to="allPath" class="vp-project-card category-all">
      <i class="vp-icon fas fa-layer-group vp-project-icon" />
      <div class="vp-project-name">
        全部分类
        <span class="category-count">{{ total }} 个</span>
      </div>
      <div class="vp-project-desc">查看所有分类与文章</div>
    </RouteLink>
  </div>
</template>
