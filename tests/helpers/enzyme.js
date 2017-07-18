import React from 'react';
import { mount as eMount } from 'enzyme';

import Theme from '../../src/styles/theme';

/**
 * A wrapper function around enzyme's mount function to provide an context which is needed for
 * the components.
 *
 * @param {JSX} children - The markup to render.
 * @param {Object} [options] - An object of options which will be passed to the shallow function.
 * @returns {Object} - Returns the object returned from the mount function.
 */
export function mount(children, options = {}) {
  return eMount((
    <Theme>
      {children}
    </Theme>
  ), options);
}
