import Chance from 'chance';

/**
 * A class to create a prefixer to prefix css properties.
 */
export default class Prefixer {
  /**
   * Initialize the class so we can access the prefixes later on.
   *
   * @param {String[]} prefixes - A string of prefixes to check for.
   */
  constructor(prefixes) {
    this.prefixes = prefixes || [
      'moz',
      'o',
      'ms',
      'webkit',
    ];

    this.element = document.createElement('div');

    this.chance = new Chance();
  }

  /**
   * Convert a css property into an valid js property.
   *
   * @param {String} name - The property to transform.
   * @returns {String} - Returns the converted property.
   */
  static cssToJS(name) {
    return name
      .replace(/([a-z])-([a-z])/g, (str, m1, m2) => m1 + m2.toUpperCase())
      .replace(/^-/, '');
  }

  /**
   * Check if a css property needs to be prefixed.
   *
   * @param {String} prop - The property to check for.
   * @returns {String} - Returns the prefixed prop if needed elsewise it returns the prop which
   * was passed in.
   */
  prefix(prop) {
    const convertedProp = prop.includes('-') ? Prefixer.cssToJS(prop) : prop;

    if (convertedProp in this.element.style) {
      return convertedProp;
    }

    const capitalizedProp = this.chance.capitalize(convertedProp);
    const prefixes = [...this.prefixes];
    let prefixedProp = false;

    prefixes
      .map(prefix => `${prefix}${capitalizedProp}`)
      .forEach((prefix) => {
        if (prefix in this.element.style) {
          prefixedProp = prefix;
        }
      });

    if (prefixedProp) {
      return this.chance.capitalize(prefixedProp);
    }

    return convertedProp;
  }
}
