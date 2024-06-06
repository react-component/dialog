import * as React from 'react';
import type { IDialogPropTypes } from './IDialogPropTypes';

export interface RefContextProps extends Pick<IDialogPropTypes, 'internalPanelTabIndex'> {
  panel?: React.Ref<HTMLDivElement>;
}

export const RefContext = React.createContext<RefContextProps>({});
