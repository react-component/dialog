import React from 'react';
import { Panel } from 'rc-dialog';
import 'rc-select/assets/index.less';
import '../../assets/index.less';

const Demo: React.FC = () => (
  <Panel prefixCls="rc-dialog" title="Title" closable>
    Hello World!
  </Panel>
);

export default Demo;
