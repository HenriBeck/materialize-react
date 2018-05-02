// @flow strict

import fs from 'fs';
import test from 'ava';
import path from 'path';

// eslint-disable-next-line import/no-namespace
import * as exportedComponents from '.';

test('should export all components', (t) => {
  const dirNames = fs.readdirSync('./')
    .filter(name => fs.lstatSync(path.join('./', name)).isDirectory());

  dirNames.forEach((dir: string) => {
    if (!exportedComponents[dir]) { // eslint-disable-line import/namespace
      t.fail(`Missing export of component: ${dir}`);
    }
  });

  Object
    .keys(exportedComponents)
    .forEach((componentName: string) => {
      if (!dirNames.includes(componentName)) {
        t.fail(`Unexpected export of Component ${componentName}`);
      }
    });

  t.pass();
});
