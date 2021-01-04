/* eslint no-console:0 */
import * as React from 'react';
import Select from 'rc-select';
import 'rc-select/assets/index.less';
import Dialog from 'rc-dialog';
import '../../assets/index.less';

const clearPath =
  'M793 242H366v-74c0-6.7-7.7-10.4-12.9' +
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
        <path d={path} p-id="5827" />
      </svg>
    </i>
  );
};

const MyControl = () => {
  const [visible1, setVisible1] = React.useState(true);
  const [visible2, setVisible2] = React.useState(false);
  const [visible3, setVisible3] = React.useState(false);
  const [width, setWidth] = React.useState(600);
  const [destroyOnClose, setDestroyOnClose] = React.useState(false);
  const [center, setCenter] = React.useState(false);
  const [mousePosition, setMousePosition] = React.useState({
    x: null,
    y: null,
  });
  const [useIcon, setUseIcon] = React.useState(false);
  const [forceRender, setForceRender] = React.useState(false);

  const onClick = (e: React.MouseEvent) => {
    setMousePosition({
      x: e.pageX,
      y: e.pageY,
    });
    setVisible1(true);
  };

  const onClose = () => {
    setVisible1(false);
  };

  const onClose2 = () => {
    setVisible2(false);
  };

  const onClose3 = () => {
    setVisible3(false);
  };

  const closeAll = () => {
    setVisible1(false);
    setVisible2(false);
    setVisible3(false);
  };

  const onDestroyOnCloseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDestroyOnClose(e.target.checked);
  };

  const onForceRenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForceRender(e.target.checked);
  };

  const changeWidth = () => {
    setWidth(width === 600 ? 800 : 600);
  };

  const centerEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCenter(e.target.checked);
  };

  const toggleCloseIcon = () => {
    setUseIcon(!useIcon);
  };

  const style = { width };

  let wrapClassName = '';
  if (center) {
    wrapClassName = 'center';
  }

  const dialog = (
    <Dialog
      visible={visible1}
      wrapClassName={wrapClassName}
      animation="zoom"
      maskAnimation="fade"
      onClose={onClose}
      style={style}
      title="dialog1"
      mousePosition={mousePosition}
      destroyOnClose={destroyOnClose}
      closeIcon={useIcon ? getSvg(clearPath, {}, true) : undefined}
      forceRender={forceRender}
      focusTriggerAfterClose={false}
    >
      <input autoFocus />
      <p>basic modal</p>
      <button
        type="button"
        onClick={() => {
          setVisible1(false);
          setVisible2(true);
        }}
      >
        打开第二个并关闭当前的
      </button>
      <button
        type="button"
        onClick={() => {
          setVisible2(true);
        }}
      >
        打开第二个
      </button>
      <button type="button" onClick={changeWidth}>
        change width
      </button>
      <button type="button" onClick={toggleCloseIcon}>
        use custom icon, is using icon: {(useIcon && 'true') || 'false'}.
      </button>
      <div style={{ height: 200 }}>
        <Select dropdownStyle={{ zIndex: 9999999 }}>
          <Select.Option value="light">Light</Select.Option>
        </Select>
      </div>
    </Dialog>
  );

  const dialog2 = (
    <Dialog visible={visible2} title="dialog2" onClose={onClose2}>
      <input autoFocus />
      <p>basic modal</p>
      <button
        type="button"
        onClick={() => {
          setVisible3(true);
        }}
      >
        打开第三个
      </button>
      <button
        type="button"
        onClick={() => {
          setVisible2(false);
        }}
      >
        关闭当前
      </button>
      <button type="button" onClick={closeAll}>
        关闭所有
      </button>
      <button type="button" onClick={changeWidth}>
        change width
      </button>
      <button type="button" onClick={toggleCloseIcon}>
        use custom icon, is using icon: {(useIcon && 'true') || 'false'}.
      </button>
      <div style={{ height: 200 }} />
    </Dialog>
  );

  const dialog3 = (
    <Dialog forceRender title="dialog3" visible={visible3} onClose={onClose3}>
      <p>initialized with forceRender and visbile true</p>
      <button
        type="button"
        onClick={() => {
          setVisible3(false);
        }}
      >
        关闭当前
      </button>
      <button type="button" onClick={closeAll}>
        关闭所有
      </button>
      <button type="button" onClick={changeWidth}>
        change width
      </button>
      <button type="button" onClick={toggleCloseIcon}>
        use custom icon, is using icon: {(useIcon && 'true') || 'false'}.
      </button>
      <div style={{ height: 200 }} />
    </Dialog>
  );

  return (
    <React.StrictMode>
      <div style={{ width: '90%', margin: '0 auto', height: '150vh' }}>
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
          <button type="button" className="btn btn-primary" onClick={onClick}>
            show dialog
          </button>
          &nbsp;
          <label>
            destroy on close:
            <input type="checkbox" checked={destroyOnClose} onChange={onDestroyOnCloseChange} />
          </label>
          &nbsp;
          <label>
            center
            <input type="checkbox" checked={center} onChange={centerEvent} />
          </label>
          &nbsp;
          <label>
            force render
            <input type="checkbox" checked={forceRender} onChange={onForceRenderChange} />
          </label>
          <input placeholder="Useless Input" onClick={onClick} />
        </p>
        {dialog}
        {dialog2}
        {dialog3}
      </div>
    </React.StrictMode>
  );
};

export default MyControl;
