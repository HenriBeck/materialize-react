/* eslint-disable no-console, id-blacklist */

console.warn = (message) => {
  throw new Error(message);
};

console.error = (message) => {
  throw new Error(message);
};
