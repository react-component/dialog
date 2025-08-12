import * as React from 'react';
import classNames from 'classnames';
import CSSMotion from '@rc-component/motion';

export type MaskProps = {
  prefixCls: string;
  visible: boolean;
  motionName?: string;
  style?: React.CSSProperties;
  maskProps?: React.HTMLAttributes<HTMLDivElement>;
  className?: string;
  mask?: boolean | 'blur';
};

const Mask: React.FC<MaskProps> = (props) => {
  const { prefixCls, style, visible, maskProps, motionName, className, mask } = props;
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
          className={classNames(
            `${prefixCls}-mask`,
            motionClassName,
            className,
            mask === 'blur' && `${prefixCls}-mask-blur`,
          )}
          {...maskProps}
        />
      )}
    </CSSMotion>
  );
};

export default Mask;
