import { getDepVersion } from '@/shared';
import { compare } from 'compare-versions';
import type { IApi } from 'dumi';
import { chalk, logger } from 'dumi/plugin-utils';

export default function checkVersion(api: IApi) {
  const vueVersion = getDepVersion({
    pkg: api.pkg,
    cwd: api.cwd,
    dep: 'vue',
  });

  if (!vueVersion) {
    throw new Error('Please install Vue.');
  }

  if (compare(vueVersion, '2.7.0', '<')) {
    throw new Error(
      'dumi preset-vue2 requires Vue >= 2.7.0 to support Composition API and <script setup>.',
    );
  }

  if (compare(vueVersion, '3.0.0', '>=')) {
    throw new Error(
      'Detected Vue 3. Please use @dumijs/preset-vue instead of preset-vue2.',
    );
  }

  logger.info(chalk.cyan.bold(`Vue v${vueVersion}`));
}
