<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { RouteLink, withBase } from "vuepress/client";
import { useArticles } from "vuepress-theme-hope/blog";

defineProps<{
  text: string;
  tagline?: string;
  isFullScreen?: boolean;
}>();

const FALLBACK = {
  text: "记录 AI 后端、工程化与排障实践。",
  from: "Badbottle",
};

const quote = ref(FALLBACK.text);
const source = ref(FALLBACK.from);
const display = ref("");

let isMounted = false;
let typeTimer: number | undefined;

const articles = useArticles();
const latest = computed(
  () =>
    articles.value.items.find((item) => !item.path.endsWith("/")) ??
    articles.value.items[0],
);

const latestDate = computed(() => {
  const timestamp = latest.value?.info.date;

  if (!timestamp) return "";

  const date = new Date(timestamp);

  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
});

const latestReading = computed(() => {
  const minutes = latest.value?.info.readingTime?.minutes;

  if (!minutes) return "";

  return minutes < 1 ? "小于 1 分钟" : `约 ${Math.round(minutes)} 分钟`;
});

const latestMeta = computed(() =>
  [latestDate.value, latestReading.value].filter(Boolean).join(" · "),
);

const typeQuote = (text: string) => {
  if (typeTimer) {
    window.clearTimeout(typeTimer);
    typeTimer = undefined;
  }

  display.value = "";

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    display.value = text;
    return;
  }

  let index = 0;

  const step = () => {
    if (!isMounted) return;

    display.value = text.slice(0, index + 1);
    index += 1;

    if (index < text.length) {
      typeTimer = window.setTimeout(step, 90);
    } else {
      typeTimer = undefined;
    }
  };

  step();
};
let rotator: number | undefined;
let controller: AbortController | undefined;

const loadQuote = async () => {
  controller?.abort();
  controller = new AbortController();
  const timeout = window.setTimeout(() => controller?.abort(), 4500);

  try {
    const response = await fetch("https://v1.hitokoto.cn/", {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });

    if (!response.ok) return;

    const data = (await response.json()) as {
      hitokoto?: unknown;
      from?: unknown;
    };

    if (typeof data.hitokoto === "string" && data.hitokoto.trim()) {
      quote.value = data.hitokoto.trim();
      source.value = typeof data.from === "string" && data.from ? data.from : "一言";
      typeQuote(quote.value);
    }
  } catch {
    // Keep the current sentence when the quote service is unavailable.
  } finally {
    window.clearTimeout(timeout);
  }
};

onMounted(() => {
  isMounted = true;
  typeQuote(quote.value);
  void loadQuote();
  rotator = window.setInterval(() => {
    if (!document.hidden) void loadQuote();
  }, 9000);
});

onUnmounted(() => {
  isMounted = false;
  if (rotator) window.clearInterval(rotator);
  if (typeTimer) window.clearTimeout(typeTimer);
  controller?.abort();
});
</script>

<template>
  <div class="zine-hero">
    <p class="zine-eyebrow">
      <img
        class="zine-eyebrow-avatar"
        :src="withBase('/gogo.gif')"
        alt=""
        width="40"
        height="40"
        loading="eager"
      />
      <span class="zine-eyebrow-name">Tech Notes</span>
      <span class="zine-eyebrow-sep" aria-hidden="true">/</span>
      <span class="zine-eyebrow-meta">EST. 2022</span>
    </p>

    <h1 class="zine-title">{{ text }}</h1>
    <p class="zine-tagline">{{ tagline || "Blnk is infinite." }}</p>

    <blockquote class="zine-quote" aria-live="off">
      <p class="zine-quote-text">
        {{ display }}<span class="zine-caret" aria-hidden="true">|</span>
      </p>
      <cite
        class="zine-quote-author"
        :class="{ 'is-visible': display.length > 4 }"
      >
        ——「{{ source }}」
      </cite>
    </blockquote>

    <div class="zine-actions">
      <a class="zine-action zine-action--primary" href="#article-list">
        浏览文章
        <span aria-hidden="true">↓</span>
      </a>
      <a class="zine-action zine-action--ghost" :href="withBase('/timeline/')">
        更新日志
        <span aria-hidden="true">→</span>
      </a>
    </div>

    <RouteLink v-if="latest" class="zine-latest" :to="latest.path">
      <span class="zine-latest-label">最新文章 / LATEST</span>
      <span class="zine-latest-title">{{ latest.info.title }}</span>
      <span class="zine-latest-meta">{{ latestMeta }}</span>
      <span class="zine-latest-arrow" aria-hidden="true">→</span>
    </RouteLink>
  </div>
</template>
