export function getMotionName(prefixCls: string, transitionName?: string, animationName?: string) {
  let motionName = transitionName;
  if (!motionName && animationName) {
    motionName = `${prefixCls}-${animationName}`;
  }
  return motionName;
}

let uuid = -1;
export function getUUID() {
  uuid += 1;
  return uuid;
}
