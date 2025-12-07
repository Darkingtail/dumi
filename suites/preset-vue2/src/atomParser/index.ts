import { getProjectRoot } from 'dumi';
import {
  IBaseApiParserOptions,
  ILanguageMetaParser,
  createApiParser,
} from 'dumi/tech-stack-utils';
import glob from 'fast-glob';
import path from 'path';
import { parse } from 'vue-docgen-api';

export interface VueParserOptions extends IBaseApiParserOptions {
  directory?: string;
}

class VueMetaParser implements ILanguageMetaParser {
  protected resolveDir: string;
  protected rootDir: string;

  constructor(opts: VueParserOptions) {
    const { resolveDir, directory = '' } = opts;
    this.resolveDir = resolveDir;
    this.rootDir = path.join(getProjectRoot(resolveDir), directory);
  }

  async patch() {
    // vue-docgen-api reads file from disk, no need to patch memory
  }

  async parse() {
    // Scan all .vue files in the project
    const files = await glob('**/*.vue', {
      cwd: this.rootDir,
      absolute: true,
      ignore: ['**/node_modules/**', '**/demos/**'],
    });

    const metaMap: Record<string, any> = {};

    for (const file of files) {
      try {
        const doc = await parse(file);
        const name = doc.displayName || path.basename(file, '.vue');

        const transformedProps = this.transformProps(doc.props);

        // Transform to dumi meta format
        const meta = {
          name,
          id: name,
          props: transformedProps,
          propsConfig: transformedProps,
          events: this.transformEvents(doc.events),
          slots: this.transformSlots(doc.slots),
          methods: this.transformMethods(doc.methods),
        };

        // Register multiple keys to ensure dumi can find it
        metaMap[name] = meta;
        metaMap[name.toLowerCase()] = meta;

        // Try relative path as key
        const relativePath = path.relative(this.rootDir, file);
        metaMap[relativePath] = meta;

        // Try component ID (file name)
        const componentId = path.basename(file, path.extname(file));
        if (componentId !== name) {
          metaMap[componentId] = meta;
        }

        // Try absolute path as key (just in case)
        metaMap[file] = meta;
      } catch (e) {
        // console.warn(`[preset-vue2] Failed to parse ${file}:`, e);
        console.error(`[preset-vue2] Failed to parse ${file}:`, e);
      }
    }

    // DEBUG: Write metaMap to disk to verify
    try {
      const debugPath = path.join(this.rootDir, '.dumi/tmp/debug-meta.json');
      const fs = require('fs');
      if (!fs.existsSync(path.dirname(debugPath))) {
        fs.mkdirSync(path.dirname(debugPath), { recursive: true });
      }
      fs.writeFileSync(debugPath, JSON.stringify(metaMap, null, 2));
      console.log(`[VueMetaParser] Wrote debug meta to ${debugPath}`);
    } catch (e) {
      console.error('[VueMetaParser] Failed to write debug meta:', e);
    }

    // Ensure data is serializable for Worker communication
    // AND wrap it in { components: ... } structure as expected by dumi
    return { components: JSON.parse(JSON.stringify(metaMap)) };
  }

  async destroy() {}

  private transformProps(props: any[] = []) {
    return props
      .filter((p) => p && p.name)
      .reduce((acc, prop) => {
        acc[prop.name] = {
          name: prop.name,
          description: prop.description || '',
          // type: prop.type ? { name: prop.type.name } : { name: 'unknown' },
          type: { name: 'string' }, // Hardcode for debugging
          default: prop.defaultValue ? prop.defaultValue.value : undefined,
          required: !!prop.required,
        };
        return acc;
      }, {});
  }

  private transformEvents(events: any[] = []) {
    return events
      .filter((e) => e && e.name)
      .reduce((acc, event) => {
        acc[event.name] = {
          name: event.name,
          description: event.description || '',
        };
        return acc;
      }, {});
  }

  private transformSlots(slots: any[] = []) {
    return slots
      .filter((s) => s && s.name)
      .reduce((acc, slot) => {
        acc[slot.name] = {
          name: slot.name,
          description: slot.description || '',
        };
        return acc;
      }, {});
  }

  private transformMethods(methods: any[] = []) {
    return methods
      .filter((m) => m && m.name)
      .reduce((acc, method) => {
        acc[method.name] = {
          name: method.name,
          description: method.description || '',
        };
        return acc;
      }, {});
  }
}

export const VueApiParser = createApiParser({
  filename: __filename,
  worker: VueMetaParser,
  parseOptions: {
    handleWatcher(watcher, { parse }) {
      return watcher.on('all', (ev, file) => {
        if (['add', 'change', 'unlink'].includes(ev) && /\.vue$/.test(file)) {
          parse();
        }
      });
    },
  },
});

// export const VueApiParser = (options: VueParserOptions) => new VueMetaParser(options);
