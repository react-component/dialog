import * as React from 'react';
import { clsx } from 'clsx';
import CSSMotion from '@rc-component/motion';

export type MaskProps = {
  prefixCls: string;
  visible: boolean;
  motionName?: string;
  style?: React.CSSProperties;
  maskProps?: React.HTMLAttributes<HTMLDivElement>;
  className?: string;
};

const Mask: React.FC<MaskProps> = (props) => {
  const { prefixCls, style, visible, maskProps, motionName, className } = props;
  return (
    <CSSMotion
      key="mask"
      visible={visible}
      motionName={motionName}
      leavedClassName={`${prefixCls}-mask-hidden`}
    >
      {({ className: motionClassName, style: motionStyle }, ref) => (
        <div
          ref={ref}
          style={{ ...motionStyle, ...style }}
          className={clsx(`${prefixCls}-mask`, motionClassName, className)}
          {...maskProps}
        />
      )}
    </CSSMotion>
  );
};

export default Mask;
