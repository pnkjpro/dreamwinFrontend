import{l as y,n as g,p as h,F as d}from"./index-BKP1bS1o.js";import{u as _}from"./quizStore-CgyaN_YS.js";import{A as k,s as m,r as T,m as I,q,c as l,a as e,g as f,h as o,t as Q,j as S,o as n,k as C}from"./index-DYW0LGQL.js";import{u as L}from"./mainStore-YijVIKTH.js";import{f as N,a as A}from"./fromUnixTime-BXOQ5KsG.js";const R={class:"flex flex-col min-h-screen bg-white"},U={class:"m-4"},E={class:"border border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center"},z={class:"mb-2"},D={key:0,class:"text-red-500 font-bold flex items-center"},V={key:1,class:"text-blue-500 font-medium"},B={class:"px-4 mb-4"},O={class:"relative w-full overflow-hidden",style:{"padding-top":"56.25%"}},P={class:"absolute bottom-0 left-0 right-0"},j={class:"flex items-center"},Z={class:"bg-red-600 text-white px-2 py-0.5 inline-flex items-center text-sm"},$={__name:"GameInstruction",setup(F){y.add(g,h);const i=_(),p=L(),a=C(),x=k();m(i);const{contest:r}=m(p),b=async()=>{const s=await i.playQuiz();s.success||x.error(s.message),s.success&&a.push("/quiz/play")},c=T(new Date);I(()=>{const s=setInterval(()=>{c.value=new Date},6e4);q(()=>{clearInterval(s)})});function u(s){const t=typeof s=="number"?N(s):new Date(s);return c.value>=t?{isLive:!0,text:"LIVE"}:{isLive:!1,text:A(t)+" left"}}const w=()=>{a.back()};return(s,t)=>(n(),l("div",R,[e("div",{onClick:w,class:"bg-orange-500 text-white p-3 flex items-center"},[f(o(d),{icon:"arrow-left",class:"mr-2"})]),t[5]||(t[5]=e("div",{class:"px-4 py-3 border-b border-gray-200 flex justify-between items-center"},[e("h2",{class:"font-bold text-base"},"WANT TO CRACK QUIZ"),e("span",{class:"text-blue-500 text-xs"},"Click Here to Know")],-1)),e("div",U,[e("div",E,[t[1]||(t[1]=e("h1",{class:"text-3xl font-semibold text-gray-600"},"SPORT QUIZ",-1)),e("div",z,[u(o(r).start_time).isLive?(n(),l("p",D,[e("button",{onClick:t[0]||(t[0]=v=>b()),class:"bg-green-400 hover:bg-gray-500 text-white font-medium px-8 py-1.5 text-sm mt-1 rounded"}," START ")])):(n(),l("p",V,Q(u(o(r).start_time).text),1))])])]),t[6]||(t[6]=e("div",{class:"px-4 mb-4"},[e("h3",{class:"font-bold text-base mb-3"},"QUESTION PAPER INSTRUCTIONS!"),e("ol",{class:"space-y-1 text-sm ml-5 list-decimal"},[e("li",null,"1 Question at one time"),e("li",null,"It Consist of 100 Question"),e("li",null,"You cannot solve or correct previous question, once submitted cant be change"),e("li",null,"1-20 question of 1 marks each and you will get 25 seconds for each question"),e("li",null,"20-40 question of 2 mark and you will get 50 sec for each question"),e("li",null,"40-70 question of 5 mark and you will get 1 min 20 sec for each question"),e("li",null,"70-100 question of 3 mark and you will get 45 sec for each question")])],-1)),e("div",B,[e("div",O,[t[4]||(t[4]=e("iframe",{class:"absolute top-0 left-0 w-full h-full",src:"https://www.youtube.com/embed/dQw4w9WgXcQ",title:"Tech Quiz Live",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowfullscreen:""},null,-1)),e("div",P,[e("div",j,[t[3]||(t[3]=e("div",{class:"bg-yellow-400 text-black font-bold px-3 py-1"}," TECH QUIZ ",-1)),e("div",Z,[f(o(d),{icon:"circle",class:"text-xs mr-1"}),t[2]||(t[2]=S(" LIVE "))])])])])])]))}};export{$ as default};
