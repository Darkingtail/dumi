import d from 'vue';

function u(i){return new Promise((l,o)=>{let e=document.createElement("div");e.style.display="none",e.style.overflow="hidden",document.body.appendChild(e);let n;function r(){d.nextTick(()=>{n&&n.$destroy(),e.remove();});}try{n=new d({render:t=>t(i),mounted(){l(),r();},errorCaptured(t){return r(),o(t),!1}}).$mount(e);}catch(t){r(),o(t);}})}

export { u as default };
