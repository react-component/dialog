import { defineConfig } from 'dumi';
import path from 'path';

// test PR
export default defineConfig({
  alias: {
    'rc-dialog$': path.resolve('src'),
    'rc-dialog/es': path.resolve('src'),
  },
  favicons: ['https://avatars0.githubusercontent.com/u/9441414?s=200&v=4'],
  themeConfig: {
    name: 'Dialog',
    logo: 'https://avatars0.githubusercontent.com/u/9441414?s=200&v=4',
  },
});;
