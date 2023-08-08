import * as React from 'react';

export interface RefContextProps {
  panel?: React.Ref<HTMLDivElement>;
}

export const RefContext = React.createContext<RefContextProps>({});
