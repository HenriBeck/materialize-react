import React from 'react';
import { mount as eMount } from 'enzyme';
import {
  ThemeProvider,
  JssProvider,
} from 'react-jss';

import variables from '../../src/components/theme/variables';

const MAX_RULES = 1e10;
let ruleCounter = 0;

/**
 * Generate the class name for a style rule.
 *
 * @param {Object} rule - The rules object.
 * @returns {String} - Returns the rules classname.
 */
function generateClassName(rule) {
  ruleCounter += 1;

  if (ruleCounter > MAX_RULES) {
    throw new Error('The rule counter got bigger than the max rules!');
  }

  return rule.key;
}

/**
 * A wrapper function around enzyme's mount function to provide an context which is needed for
 * the components.
 *
 * @param {JSX} children - The markup to render.
 * @param {Object} [options] - An object of options which will be passed to the shallow function.
 * @returns {Object} - Returns the object returned from the mount function.
 */
export function mount(children, options = {}) { // eslint-disable-line import/prefer-default-export
  const type = options.type || 'light';

  /**
   * Render the children around the theme provider and pass any props down
   * to the actual component that's being tested.
   *
   * @param {Object} props - Any additional props which will be passed down to the child.
   * @returns {JSX} - Returns the JSX.
   */
  function Theme(props) {
    return (
      <JssProvider generateClassName={generateClassName}>
        <ThemeProvider
          theme={{
            type,
            ...variables[type],
          }}
        >
          {React.cloneElement(children, props)}
        </ThemeProvider>
      </JssProvider>
    );
  }

  return eMount(
    <Theme />,
    options,
  );
}
