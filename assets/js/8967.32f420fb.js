"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[8967],{8967:(e,l,t)=>{t.r(l),t.d(l,{default:()=>p});var s=t(9564),a=t(7514),i=t(1610),r=t(5598),u=t(6254),n=t(4469),h=t(8301),c=t(7134);const o=["/","/Algorithm/C.html","/Algorithm/DP_L_I_T.html","/Algorithm/Disc_FT.html","/Algorithm/GA.html","/Algorithm/K-DP.html","/Algorithm/LIS.html","/Algorithm/","/Algorithm/SA.html","/Algorithm/string.html","/Front/","/Front/Vue.html","/Front/layout.html","/Front/page.html","/Back/","/Linux/FixIssue.html","/Linux/","/Linux/nmcli.html","/Linux/shell.html","/Other/","/Other/git.html","/Other/markdown.html","/Other/qt.html","/404.html","/category/","/category/%E7%AE%97%E6%B3%95%E7%9F%A5%E8%AF%86/","/category/%E7%9F%A5%E8%AF%86%E7%82%B9/","/category/%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97/","/category/%E4%BD%BF%E7%94%A8%E5%B7%A5%E5%85%B7/","/category/%E5%B7%A5%E5%85%B7/","/tag/","/tag/%E7%9F%A5%E8%AF%86%E7%82%B9/","/tag/%E5%89%8D%E7%AB%AF/","/tag/%E5%B8%83%E5%B1%80/","/tag/%E6%8E%A7%E5%88%B6%E7%B3%BB%E7%BB%9F/","/tag/%E8%AF%AD%E8%A8%80/","/article/","/star/","/timeline/"],v=(0,a.Mjh)("SLIMSEARCH_QUERY_HISTORY",[]),m=e=>o[e.id]+("anchor"in e?`#${e.anchor}`:""),{resultHistoryCount:y}=h.o,d=(0,a.Mjh)("SLIMSEARCH_RESULT_HISTORY",[]);var p=(0,u.pM)({name:"SearchResult",props:{queries:{type:Array,required:!0},isFocusing:Boolean},emits:["close","updateQuery"],setup(e,{emit:l}){const t=(0,n.rd)(),o=(0,n.Zv)(),p=(0,s.s5)(h.l),{enabled:g,addQueryHistory:E,queryHistories:A,removeQueryHistory:B}=(()=>{const{queryHistoryCount:e}=h.o,l=e>0;return{enabled:l,queryHistories:v,addQueryHistory:t=>{l&&(v.value=Array.from(new Set([t,...v.value.slice(0,e-1)])))},removeQueryHistory:e=>{v.value=[...v.value.slice(0,e),...v.value.slice(e+1)]}}})(),{enabled:H,resultHistories:F,addResultHistory:f,removeResultHistory:k}=(()=>{const e=y>0;return{enabled:e,resultHistories:d,addResultHistory:l=>{if(e){const e={link:m(l),display:l.display};"header"in l&&(e.header=l.header),d.value=[e,...d.value.slice(0,y-1)]}},removeResultHistory:e=>{d.value=[...d.value.slice(0,e),...d.value.slice(e+1)]}}})(),x=g||H,Q=(0,r.lW)(e,"queries"),{results:R,isSearching:S}=(e=>{const l=(0,h.u)(),t=(0,n.Zv)(),s=(0,n.BV)(),a=(0,r.KR)(0),c=(0,u.EW)((()=>a.value>0)),o=(0,r.IJ)([]);return(0,u.sV)((()=>{const{search:r,terminate:n}=(0,h.c)(),c=(0,i.Q0)((e=>{const{resultsFilter:i=e=>e,querySplitter:u,suggestionsFilter:n,...h}=l.value;e?(a.value+=1,r(e,t.value,h).then((l=>i(l,e,t.value,s.value))).then((e=>{a.value-=1,o.value=e})).catch((e=>{console.warn(e),a.value-=1,a.value||(o.value=[])}))):o.value=[]}),h.o.searchDelay-h.o.suggestDelay,{maxWait:5e3});(0,i.T3)([e,t],(([e])=>c(e.join(" ")))),(0,u.hi)((()=>{n()}))})),{isSearching:c,results:o}})(Q),w=(0,r.Kh)({isQuery:!0,index:0}),C=(0,r.KR)(0),D=(0,r.KR)(0),q=(0,u.EW)((()=>x&&(A.value.length>0||F.value.length>0))),b=(0,u.EW)((()=>R.value.length>0)),L=(0,u.EW)((()=>R.value[C.value]||null)),T=e=>e.map((e=>(0,s.Kg)(e)?e:(0,u.h)(e[0],e[1]))),I=e=>{if("customField"===e.type){const l=h.a[e.index]||"$content",[t,a=""]=(0,s.Qd)(l)?l[o.value].split("$content"):l.split("$content");return e.display.map((e=>(0,u.h)("div",T([t,...e,a]))))}return e.display.map((e=>(0,u.h)("div",T(e))))},M=()=>{C.value=0,D.value=0,l("updateQuery",""),l("close")};return(0,a.MLh)("keydown",(s=>{if(e.isFocusing)if(b.value){if("ArrowUp"===s.key)D.value>0?D.value-=1:(C.value=C.value>0?C.value-1:R.value.length-1,D.value=L.value.contents.length-1);else if("ArrowDown"===s.key)D.value<L.value.contents.length-1?D.value+=1:(C.value=C.value<R.value.length-1?C.value+1:0,D.value=0);else if("Enter"===s.key){const l=L.value.contents[D.value];E(e.queries.join(" ")),f(l),t.push(m(l)),M()}}else if(H)if("ArrowUp"===s.key)(()=>{const{isQuery:e,index:l}=w;0===l?(w.isQuery=!e,w.index=e?F.value.length-1:A.value.length-1):w.index=l-1})();else if("ArrowDown"===s.key)(()=>{const{isQuery:e,index:l}=w;l===(e?A.value.length-1:F.value.length-1)?(w.isQuery=!e,w.index=0):w.index=l+1})();else if("Enter"===s.key){const{index:e}=w;w.isQuery?(l("updateQuery",A.value[e]),s.preventDefault()):(t.push(F.value[e].link),M())}})),(0,u.wB)([C,D],(()=>{document.querySelector(".slimsearch-result-list-item.active .slimsearch-result-item.active")?.scrollIntoView(!1)}),{flush:"post"}),()=>(0,u.h)("div",{class:["slimsearch-result-wrapper",{empty:e.queries.length?!b.value:!q.value}],id:"slimsearch-results"},e.queries.length?S.value?(0,u.h)(c.S,{hint:p.value.searching}):b.value?(0,u.h)("ul",{class:"slimsearch-result-list"},R.value.map((({title:l,contents:t},s)=>{const a=C.value===s;return(0,u.h)("li",{class:["slimsearch-result-list-item",{active:a}]},[(0,u.h)("div",{class:"slimsearch-result-title"},l||p.value.defaultTitle),t.map(((l,t)=>{const s=a&&D.value===t;return(0,u.h)(n.Wt,{to:m(l),class:["slimsearch-result-item",{active:s,"aria-selected":s}],onClick:()=>{E(e.queries.join(" ")),f(l),M()}},(()=>["text"===l.type?null:(0,u.h)("title"===l.type?c.T:"heading"===l.type?c.H:c.a,{class:"slimsearch-result-type"}),(0,u.h)("div",{class:"slimsearch-result-content"},["text"===l.type&&l.header?(0,u.h)("div",{class:"content-header"},l.header):null,(0,u.h)("div",I(l))])]))}))])}))):p.value.emptyResult:x?q.value?[g?(0,u.h)("ul",{class:"slimsearch-result-list"},(0,u.h)("li",{class:"slimsearch-result-list-item"},[(0,u.h)("div",{class:"slimsearch-result-title"},p.value.queryHistory),A.value.map(((e,t)=>(0,u.h)("div",{class:["slimsearch-result-item",{active:w.isQuery&&w.index===t}],onClick:()=>{l("updateQuery",e)}},[(0,u.h)(c.b,{class:"slimsearch-result-type"}),(0,u.h)("div",{class:"slimsearch-result-content"},e),(0,u.h)("button",{class:"slimsearch-remove-icon",innerHTML:c.C,onClick:e=>{e.preventDefault(),e.stopPropagation(),B(t)}})])))])):null,H?(0,u.h)("ul",{class:"slimsearch-result-list"},(0,u.h)("li",{class:"slimsearch-result-list-item"},[(0,u.h)("div",{class:"slimsearch-result-title"},p.value.resultHistory),F.value.map(((e,l)=>(0,u.h)(n.Wt,{to:e.link,class:["slimsearch-result-item",{active:!w.isQuery&&w.index===l}],onClick:()=>{M()}},(()=>[(0,u.h)(c.b,{class:"slimsearch-result-type"}),(0,u.h)("div",{class:"slimsearch-result-content"},[e.header?(0,u.h)("div",{class:"content-header"},e.header):null,(0,u.h)("div",e.display.map((e=>T(e))).flat())]),(0,u.h)("button",{class:"slimsearch-remove-icon",innerHTML:c.C,onClick:e=>{e.preventDefault(),e.stopPropagation(),k(l)}})]))))])):null]:p.value.emptyHistory:p.value.emptyResult)}})}}]);