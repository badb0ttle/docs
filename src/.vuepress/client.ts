import { defineClientConfig } from "vuepress/client";
import Blog from "./layouts/Blog.vue";
import { setupRunningTimeFooter } from "vuepress-theme-hope/presets/footerRunningTime.js";
import { setupTransparentNavbar } from "vuepress-theme-hope/presets/transparentNavbar.js";
import "vuepress-theme-hope/presets/bounce-icon.scss";
import "vuepress-theme-hope/presets/round-blogger-avatar.scss";
import "vuepress-theme-hope/presets/hr-driving-car.scss";

export default defineClientConfig({
  layouts: {
    Blog,
  },
  setup() {
    setupRunningTimeFooter(
      new Date("2022-01-01"),
      {
        "/": "已运行 :day 天 :hour 小时 :minute 分钟 :second 秒",
      },
      true,
    );

    setupTransparentNavbar({
      type: "homepage",
      light: "#ffffff",
      dark: "#ffffff",
    });

    if (typeof window === "undefined") return;

    // A small, on-brand click spark. Decorative only: respect reduced motion,
    // skip form fields and never block the page.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const palette = ["#f2c230", "#0f5c56", "#e0647f", "#1d1a15"];

    document.addEventListener("click", (event) => {
      const target = event.target as HTMLElement | null;

      if (target?.closest("input, textarea, select, option, [contenteditable='true']")) {
        return;
      }

      const host = document.createElement("span");
      host.className = "zine-click";
      host.style.left = `${event.clientX}px`;
      host.style.top = `${event.clientY}px`;

      for (let index = 0; index < 6; index += 1) {
        const particle = document.createElement("i");
        const angle = (Math.PI * 2 * index) / 6;
        const distance = 26 + Math.random() * 22;

        particle.style.background = palette[index % palette.length];
        particle.animate(
          [
            { transform: "translate(-50%, -50%) scale(1)", opacity: 1 },
            {
              transform: `translate(calc(-50% + ${Math.cos(angle) * distance}px), calc(-50% + ${Math.sin(angle) * distance}px)) scale(0)`,
              opacity: 0,
            },
          ],
          {
            duration: 560,
            easing: "cubic-bezier(0.22, 0.7, 0.3, 1)",
          },
        );

        host.append(particle);
      }

      document.body.append(host);
      window.setTimeout(() => host.remove(), 600);
    });
  },
});
