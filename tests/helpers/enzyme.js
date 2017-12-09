import React from 'react';
import { mount as eMount } from 'enzyme';
import { ThemeProvider } from 'react-jss';

import variables from '../../src/components/theme/variables';

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
      <ThemeProvider
        theme={{
          type,
          ...variables[type],
        }}
      >
        {React.cloneElement(children, props)}
      </ThemeProvider>
    );
  }

  return eMount(
    <Theme />,
    options,
  );
}
