/* eslint-disable react/no-render-return-value, max-classes-per-file, func-names, no-console */
import React, { cloneElement } from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import Portal from 'rc-util/lib/Portal';
import KeyCode from 'rc-util/lib/KeyCode';
import Dialog from '../src';

describe('dialog', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
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

  it('mask to close', () => {
    const onClose = jest.fn();
    const wrapper = mount(<Dialog onClose={onClose} visible />);

    // Mask close
    wrapper.find('.rc-dialog-wrap').simulate('click');
    jest.runAllTimers();
    wrapper.update();
    expect(onClose).toHaveBeenCalled();
    onClose.mockReset();

    // Mask can not close
    wrapper.setProps({ maskClosable: false });
    wrapper.find('.rc-dialog-wrap').simulate('click');
    jest.runAllTimers();
    wrapper.update();
    expect(onClose).not.toHaveBeenCalled();
  });

  it('renderToBody', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const wrapper = mount(
      <Dialog visible={false}>
        <p className="renderToBody">1</p>
      </Dialog>,
      { attachTo: container },
    );

    expect(wrapper.find('.renderToBody')).toHaveLength(0);
    expect(wrapper.find('.rc-dialog-wrap')).toHaveLength(0);

    // Visible
    wrapper.setProps({ visible: true });
    jest.runAllTimers();
    wrapper.update();

    expect(wrapper.find('.rc-dialog-wrap')).toHaveLength(1);
    expect(wrapper.find('.renderToBody')).toHaveLength(1);
    expect(container.contains(wrapper.find('.rc-dialog-wrap').getDOMNode())).toBeFalsy();

    wrapper.unmount();
    document.body.removeChild(container);
  });

  it('getContainer', () => {
    const returnedContainer = document.createElement('div');
    const wrapper = mount(
      <Dialog visible getContainer={() => returnedContainer}>
        <p className="getContainer">Hello world!</p>
      </Dialog>,
    );

    expect(returnedContainer.contains(wrapper.find('.rc-dialog-wrap').getDOMNode())).toBeTruthy();
    wrapper.unmount();
  });

  it('render title correctly', () => {
    const wrapper = mount(<Dialog visible title="bamboo" />);
    expect(wrapper.find('.rc-dialog-header').text()).toBe('bamboo');
  });

  it('render footer correctly', () => {
    const wrapper = mount(<Dialog visible footer="test" />);
    expect(wrapper.find('.rc-dialog-footer').text()).toBe('test');
  });

  it('support input autoFocus', () => {
    const wrapper = mount(
      <Dialog visible>
        <input autoFocus />
      </Dialog>,
      { attachTo: document.body },
    );
    expect(document.activeElement).toBe(document.querySelector('input'));
    wrapper.unmount();
  });

  describe('Tab should keep focus in dialog', () => {
    it('basic tabbing', () => {
      const wrapper = mount(<Dialog visible />, { attachTo: document.body });
      const sentinelEnd = document.querySelectorAll('.rc-dialog-content + div')[0];
      sentinelEnd.focus();

      wrapper.find('.rc-dialog-wrap').simulate('keyDown', {
        keyCode: KeyCode.TAB,
      });

      const sentinelStart = document.querySelectorAll('.rc-dialog > div')[0];
      expect(document.activeElement).toBe(sentinelStart);

      wrapper.unmount();
    });

    it('trap focus after shift-tabbing', () => {
      const wrapper = mount(<Dialog visible />, { attachTo: document.body });
      wrapper.find('.rc-dialog-wrap').simulate('keyDown', {
        keyCode: KeyCode.TAB,
        shiftKey: true,
      });
      const sentinelEnd = document.querySelectorAll('.rc-dialog-content + div')[0];
      expect(document.activeElement).toBe(sentinelEnd);

      wrapper.unmount();
    });
  });

  it('sets transform-origin when property mousePosition is set', () => {
    const wrapper = mount(
      <Dialog style={{ width: 600 }} mousePosition={{ x: 100, y: 100 }} visible>
        <p>the dialog</p>
      </Dialog>,
    );

    // Trigger position align
    act(() => {
      wrapper
        .find('Content CSSMotion')
        .props()
        .onAppearPrepare();
    });

    expect(
      wrapper
        .find('.rc-dialog')
        .at(0)
        .getDOMNode().style['transform-origin'],
    ).toBeTruthy();
  });

  it('can get dom element before dialog first show when forceRender is set true ', () => {
    const wrapper = mount(
      <Dialog forceRender>
        <div>forceRender element</div>
      </Dialog>,
    );
    expect(wrapper.find('.rc-dialog-body > div').text()).toEqual('forceRender element');
  });

  describe('getContainer is false', () => {
    it('not set', () => {
      const wrapper = mount(
        <Dialog visible>
          <div>forceRender element</div>
        </Dialog>,
      );
      expect(wrapper.find('.rc-dialog-body > div').text()).toEqual('forceRender element');
      expect(wrapper.find(Portal)).toHaveLength(1);
    });

    it('set to false', () => {
      const wrapper = mount(
        <Dialog visible getContainer={false}>
          <div>forceRender element</div>
        </Dialog>,
      );
      expect(wrapper.find('.rc-dialog-body > div').text()).toEqual('forceRender element');
      expect(wrapper.find(Portal)).toHaveLength(0);
    });
  });

  it('should not close if mouse down in dialog', () => {
    const onClose = jest.fn();
    const wrapper = mount(<Dialog onClose={onClose} visible />);
    wrapper.find('.rc-dialog-body').simulate('click');
    expect(onClose).not.toHaveBeenCalled();
  });

  it('afterClose', () => {
    const afterClose = jest.fn();

    const wrapper = mount(<Dialog afterClose={afterClose} visible />);
    jest.runAllTimers();

    wrapper.setProps({ visible: false });
    jest.runAllTimers();

    expect(afterClose).toHaveBeenCalledTimes(1);
  });

  it('zIndex', () => {
    const wrapper = mount(<Dialog visible zIndex={903} />);
    expect(wrapper.find('.rc-dialog-wrap').props().style.zIndex).toBe(903);
  });

  it('should show dialog when initialize dialog, given forceRender and visible is true', () => {
    class DialogWrapTest extends React.Component {
      state = {
        visible: true,
        forceRender: true,
      };

      render() {
        return <Dialog forceRender={this.state.forceRender} visible={this.state.visible} />;
      }
    }

    const wrapper = mount(
      <DialogWrapTest visible forceRender>
        <div>Show dialog with forceRender and visible is true</div>
      </DialogWrapTest>,
    );
    jest.runAllTimers();
    wrapper.update();
    expect(wrapper.find('.rc-dialog-wrap').props().style.display).toEqual(null);
  });

  it('modalRender', () => {
    const modalRender = mount(
      <Dialog
        visible
        modalRender={node =>
          cloneElement(node, { ...node.props, style: { background: '#1890ff' } })
        }
      />,
    );
    expect(modalRender.find('.rc-dialog-content').props().style.background).toEqual('#1890ff');
  });

  describe('size should work', () => {
    it('width', () => {
      const wrapper = mount(<Dialog visible width={1128} />);
      expect(wrapper.find('.rc-dialog').props().style.width).toEqual(1128);
    });

    it('height', () => {
      const wrapper = mount(<Dialog visible height={903} />);
      expect(wrapper.find('.rc-dialog').props().style.height).toEqual(903);
    });
  });
});
