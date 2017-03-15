import {
  mount as eMount,
  shallow as eShallow,
} from 'enzyme';

import { compileTheme } from '../../src/styles/theme/theme';

/**
 * Get the context for the components and compile the variables.
 *
 * @returns {Object} - Returns the context as an object.
 */
function getContext() {
  return { theme: compileTheme({}) };
}

/**
 * A wrapper function around enzyme's mount function to provide an context which is needed for
 * the components.
 *
 * @param {React.Component} children - The markup to render.
 * @param {Object} options - An object of options which will be passed to the shallow function.
 * @returns {Object} - Returns the object returned from the mount function.
 */
export function mount(children, options = {}) {
  return eMount(children, {
    context: getContext(),
    ...options,
  });
}

/**
 * A wrapper function around enzyme's shallow function to provide an context which is needed for
 * the components.
 *
 * @param {React.Component} children - The markup to render.
 * @param {Object} options - An object of options which will be passed to the shallow function.
 * @returns {Object} - Returns the object returned from the shallow function.
 */
export function shallow(children, options = {}) {
  return eShallow(children, {
    context: getContext(),
    ...options,
  });
}
