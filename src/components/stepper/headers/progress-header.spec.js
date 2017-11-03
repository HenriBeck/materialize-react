import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';

import ProgressHeader from './progress-header';

const props = {
  totalSections: 3,
  currentSection: 1,
};

test('should render a HeaderWithButtons', (t) => {
  const wrapper = shallow(<ProgressHeader {...props} />);

  t.deepEqual(wrapper.find('Jss(HeaderWithButtons)').length, 1);
});

test('should render a Progress component', (t) => {
  const wrapper = shallow(<ProgressHeader {...props} />)
    .dive()
    .dive();

  t.deepEqual(wrapper.find('Jss(Progress)').length, 1);
});

