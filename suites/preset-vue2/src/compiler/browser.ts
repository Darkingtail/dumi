import type * as Babel from '@babel/standalone';
import jsx from '@vue/babel-preset-jsx';
import hashId from 'hash-sum';
import { COMP_IDENTIFIER, createCompiler, resolveFilename } from './index';

const { compileSFC, transformTS, toCommonJS } = createCompiler({
  babel: {
    // @ts-ignore
    transformSync(...args) {
      if (typeof window !== undefined && 'Babel' in window) {
        // @ts-ignore
        return Babel.transform(...args);
      }
      console.error('@babel/standablone is loading!');
      return null;
    },
  },
  availablePresets: {
    'vue-jsx': jsx,
  },
});

export default function compile(
  code: string,
  { filename }: { filename: string },
) {
  const { lang } = resolveFilename(filename);
  if (['js', 'jsx', 'ts', 'tsx'].includes(lang)) {
    return transformTS(code, filename, {
      lang,
      presets: [['env', { modules: 'cjs' }]],
    });
  }
  const id = hashId(filename);
  // @ts-ignore
  const descriptor = compileSFC({ id, filename, code });
  const errors = descriptor.errors || [];

  if (errors.length) {
    throw errors[0];
  }
  let { js, css } = descriptor;
  if (css) {
    js += `
${COMP_IDENTIFIER}.__css__ = ${JSON.stringify(css)};`;
  }
  js += `
${COMP_IDENTIFIER}.__id__ = "${id}";
    export default ${COMP_IDENTIFIER};`;
  return toCommonJS(js)?.code || '';
}
