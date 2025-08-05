import type { GetContainer } from '@rc-component/util/lib/PortalWrapper';
import type { CSSProperties, ReactNode, SyntheticEvent } from 'react';

export type SemanticName = 'header' | 'body' | 'footer' | 'container' | 'title' | 'wrapper' | 'mask';

export type ModalClassNames = Partial<Record<SemanticName, string>>;

export type ModalStyles = Partial<Record<SemanticName, CSSProperties>>;

export type ClosableType = {
  closeIcon?: React.ReactNode;
  disabled?: boolean;
  afterClose?: () => any;
};

export type IDialogPropTypes = {
  className?: string;
  keyboard?: boolean;
  style?: CSSProperties;
  rootStyle?: CSSProperties;
  mask?: boolean;
  children?: React.ReactNode;
  afterClose?: () => any;
  afterOpenChange?: (open: boolean) => void;
  onClose?: (e: SyntheticEvent) => any;
  closable?: boolean | (ClosableType & React.AriaAttributes);
  maskClosable?: boolean;
  visible?: boolean;
  destroyOnHidden?: boolean;
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
