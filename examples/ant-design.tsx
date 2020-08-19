/* eslint no-console:0 */
import '../assets/index.less';
import * as React from 'react';
import Dialog from '../src/DialogWrap';

const clearPath = 'M793 242H366v-74c0-6.7-7.7-10.4-12.9' +
  '-6.3l-142 112c-4.1 3.2-4.1 9.4 0 12.6l142 112c' +
  '5.2 4.1 12.9 0.4 12.9-6.3v-74h415v470H175c-4.4' +
  ' 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h618c35.3 0 64-' +
  '28.7 64-64V306c0-35.3-28.7-64-64-64z';

const getSvg = (path: string, props = {}, align = false) => {
  return (
    <i {...props}>
      <svg
        viewBox="0 0 1024 1024"
        width="1em"
        height="1em"
        fill="currentColor"
        style={align ? { verticalAlign: '-.125em ' } : {}}
      >
        <path d={path} p-id="5827"></path>
      </svg>
    </i>
  );
};

const MyControl = () => {
  const [visible, setVisible] = React.useState(false);
  const [visible2, setVisible2] = React.useState(false);
  const [width, setWidth] = React.useState(600);
  const [destroyOnClose, setDestroyOnClose] = React.useState(false);
  const [center, setCenter] = React.useState(false);
  const [mousePosition, setMousePosition] = React.useState({});
  const [useIcon, setUseIcon] = React.useState(false);
  const [forceRender, setForceRender] = React.useState(false);

  const onClick = (e: React.MouseEvent) => {
    setMousePosition({
      x: e.pageX,
      y: e.pageY,
    });
    setVisible(true);
  }

  const onClose = () => {
    setVisible(false);
  }

  const onClose2 = () => {
    setVisible(false);
    setVisible2(false);
  }

  const onDestroyOnCloseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDestroyOnClose(e.target.checked);
  }

  const onForceRenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForceRender(e.target.checked);
  }

  const changeWidth = () => {
    setWidth(width === 600 ? 800 : 600);
  }

  const centerEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCenter(e.target.checked);
  }

  const toggleCloseIcon = () => {
    setUseIcon(!useIcon);
  }

  const style = { width };

  let wrapClassName = '';
  if (center) {
    wrapClassName = 'center';
  }

  const dialog = (
    <Dialog
      visible={visible}
      wrapClassName={wrapClassName}
      animation="zoom"
      maskAnimation="fade"
      onClose={onClose}
      style={style}
      mousePosition={mousePosition}
      destroyOnClose={destroyOnClose}
      closeIcon={useIcon ? getSvg(clearPath, {}, true) : undefined}
      forceRender={forceRender}
      focusTriggerAfterClose={false}
    >
      <input autoFocus />
      <p>basic modal</p>
      <button onClick={() => {
        setVisible(false);
        setVisible2(true);
      }}>打开第二个并关闭当前的</button>
      <button onClick={() => {
        setVisible(true);
        setVisible2(true);
      }}>打开第二个</button>
      <button onClick={changeWidth}>change width</button>
      <button onClick={toggleCloseIcon}>
        use custom icon, is using icon: {useIcon && 'true' || 'false'}.
      </button>
      <div style={{ height: 200 }} />
    </Dialog>
  );

  const dialog2 = (
    <Dialog
      visible={visible2}
      onClose={onClose2}
    >
      <input autoFocus />
      <p>basic modal</p>
      <button onClick={() => {
        setVisible2(true);
      }}>关闭当前</button>
      <button onClick={onClose2}>关闭所有</button>
      <button onClick={changeWidth}>change width</button>
      <button onClick={toggleCloseIcon}>
        use custom icon, is using icon: {useIcon && 'true' || 'false'}.
      </button>
      <div style={{ height: 200 }} />
    </Dialog>
  );

  return (
    <div style={{ width: '90%', margin: '0 auto' }}>
      <style>
        {`
          .center {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          `}
      </style>
      <p>
        <button className="btn btn-primary" onClick={onClick}>
          show dialog
        </button>
        &nbsp;
        <label>
          destroy on close:
          <input
            type="checkbox"
            checked={destroyOnClose}
            onChange={onDestroyOnCloseChange}
          />
        </label>
        &nbsp;
        <label>
          center
          <input
            type="checkbox"
            checked={center}
            onChange={centerEvent}
          />
        </label>
        &nbsp;
        <label>
          force render
          <input
            type="checkbox"
            checked={forceRender}
            onChange={onForceRenderChange}
          />
        </label>
      </p>
      {dialog}
      {dialog2}
    </div>
  );
};

export default MyControl;
