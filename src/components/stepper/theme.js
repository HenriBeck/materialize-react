export function defaultTheme(vars) {
  return {
    headers: {
      dots: {
        inactiveColor: vars.disabledColor,
        activeColor: vars.primaryBase,
        dotSize: 8,
        margin: 4,
      },
    },
  };
}
