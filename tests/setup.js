/* eslint-disable no-console */
global.requestAnimationFrame = cb => setTimeout(cb, 0);

const originError = console.error;
const ignoreList = [
  'Rendering components directly into document.body',
  'Warning: unmountComponentAtNode():',
];
console.error = (...args) => {
  if (ignoreList.some(str => args[0].includes(str))) {
    return;
  }

  originError(...args);
};

const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });
