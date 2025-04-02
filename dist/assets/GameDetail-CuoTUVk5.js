import{u as z}from"./mainStore-YijVIKTH.js";import{A,u as T,s as x,p as b,c as s,a as e,g as R,h as a,t as i,F as j,b as B,o,k as C}from"./index-DYW0LGQL.js";import{l as F,n as G,F as $}from"./index-BKP1bS1o.js";import{u as q}from"./transactionStore-C28jmiPS.js";const I={class:"flex flex-col min-h-screen bg-gray-100"},J={class:"m-4"},N={class:"bg-white rounded-xl p-4 shadow-sm"},V={class:"text-3xl font-bold my-1"},D={class:"flex justify-between text-xs"},L={class:"text-gray-500"},O={class:"mx-4 my-2"},P={key:1,disabled:"",class:"w-full bg-stone-400 text-white py-3 rounded-lg font-medium"},E={key:2,disabled:"",class:"w-full bg-stone-400 text-white py-3 rounded-lg font-medium"},M={class:"overflow-y-auto flex-1"},Q={class:"w-full"},W={class:"text-left py-3 px-6"},H={class:"text-right py-3 px-6 text-gray-700"},tt={__name:"GameDetail",setup(K){F.add(G);const d=C(),m=A(),g=z(),v=T(),y=q(),{contest:_,prizeContents:f,variant:n}=x(g),{user:h}=x(v),w=async r=>{const t=await y.joinGame(n.value.id);t.success?(m.success(t.message),d.push("/quiz/instruction")):m.error(t.message)},u=b(()=>{var r;return((r=h.value)==null?void 0:r.user_responses.find(t=>t.node_id===_.value.node_id))||null}),c=b(()=>u.value?u.value.quiz_variant_id===n.value.id?u.value.status:"disabled":"pending"),k=()=>{d.back()},S=r=>{d.push(r)};return console.log(f.value),(r,t)=>(o(),s("div",I,[e("div",{onClick:t[0]||(t[0]=l=>k()),class:"bg-orange-500 text-white p-3 flex items-center"},[R(a($),{icon:"arrow-left",class:"mr-2"})]),e("div",J,[e("div",N,[t[4]||(t[4]=e("div",{class:"text-gray-500 text-sm"},"Prize Pool",-1)),e("div",V,"₹ "+i(a(n).prize),1),t[5]||(t[5]=e("div",{class:"h-1 bg-red-500 w-full my-1"},null,-1)),e("div",D,[t[3]||(t[3]=e("div",{class:"text-red-500"},"5 spot left",-1)),e("div",L,"Total Spot : "+i(a(n).slot_limit),1)])])]),e("div",O,[c.value=="joined"?(o(),s("button",{key:0,onClick:t[1]||(t[1]=l=>S("/quiz/instruction")),class:"w-full bg-green-500 text-white py-3 rounded-lg font-medium"}," Start Quiz ")):c.value=="disabled"?(o(),s("button",P," Joined Other Variant! ")):c.value=="initiated"?(o(),s("button",E," Game Already Started! ")):(o(),s("button",{key:3,onClick:t[2]||(t[2]=l=>w(a(n).id)),class:"w-full bg-green-500 text-white py-3 rounded-lg font-medium"}," JOIN ₹ "+i(a(n).entry_fee),1))]),t[7]||(t[7]=e("div",{class:"flex border-b border-gray-200 mt-2"},[e("div",{class:"flex-1 text-center py-3 text-red-700 font-medium border-b-2 border-red-700"}," Winning ")],-1)),e("div",M,[e("table",Q,[t[6]||(t[6]=e("thead",null,[e("tr",{class:"border-b border-gray-200"},[e("th",{class:"text-left py-4 px-6 text-red-700 font-medium"},"Rank"),e("th",{class:"text-right py-4 px-6 text-red-700 font-medium"},"Amount")])],-1)),e("tbody",null,[(o(!0),s(j,null,B(a(f),(l,p)=>(o(),s("tr",{key:p,class:"border-b border-gray-100"},[e("td",W,"Rank "+i(p),1),e("td",H,"₹ "+i(l),1)]))),128))])])])]))}};export{tt as default};
