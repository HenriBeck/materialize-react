'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _event = require('./event');

var _event2 = _interopRequireDefault(_event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('should get the cords from the event when it\'s a touch event', function (t) {
  var event = new _event2.default({
    touches: [{
      clientX: 20,
      clientY: 10
    }]
  });

  t.deepEqual(event.getCords(), {
    x: 20,
    y: 10
  });
});

(0, _ava2.default)('should get the cords when they are in the x and y property', function (t) {
  var event = new _event2.default({
    x: 20,
    y: 10
  });

  t.deepEqual(event.getCords(), {
    x: 20,
    y: 10
  });
});

(0, _ava2.default)('should get the cords when they are in the clientX and clientY property', function (t) {
  var event = new _event2.default({
    clientX: 20,
    clientY: 10
  });

  t.deepEqual(event.getCords(), {
    x: 20,
    y: 10
  });
});

(0, _ava2.default)('should return null when no cords are available', function (t) {
  var event = new _event2.default();

  t.deepEqual(event.getCords(), null);
});