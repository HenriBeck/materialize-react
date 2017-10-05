import {
  mount as eMount,
  shallow as eShallow,
} from 'enzyme';

import variables from '../../src/components/theme/variables';

/**
 * Get the simulated context.
 *
 * @param {Object} options - Additional options passed to the renderer.
 * @returns {Object} - Returns the context.
 */
function getContext(options) {
  return {
    __THEMING__: {
      getState() {
        return {
          type: options.themeType || 'light',
          ...variables[options.themeType || 'light'],
        };
      },
      subscribe: () => {},
    },
    ...options.context,
  };
}
/**
 * A wrapper function around enzyme's mount function to provide an context which is needed for
 * the components.
 *
 * @param {JSX} children - The markup to render.
 * @param {Object} [options] - An object of options which will be passed to the shallow function.
 * @returns {Object} - Returns the object returned from the mount function.
 */
export function mount(children, options = {}) {
  return eMount(children, { context: getContext(options) });
}

/**
 * A wrapper function around enzyme's mount function to provide an context which is needed for
 * the components.
 *
 * @param {JSX} children - The markup to render.
 * @param {Object} [options] - An object of options which will be passed to the shallow function.
 * @returns {Object} - Returns the object returned from the mount function.
 */
export function shallow(children, options = {}) {
  return eShallow(children, {
    context: getContext(options),
    lifecycleExperimental: true,
  });
}
