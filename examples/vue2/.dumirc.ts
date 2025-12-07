import path from 'node:path';

export default {
  apiParser: {},
  resolve: {
    entryFile: './src/index.ts',
  },
  html2sketch: {},
  presets: [require.resolve('@dumijs/preset-vue2')],
  vue: {
    // Config key is 'vue'
    tsconfigPath: path.resolve(__dirname, './tsconfig.vue.json'),
  },
  themeConfig: {
    name: 'Vue 2 Docs',
    nav: [
      { title: 'Element UI', link: '/element-ui' },
      { title: 'Ant Design Vue', link: '/ant-design-vue' },
      { title: 'My Component', link: '/components/my-component' },
    ],
  },
};
