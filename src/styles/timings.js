/**
 * A function to transform numbers into a cubic-bezier string.
 *
 * @param {...Number} timing - The numbers for the cubic-bezier function.
 * @returns {String} - Returns the cubic-bezier function as a string.
 */
const cubicBezier = (...timing) => `cubic-bezier(${timing.join(',')})`;

export const easeInQuad = cubicBezier(0.550, 0.085, 0.680, 0.530);
export const easeInCubic = cubicBezier(0.550, 0.055, 0.675, 0.190);
export const easeInQuart = cubicBezier(0.895, 0.030, 0.685, 0.220);
export const easeInQuint = cubicBezier(0.755, 0.050, 0.855, 0.060);
export const easeInSine = cubicBezier(0.470, 0.000, 0.745, 0.715);
export const easeInExpo = cubicBezier(0.950, 0.050, 0.795, 0.035);
export const easeInCirc = cubicBezier(0.600, 0.040, 0.980, 0.335);
export const easeInBack = cubicBezier(0.600, -0.280, 0.735, 0.045);

export const easeOutQuad = cubicBezier(0.250, 0.460, 0.450, 0.940);
export const easeOutCubic = cubicBezier(0.215, 0.610, 0.355, 1.000);
export const easeOutQuart = cubicBezier(0.165, 0.840, 0.440, 1.000);
export const easeOutQuint = cubicBezier(0.230, 1.000, 0.320, 1.000);
export const easeOutSine = cubicBezier(0.390, 0.575, 0.565, 1.000);
export const easeOutExpo = cubicBezier(0.190, 1.000, 0.220, 1.000);
export const easeOutCirc = cubicBezier(0.075, 0.820, 0.165, 1.000);
export const easeOutBack = cubicBezier(0.175, 0.885, 0.320, 1.275);

export const easeInOutQuad = cubicBezier(0.455, 0.030, 0.515, 0.955);
export const easeInOutCubic = cubicBezier(0.645, 0.045, 0.355, 1.000);
export const easeInOutQuart = cubicBezier(0.770, 0.000, 0.175, 1.000);
export const easeInOutQuint = cubicBezier(0.860, 0.000, 0.070, 1.000);
export const easeInOutSine = cubicBezier(0.445, 0.050, 0.550, 0.950);
export const easeInOutExpo = cubicBezier(1.000, 0.000, 0.000, 1.000);
export const easeInOutCirc = cubicBezier(0.785, 0.135, 0.150, 0.860);
export const easeInOutBack = cubicBezier(0.680, -0.550, 0.265, 1.550);
