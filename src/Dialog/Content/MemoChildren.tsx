import * as React from 'react';

export interface MemoChildrenProps {
  visible: boolean;
  children: React.ReactElement;
}

export default React.memo(
  ({ children }: MemoChildrenProps) => children,
  (_, { visible }) => !visible,
);
