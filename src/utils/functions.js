export const head = ([x]) => x;

export const undef = x => typeof x === 'undefined';

export const reduce = (fn, value) => ([x, ...xs]) => {
  if (undef(x)) {
    return value;
  }

  return reduce(fn, fn(value, x))(xs);
};

export const pipe = (...fns) => init => reduce((memo, fn) => fn(memo), init)(fns);

export const filter = fn => ([x, ...rest]) => {
  if (undef(x)) {
    return [];
  }

  return fn(x) ? [x, ...filter(fn)(rest)] : [...filter(fn)(rest)];
};

