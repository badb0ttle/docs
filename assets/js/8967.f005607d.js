"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[8967],{8967:(e,l,t)=>{t.r(l),t.d(l,{default:()=>g});var s=t(9564),a=t(7514),r=t(1610),i=t(5598),u=t(6254),n=t(4469),h=t(8301),o=t(7134);const c=["/","/Algorithm/C.html","/Algorithm/DP_L_I_T.html","/Algorithm/Disc_FT.html","/Algorithm/GA.html","/Algorithm/K-DP.html","/Algorithm/LIS.html","/Algorithm/MST.html","/Algorithm/Pr_queue.html","/Algorithm/","/Algorithm/SA.html","/Algorithm/SP.html","/Algorithm/mod.html","/Algorithm/string.html","/Back/","/Front/","/Front/Vue.html","/Front/layout.html","/Front/page.html","/Linux/FixIssue.html","/Linux/","/Linux/hbase.html","/Linux/nmcli.html","/Linux/shell.html","/Other/","/Other/docker.html","/Other/git.html","/Other/markdown.html","/Other/qt.html","/404.html","/category/","/category/%E7%AE%97%E6%B3%95%E7%9F%A5%E8%AF%86/","/category/%E7%9F%A5%E8%AF%86%E7%82%B9/","/category/%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97/","/category/%E4%BD%BF%E7%94%A8%E5%B7%A5%E5%85%B7/","/category/%E4%BA%91%E8%AE%A1%E7%AE%97/","/category/%E5%B7%A5%E5%85%B7/","/category/%E8%AF%BE%E5%86%85%E7%9F%A5%E8%AF%86/","/tag/","/tag/%E7%9F%A5%E8%AF%86%E7%82%B9/","/tag/%E5%89%8D%E7%AB%AF/","/tag/%E5%B8%83%E5%B1%80/","/tag/%E6%8E%A7%E5%88%B6%E7%B3%BB%E7%BB%9F/","/tag/%E8%AF%AD%E8%A8%80/","/article/","/star/","/timeline/"],v=(0,a.Mjh)("SLIMSEARCH_QUERY_HISTORY",[]),m=e=>c[e.id]+("anchor"in e?`#${e.anchor}`:""),{resultHistoryCount:y}=h.o,d=(0,a.Mjh)("SLIMSEARCH_RESULT_HISTORY",[]);var g=(0,u.pM)({name:"SearchResult",props:{queries:{type:Array,required:!0},isFocusing:Boolean},emits:["close","updateQuery"],setup(e,{emit:l}){const t=(0,n.rd)(),c=(0,n.Zv)(),g=(0,s.s5)(h.l),{enabled:p,addQueryHistory:E,queryHistories:A,removeQueryHistory:B}=(()=>{const{queryHistoryCount:e}=h.o,l=e>0;return{enabled:l,queryHistories:v,addQueryHistory:t=>{l&&(v.value=Array.from(new Set([t,...v.value.slice(0,e-1)])))},removeQueryHistory:e=>{v.value=[...v.value.slice(0,e),...v.value.slice(e+1)]}}})(),{enabled:F,resultHistories:H,addResultHistory:k,removeResultHistory:f}=(()=>{const e=y>0;return{enabled:e,resultHistories:d,addResultHistory:l=>{if(e){const e={link:m(l),display:l.display};"header"in l&&(e.header=l.header),d.value=[e,...d.value.slice(0,y-1)]}},removeResultHistory:e=>{d.value=[...d.value.slice(0,e),...d.value.slice(e+1)]}}})(),x=p||F,Q=(0,i.lW)(e,"queries"),{results:S,isSearching:R}=(e=>{const l=(0,h.u)(),t=(0,n.Zv)(),s=(0,n.BV)(),a=(0,i.KR)(0),o=(0,u.EW)((()=>a.value>0)),c=(0,i.IJ)([]);return(0,u.sV)((()=>{const{search:i,terminate:n}=(0,h.c)(),o=(0,r.Q0)((e=>{const{resultsFilter:r=e=>e,querySplitter:u,suggestionsFilter:n,...h}=l.value;e?(a.value+=1,i(e,t.value,h).then((l=>r(l,e,t.value,s.value))).then((e=>{a.value-=1,c.value=e})).catch((e=>{console.warn(e),a.value-=1,a.value||(c.value=[])}))):c.value=[]}),h.o.searchDelay-h.o.suggestDelay,{maxWait:5e3});(0,r.T3)([e,t],(([e])=>o(e.join(" ")))),(0,u.hi)((()=>{n()}))})),{isSearching:o,results:c}})(Q),q=(0,i.Kh)({isQuery:!0,index:0}),w=(0,i.KR)(0),C=(0,i.KR)(0),D=(0,u.EW)((()=>x&&(A.value.length>0||H.value.length>0))),b=(0,u.EW)((()=>S.value.length>0)),L=(0,u.EW)((()=>S.value[w.value]||null)),T=e=>e.map((e=>(0,s.Kg)(e)?e:(0,u.h)(e[0],e[1]))),I=e=>{if("customField"===e.type){const l=h.a[e.index]||"$content",[t,a=""]=(0,s.Qd)(l)?l[c.value].split("$content"):l.split("$content");return e.display.map((e=>(0,u.h)("div",T([t,...e,a]))))}return e.display.map((e=>(0,u.h)("div",T(e))))},M=()=>{w.value=0,C.value=0,l("updateQuery",""),l("close")};return(0,a.MLh)("keydown",(s=>{if(e.isFocusing)if(b.value){if("ArrowUp"===s.key)C.value>0?C.value-=1:(w.value=w.value>0?w.value-1:S.value.length-1,C.value=L.value.contents.length-1);else if("ArrowDown"===s.key)C.value<L.value.contents.length-1?C.value+=1:(w.value=w.value<S.value.length-1?w.value+1:0,C.value=0);else if("Enter"===s.key){const l=L.value.contents[C.value];E(e.queries.join(" ")),k(l),t.push(m(l)),M()}}else if(F)if("ArrowUp"===s.key)(()=>{const{isQuery:e,index:l}=q;0===l?(q.isQuery=!e,q.index=e?H.value.length-1:A.value.length-1):q.index=l-1})();else if("ArrowDown"===s.key)(()=>{const{isQuery:e,index:l}=q;l===(e?A.value.length-1:H.value.length-1)?(q.isQuery=!e,q.index=0):q.index=l+1})();else if("Enter"===s.key){const{index:e}=q;q.isQuery?(l("updateQuery",A.value[e]),s.preventDefault()):(t.push(H.value[e].link),M())}})),(0,u.wB)([w,C],(()=>{document.querySelector(".slimsearch-result-list-item.active .slimsearch-result-item.active")?.scrollIntoView(!1)}),{flush:"post"}),()=>(0,u.h)("div",{class:["slimsearch-result-wrapper",{empty:e.queries.length?!b.value:!D.value}],id:"slimsearch-results"},e.queries.length?R.value?(0,u.h)(o.S,{hint:g.value.searching}):b.value?(0,u.h)("ul",{class:"slimsearch-result-list"},S.value.map((({title:l,contents:t},s)=>{const a=w.value===s;return(0,u.h)("li",{class:["slimsearch-result-list-item",{active:a}]},[(0,u.h)("div",{class:"slimsearch-result-title"},l||g.value.defaultTitle),t.map(((l,t)=>{const s=a&&C.value===t;return(0,u.h)(n.Wt,{to:m(l),class:["slimsearch-result-item",{active:s,"aria-selected":s}],onClick:()=>{E(e.queries.join(" ")),k(l),M()}},(()=>["text"===l.type?null:(0,u.h)("title"===l.type?o.T:"heading"===l.type?o.H:o.a,{class:"slimsearch-result-type"}),(0,u.h)("div",{class:"slimsearch-result-content"},["text"===l.type&&l.header?(0,u.h)("div",{class:"content-header"},l.header):null,(0,u.h)("div",I(l))])]))}))])}))):g.value.emptyResult:x?D.value?[p?(0,u.h)("ul",{class:"slimsearch-result-list"},(0,u.h)("li",{class:"slimsearch-result-list-item"},[(0,u.h)("div",{class:"slimsearch-result-title"},g.value.queryHistory),A.value.map(((e,t)=>(0,u.h)("div",{class:["slimsearch-result-item",{active:q.isQuery&&q.index===t}],onClick:()=>{l("updateQuery",e)}},[(0,u.h)(o.b,{class:"slimsearch-result-type"}),(0,u.h)("div",{class:"slimsearch-result-content"},e),(0,u.h)("button",{class:"slimsearch-remove-icon",innerHTML:o.C,onClick:e=>{e.preventDefault(),e.stopPropagation(),B(t)}})])))])):null,F?(0,u.h)("ul",{class:"slimsearch-result-list"},(0,u.h)("li",{class:"slimsearch-result-list-item"},[(0,u.h)("div",{class:"slimsearch-result-title"},g.value.resultHistory),H.value.map(((e,l)=>(0,u.h)(n.Wt,{to:e.link,class:["slimsearch-result-item",{active:!q.isQuery&&q.index===l}],onClick:()=>{M()}},(()=>[(0,u.h)(o.b,{class:"slimsearch-result-type"}),(0,u.h)("div",{class:"slimsearch-result-content"},[e.header?(0,u.h)("div",{class:"content-header"},e.header):null,(0,u.h)("div",e.display.map((e=>T(e))).flat())]),(0,u.h)("button",{class:"slimsearch-remove-icon",innerHTML:o.C,onClick:e=>{e.preventDefault(),e.stopPropagation(),f(l)}})]))))])):null]:g.value.emptyHistory:g.value.emptyResult)}})}}]);