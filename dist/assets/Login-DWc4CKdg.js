import{r as n,u as y,c as u,a as e,F as f,b,d as w,w as h,e as i,v as k,f as M,g as E,h as L,i as S,j as I,o as c,n as N,t as V,k as D}from"./index-DYW0LGQL.js";import{l as F,f as T,a as _,F as B}from"./index-BKP1bS1o.js";import{f as P,a as A}from"./index-BwxAXx0b.js";const R={class:"min-h-screen bg-gradient-to-b from-gray-100 to-gray-800 flex flex-col items-center relative overflow-hidden"},$={class:"relative inset-0 opacity-10"},C={class:"text-4xl text-gray-500"},G={class:"bg-white rounded-3xl p-8 w-11/12 max-w-md shadow-lg"},H={class:"mb-4 relative"},U={class:"mb-4 relative"},j=["type"],W={class:"flex justify-between items-center mb-8"},z={class:"flex items-center cursor-pointer"},X={__name:"Login",setup(q){F.add(T,_,P,A);const a=n(""),o=n(""),l=n(!1),r=n(!1),d=D(),g=y(),p=()=>{l.value=!l.value},m=async()=>{console.log("Login attempted with:",{email:a.value,password:o.value,stayLoggedIn:r.value}),await g.login({login:a.value,password:o.value}),x()},v=()=>{d.push("/register")},x=()=>{console.log("Home clicked"),d.push("/home")};return(J,t)=>(c(),u("div",R,[e("div",$,[(c(),u(f,null,b(20,s=>e("div",{key:s,class:"absolute",style:N({left:`${Math.random()*100}%`,top:`${Math.random()*100}%`,transform:`rotate(${Math.random()*360}deg)`})},[e("div",C,V(["⬠","⬡","◯","◫","◪","△","▽","◇","❖","✧","✦"][Math.floor(Math.random()*11)]),1)],4)),64))]),t[9]||(t[9]=w('<div class="mt-16 mb-8"><div class="flex items-center"><div class="text-6xl font-bold"><span class="text-orange-500">D</span><span class="text-purple-700">DREAM</span> <span class="text-blue-700">WIN</span></div></div><div class="text-gray-600 italic text-center mt-1">LET THE GAME BEGIN</div></div>',1)),e("div",G,[t[6]||(t[6]=e("h1",{class:"text-4xl font-bold text-center text-gray-800 mb-2"},"Welcome Back!",-1)),t[7]||(t[7]=e("p",{class:"text-xl text-center text-gray-700 mb-8"},"Please log in with your details",-1)),e("form",{onSubmit:h(m,["prevent"])},[e("div",H,[i(e("input",{type:"text",placeholder:"Enter your email or username",class:"w-full bg-gray-200 py-4 px-6 rounded-xl text-gray-700","onUpdate:modelValue":t[0]||(t[0]=s=>a.value=s)},null,512),[[k,a.value]])]),e("div",U,[i(e("input",{type:l.value?"text":"password",placeholder:"Password",class:"w-full bg-gray-200 py-4 px-6 rounded-xl text-gray-700","onUpdate:modelValue":t[1]||(t[1]=s=>o.value=s)},null,8,j),[[M,o.value]]),e("button",{type:"button",onClick:p,class:"absolute right-4 top-1/2 transform -translate-y-1/2 text-yellow-400"},[E(L(B),{icon:l.value?"eye":"eye-slash"},null,8,["icon"])])]),e("div",W,[e("div",null,[e("label",z,[i(e("input",{type:"checkbox",class:"w-5 h-5 border-2 border-gray-300 rounded","onUpdate:modelValue":t[2]||(t[2]=s=>r.value=s)},null,512),[[S,r.value]]),t[3]||(t[3]=e("span",{class:"ml-2 text-gray-700"},"Stay Logged In",-1))])]),t[4]||(t[4]=e("a",{href:"#",class:"text-purple-500 hover:underline"},"Forgot Password?",-1))]),t[5]||(t[5]=e("button",{type:"submit",class:"w-full bg-orange-400 hover:bg-orange-500 text-white py-4 px-6 rounded-full text-xl font-bold transition duration-300"}," Log In ",-1))],32)]),e("div",{onClick:v,class:"mt-8 mb-12 text-white text-lg"},t[8]||(t[8]=[I(" Don't you have an account? "),e("a",{href:"#",class:"text-orange-400 font-bold"},"Register Now",-1)]))]))}};export{X as default};
