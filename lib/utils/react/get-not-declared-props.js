'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getNotDeclaredProps;

var _lodash = require('lodash.omit');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A function to get the the not declared props of a React Component.
 *
 * @param {Object} instance - An instance of an React Component.
 * @param {Object} component - The prop types.
 * @returns {Object} - Returns the props that aren't declared
 * but are passed to the component.
 */
function getNotDeclaredProps(instance, component) {
  // eslint-disable-next-line react/forbid-foreign-prop-types
  return (0, _lodash2.default)(instance.props, Object.keys(component.propTypes));
}