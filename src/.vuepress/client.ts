import { defineClientConfig } from "vuepress/client";
import Blog from "./layouts/Blog.vue";
import { setupSnowFall } from "vuepress-theme-hope/presets/snowFall.js";
import { setupRunningTimeFooter } from "vuepress-theme-hope/presets/footerRunningTime.js";
import { setupTransparentNavbar } from "vuepress-theme-hope/presets/transparentNavbar.js";
import "vuepress-theme-hope/presets/bounce-icon.scss";
import "vuepress-theme-hope/presets/shinning-feature-panel.scss";
import "vuepress-theme-hope/presets/round-blogger-avatar.scss";
import "vuepress-theme-hope/presets/hr-driving-car.scss";



export default defineClientConfig({
  layouts: {
    Blog,
  },
  setup() {
    setupSnowFall();
    setupRunningTimeFooter(
      new Date("2022-01-01"),
      {
        "/": "Running time: :day days :hour hours :minute minutes :second seconds",
        "/zh/": "已运行 :day 天 :hour 小时 :minute 分钟 :second 秒",
      },
      true,
    );
    setupTransparentNavbar({ type: "homepage" });
    
    // 页面加载完成后添加特效
    if (typeof window !== "undefined") {
      const addEffects = () => {
        // 丝带背景特效 - CSS版本
        const ribbonStyle = document.createElement('style');
        ribbonStyle.innerHTML = `
          .ribbon-background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            background: linear-gradient(45deg, 
              rgba(255, 107, 107, 0.1) 0%, 
              rgba(78, 205, 196, 0.1) 25%, 
              rgba(69, 183, 209, 0.1) 50%, 
              rgba(150, 206, 180, 0.1) 75%, 
              rgba(254, 202, 87, 0.1) 100%);
            background-size: 400% 400%;
            animation: gradientShift 15s ease infinite;
          }
          
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          .ribbon-background::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: repeating-linear-gradient(
              45deg,
              transparent,
              transparent 50px,
              rgba(255, 255, 255, 0.03) 50px,
              rgba(255, 255, 255, 0.03) 100px
            );
            animation: ribbonMove 20s linear infinite;
          }
          
          @keyframes ribbonMove {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
          }
        `;
        document.head.appendChild(ribbonStyle);
        
        // 创建丝带背景元素
        const ribbonBg = document.createElement('div');
        ribbonBg.className = 'ribbon-background';
        document.body.appendChild(ribbonBg);
        
        // 鼠标点击特效
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3', '#54A0FF'];
        
        document.addEventListener('click', (e) => {
          const x = e.clientX;
          const y = e.clientY;
          
          // 创建粒子容器
          const particleContainer = document.createElement('div');
          particleContainer.style.position = 'fixed';
          particleContainer.style.left = x + 'px';
          particleContainer.style.top = y + 'px';
          particleContainer.style.pointerEvents = 'none';
          particleContainer.style.zIndex = '9999';
          
          // 创建多个粒子
          for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '8px';
            particle.style.height = '8px';
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.borderRadius = '50%';
            particle.style.transform = 'translate(-50%, -50%)';
            particle.style.boxShadow = '0 0 6px currentColor';
            
            // 随机方向和速度
            const angle = (Math.PI * 2 * i) / 8;
            const velocity = 80 + Math.random() * 40;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            // 动画
            particle.animate([
              { 
                transform: 'translate(-50%, -50%) scale(1)',
                opacity: 1 
              },
              { 
                transform: `translate(calc(-50% + ${vx}px), calc(-50% + ${vy}px)) scale(0)`,
                opacity: 0 
              }
            ], {
              duration: 800,
              easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });
            
            particleContainer.appendChild(particle);
          }
          
          document.body.appendChild(particleContainer);
          
          // 清理
          setTimeout(() => {
            if (particleContainer.parentNode) {
              particleContainer.parentNode.removeChild(particleContainer);
            }
          }, 800);
        });
      };
      
      // 页面加载完成后启动特效
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addEffects);
      } else {
        addEffects();
      }
    }
  },
});