import * as React from 'react';
import { useRef } from 'react';
import classNames from 'classnames';
import CSSMotion from '@rc-component/motion';
import { offset } from '../../util';
import type { PanelProps, ContentRef } from './Panel';
import Panel from './Panel';

console.log(CSSMotion);

export type ContentProps = {
  motionName: string;
  ariaId: string;
  onVisibleChanged: (visible: boolean) => void;
} & PanelProps;

const Content = React.forwardRef<ContentRef, ContentProps>((props, ref) => {
  const {
    prefixCls,
    title,
    style,
    className,
    visible,
    forceRender,
    destroyOnClose,
    motionName,
    ariaId,
    onVisibleChanged,
    mousePosition,
  } = props;

  const dialogRef = useRef<{
    nativeElement: HTMLDivElement;
    inMotion: () => boolean;
  }>();

  // ============================= Style ==============================
  const [transformOrigin, setTransformOrigin] = React.useState<string>();
  const contentStyle: React.CSSProperties = {};

  if (transformOrigin) {
    contentStyle.transformOrigin = transformOrigin;
  }

  function onPrepare() {
    console.log('onPrepare', dialogRef.current);
    const elementOffset = offset(dialogRef.current?.nativeElement);

    setTransformOrigin(
      mousePosition && (mousePosition.x || mousePosition.y)
        ? `${mousePosition.x - elementOffset.left}px ${mousePosition.y - elementOffset.top}px`
        : '',
    );
  }

  const bbb = React.useCallback((aaa) => {
    console.log('???', aaa);
    dialogRef.current = aaa;
  }, []);
  console.log('render....');

  // ============================= Render =============================
  return (
    <CSSMotion
      visible={visible}
      onVisibleChanged={onVisibleChanged}
      onAppearPrepare={onPrepare}
      onEnterPrepare={onPrepare}
      forceRender={forceRender}
      motionName={motionName}
      removeOnLeave={destroyOnClose}
      ref={bbb}
    >
      {({ className: motionClassName, style: motionStyle }, motionRef) => (
        <Panel
          {...props}
          ref={ref}
          title={title}
          ariaId={ariaId}
          prefixCls={prefixCls}
          holderRef={motionRef}
          style={{ ...motionStyle, ...style, ...contentStyle }}
          className={classNames(className, motionClassName)}
        />
      )}
    </CSSMotion>
  );
});

Content.displayName = 'Content';

export default Content;
