import _ from 'vue';

var d=async function(t,e){e.__css__&&setTimeout(()=>{document.querySelectorAll(`style[css-${e.__id__}]`).forEach(r=>r.remove()),document.head.insertAdjacentHTML("beforeend",`<style css-${e.__id__}>${e.__css__}</style>`);},1);let s=new _({render:r=>r(e),errorCaptured(r){throw r}}).$mount(t);return ()=>{s.$destroy();}},a=d;

export { a as default };
