import * as React from 'react';

export interface MemoChildrenProps {
  shouldUpdate: boolean;
  children: React.ReactNode;
}

export default React.memo(
  ({ children }: MemoChildrenProps) => children as React.ReactElement,
  (_, { shouldUpdate }) => !shouldUpdate,
);
