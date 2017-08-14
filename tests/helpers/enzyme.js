import {
  mount as eMount,
  shallow as eShallow,
} from 'enzyme';

import { compileTheme } from '../../src/styles/theme/theme';

/**
 * Get the simulated context.
 *
 * @param {Object} options - Additional options passed to the renderer.
 * @returns {Object} - Returns the context.
 */
function getContext(options) {
  return {
    __THEMING__: {
      getState: () => compileTheme({}, {}),
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
  return eShallow(children, { context: getContext(options) });
}
