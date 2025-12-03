import * as React from 'react';
import { useRef } from 'react';
import { clsx } from 'clsx';
import CSSMotion from '@rc-component/motion';
import { offset } from '../../util';
import type { PanelProps, PanelRef } from './Panel';
import Panel from './Panel';
import type { CSSMotionRef } from '@rc-component/motion/es/CSSMotion';

export type CSSMotionStateRef = Pick<CSSMotionRef, 'inMotion' | 'enableMotion'>;

export type ContentRef = PanelRef & CSSMotionStateRef;

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
    destroyOnHidden,
    motionName,
    ariaId,
    onVisibleChanged,
    mousePosition,
  } = props;

  const dialogRef = useRef<{ nativeElement: HTMLElement } & CSSMotionStateRef>(null);
  const panelRef = useRef<PanelRef>(null);

  // Force remount CSSMotion when visible changes from false to false
  // This handles React.Activity scenarios where component state is preserved
  const [motionKey, setMotionKey] = React.useState(0);
  const prevVisibleRef = useRef(visible);

  React.useEffect(() => {
    if (!visible && !prevVisibleRef.current) {
      setMotionKey(k => k + 1);
    }
    prevVisibleRef.current = visible;
  }, [visible]);

  // ============================== Refs ==============================
  React.useImperativeHandle(ref, () => ({
    ...panelRef.current,
    inMotion: dialogRef.current.inMotion,
    enableMotion: dialogRef.current.enableMotion,
  }));

  // ============================= Style ==============================
  const [transformOrigin, setTransformOrigin] = React.useState<string>();
  const contentStyle: React.CSSProperties = {};

  if (transformOrigin) {
    contentStyle.transformOrigin = transformOrigin;
  }

  function onPrepare() {
    const elementOffset = offset(dialogRef.current.nativeElement);

    setTransformOrigin(
      mousePosition && (mousePosition.x || mousePosition.y)
        ? `${mousePosition.x - elementOffset.left}px ${mousePosition.y - elementOffset.top}px`
        : '',
    );
  }

  // ============================= Render =============================
  return (
    <CSSMotion
      key={motionKey}
      visible={visible}
      onVisibleChanged={onVisibleChanged}
      onAppearPrepare={onPrepare}
      onEnterPrepare={onPrepare}
      forceRender={forceRender}
      motionName={motionName}
      removeOnLeave={destroyOnHidden}
      ref={dialogRef}
    >
      {({ className: motionClassName, style: motionStyle }, motionRef) => (
        <Panel
          {...props}
          ref={panelRef}
          title={title}
          ariaId={ariaId}
          prefixCls={prefixCls}
          holderRef={motionRef}
          style={{ ...motionStyle, ...style, ...contentStyle }}
          className={clsx(className, motionClassName)}
        />
      )}
    </CSSMotion>
  );
});

if (process.env.NODE_ENV !== 'production') {
  Content.displayName = 'Content';
}

export default Content;
