import * as React from 'react';
import classNames from 'classnames';
import CSSMotion from 'rc-motion';

export type MaskProps = {
  prefixCls: string;
  visible: boolean;
  motionName?: string;
  style?: React.CSSProperties;
  maskProps?: React.HTMLAttributes<HTMLDivElement>;
  rootClassName?: string;
};

export default function Mask(props: MaskProps) {
  const { prefixCls, style, visible, maskProps, motionName, rootClassName } = props;

  return (
    <CSSMotion
      key="mask"
      visible={visible}
      motionName={motionName}
      leavedClassName={`${prefixCls}-mask-hidden`}
    >
      {({ className: motionClassName, style: motionStyle }) => (
        <div
          style={{ ...motionStyle, ...style }}
          className={classNames(`${prefixCls}-mask`, motionClassName, rootClassName)}
          {...maskProps}
        />
      )}
    </CSSMotion>
  );
}
