import type { GetContainer } from 'rc-util/lib/PortalWrapper';
import type { CSSProperties, ReactNode, SyntheticEvent } from 'react';

export interface ModalClassNames {
  header?: string;
  body?: string;
  footer?: string;
  mask?: string;
  content?: string;
  wrapper?: string;
}

export interface ModalStyles {
  header?: CSSProperties;
  body?: CSSProperties;
  footer?: CSSProperties;
  mask?: CSSProperties;
  wrapper?: CSSProperties;
  content?: CSSProperties;
}

export type IDialogPropTypes = {
  className?: string;
  keyboard?: boolean;
  style?: CSSProperties;
  mask?: boolean;
  children?: any;
  afterClose?: () => any;
  afterOpenChange?: (open: boolean) => void;
  onClose?: (e: SyntheticEvent) => any;
  closable?: boolean | { icon?: ReactNode, title?: string, ariaLabel?: string };
  maskClosable?: boolean;
  visible?: boolean;
  destroyOnClose?: boolean;
  mousePosition?: {
    x: number;
    y: number;
  } | null;
  title?: ReactNode;
  footer?: ReactNode;
  transitionName?: string;
  maskTransitionName?: string;
  animation?: any;
  maskAnimation?: any;
  wrapStyle?: Record<string, any>;
  bodyStyle?: Record<string, any>;
  maskStyle?: Record<string, any>;
  prefixCls?: string;
  wrapClassName?: string;
  width?: string | number;
  height?: string | number;
  zIndex?: number;
  bodyProps?: any;
  maskProps?: any;
  rootClassName?: string;
  classNames?: ModalClassNames;
  styles?: ModalStyles;
  wrapProps?: any;
  getContainer?: GetContainer | false;
  closeIcon?: ReactNode;
  modalRender?: (node: ReactNode) => ReactNode;
  forceRender?: boolean;
  // https://github.com/ant-design/ant-design/issues/19771
  // https://github.com/react-component/dialog/issues/95
  focusTriggerAfterClose?: boolean;

  // Refs
  panelRef?: React.Ref<HTMLDivElement>;
};
