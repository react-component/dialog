import * as React from 'react';
import addEventListener from 'rc-util/lib/Dom/addEventListener';

interface IDraggablePropTypes {
  saveDistance?: number;
  draggable?: boolean;
}

function Draggable(WrappedComponent: any) {
  return class extends React.Component<IDraggablePropTypes, any> {
    state = {
      dx: 0, // 偏移量x
      dy: 0, // 偏移量y
    };

    position = {
      initX: 0, // 浮框的初始位置x
      initY: 0, // 浮框的初始位置x
      startX: 0, // 本次拖拽开始的初始位置x
      startY: 0, // 本次拖拽开始的初始位置y
    };

    private removeMouseUpListener: Function;
    private removeMouseMoveListener: Function;
    private dragDom: HTMLDivElement | null;
    private removeWindowResize: Function;
    private offsetDom: HTMLDivElement | null;

    componentDidMount() {
      if (this.props.draggable && this.offsetDom) {
        this.removeMouseUpListener = addEventListener(document, 'mouseup', this.docMouseUp).remove;
        let rect =  this.offsetDom.getBoundingClientRect();
        this.position.initX = (rect as any).x;
        this.position.initY = (rect as any).y;
        this.removeWindowResize = addEventListener(window, 'resize', this.windowResize).remove;
      }
    }

    componentWillUnmount() {
      if (this.props.draggable || this.removeMouseUpListener) {
        this.removeMouseUpListener();
      }
      this.removeWindowResize();
    }

    // 开始本次拖拽
    start = (e: any): void => {
      if (!this.props.draggable) {
        return;
      }
      if (e.button !== 0) {
        // 只允许左键，右键问题在于不选择conextmenu就不会触发mouseup事件
        return;
      }
      this.removeMouseMoveListener = addEventListener(document, 'mousemove', this.docMove).remove;
      this.position.startX = e.pageX - this.state.dx;
      this.position.startY = e.pageY - this.state.dy;
    }
    // 拖拽中
    docMove = (e: any): void => {
      let {dx, dy} = this.checkBorder(e.pageX - this.position.startX, e.pageY - this.position.startY);
      this.setState({
        dx,
        dy,
      });
    }
    // 拖拽结束
    docMouseUp = (e: any): void => {
      if (this.removeMouseMoveListener) {
        this.removeMouseMoveListener();
      }
    }

    windowResize = () => {
      if (!this.props.draggable) {
        return;
      }
      this.setState({dx: 0, dy: 0}, () => {
        let rect =  (this.offsetDom as HTMLElement).getBoundingClientRect();
        this.position.initX = (rect as any).x;
        this.position.initY = (rect as any).y;
      });
    }

    saveRef = (getRef?: Function) => {
      return (dom: any) => {
        this.offsetDom = dom;
        if (getRef) {
          getRef(dom);
        }
      };
    }

    getDragHeadStyle = () => this.props.draggable ? {cursor: 'move', userSelect: 'none'} : {};

    DragWrapper = (props: any) => {
      let {style = {}, ...extraProps} = props;
      return (
        <div
          style={{...this.getDragHeadStyle(), ...style}}
          ref={ref => {this.dragDom = ref; }}
          {...extraProps}
          onMouseDown={this.start}
        >
          {props.children}
        </div>
      );
    }

    OffsetWrapper = (props: any) => {
      let {dx, dy} = this.state;
      let { style = {}, getRef, ...extraStyles } = props;
      return (
        <div
          style={{
            ...style,
            // transform: `translate(${dx}px,${dy}px)`,
            position: 'relative',
            left: `${dx}px`,
            top: `${dy}px`,
          }}
          ref={this.saveRef(getRef)}
          {...extraStyles}
        >
          {props.children}
        </div>
      );
    }

    // 检查边界限定
    checkBorder = (dx: number, dy: number) => {
      let {offsetDom} = this;
      if (!offsetDom) {
        return {
          dx: 0,
          dy: 0,
        };
      }
      let {width}  = offsetDom.getBoundingClientRect();
      let {saveDistance = 80} = this.props;
      let result = {dx, dy};
      let {initX, initY} = this.position;
      if (initX + dx < -(width - saveDistance)) {
        result.dx = -(width - saveDistance) - initX;
      }
      if (initX + dx > (document.documentElement.clientWidth - saveDistance)) {
        result.dx = (document.documentElement.clientWidth - saveDistance) - initX;
      }
      if (initY + dy < 0) {
        result.dy = -initY;
      }
      if (initY + dy > (document.documentElement.clientHeight - saveDistance)) {
        result.dy = (document.documentElement.clientHeight - saveDistance) - initY;
      }
      return result;
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          DragWrapper={this.DragWrapper}
          OffsetWrapper={this.OffsetWrapper}
          offset={{dx: this.state.dx, dy: this.state.dy}}
        />
      );
    }
  };
}

export default Draggable;
