import{l as z,n as q,F as C}from"./index-BKP1bS1o.js";import{A as S,u as L,s as x,m as _,r as D,q as N,c as a,a as e,g as I,h as f,F as V,b as B,l as R,o as i,t as n,j as T,k as A}from"./index-DYW0LGQL.js";import{u as F}from"./quizStore-CgyaN_YS.js";import{u as M}from"./mainStore-YijVIKTH.js";import{f as w,a as $}from"./fromUnixTime-BXOQ5KsG.js";const E={class:"flex flex-col min-h-screen bg-gray-100"},U={class:"w-full overflow-x-auto rounded-lg shadow-sm"},Q={class:"min-w-full divide-y divide-gray-200"},j={class:"bg-white divide-y divide-gray-200"},P={class:"hover:bg-gray-50"},G={class:"px-4 py-4 whitespace-nowrap text-sm text-gray-900"},H={class:"px-4 py-4 whitespace-nowrap text-sm font-medium"},J={class:"px-4 py-4 whitespace-nowrap text-sm font-medium"},K={class:"px-4 py-4 whitespace-nowrap"},O={class:"mb-2"},W=["onClick"],X=["onClick"],Y={key:2,class:"text-blue-500 font-medium"},Z={key:0,class:"py-8 text-center text-gray-500"},nt={__name:"MyContests",setup(tt){z.add(q);const c=A();S();const l=F(),y=L(),d=M();x(y);const{responses:p}=x(l),{contest:g}=x(d);_(()=>{l.getUserResponses()});const h=D(new Date);_(()=>{const o=setInterval(()=>{h.value=new Date},6e4);N(()=>{clearInterval(o)})});function r(o,s){const t=new Date,u=typeof o=="number"?w(o):new Date(o),m=typeof s=="number"?w(s):new Date(s);return t>=m?{isLive:!1,text:"Show Result"}:t>=u?{isLive:!0,text:"LIVE"}:{isLive:!1,text:$(u)+" left"}}const v=async(o,s)=>{g.value||await d.fetchCurrentContest(o),d.getPrizeContents(s),c.push("/variant/details")},b=o=>{l.getLeaderboard(o),c.push("/quiz/leaderboard")},k=()=>{c.back()};return(o,s)=>(i(),a("div",E,[e("div",{onClick:s[0]||(s[0]=t=>k()),class:"bg-orange-500 text-white p-3 flex items-center"},[I(f(C),{icon:"arrow-left",class:"mr-2"}),s[1]||(s[1]=e("span",{class:"font-medium"},"My Contests",-1))]),e("div",U,[e("table",Q,[s[3]||(s[3]=e("thead",{class:"bg-gray-50"},[e("tr",null,[e("th",{scope:"col",class:"px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"},"Node ID"),e("th",{scope:"col",class:"px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"},"Quiz Name"),e("th",{scope:"col",class:"px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"},"Score"),e("th",{scope:"col",class:"px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"},"Status")])],-1)),e("tbody",j,[(i(!0),a(V,null,B(f(p),(t,u)=>(i(),a("tr",P,[e("td",G,n(t.node_id),1),e("td",H,n(t.quiz.title),1),e("td",J,n(t.score),1),e("td",K,[e("div",O,[r(t.quiz.start_time,t.quiz.end_time).isLive?(i(),a("p",{key:0,onClick:m=>v(t.node_id,t.quiz_variant_id),class:"text-red-500 font-bold flex items-center"},s[2]||(s[2]=[e("span",{class:"inline-block h-2 w-2 rounded-full bg-red-500 mr-2"},null,-1),T(" LIVE ")]),8,W)):r(t.quiz.start_time,t.quiz.end_time).text==="Show Result"?(i(),a("p",{key:1,onClick:m=>b(t.node_id),class:"text-blue-500 font-medium"},n(r(t.quiz.start_time,t.quiz.end_time).text),9,X)):(i(),a("p",Y,n(r(t.quiz.start_time,t.quiz.end_time).text),1))])])]))),256))])]),f(p).length===0?(i(),a("div",Z," No data available. ")):R("",!0)])]))}};export{nt as default};
