import test from 'ava';

import layout from './layout';

test('should return an object with some default values when no args are provided', (t) => {
  t.deepEqual(layout({}), { display: 'flex' });
});

test('should correctly handle the inline option', (t) => {
  t.deepEqual(layout({ inline: true }), { display: 'inline-flex' });
});

test('should handle directions correctly', (t) => {
  t.deepEqual(layout({ direction: 'horizontal' }), {
    display: 'flex',
    flexDirection: 'row',
  });

  t.deepEqual(layout({
    direction: 'horizontal',
    reverse: true,
  }), {
    display: 'flex',
    flexDirection: 'row-reverse',
  });

  t.deepEqual(layout({ direction: 'vertical' }), {
    display: 'flex',
    flexDirection: 'column',
  });

  t.deepEqual(layout({
    direction: 'vertical',
    reverse: true,
  }), {
    display: 'flex',
    flexDirection: 'column-reverse',
  });
});

test('should handle flexWrap correctly', (t) => {
  t.deepEqual(layout({ wrap: true }), {
    display: 'flex',
    flexWrap: 'wrap',
  });

  t.deepEqual(layout({
    wrap: true,
    reverse: true,
  }), {
    display: 'flex',
    flexWrap: 'wrap-reverse',
  });
});

test('should handle the mainAlign correctly', (t) => {
  t.deepEqual(layout({ mainAlign: 'center' }), {
    display: 'flex',
    justifyContent: 'center',
  });
});

test('should handle the crossAlign correctly', (t) => {
  t.deepEqual(layout({ crossAlign: 'center' }), {
    display: 'flex',
    alignItems: 'center',
  });
});
