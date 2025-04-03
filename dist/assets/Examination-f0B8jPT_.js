import{r as d,p as _,m as E,C as P,B as W,c as m,e as g,D as v,a as e,t as o,h as l,j as T,F as y,b as A,o as f,E as H,z as I}from"./index-DYW0LGQL.js";const J="SSC CGL Tier II: Mega Live Test",G=5,K="Online",Y="24th November, 2024",X="10:00 AM",Z=[{id:1,question:"What is the capital of France?",options:[{id:1,text:"Paris"},{id:2,text:"London"},{id:3,text:"Rome"},{id:4,text:"Berlin"}],correctAnswerId:1,difficulty:"medium"},{id:2,question:"Which of the following is a JavaScript framework?",options:[{id:1,text:"Laravel"},{id:2,text:"Vue.js"},{id:3,text:"Django"},{id:4,text:"Flask"}],correctAnswerId:2,difficulty:"hard"},{id:3,question:"What is the chemical symbol for water?",options:[{id:1,text:"O2"},{id:2,text:"H2O"},{id:3,text:"CO2"},{id:4,text:"NaCl"}],correctAnswerId:2,difficulty:"easy"},{id:4,question:"Which planet is known as the Red Planet?",options:[{id:1,text:"Earth"},{id:2,text:"Mars"},{id:3,text:"Jupiter"},{id:4,text:"Saturn"}],correctAnswerId:2,difficulty:"medium"},{id:5,question:"Who wrote 'To Kill a Mockingbird'?",options:[{id:1,text:"Harper Lee"},{id:2,text:"J.K. Rowling"},{id:3,text:"Ernest Hemingway"},{id:4,text:"F. Scott Fitzgerald"}],correctAnswerId:1,difficulty:"medium"}],w={examName:J,examDuration:G,examType:K,examDate:Y,examTime:X,questions:Z},Q={class:"h-screen overflow-hidden"},q={class:"flex h-screen flex-col"},ee={class:"z-50 border-b border-gray-200 bg-white"},te={class:"w-full px-4 sm:px-6"},se={class:"flex h-14 justify-between"},ne={class:"flex items-center"},oe={class:"text-xl font-bold text-gray-900"},ie={class:"flex items-center space-x-4"},le={class:"text-sm text-gray-500"},re={class:"flex flex-1 overflow-hidden"},ae={class:"flex h-full flex-col bg-white"},de={class:"flex-shrink-0 border-b border-gray-200 bg-gray-50 p-4"},ce={class:"flex flex-wrap items-center justify-between gap-4"},ue={class:"flex items-center space-x-4"},me={class:"text-lg font-semibold text-gray-900"},fe={class:"flex items-center space-x-6"},xe={class:"text-sm"},ge={class:"ml-1 font-medium text-red-600 capitalize"},ve={class:"text-sm"},be={class:"ml-1 font-medium text-blue-600",id:"timer"},he={class:"flex-1 overflow-y-auto p-4"},pe={class:"flex h-full flex-col"},_e={class:"prose max-w-none"},ye={class:"text-lg text-gray-900"},we={class:"flex cursor-pointer items-start p-4 hover:bg-gray-50"},ke={class:"flex h-5 items-center"},Ce=["onClick","name","value","onUpdate:modelValue"],Ae={class:"ml-3"},je={class:"text-base text-gray-700"},Ne={class:"mt-auto border-t border-gray-200 bg-gray-50 px-4 py-3"},Se={class:"flex flex-wrap gap-4"},Me=["onClick"],Te=["onClick"],De={class:"flex w-80 flex-col border-l border-gray-200 bg-white"},Oe={class:"border-b border-gray-200 p-4"},Re={class:"flex items-center space-x-3"},$e={class:"flex-shrink-0"},Be={class:"flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-600"},Fe={class:"text-sm font-medium text-white"},Le={class:"text-base font-medium text-gray-900"},Ve={class:"border-b border-gray-200 p-4"},Ue={class:"space-y-3"},ze={class:"flex items-center justify-between"},Ee={class:"text-sm font-medium text-gray-900"},Pe={class:"flex items-center justify-between"},We={class:"text-sm font-medium text-gray-900"},He={class:"flex items-center justify-between"},Ie={class:"text-sm font-medium text-gray-900"},Je={class:"flex items-center justify-between"},Ge={class:"text-sm font-medium text-gray-900"},Ke={class:"flex items-center justify-between"},Ye={class:"text-sm font-medium text-gray-900"},Xe={class:"flex-1 overflow-y-auto p-4"},Ze={class:"grid grid-cols-5 gap-2"},Qe=["onClick"],qe={class:"border-t border-gray-200 p-4"},et={class:"fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"},tt={class:"bg-white w-96 p-8 rounded-lg shadow-lg"},st={class:"text-lg text-gray-800 mb-2 font-semibold"},nt={class:"text-lg text-gray-800 mb-2 font-semibold"},ot={class:"text-lg text-gray-800 mb-2 font-semibold"},it={class:"text-lg font-bold flex items-center mb-4"},at={__name:"Examination",setup(lt){const x=w.questions,r=d(1),c=d([1]),i=d({});let b=d([]);const u=d([]),D=_(()=>c.value.filter(s=>u.value.includes(s)&&i.value[s]).length),O=_(()=>c.value.filter(s=>u.value.includes(s)&&!i.value[s]).length),R=_(()=>c.value.filter(s=>!i.value[s]).length),$=_(()=>x.filter(s=>!c.value.includes(s.id)).length);let k=d(0);const h=d("examOn");let j=d({candidateName:"Pankaj Pandey",candidateRollNo:"CGL-12345"});const p=d(100);let C=null;E(()=>{N()}),P(()=>{clearInterval(C)});const N=()=>{C=setInterval(()=>{p.value>0?p.value--:(clearInterval(C),S())},1e3)},B=s=>{delete i.value[s]},F=s=>{const t=Math.floor(s/60),n=s%60;return`${t}:${n<10?"0":""}${n}`};W(r,s=>{console.log(s),c.value.includes(s)||c.value.push(s)});const L=()=>{h.value="examOn",r.value=1,i.value={},b.value=[],k.value=0,c.value=[1],p.value=100,N()},V=(s,t)=>{i.value[s]=t},U=s=>{if(u.value.includes(s)||u.value.push(s),console.log("marked as review",u.value),r.value<5)r.value+=1;else return},z=s=>{if(c.value.includes(s)){if(u.value.includes(s)&&i.value[s])return"bg-orange-600 hover:bg-orange-700 text-white";if(u.value.includes(s))return"bg-pink-600 hover:bg-pink-700 text-white";if(i.value[s])return"bg-green-500 hover:bg-green-600 text-white";if(!i.value[s])return"bg-red-500 hover:bg-red-600 text-white"}return"bg-gray-300 hover:bg-gray-400 text-gray-800"},S=()=>{for(let s of x)i.value[s.id]==s.correctAnswerId&&(k.value+=1),i.value[s.id]||(b.value.push(s.id),console.log("Unanswered Questions: ",b.value));h.value="scoreOn"};return(s,t)=>(f(),m(y,null,[g(e("div",Q,[e("div",q,[e("nav",ee,[e("div",te,[e("div",se,[e("div",ne,[e("h1",oe,o(l(w).examName),1)]),e("div",ie,[e("span",le,o(l(w).examDate)+" | Shift: "+o(l(w).examTime),1),t[3]||(t[3]=e("button",{class:"inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"},[e("svg",{class:"mr-2 h-4 w-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"})]),T(" Switch Full Screen ")],-1))])])])]),e("div",re,[(f(!0),m(y,null,A(l(x),n=>g((f(),m("div",{key:n.id,class:"flex min-h-0 flex-1 flex-col"},[e("div",ae,[e("div",de,[e("div",ce,[e("div",ue,[e("span",me,"Question "+o(n.id),1)]),e("div",fe,[e("div",xe,[t[4]||(t[4]=e("span",{class:"text-gray-500"},"Difficulty:",-1)),e("span",ge,o(n.difficulty),1)]),t[6]||(t[6]=e("div",{class:"text-sm"},[e("span",{class:"text-gray-500"},"Marks:"),e("span",{class:"ml-1 font-medium text-green-600"},"+3"),e("span",{class:"ml-1 font-medium text-red-600"},"-1")],-1)),e("div",ve,[t[5]||(t[5]=e("span",{class:"text-gray-500"},"Time Remaining:",-1)),e("span",be,o(F(p.value)),1)])])])]),e("div",he,[e("div",pe,[e("div",_e,[e("p",ye,o(n.id+". "+n.question),1)]),(f(!0),m(y,null,A(n.options,a=>(f(),m("div",{key:a.id,class:"mt-4 flex-1 space-y-4"},[e("label",we,[e("div",ke,[g(e("input",{type:"radio",onClick:M=>V(n.id,a.id),name:n.id,value:a.id,"onUpdate:modelValue":M=>i.value[n.id]=M,class:"h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"},null,8,Ce),[[H,i.value[n.id]]])]),e("div",Ae,[e("span",je,o(a.text),1)])])]))),128))])]),e("div",Ne,[e("div",Se,[e("button",{class:"inline-flex items-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2",onClick:a=>U(n.id)},"Mark for Review & Next",8,Me),e("button",{class:"inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2",onClick:a=>B(n.id)},"Clear Response",8,Te),t[7]||(t[7]=e("div",{class:"flex-1"},null,-1)),g(e("button",{class:"inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",onClick:t[0]||(t[0]=a=>r.value--)},"Previous",512),[[v,r.value!=1]]),g(e("button",{class:"inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",onClick:t[1]||(t[1]=a=>r.value++)},"Next",512),[[v,r.value!=l(x).length]])])])])])),[[v,r.value==n.id]])),128)),e("div",De,[e("div",Oe,[e("div",Re,[e("div",$e,[e("div",Be,[e("span",Fe,o(l(j).candidateName.split("")[0]),1)])]),e("div",null,[e("h2",Le,o(l(j).candidateName),1),t[8]||(t[8]=e("p",{class:"text-sm text-gray-500"},"Candidate",-1))])])]),e("div",Ve,[t[14]||(t[14]=e("h3",{class:"mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500"},"Question Status",-1)),e("div",Ue,[e("div",ze,[t[9]||(t[9]=e("div",{class:"flex items-center"},[e("div",{class:"h-3 w-3 rounded-full bg-green-500"}),e("span",{class:"ml-2 text-sm text-gray-600"},"Answered")],-1)),e("span",Ee,o(Object.keys(i.value).length||0),1)]),e("div",Pe,[t[10]||(t[10]=e("div",{class:"flex items-center"},[e("div",{class:"h-3 w-3 rounded-full bg-orange-500"}),e("span",{class:"ml-2 text-sm text-gray-600"},"Marked & Answered")],-1)),e("span",We,o(D.value),1)]),e("div",He,[t[11]||(t[11]=e("div",{class:"flex items-center"},[e("div",{class:"h-3 w-3 rounded-full bg-gray-300"}),e("span",{class:"ml-2 text-sm text-gray-600"},"Not Visited")],-1)),e("span",Ie,o($.value),1)]),e("div",Je,[t[12]||(t[12]=e("div",{class:"flex items-center"},[e("div",{class:"h-3 w-3 rounded-full bg-pink-600"}),e("span",{class:"ml-2 text-sm text-gray-600"},"Marked & Unanswered")],-1)),e("span",Ge,o(O.value),1)]),e("div",Ke,[t[13]||(t[13]=e("div",{class:"flex items-center"},[e("div",{class:"h-3 w-3 rounded-full bg-red-500"}),e("span",{class:"ml-2 text-sm text-gray-600"},"Not Answered")],-1)),e("span",Ye,o(R.value),1)])])]),e("div",Xe,[t[15]||(t[15]=e("h3",{class:"mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500"},"Question Navigation",-1)),e("div",Ze,[(f(!0),m(y,null,A(l(x),n=>(f(),m("button",{class:I(["inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-sm font-medium text-green-700 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2",z(n.id)]),key:n.id,onClick:a=>r.value=n.id},o(n.id),11,Qe))),128))])]),e("div",qe,[e("button",{class:"flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2",onClick:t[2]||(t[2]=n=>S())},"Submit Test")])])])])],512),[[v,h.value==="examOn"]]),g(e("div",et,[e("div",tt,[t[17]||(t[17]=e("h2",{class:"text-2xl font-extrabold text-center text-blue-600 mb-4"}," 🎉 Your Score ",-1)),e("p",st," Total Questions: "+o(l(x).length),1),e("p",nt," Answered: "+o(Object.keys(i.value).length),1),e("p",ot," Unanswered: "+o(l(b).length),1),e("p",it,[t[16]||(t[16]=e("span",{class:"material-icons text-green-600 mr-2"},"verified",-1)),T("Score: "+o(l(k)),1)]),e("button",{onClick:L,class:"bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full transition transform hover:scale-105"}," Close ")])],512),[[v,h.value==="scoreOn"]])],64))}};export{at as default};
