import type { IDemoCancelableFn } from 'dumi/dist/client/theme-api';
import Vue from 'vue';

const renderer: IDemoCancelableFn = async function (canvas, component) {
  if (component.__css__) {
    setTimeout(() => {
      document
        .querySelectorAll(`style[css-${component.__id__}]`)
        .forEach((el) => el.remove());
      document.head.insertAdjacentHTML(
        'beforeend',
        `<style css-${component.__id__}>${component.__css__}</style>`,
      );
    }, 1);
  }

  const app = new Vue({
    render: (h) => h(component),
    errorCaptured(err) {
      throw err;
    },
  }).$mount(canvas);

  return () => {
    app.$destroy();
  };
};

export default renderer;
