import { defineConfig } from 'father';

export default defineConfig({
  cjs: {
    output: 'dist',
    ignores: ['src/vue/runtime/**'],
  },
  prebundle: {
    deps: {
      '@vue/babel-preset-jsx': { dts: false },
    },
  },
});
