import is from 'is_js';

import merge from 'utils/object/merge';
import Prefixer from './prefixer';
import size from './plugins/size';
import position from './plugins/position';
import elevation from './plugins/elevation';
import typo from './plugins/typo';
import layout from './plugins/layout';

import variables from './plugins/variables';

import hexToRgba from './functions/hex-to-rgba';

/**
 * A class to transform styles with support for plugins and transforms.
 */
export default class Stylesheet {
  static plugins = {
    size,
    elevation,
    position,
    typo,
    layout,
  };

  static transforms = { variables };

  static hexToRgba = hexToRgba;

  static prefixer = new Prefixer();

  /**
   * A function to compile the object with some provided plugins.
   *
   * @param {Object} object - The object to compile.
   * @param {String[]} plugins - An array of plugins to use.
   * @returns {Object} - Returns the compiled object.
   */
  static compilePlugins(object, plugins) {
    return Object
      .keys(object)
      .reduce((current, key) => {
        let value = object[key];

        if (plugins.includes(key) && Stylesheet.plugins[key]) {
          const args = is.array(value) ? value : [value];

          return merge({}, current, Stylesheet.plugins[key](...args));
        } else if (is.json(value)) {
          value = Stylesheet.compilePlugins(value, plugins);
        } else if (is.function(value)) {
          value = value(current);
        }

        return merge({}, current, { [key]: value });
      }, {});
  }

  /**
   * A function to transform the values of the object.
   *
   * @param {Object} object - The object to transform.
   * @param {Function[]} transforms - The transforms to call.
   * @returns {Object} - Returns the object with the compiled transforms.
   */
  static compileTransforms(object, transforms) {
    return Object
      .keys(object)
      .reduce((current, key) => {
        const value = object[key];

        if (is.json(value)) {
          return merge({}, current, { [key]: Stylesheet.compileTransforms(value, transforms) });
        }

        const prefix = Stylesheet.prefixer.prefix(key);
        const newValue = is.string(value)
          ? transforms.reduce((val, func) => func(val), value)
          : value;

        return merge({}, current, { [prefix]: newValue });
      }, {});
  }

  /**
   * Compile an object.
   *
   * @param {Object} styles - The styles to compile.
   * @param {Object} options - The options for the transforms.
   * @param {String[]} plugins - An array of the plugins names which will be used.
   * Defaults to all of the plugins.
   * @returns {Object} - Returns the compiled object.
   */
  static compile(styles, options = {}, plugins = Object.keys(Stylesheet.plugins)) {
    const transforms = Object
      .keys(Stylesheet.transforms)
      .map(name => Stylesheet.transforms[name](options[name] || {}));

    return Stylesheet.compileTransforms(Stylesheet.compilePlugins(styles, plugins), transforms);
  }
}
