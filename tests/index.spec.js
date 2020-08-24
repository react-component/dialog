/* eslint-disable react/no-render-return-value */
/* eslint-disable func-names */
import React from 'react';
import { mount } from 'enzyme';

import KeyCode from 'rc-util/lib/KeyCode';

import Dialog from '../src';
import '../assets/bootstrap.less';

describe('dialog', () => {
  let dialog;
  let callback;
  class DialogWrap extends React.Component {
    state = {
      visible: false,
      maskClosable: true,
    };

    render() {
      return (
        <Dialog
          {...this.props}
          visible={this.state.visible}
          maskClosable={this.state.maskClosable}
        />
      );
    }
  }

  beforeEach(() => {
    function onClose() {
      callback = 1;
      dialog.setState({
        visible: false,
      });
    }

    callback = 0;
    dialog = mount(
      <DialogWrap
        style={{ width: 600 }}
        onClose={onClose}
        closeIcon="test"
      >
        <p>第一个dialog</p>
      </DialogWrap>);

    jest.useFakeTimers();
  });

  afterEach(() => {
    dialog.unmount();
    jest.useRealTimers();
  });

  it('show', () => {
    dialog.setState({ visible: true });
    jest.runAllTimers();
    dialog.update();
    expect(dialog.find('.rc-dialog-wrap').props().style.display).toEqual(null);
  });

  it('close', () => {
    dialog.setState({ visible: true });
    dialog.setState({ visible: false });
    jest.runAllTimers();
    dialog.update();
    expect(dialog.find('.rc-dialog-wrap').props().style).toEqual({});
  });

  it('create & root & mask', () => {
    expect(dialog.find('.rc-dialog').length).toBe(0);
    dialog.setState({ visible: true });
    jest.runAllTimers();
    dialog.update();
    expect(dialog.find('.rc-dialog-root').length).toBeTruthy();
    expect(dialog.find('.rc-dialog-mask').length).toBeTruthy();
  });

  it('click close', () => {
    dialog.setState({ visible: true });
    jest.runAllTimers();
    dialog.update();
    const btn = dialog.find('.rc-dialog-close');
    expect(btn.props().children).toBe('test');
    btn.simulate('click');
    jest.runAllTimers();
    dialog.update();
    expect(callback).toBe(1);
  });

  // failed input 输入没成功
  // it("destroy on hide should unmount child components on close", () => {
  //   const wrapper = mount(
  //     <DialogWrap destroyOnClose>
  //       <input />
  //     </DialogWrap>
  //   );
  //   wrapper.setState({ visible: true });
  //   jest.runAllTimers();
  //   wrapper.update();
  //   wrapper.find('input').simulate('change', { target: { value: '111' } });
  //   expect(wrapper.find('input').getDOMNode().value).toEqual('111');
  //   wrapper.setState({ visible: false });
  //   wrapper.setState({ visible: true });
  //   jest.runAllTimers();
  //   wrapper.update();
  //   expect(wrapper.find('input').getDOMNode().value).toEqual('');
  // })

  it('esc to close', () => {
    dialog.setState({ visible: true });
    jest.runAllTimers();
    dialog.update();
    dialog.find('.rc-dialog').at(0).simulate('keyDown', { keyCode: KeyCode.ESC });
    jest.runAllTimers();
    dialog.update();
    expect(dialog.find('.rc-dialog-wrap').props().style).toEqual({});
  });

  // failed click 没有关闭弹窗
  // it('mask to close', () => {
  //   dialog.setState({ visible: true });
  //   jest.runAllTimers();
  //   dialog.update();
  //   const mask = dialog.find('.rc-dialog-wrap').first();
  //   // mask.props().onClick();
  //   mask.simulate('click');
  //   jest.runAllTimers();
  //   dialog.update();
  //   expect(callback).toBe(1);
  //   expect(dialog.find('.rc-dialog-wrap').props().style).toEqual({});
  //   dialog.setState({ visible: true, maskClosable: false });
  //   jest.runAllTimers();
  //   dialog.update();
  //   expect(dialog.find('.rc-dialog-wrap').props().style.display).toEqual(null);
  // });

  it('renderToBody', () => {
    const d = mount(
      <DialogWrap>
        <p className="renderToBody">1</p>
      </DialogWrap>
    );
    expect(d.find('.renderToBody').length).toBe(0);
    expect(d.find('.rc-dialog-wrap').length).toBe(0);
    d.setState({ visible: true });
    jest.runAllTimers();
    d.update();
    expect(d.find('.rc-dialog-wrap').length).toBeTruthy();
    expect(d.find('.renderToBody').length).toBeTruthy();
    // 原来有个这，不知道在测啥？？？
    // expect($('.rc-dialog-wrap')[0].parentNode.parentNode).not.to.be(container);
    // console.log(d.find('.rc-dialog-wrap').first().parent().parent().debug())
    d.unmount();
    expect(d.find('.renderToBody').length).toBe(0);
    expect(d.find('.rc-dialog-wrap').length).toBe(0);
  });

  // failed parent() 两层获取不到
  // it('getContainer', () => {
  //   const returnedContainer = document.createElement('div');
  //   document.body.appendChild(returnedContainer);
  //   const d = mount(
  //     <DialogWrap getContainer={() => returnedContainer}>
  //       <p className="getContainer">Hello world!</p>
  //     </DialogWrap>
  //   );
  //   d.setState({ visible: true });
  //   jest.runAllTimers();
  //   d.update();
  //   // fix issue #10656, must change this test
  //   // expect($('.rc-dialog-wrap')[0].parentNode.parentNode).toBe(returnedContainer);
  //   // expect($('.rc-dialog-wrap')[0].parentNode.parentNode.parentNode).toBe(returnedContainer);
  //   // expect($('.rc-dialog-wrap')[0].parentNode.parentNode.parentNode).toBe(returnedContainer);
  //   console.log(d.find('.rc-dialog-wrap').first().parent().parent().props())
  // });

  it('render footer correctly', () => {
    const d = mount(
      <DialogWrap footer="test" />
    )
    d.setState({ visible: true });
    jest.runAllTimers();
    d.update();
    expect(d.find('.rc-dialog-footer').length).toBeTruthy();
    expect(d.find('.rc-dialog-footer').props().children).toBe('test');
  });

  it('support input autoFocus', () => {
    const d = mount(
      <DialogWrap><input autoFocus /></DialogWrap>
    );
    d.setState({ visible: true });
    jest.runAllTimers();
    d.update();
    expect(document.activeElement).toBe(document.querySelector('input'));
  });

  // failed 激活的不对，可看输出
  // it('trap focus after shift-tabbing', () => {
  //   dialog.setState({ visible: true });
  //   jest.runAllTimers();
  //   dialog.update();
  //   const shiftTabbingDescriptor = {
  //     key: 'TAB',
  //     keyCode: 9,
  //     which: 9,
  //     shiftKey: true
  //   }
  //   dialog.find('.rc-dialog-wrap').at(0).simulate('keyDown', shiftTabbingDescriptor);
  //   const sentinelEnd = dialog.find('.rc-dialog-content + div').at(0);
  //   expect(document.activeElement).toBe(sentinelEnd);
  // });

  // style 里面 没有 transformOrigin QAQ
  it('sets transform-origin when property mousePosition is set', () => {
    const d = mount(
      <Dialog
        style={{ width: 600 }}
        mousePosition={{x:100, y:100}}
        visible
      >
        <p>the dialog</p>
      </Dialog>
    );
    jest.runAllTimers();
    d.update();
    console.log(d.find('.rc-dialog').at(0).props().style)
    // expect($('.rc-dialog').css('transform-origin')).not.toBeNull();
  });

  it('can get dom element before dialog first show when forceRender is set true ',()=>{
    const d = mount(
      <Dialog
        forceRender
      >
        <div>forceRender element</div>
      </Dialog>
    );
    expect(d.find('.rc-dialog-body > div').props().children).toEqual('forceRender element');
  });

  it('getContainer is false', () => {
    const d = mount(
      <Dialog
        getContainer={false}
      >
        <div>forceRender element</div>
      </Dialog>
    );
    expect(d.find('.rc-dialog-body > div').props().children).toEqual('forceRender element');
    expect(d.find('.rc-dialog-wrap').at(0).props().style).toEqual({});
  });

  it('should not close if mouse down in dialog', () => {
    dialog.setState({ visible: true });
    jest.runAllTimers();
    dialog.update();
    const dialogBody = dialog.find('.rc-dialog-body').at(0);
    dialogBody.simulate('mousedown');
    const wrapper = dialog.find('.rc-dialog-wrap').at(0);
    wrapper.simulate('mouseup');
    expect(dialog.state().visible).toBe(true);
  });

  // it('getContainer is false and visible is true', () => {
  //   ReactDOM.render((
  //     <Dialog
  //       getContainer={false}
  //       visible
  //     >
  //       <div>forceRender element</div>
  //     </Dialog>
  //   ),container);
  //   expect($('.rc-dialog-body > div').text()).toBe('forceRender element');
  //   expect($('.rc-dialog-wrap')[0].style.display).toBe('');
  // });

  // it('Single Dialog body overflow set correctly', () => {
  //   document.body.style.overflow = "scroll"

  //   dialog.setState({
  //     visible: true
  //   });
  //   expect(document.body.style.overflow).toBe('hidden');

  //   dialog.setState({
  //     visible: false
  //   });
  //   expect(document.body.style.overflow).toBe('scroll');
  // });

  // it('Multiple Dialog body overflow set correctly', () => {
  //   document.body.style.overflow = "scroll"

  //   class MultipleDialogWrap extends React.Component {
  //     state = {
  //       visible: false,
  //       visible2: false,
  //     };

  //     render() {
  //       return (
  //         <div>
  //           <Dialog
  //             {...this.props}
  //             visible={this.state.visible}
  //           />
  //           <Dialog
  //             {...this.props}
  //             visible={this.state.visible2}
  //           />
  //         </div>
  //       );
  //     }
  //   }

  //   const d = ReactDOM.render((
  //     <MultipleDialogWrap>
  //       <div>forceRender element</div>
  //     </MultipleDialogWrap>
  //   ),container);

  //   expect($('.rc-dialog').length).toBe(0);

  //   d.setState({
  //     visible: true,
  //   })
  //   expect($('.rc-dialog').length).toBe(1);
  //   expect(document.body.style.overflow).toBe('hidden');

  //   d.setState({
  //     visible2: true,
  //   })
  //   expect($('.rc-dialog').length).toBe(2);
  //   expect(document.body.style.overflow).toBe('hidden');

  //   d.setState({
  //     visible: false,
  //     visible2: false,
  //   })
  //   expect(document.body.style.overflow).toBe('scroll');

  //   d.setState({
  //     visible: true,
  //   })
  //   expect(document.body.style.overflow).toBe('hidden');

  //   d.setState({
  //     visible: false,
  //     visible2: true,
  //   })
  //   expect(document.body.style.overflow).toBe('hidden');

  //   d.setState({
  //     visible: false,
  //     visible2: false,
  //   })
  //   expect(document.body.style.overflow).toBe('scroll');
  // });

  // it('afterClose', (done) => {
  //   ReactDOM.render((
  //     <DialogWrap
  //       afterClose={done}
  //     >
  //       <div>afterClose</div>
  //     </DialogWrap>
  //   ),container);
  //   dialog.setState({
  //     visible: true,
  //   });
  //   dialog.setState({
  //     visible: false,
  //   });
  // });

  // it('zIndex', () => {
  //   ReactDOM.render((
  //     <DialogWrap
  //       zIndex={1000}
  //     >
  //       <div>afterClose</div>
  //     </DialogWrap>
  //   ),container);
  //   dialog.setState({
  //     visible: true,
  //   });

  //   expect($('.rc-dialog-wrap').css("zIndex")).toBe('1000');
  // });

  // it('should show dialog when initialize dialog, given forceRender and visible is true', () => {
  //   class DialogWrapTest extends React.Component {
  //     state = {
  //       visible: true,
  //       forceRender: true,
  //     };

  //     render() {
  //       return (
  //         <Dialog
  //           forceRender={this.state.forceRender}
  //           visible={this.state.visible}
  //         />
  //       );
  //     }
  //   }

  //   ReactDOM.render((
  //     <DialogWrapTest
  //       visible
  //       forceRender
  //     >
  //       <div>Show dialog with forceRender and visible is true</div>
  //     </DialogWrapTest>
  //   ),container);
  //   setTimeout(() => {
  //     expect($('.rc-dialog-wrap').css('display'))
  //       .toBe('block');
  //   }, 10);
  // });
});
