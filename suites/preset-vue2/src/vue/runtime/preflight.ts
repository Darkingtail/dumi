import Vue from 'vue';

export default function preflight(component: any) {
  return new Promise<void>((resolve, reject) => {
    const el = document.createElement('div');
    el.style.display = 'none';
    el.style.overflow = 'hidden';
    document.body.appendChild(el);

    let app: any;
    function destroy() {
      Vue.nextTick(() => {
        if (app) {
          app.$destroy();
        }
        el.remove();
      });
    }

    try {
      app = new Vue({
        render: (h) => h(component),
        mounted() {
          resolve();
          destroy();
        },
        errorCaptured(err) {
          destroy();
          reject(err);
          return false;
        },
      }).$mount(el);
    } catch (err) {
      destroy();
      reject(err);
    }
  });
}
