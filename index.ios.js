// only for react-native examples

import getList from 'react-native-index-page';

getList({
  demos: [
    require('./examples/react-native/demo')
  ],
  title: require('./package.json').name,
});
