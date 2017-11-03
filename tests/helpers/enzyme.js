import { mount as eMount } from 'enzyme';

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
  return eMount(children, {
    context: {
      __THEMING__: {
        getState() {
          const type = options.type || 'light';

          return {
            type,
            ...variables[type],
          };
        },
        subscribe: () => true,
      },
      ...options.context,
    },
  });
}
