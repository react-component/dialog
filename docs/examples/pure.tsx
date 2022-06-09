/* eslint no-console:0 */
import * as React from 'react';
import 'rc-select/assets/index.less';
import { Panel } from 'rc-dialog';
import '../../assets/index.less';

export default () => (
  <Panel prefixCls="rc-dialog" title="Title" closable>
    Hello World!
  </Panel>
);
