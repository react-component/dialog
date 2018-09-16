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

    componentDidMount() {
      if (this.props.draggable && this.dragDom) {
        this.removeMouseUpListener = addEventListener(document, 'mouseup', this.docMouseUp).remove;
        let rect =  this.dragDom.getBoundingClientRect();
        this.position.initX = (rect as any).x;
        this.position.initY = (rect as any).y;
      }
    }

    componentWillUnmount() {
      if (this.props.draggable || this.removeMouseUpListener) {
        this.removeMouseUpListener();
      }
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
      this.setState({
        dx: e.pageX - this.position.startX,
        dy: e.pageY - this.position.startY,
      });
    }
    // 拖拽结束
    docMouseUp = (e: any): void => {
      if (this.removeMouseMoveListener) {
        this.removeMouseMoveListener();
      }
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
    render() {
      return (
        <WrappedComponent
          {...this.props}
          DragWrapper={this.DragWrapper}
          offset={{dx: this.state.dx, dy: this.state.dy}}
        />
      );
    }
  };
}

export default Draggable;
