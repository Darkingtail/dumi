import type Config from '@umijs/bundler-webpack/compiled/webpack-5-chain';
import type { IApi } from 'dumi';
import { babelPresetTypeScript } from 'dumi/tech-stack-utils';
import path from 'node:path';

const VueLoaderPlugin = require('vue-loader/lib/plugin');

// Webpack configuration mainly refers to @umijs/preset-vue

export function getConfig(config: Config, api: IApi) {
  // The internal path in umi is in POSIX format,
  // and include/exclude of webpack needs to be converted to the corresponding format for different systems.
  const dumiSrc = path.resolve(api.paths.absSrcPath);
  const babelInUmi = config.module.rule('src').use('babel-loader').entries();

  // react jsx rules will only include the .dumi directory
  config.module.rule('jsx-ts-tsx').include.add(dumiSrc).end();

  // Vue2 tsx support
  config.module
    .rule('vue-jsx-tsx')
    .test(/\.(jsx|ts|tsx)$/)
    .exclude.add(dumiSrc)
    .end()
    .use('babel-loader')
    .loader(babelInUmi.loader)
    .options({
      ...babelInUmi.options,
      presets: [
        ...babelInUmi.options.presets,
        babelPresetTypeScript(),
        require.resolve('@vue/babel-preset-jsx'),
      ],
    });

  config.module.noParse(/^(vue|vue-router|vuex|vuex-router-sync)$/);

  // https://github.com/webpack/webpack/issues/11467#issuecomment-691873586
  config.module
    .rule('esm')
    .type('javascript/auto')
    .test(/\.m?jsx?$/)
    .resolve.set('fullySpecified', false);

  config.resolve.extensions.merge(['.vue']).end();
  config.module
    .rule('vue')
    .test(/\.vue$/)
    .exclude.add(dumiSrc)
    .end()
    .use('vue-loader')
    .loader(require.resolve('vue-loader'))
    .options({
      compilerOptions: {
        preserveWhitespace: false,
      },
    });

  config.plugin('vue-loader-plugin').use(VueLoaderPlugin);

  // https://github.com/vuejs/vue-loader/issues/1435#issuecomment-869074949
  config.module
    .rule('vue-style')
    .test(/\.vue$/)
    .exclude.add(dumiSrc)
    .end()
    .resourceQuery(/type=style/)
    .sideEffects(true);

  // Ignore optional dependencies of consolidate / vue-loader
  const optionalDeps = [
    'marko',
    'teacup',
    'coffee-script',
    'squirrelly',
    'twing',
    'stylus',
    'pug',
    'haml',
    // 'react', // CRITICAL: DO NOT IGNORE
    // 'react-dom', // CRITICAL: DO NOT IGNORE
    'velocityjs',
    'dustjs-linkedin',
    'atpl',
    'liquor',
    'twig',
    'ejs',
    'eco',
    'jazz',
    'jqtpl',
    'hamljs',
    'hamlet',
    'whiskers',
    'haml-coffee',
    'hogan.js',
    'templayed',
    'handlebars',
    // 'underscore', // Installed as devDependency
    'walrus',
    'mustache',
    'just',
    'ect',
    'mote',
    'toffee',
    'dot',
    'bracket-template',
    'ractive',
    'htmling',
    // 'babel-core', // Installed as devDependency
    'plates',
    'vash',
    'slm',
    'simple-jade',
    'mhtml',
    'react-server',
  ];
  optionalDeps.forEach((dep) => {
    config.resolve.alias.set(dep, false);
  });

  // 兼容 element-ui plus
  config.module
    .rule('fix-element-ui-plus')
    .test(/\.mjs$/)
    .include.add(/node_modules/)
    .end()
    .type('javascript/auto')
    .resolve.fullySpecified(false);

  // asset
  config.module.rules.delete('asset');

  const { userConfig } = api;

  const inlineLimit = parseInt(userConfig.inlineLimit || '10000', 10);

  config.module
    .rule('avif')
    .test(/\.avif$/)
    .type('asset')
    .mimetype('image/avif')
    .parser({
      dataUrlCondition: {
        maxSize: inlineLimit,
      },
    });
  config.module
    .rule('image')
    .test(/\.(bmp|gif|jpg|jpeg|png)$/)
    .type('asset')
    .parser({
      dataUrlCondition: {
        maxSize: inlineLimit,
      },
    });

  // TODO: svgo still has problems, temporarily use url-loader and file-loader
  config.module.rules.delete('svg');
  config.module
    .rule('svg')
    .test(/\.svg$/)
    .use('url-loader')
    .loader(require.resolve('@umijs/bundler-webpack/compiled/url-loader'))
    .options({
      limit: userConfig.inlineLimit,
      fallback: require.resolve('@umijs/bundler-webpack/compiled/file-loader'),
    })
    .end();
}
