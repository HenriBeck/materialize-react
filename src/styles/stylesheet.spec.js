import test from 'ava';
import is from 'is_js';

import Stylesheet from './stylesheet';
import Prefixer from './prefixer';

test('should have plugins, transforms and a prefixer defined', (t) => {
  t.true(is.object(Stylesheet.plugins));
  t.true(is.object(Stylesheet.transforms));
  t.true(Stylesheet.prefixer instanceof Prefixer);
});

