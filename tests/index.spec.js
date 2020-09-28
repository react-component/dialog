/* eslint-disable react/no-render-return-value, max-classes-per-file, func-names */
import React, { cloneElement } from 'react';
import { mount } from 'enzyme';

import KeyCode from 'rc-util/lib/KeyCode';

import Dialog from '../src';
import '../assets/bootstrap.less';

describe('dialog', () => {
  // let dialog;
  // let callback;
  // class DialogWrap extends React.Component {
  //   state = {
  //     visible: false,
  //     maskClosable: true,
  //   };

  //   render() {
  //     return (
  //       <Dialog
  //         {...this.props}
  //         visible={this.state.visible}
  //         maskClosable={this.state.maskClosable}
  //       />
  //     );
  //   }
  // }

  beforeEach(() => {
    //   function onClose() {
    //     callback = 1;
    //     dialog.setState({
    //       visible: false,
    //     });
    //   }

    //   callback = 0;
    //   dialog = mount(
    //     <DialogWrap style={{ width: 600 }} onClose={onClose} closeIcon="test">
    //       <p>第一个dialog</p>
    //     </DialogWrap>,
    //   );

    jest.useFakeTimers();
  });

  afterEach(() => {
    //   dialog.unmount();
    jest.useRealTimers();
  });

  it('show', () => {
    const wrapper = mount(<Dialog visible />);
    jest.runAllTimers();
    wrapper.update();
    expect(wrapper.find('.rc-dialog-wrap').props().style.display).toBeFalsy();
  });

  it('close', () => {
    const wrapper = mount(<Dialog visible />);
    jest.runAllTimers();

    wrapper.setProps({ visible: false });
    jest.runAllTimers();
    wrapper.update();

    expect(wrapper.find('.rc-dialog-wrap').props().style.display).toEqual('none');
  });

  it('create & root & mask', () => {
    const wrapper = mount(<Dialog visible />);
    jest.runAllTimers();
    wrapper.update();

    expect(wrapper.find('.rc-dialog-root').length).toBeTruthy();
    expect(wrapper.find('.rc-dialog-mask').length).toBeTruthy();
  });

  it('click close', () => {
    const onClose = jest.fn();
    const wrapper = mount(<Dialog closeIcon="test" onClose={onClose} visible />);
    jest.runAllTimers();
    wrapper.update();

    const btn = wrapper.find('.rc-dialog-close');
    expect(btn.text()).toBe('test');
    btn.simulate('click');

    jest.runAllTimers();
    wrapper.update();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('destroy on hide should unmount child components on close', () => {
    const wrapper = mount(
      <Dialog destroyOnClose>
        <input className="test-input" />
      </Dialog>,
      { attachTo: document.body },
    );

    // Show
    wrapper.setProps({ visible: true });
    jest.runAllTimers();
    wrapper.update();

    document.getElementsByClassName('.test-input').value = 'test';
    expect(document.getElementsByClassName('.test-input').value).toBe('test');

    // Hide
    wrapper.setProps({ visible: false });
    jest.runAllTimers();
    wrapper.update();

    // Show
    wrapper.setProps({ visible: true });
    jest.runAllTimers();
    wrapper.update();

    expect(document.getElementsByClassName('.test-input').value).toBeUndefined();
    wrapper.unmount();
  });

  it('esc to close', () => {
    const onClose = jest.fn();
    const wrapper = mount(<Dialog onClose={onClose} visible />);
    jest.runAllTimers();
    wrapper.update();

    wrapper.find('.rc-dialog').simulate('keyDown', { keyCode: KeyCode.ESC });
    jest.runAllTimers();
    wrapper.update();
    expect(onClose).toHaveBeenCalled();
  });

  // it('mask to close', () => {
  //   let now = 0;
  //   const originDateNow = Date.now;

  //   // disable https://github.com/react-component/dialog/blob/d9604fa6ad40e949999456d8c020e47593e48f0d/src/Dialog.tsx#L188
  //   Date.now = () => {
  //     now += 500;
  //     return now;
  //   };

  //   dialog.setState({ visible: true });
  //   jest.runAllTimers();
  //   dialog.update();
  //   const mask = dialog.find('.rc-dialog-wrap').first();
  //   mask.simulate('click');
  //   jest.runAllTimers();
  //   dialog.update();
  //   expect(callback).toBe(1);
  //   expect(dialog.find('.rc-dialog-wrap').props().style).toEqual({});
  //   dialog.setState({ visible: true, maskClosable: false });
  //   jest.runAllTimers();
  //   dialog.update();
  //   expect(dialog.find('.rc-dialog-wrap').props().style.display).toEqual(null);

  //   Date.now = originDateNow;
  // });

  // it('renderToBody', () => {
  //   const container = document.createElement('div');
  //   document.body.appendChild(container);
  //   const d = mount(
  //     <DialogWrap>
  //       <p className="renderToBody">1</p>
  //     </DialogWrap>,
  //     { attachTo: container },
  //   );
  //   expect(d.find('.renderToBody').length).toBe(0);
  //   expect(d.find('.rc-dialog-wrap').length).toBe(0);
  //   d.setState({ visible: true });
  //   jest.runAllTimers();
  //   d.update();
  //   expect(d.find('.rc-dialog-wrap').length).toBeTruthy();
  //   expect(d.find('.renderToBody').length).toBeTruthy();
  //   expect(d.find('.rc-dialog-wrap').getDOMNode().parentNode.parentNode).not.toBe(container);
  //   d.unmount();
  //   expect(d.find('.renderToBody').length).toBe(0);
  //   expect(d.find('.rc-dialog-wrap').length).toBe(0);
  // });

  // it('getContainer', () => {
  //   const returnedContainer = document.createElement('div');
  //   const d = mount(
  //     <DialogWrap getContainer={() => returnedContainer}>
  //       <p className="getContainer">Hello world!</p>
  //     </DialogWrap>,
  //   );
  //   d.setState({ visible: true });
  //   jest.runAllTimers();
  //   d.update();
  //   // fix issue #10656, must change this test
  //   expect(d.find('.rc-dialog-wrap').getDOMNode().parentNode.parentNode.parentNode).toBe(
  //     returnedContainer,
  //   );
  //   d.unmount();
  // });

  // it('render footer correctly', () => {
  //   const d = mount(<DialogWrap footer="test" />);
  //   d.setState({ visible: true });
  //   jest.runAllTimers();
  //   d.update();
  //   expect(d.find('.rc-dialog-footer').length).toBeTruthy();
  //   expect(d.find('.rc-dialog-footer').props().children).toBe('test');
  //   d.unmount();
  // });

  // it('support input autoFocus', () => {
  //   const d = mount(
  //     <DialogWrap>
  //       <input autoFocus />
  //     </DialogWrap>,
  //   );
  //   d.setState({ visible: true });
  //   jest.runAllTimers();
  //   d.update();
  //   expect(document.activeElement).toBe(document.querySelector('input'));
  //   d.unmount();
  // });

  // it('trap focus after shift-tabbing', () => {
  //   dialog.setState({ visible: true });
  //   jest.runAllTimers();
  //   dialog.update();
  //   const shiftTabbingDescriptor = {
  //     key: 'TAB',
  //     keyCode: 9,
  //     which: 9,
  //     shiftKey: true,
  //   };
  //   dialog.find('.rc-dialog-wrap').at(0).simulate('keyDown', shiftTabbingDescriptor);
  //   const sentinelEnd = document.querySelectorAll('.rc-dialog-content + div')[0];
  //   expect(document.activeElement).toBe(sentinelEnd);
  // });

  // it('sets transform-origin when property mousePosition is set', () => {
  //   const d = mount(
  //     <Dialog style={{ width: 600 }} mousePosition={{ x: 100, y: 100 }} visible>
  //       <p>the dialog</p>
  //     </Dialog>,
  //   );
  //   jest.runAllTimers();
  //   d.update();
  //   expect(d.find('.rc-dialog').at(0).getDOMNode().style['transform-origin']).toBeTruthy();
  //   d.unmount();
  // });

  // it('can get dom element before dialog first show when forceRender is set true ', () => {
  //   const d = mount(
  //     <Dialog forceRender>
  //       <div>forceRender element</div>
  //     </Dialog>,
  //   );
  //   expect(d.find('.rc-dialog-body > div').props().children).toEqual('forceRender element');
  //   d.unmount();
  // });

  // it('getContainer is false', () => {
  //   const d = mount(
  //     <Dialog getContainer={false}>
  //       <div>forceRender element</div>
  //     </Dialog>,
  //   );
  //   expect(d.find('.rc-dialog-body > div').props().children).toEqual('forceRender element');
  //   expect(d.find('.rc-dialog-wrap').at(0).props().style).toEqual({});
  //   d.unmount();
  // });

  // it('getContainer is false and visible is true', () => {
  //   const d = mount(
  //     <Dialog getContainer={false} visible>
  //       <div>forceRender element</div>
  //     </Dialog>,
  //   );
  //   expect(d.find('.rc-dialog-body > div').props().children).toEqual('forceRender element');
  //   expect(d.find('.rc-dialog-wrap').props().style.display).toEqual(null);
  //   d.unmount();
  // });

  // it('should not close if mouse down in dialog', () => {
  //   dialog.setState({ visible: true });
  //   jest.runAllTimers();
  //   dialog.update();
  //   const dialogBody = dialog.find('.rc-dialog-body').at(0);
  //   dialogBody.simulate('mousedown');
  //   const wrapper = dialog.find('.rc-dialog-wrap').at(0);
  //   wrapper.simulate('mouseup');
  //   expect(dialog.state().visible).toBe(true);
  // });

  // it('Single Dialog body overflow set correctly', () => {
  //   const container = document.createElement('div');
  //   document.body.appendChild(container);
  //   const d = mount(<DialogWrap />, { attachTo: container });
  //   document.body.style.overflow = 'scroll';
  //   d.setState({ visible: true });
  //   jest.runAllTimers();
  //   d.update();
  //   expect(document.body.style.overflow).toBe('hidden');
  //   d.setState({ visible: false });
  //   jest.runAllTimers();
  //   d.update();
  //   expect(document.body.style.overflow).toBe('scroll');
  //   d.unmount();
  // });

  // it('Multiple Dialog body overflow set correctly', () => {
  //   document.body.style.overflow = 'scroll';

  //   const Demo = ({ visible, visible2, ...restProps }) => (
  //     <div>
  //       <Dialog {...restProps} visible={visible} />
  //       <Dialog {...restProps} visible={visible2} />
  //     </div>
  //   );

  //   const wrapper = mount(<Demo />, { attachTo: document.body });

  //   expect(wrapper.find('.rc-dialog').length).toBe(0);

  //   wrapper.setProps({ visible: true });
  //   jest.runAllTimers();

  //   expect(wrapper.find('div.rc-dialog').length).toBe(1);
  //   expect(document.body.style.overflow).toBe('hidden');

  //   wrapper.setProps({ visible2: true });
  //   jest.runAllTimers();

  //   expect(wrapper.find('div.rc-dialog').length).toBe(2);
  //   expect(document.body.style.overflow).toBe('hidden');

  //   wrapper.setProps({
  //     visible: false,
  //     visible2: false,
  //   });
  //   jest.runAllTimers();

  //   expect(document.body.style.overflow).toBe('scroll');

  //   wrapper.setProps({
  //     visible: true,
  //   });
  //   jest.runAllTimers();
  //   expect(document.body.style.overflow).toBe('hidden');

  //   wrapper.setProps({
  //     visible: false,
  //     visible2: true,
  //   });
  //   jest.runAllTimers();
  //   expect(document.body.style.overflow).toBe('hidden');

  //   wrapper.setProps({
  //     visible: false,
  //     visible2: false,
  //   });
  //   jest.runAllTimers();
  //   expect(document.body.style.overflow).toBe('scroll');
  //   wrapper.unmount();
  // });

  // it('afterClose', () => {
  //   const afterClose = jest.fn();

  //   const wrapper = mount(<Dialog afterClose={afterClose} visible />);
  //   jest.runAllTimers();

  //   wrapper.setProps({ visible: false });
  //   jest.runAllTimers();

  //   expect(afterClose).toHaveBeenCalledTimes(1);
  // });

  // it('zIndex', () => {
  //   const d = mount(<DialogWrap zIndex={1000} />);
  //   d.setState({ visible: true });
  //   jest.runAllTimers();
  //   d.update();
  //   expect(d.find('.rc-dialog-wrap').props().style.zIndex).toBe(1000);
  // });

  // it('should show dialog when initialize dialog, given forceRender and visible is true', () => {
  //   class DialogWrapTest extends React.Component {
  //     state = {
  //       visible: true,
  //       forceRender: true,
  //     };

  //     render() {
  //       return <Dialog forceRender={this.state.forceRender} visible={this.state.visible} />;
  //     }
  //   }

  //   const d = mount(
  //     <DialogWrapTest visible forceRender>
  //       <div>Show dialog with forceRender and visible is true</div>
  //     </DialogWrapTest>,
  //   );
  //   jest.runAllTimers();
  //   d.update();
  //   expect(d.find('.rc-dialog-wrap').props().style.display).toEqual(null);
  // });

  // it('modalRender', () => {
  //   const modalRender = mount(
  //     <DialogWrap
  //       modalRender={(node) =>
  //         cloneElement(node, { ...node.props, style: { background: '#1890ff' } })
  //       }
  //     />,
  //   );
  //   modalRender.setState({ visible: true });
  //   jest.runAllTimers();
  //   modalRender.update();
  //   expect(modalRender.find('.rc-dialog-content').props().style.background).toEqual('#1890ff');
  //   modalRender.unmount();
  // });
});
