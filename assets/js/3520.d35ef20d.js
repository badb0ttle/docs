"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[3520],{3520:(e,l,t)=>{t.r(l),t.d(l,{default:()=>p});var s=t(2176),a=t(1303),i=t(3289),r=t(953),u=t(641),n=t(8278),h=t(691),c=t(7796);const o=["/","/Algorithm/C.html","/Algorithm/DP_L_I_T.html","/Algorithm/Disc_FT.html","/Algorithm/GA.html","/Algorithm/K-DP.html","/Algorithm/LIS.html","/Algorithm/","/Algorithm/SA.html","/Algorithm/string.html","/Front/","/Front/Vue.html","/Front/layout.html","/Front/markdown.html","/Front/page.html","/Back/","/Linux/","/Linux/shell.html","/Other/","/Other/git.html","/404.html","/category/","/category/%E7%AE%97%E6%B3%95%E7%9F%A5%E8%AF%86/","/category/%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97/","/tag/","/tag/%E7%9F%A5%E8%AF%86%E7%82%B9/","/tag/%E5%B8%83%E5%B1%80/","/article/","/star/","/timeline/"],v=(0,a.Mjh)("SLIMSEARCH_QUERY_HISTORY",[]),m=e=>o[e.id]+("anchor"in e?`#${e.anchor}`:""),{resultHistoryCount:d}=h.o,y=(0,a.Mjh)("SLIMSEARCH_RESULT_HISTORY",[]);var p=(0,u.pM)({name:"SearchResult",props:{queries:{type:Array,required:!0},isFocusing:Boolean},emits:["close","updateQuery"],setup(e,{emit:l}){const t=(0,n.rd)(),o=(0,n.Zv)(),p=(0,s.s5)(h.l),{enabled:g,addQueryHistory:A,queryHistories:E,removeQueryHistory:H}=(()=>{const{queryHistoryCount:e}=h.o,l=e>0;return{enabled:l,queryHistories:v,addQueryHistory:t=>{l&&(v.value=Array.from(new Set([t,...v.value.slice(0,e-1)])))},removeQueryHistory:e=>{v.value=[...v.value.slice(0,e),...v.value.slice(e+1)]}}})(),{enabled:f,resultHistories:k,addResultHistory:Q,removeResultHistory:x}=(()=>{const e=d>0;return{enabled:e,resultHistories:y,addResultHistory:l=>{if(e){const e={link:m(l),display:l.display};"header"in l&&(e.header=l.header),y.value=[e,...y.value.slice(0,d-1)]}},removeResultHistory:e=>{y.value=[...y.value.slice(0,e),...y.value.slice(e+1)]}}})(),F=g||f,R=(0,r.lW)(e,"queries"),{results:S,isSearching:w}=(e=>{const l=(0,h.u)(),t=(0,n.Zv)(),s=(0,n.BV)(),a=(0,r.KR)(0),c=(0,u.EW)((()=>a.value>0)),o=(0,r.IJ)([]);return(0,u.sV)((()=>{const{search:r,terminate:n}=(0,h.c)(),c=(0,i.Q0)((e=>{const{resultsFilter:i=e=>e,querySplitter:u,suggestionsFilter:n,...h}=l.value;e?(a.value+=1,r(e,t.value,h).then((l=>i(l,e,t.value,s.value))).then((e=>{a.value-=1,o.value=e})).catch((e=>{console.warn(e),a.value-=1,a.value||(o.value=[])}))):o.value=[]}),h.o.searchDelay-h.o.suggestDelay,{maxWait:5e3});(0,i.T3)([e,t],(([e])=>c(e.join(" ")))),(0,u.hi)((()=>{n()}))})),{isSearching:c,results:o}})(R),C=(0,r.Kh)({isQuery:!0,index:0}),q=(0,r.KR)(0),b=(0,r.KR)(0),D=(0,u.EW)((()=>F&&(E.value.length>0||k.value.length>0))),B=(0,u.EW)((()=>S.value.length>0)),L=(0,u.EW)((()=>S.value[q.value]||null)),T=e=>e.map((e=>(0,s.Kg)(e)?e:(0,u.h)(e[0],e[1]))),I=e=>{if("customField"===e.type){const l=h.a[e.index]||"$content",[t,a=""]=(0,s.Qd)(l)?l[o.value].split("$content"):l.split("$content");return e.display.map((e=>(0,u.h)("div",T([t,...e,a]))))}return e.display.map((e=>(0,u.h)("div",T(e))))},M=()=>{q.value=0,b.value=0,l("updateQuery",""),l("close")};return(0,a.MLh)("keydown",(s=>{if(e.isFocusing)if(B.value){if("ArrowUp"===s.key)b.value>0?b.value-=1:(q.value=q.value>0?q.value-1:S.value.length-1,b.value=L.value.contents.length-1);else if("ArrowDown"===s.key)b.value<L.value.contents.length-1?b.value+=1:(q.value=q.value<S.value.length-1?q.value+1:0,b.value=0);else if("Enter"===s.key){const l=L.value.contents[b.value];A(e.queries.join(" ")),Q(l),t.push(m(l)),M()}}else if(f)if("ArrowUp"===s.key)(()=>{const{isQuery:e,index:l}=C;0===l?(C.isQuery=!e,C.index=e?k.value.length-1:E.value.length-1):C.index=l-1})();else if("ArrowDown"===s.key)(()=>{const{isQuery:e,index:l}=C;l===(e?E.value.length-1:k.value.length-1)?(C.isQuery=!e,C.index=0):C.index=l+1})();else if("Enter"===s.key){const{index:e}=C;C.isQuery?(l("updateQuery",E.value[e]),s.preventDefault()):(t.push(k.value[e].link),M())}})),(0,u.wB)([q,b],(()=>{document.querySelector(".slimsearch-result-list-item.active .slimsearch-result-item.active")?.scrollIntoView(!1)}),{flush:"post"}),()=>(0,u.h)("div",{class:["slimsearch-result-wrapper",{empty:e.queries.length?!B.value:!D.value}],id:"slimsearch-results"},e.queries.length?w.value?(0,u.h)(c.S,{hint:p.value.searching}):B.value?(0,u.h)("ul",{class:"slimsearch-result-list"},S.value.map((({title:l,contents:t},s)=>{const a=q.value===s;return(0,u.h)("li",{class:["slimsearch-result-list-item",{active:a}]},[(0,u.h)("div",{class:"slimsearch-result-title"},l||p.value.defaultTitle),t.map(((l,t)=>{const s=a&&b.value===t;return(0,u.h)(n.Wt,{to:m(l),class:["slimsearch-result-item",{active:s,"aria-selected":s}],onClick:()=>{A(e.queries.join(" ")),Q(l),M()}},(()=>["text"===l.type?null:(0,u.h)("title"===l.type?c.T:"heading"===l.type?c.H:c.a,{class:"slimsearch-result-type"}),(0,u.h)("div",{class:"slimsearch-result-content"},["text"===l.type&&l.header?(0,u.h)("div",{class:"content-header"},l.header):null,(0,u.h)("div",I(l))])]))}))])}))):p.value.emptyResult:F?D.value?[g?(0,u.h)("ul",{class:"slimsearch-result-list"},(0,u.h)("li",{class:"slimsearch-result-list-item"},[(0,u.h)("div",{class:"slimsearch-result-title"},p.value.queryHistory),E.value.map(((e,t)=>(0,u.h)("div",{class:["slimsearch-result-item",{active:C.isQuery&&C.index===t}],onClick:()=>{l("updateQuery",e)}},[(0,u.h)(c.b,{class:"slimsearch-result-type"}),(0,u.h)("div",{class:"slimsearch-result-content"},e),(0,u.h)("button",{class:"slimsearch-remove-icon",innerHTML:c.C,onClick:e=>{e.preventDefault(),e.stopPropagation(),H(t)}})])))])):null,f?(0,u.h)("ul",{class:"slimsearch-result-list"},(0,u.h)("li",{class:"slimsearch-result-list-item"},[(0,u.h)("div",{class:"slimsearch-result-title"},p.value.resultHistory),k.value.map(((e,l)=>(0,u.h)(n.Wt,{to:e.link,class:["slimsearch-result-item",{active:!C.isQuery&&C.index===l}],onClick:()=>{M()}},(()=>[(0,u.h)(c.b,{class:"slimsearch-result-type"}),(0,u.h)("div",{class:"slimsearch-result-content"},[e.header?(0,u.h)("div",{class:"content-header"},e.header):null,(0,u.h)("div",e.display.map((e=>T(e))).flat())]),(0,u.h)("button",{class:"slimsearch-remove-icon",innerHTML:c.C,onClick:e=>{e.preventDefault(),e.stopPropagation(),x(l)}})]))))])):null]:p.value.emptyHistory:p.value.emptyResult)}})}}]);