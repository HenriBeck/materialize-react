import warning from '/src/utils/warning';

export default function variables(vars = {}) {
  return value => value
    .replace(/var\((\w+)\)/g, (found, name) => {
      warning(!vars[name], `${name} isn't a valid variable!`);

      return vars[name];
    })
    .trim();
}
