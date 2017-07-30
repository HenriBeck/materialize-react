import fs from 'fs';
import test from 'ava';
import path from 'path';

// eslint-disable-next-line import/no-namespace
import * as exportedModules from './index';

/**
 * Transform the dir names with hyphen into camel cased with the first char uppercased.
 *
 * @param {String} name - The dir name.
 * @returns {String} - Returns the transformed name.
 */
function transformDirNames(name) {
  const rest = name.slice(1).replace(/-\w/g, chars => chars.charAt(1).toUpperCase());

  return `${name.charAt(0).toUpperCase()}${rest}`;
}

test('should export all components', (t) => {
  const dirPath = path.resolve(__dirname, './components');
  const dirNames = fs.readdirSync(dirPath)
    .map(name => path.join(dirPath, name))
    .filter(source => fs.lstatSync(source).isDirectory())
    .map(source => source.split('/').reverse()[0])
    .map(transformDirNames);

  dirNames.forEach((dir) => {
    if (!exportedModules[dir]) {
      // eslint-disable-next-line ava/assertion-arguments
      t.fail(`Missing export of component: ${dir}`);
    }
  });

  t.pass();
});
