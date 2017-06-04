import { create as createJss } from 'jss';
import { create as createInjectSheet } from 'react-jss';

import cache from 'jss-cache';
import camelCase from 'jss-camel-case';
import compose from 'jss-compose';
import defaultUnit from 'jss-default-unit';
import expand from 'jss-expand';
import nested from 'jss-nested';
import propsSort from 'jss-props-sort';
import vendorPrefixer from 'jss-vendor-prefixer';

const jss = createJss();

jss.use(cache());
jss.use(nested());
jss.use(compose());
jss.use(camelCase());
jss.use(defaultUnit({ 'line-height': 'px' }));
jss.use(expand());
jss.use(vendorPrefixer());
jss.use(propsSort());

export default createInjectSheet(jss);
