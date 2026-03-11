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

window.MessageChannel = class {
  port1;
  port2;
  constructor() {
    const createPort = () => {
      const port = {
        onmessage: null,
        postMessage: (message) => {
          setTimeout(() => {
            if (port._target && typeof port._target.onmessage === 'function') {
              port._target.onmessage({ data: message });
            }
          }, 0);
        },
        _target: null,
      };
      return port;
    };

    const port1 = createPort();
    const port2 = createPort();
    port1._target = port2;
    port2._target = port1;
    this.port1 = port1;
    this.port2 = port2;
  }
}
