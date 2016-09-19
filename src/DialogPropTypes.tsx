import ReactNode = __React.ReactNode;
interface DialogPropTypes {
  className?: string;
  keyboard?: boolean;
  style?: {};
  mask?: boolean;
  children?: any;
  afterClose?: () => void;
  onClose?: () => void;
  closable?: boolean;
  maskClosable?: boolean;
  visible?: boolean;
  mousePosition?: {};
  title?: ReactNode;
  footer?: ReactNode;
  transitionName?:string;
  maskTransitionName?:string;
  wrapStyle?: {};
  bodyStyle?: {};
  maskStyle?: {};
  prefixCls?: string;
  wrapClassName?: string;
}

export default DialogPropTypes;
