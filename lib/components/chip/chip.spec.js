'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _chip = require('./chip');

var _chip2 = _interopRequireDefault(_chip);

var _enzyme = require('../../../tests/helpers/enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('should render a span with the class of chip', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
    _chip2.default,
    { id: 'test' },
    'Content'
  ));

  t.deepEqual(wrapper.find('Jss(Chip)').length, 1);
  t.deepEqual(wrapper.find('button.chip').length, 1);
});

(0, _ava2.default)('should render a icon if the button is deletable', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
    _chip2.default,
    {
      deletable: true,
      id: 'test'
    },
    'Content'
  ));

  t.deepEqual(wrapper.find('Icon').length, 1);
});

(0, _ava2.default)('should call the onDelete handler if the icon is pressed', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
    _chip2.default,
    {
      deletable: true,
      id: 'test'
    },
    'Content'
  ));
  var icon = wrapper.find('.chip--delete');
  var onDelete = _sinon2.default.spy();

  icon.simulate('mouseDown');

  wrapper.setProps({ onDelete: onDelete });

  icon.simulate('touchStart');

  t.deepEqual(onDelete.callCount, 1);
});

(0, _ava2.default)('should have a image tag if the img prop is a string', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
    _chip2.default,
    {
      id: 'test',
      img: 'test'
    },
    'Content'
  ));

  t.deepEqual(wrapper.find('img').length, 1);
});

(0, _ava2.default)('should have a span with a className of chip--img if the img prop is an object', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
    _chip2.default,
    {
      id: 'test',
      img: {
        color: 'red',
        text: 'a'
      }
    },
    'Content'
  ));

  t.deepEqual(wrapper.find('span.chip--img').length, 1);
});

(0, _ava2.default)('should update the state when the button get\'s focused and blurred', function (t) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
    _chip2.default,
    {
      deletable: true,
      id: 'test'
    },
    'Content'
  ));
  var chip = function chip() {
    return wrapper.find('Chip').first();
  };
  var chipComponent = wrapper.find('button.chip').first();

  chipComponent.simulate('focus');

  t.deepEqual(chip().node.state.isFocused, true);

  chipComponent.simulate('blur');

  t.deepEqual(chip().node.state.isFocused, false);
});

(0, _ava2.default)('should call the onDelete prop if the delete key is pressed', function (t) {
  var onDelete = _sinon2.default.spy();
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
    _chip2.default,
    {
      id: 'test',
      onDelete: onDelete,
      deletable: true
    },
    'Content'
  ));
  var chip = wrapper.find('.chip');

  chip.simulate('keyDown', { keyCode: 46 });

  t.deepEqual(onDelete.callCount, 1);

  chip.simulate('keyDown', { keyCode: 46 });

  t.deepEqual(onDelete.callCount, 1);

  chip.simulate('keyUp');
});