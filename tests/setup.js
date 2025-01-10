/* eslint-disable no-console */
global.requestAnimationFrame = (cb) => {
  return global.setTimeout(cb, 0);
};
global.cancelAnimationFrame = (cb) => {
  return global.clearTimeout(cb, 0);
};
window.requestAnimationFrame = (cb) => {
  return window.setTimeout(cb, 0);
};
window.cancelAnimationFrame = (cb) => {
  return window.clearTimeout(cb, 0);
};

const originError = console.error;
const ignoreList = [
  'Rendering components directly into document.body',
  'Warning: unmountComponentAtNode():',
];
console.error = (...args) => {
  if (ignoreList.some((str) => String(args[0]).includes(str))) {
    return;
  }

  originError(...args);
};
