import * as React from 'react';
import addEventListener from 'rc-util/lib/Dom/addEventListener';

interface IDraggablePropTypes {
  saveDistance?: number;
  draggable?: boolean;
}

function Draggable(WrappedComponent: any) {
  return class extends React.Component<IDraggablePropTypes, any> {
    state = {
      dx: 0, // x of offset
      dy: 0, // y of offset
    };

    position = {
      initX: 0, // x of initial position
      initY: 0, // y of initial position
      startX: 0, // x of dragging start position
      startY: 0, // x of dragging start position
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

    // start to drag
    start = (e: any): void => {
      if (!this.props.draggable) {
        return;
      }
      if (e.button !== 0) {
        // only the right button is allowed
        return;
      }
      this.removeMouseMoveListener = addEventListener(document, 'mousemove', this.docMove).remove;
      this.position.startX = e.pageX - this.state.dx;
      this.position.startY = e.pageY - this.state.dy;
    }
    // in dragging
    docMove = (e: any): void => {
      let {dx, dy} = this.checkBorder(e.pageX - this.position.startX, e.pageY - this.position.startY);
      this.setState({
        dx,
        dy,
      });
    }
    // end of drag
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

    // check the distance over the window border to avoid dragging too far
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
