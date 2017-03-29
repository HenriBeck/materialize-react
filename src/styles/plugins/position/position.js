function checkForNumber(arg, value) {
  return arg || arg === 0 ? arg : value;
}

export default function position(pos = null, ...args) {
  const top = checkForNumber(args[0], null);
  const right = checkForNumber(args[1], top);
  const bottom = checkForNumber(args[2], top);
  const left = checkForNumber(args[3], right);

  if (pos === null) {
    return {};
  } else if (top === null) {
    return { position: pos };
  }

  return {
    position: pos,
    top,
    right,
    bottom,
    left,
  };
}
