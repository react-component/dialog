import * as React from 'react';

export interface MemoChildrenProps {
  visible: boolean;
  children: React.ReactNode;
}

export default React.memo(
  ({ children }: MemoChildrenProps) => children as React.ReactElement,
  (_, { visible }) => !visible,
);
