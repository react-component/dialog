import { ReactNode, CSSProperties, SyntheticEvent } from 'react';
import { GetContainer } from 'rc-util/lib/PortalWrapper';

export interface IDialogPropTypes {
  className?: string;
  keyboard?: boolean;
  style?: CSSProperties;
  mask?: boolean;
  children?: any;
  afterClose?: () => any;
  onClose?: (e: SyntheticEvent) => any;
  closable?: boolean;
  maskClosable?: boolean;
  visible?: boolean;
  destroyOnClose?: boolean;
  mousePosition?: {
    x: number;
    y: number;
  };
  title?: ReactNode;
  footer?: ReactNode;
  transitionName?: string;
  maskTransitionName?: string;
  animation?: any;
  maskAnimation?: any;
  wrapStyle?: {};
  bodyStyle?: {};
  maskStyle?: {};
  prefixCls?: string;
  wrapClassName?: string;
  width?: number;
  height?: number;
  zIndex?: number;
  bodyProps?: any;
  maskProps?: any;
  wrapProps?: any;
  getContainer?: GetContainer | false;
  closeIcon?: ReactNode;
  modalRender?: (node: ReactNode) => ReactNode;
  forceRender?: boolean;
  // https://github.com/ant-design/ant-design/issues/19771
  // https://github.com/react-component/dialog/issues/95
  focusTriggerAfterClose?: boolean;
}
