"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[3160],{3160:(e,t,o)=>{o.d(t,{getVimeoVideoInfo:()=>a,resolveVimeoVideoId:()=>c});const n=/(?:https:\/\/)?(?:player\.)?vimeo(?:\.com)?\/(?:video\/)?(\d+)(?:(?:\?hash=|\?h=|\/)(.*))?/,i=new Map,s=new Map;function c(e){const t=e.match(n);return{videoId:t?.[1],hash:t?.[2]}}async function a(e,t,o){if(i.has(e))return i.get(e);if(s.has(e))return s.get(e);let n=`https://vimeo.com/api/oembed.json?url=https://player.vimeo.com/video/${e}`;o&&(n=n.concat(`?h=${o}`));const c=window.fetch(n,{mode:"cors",signal:t.signal}).then((e=>e.json())).then((t=>{const o=t?.thumbnail_url?.match(/vimeocdn.com\/video\/(.*)?_/)?.[1],n=o?`https://i.vimeocdn.com/video/${o}_1920x1080.webp`:"",s={title:t?.title??"",duration:t?.duration??0,poster:n,pro:"basic"!==t.account_type};return i.set(e,s),s})).finally((()=>s.delete(e)));return s.set(e,c),c}}}]);