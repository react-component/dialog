import * as React from 'react';

/**
 * `CSSMotion` treats every effect re-mount as a first mount, so the `appear`
 * motion starts over and the children are not rendered until it is prepared.
 * React `<Activity>` re-runs effects when it goes from `hidden` back to
 * `visible`, which would remount the panel (losing its state) and replay the
 * motion. `appear` only makes sense for the very first show, so turn it off
 * once the first visible change is done (or right away if mounted hidden).
 */
export default function useMotionAppear(visible: boolean) {
  const [motionAppear, setMotionAppear] = React.useState(visible);

  const onAppeared = React.useCallback(() => {
    setMotionAppear(false);
  }, []);

  return [motionAppear, onAppeared] as const;
}
