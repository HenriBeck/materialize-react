import { create as createJss } from 'jss';

import cache from 'jss-cache';
import camelCase from 'jss-camel-case';
import compose from 'jss-compose';
import defaultUnit from 'jss-default-unit';
import expand from 'jss-expand';
import nested from 'jss-nested';
import propsSort from 'jss-props-sort';
import vendorPrefixer from 'jss-vendor-prefixer';
import global from 'jss-global';

const jss = createJss();

jss.use(global());
jss.use(cache());
jss.use(nested());
jss.use(compose());
jss.use(camelCase());
jss.use(defaultUnit({ 'line-height': 'px' }));
jss.use(expand());
jss.use(vendorPrefixer());
jss.use(propsSort());

export default jss;
