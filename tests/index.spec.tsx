/* eslint-disable react/no-render-return-value, max-classes-per-file, func-names, no-console */
import { fireEvent, render } from '@testing-library/react';
import type { ReactWrapper } from 'enzyme';
import { mount } from 'enzyme';
import { Provider } from 'rc-motion';
import KeyCode from 'rc-util/lib/KeyCode';
import React, { cloneElement, useEffect } from 'react';
import { act } from 'react-dom/test-utils';
import type { DialogProps } from '../src';
import Dialog from '../src';

describe('dialog', () => {
  async function runFakeTimer() {
    for (let i = 0; i < 100; i += 1) {
      await act(async () => {
        jest.advanceTimersByTime(100);
        await Promise.resolve();
      });
    }
  }

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('should render correct', () => {
    const wrapper = mount(<Dialog title="Default" visible />);
    jest.runAllTimers();
    wrapper.update();

    expect(wrapper.render()).toMatchSnapshot();
  });

  it('add rootClassName should render correct', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const wrapper = mount(
      <Dialog
        visible
        rootClassName="customize-root-class"
        style={{ width: 600 }}
        height={903}
        wrapStyle={{ fontSize: 10 }}
      />,
    );
    jest.runAllTimers();
    wrapper.update();

    expect(wrapper.render()).toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `Warning: wrapStyle is deprecated, please use styles instead.`,
    );
    expect(wrapper.find('.customize-root-class').length).toBeTruthy();
    expect(wrapper.find('.rc-dialog-wrap').props().style.fontSize).toBe(10);
    expect(wrapper.find('.rc-dialog').props().style.height).toEqual(903);
    expect(wrapper.find('.rc-dialog').props().style.width).toEqual(600);
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

  describe('destroyOnClose', () => {
    it('default is false', () => {
      const wrapper = mount(
        <Dialog visible>
          <input className="test-destroy" />
        </Dialog>,
        { attachTo: document.body },
      );

      act(() => {
        wrapper.setProps({ visible: false });
        jest.runAllTimers();
        wrapper.update();
      });

      expect(document.querySelectorAll('.test-destroy')).toHaveLength(1);

      wrapper.unmount();
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

      (document.getElementsByClassName('.test-input') as unknown as HTMLInputElement).value =
        'test';
      expect(
        (document.getElementsByClassName('.test-input') as unknown as HTMLInputElement).value,
      ).toBe('test');

      // Hide
      wrapper.setProps({ visible: false });
      jest.runAllTimers();
      wrapper.update();

      // Show
      wrapper.setProps({ visible: true });
      jest.runAllTimers();
      wrapper.update();

      expect(
        (document.getElementsByClassName('.test-input') as unknown as HTMLInputElement).value,
      ).toBeUndefined();
      wrapper.unmount();
    });
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

  // 失效了，需要修复
  it.skip('support input autoFocus', () => {
    render(
      <Dialog visible>
        <input autoFocus />
      </Dialog>,
    );
    expect(document.querySelector('input')).toHaveFocus();
  });

  describe('Tab should keep focus in dialog', () => {
    it('basic tabbing', () => {
      const wrapper = mount(<Dialog visible />, { attachTo: document.body });
      const sentinelEnd = document.querySelector(
        '.rc-dialog > div:last-child',
      ) as unknown as HTMLDivElement;
      sentinelEnd.focus();

      wrapper.find('.rc-dialog-wrap').simulate('keyDown', {
        keyCode: KeyCode.TAB,
      });

      const sentinelStart = document.querySelector('.rc-dialog > div:first-child');
      expect(document.activeElement).toBe(sentinelStart);

      wrapper.unmount();
    });

    it('trap focus after shift-tabbing', () => {
      render(<Dialog visible />);

      document.querySelector<HTMLDivElement>('.rc-dialog > div:first-child')?.focus();

      fireEvent.keyDown(document.querySelector('.rc-dialog-wrap')!, {
        keyCode: KeyCode.TAB,
        key: 'Tab',
        shiftKey: true,
      });
      const sentinelEnd = document.querySelector('.rc-dialog > div:last-child');
      expect(document.activeElement).toBe(sentinelEnd);
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
        .find<any>('Content CSSMotion' as any)
        .props()
        .onAppearPrepare();
    });

    expect(
      (wrapper.find('.rc-dialog').at(0).getDOMNode() as HTMLDivElement).style['transform-origin'],
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
      const { container } = render(
        <Dialog visible>
          <div className="bamboo" />
        </Dialog>,
      );

      expect(container.querySelector('.bamboo')).toBeFalsy();
      expect(document.body.querySelector('.bamboo')).toBeTruthy();
    });

    it('set to false', () => {
      const { container } = render(
        <Dialog visible getContainer={false}>
          <div className="bamboo" />
        </Dialog>,
      );

      expect(container.querySelector('.bamboo')).toBeTruthy();
    });
  });

  it('should not close if mouse down in dialog', () => {
    const onClose = jest.fn();
    const wrapper = mount(<Dialog onClose={onClose} visible />);
    wrapper.find('.rc-dialog-body').simulate('click');
    expect(onClose).not.toHaveBeenCalled();
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
      <DialogWrapTest>
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
        modalRender={(node: React.ReactElement) =>
          cloneElement(node, { ...node.props, style: { background: '#1890ff' } })
        }
      />,
    );
    expect(modalRender.find('.rc-dialog-content').props().style.background).toEqual('#1890ff');
  });

  describe('focusTriggerAfterClose', () => {
    it('should focus trigger after close dialog', () => {
      const Demo = () => {
        const [visible, setVisible] = React.useState(false);
        return (
          <>
            <button onClick={() => setVisible(true)}>trigger</button>
            <Dialog visible={visible} onClose={() => setVisible(false)}>
              content
            </Dialog>
          </>
        );
      };
      const wrapper = mount(<Demo />, { attachTo: document.body });
      const trigger = wrapper.find('button').at(0);
      (trigger.getDOMNode() as any).focus();
      trigger.simulate('click');
      jest.runAllTimers();
      const closeButton = wrapper.find('.rc-dialog-close');
      closeButton.simulate('click');
      jest.runAllTimers();
      expect(document.activeElement).toBe(trigger.getDOMNode());
      wrapper.unmount();
    });

    it('should focus trigger after close dialog when contains focusable element', () => {
      const Demo = () => {
        const [visible, setVisible] = React.useState(false);
        const inputRef = React.useRef(null);
        useEffect(() => {
          inputRef.current?.focus();
        }, []);
        return (
          <>
            <button onClick={() => setVisible(true)}>trigger</button>
            <Dialog visible={visible} onClose={() => setVisible(false)}>
              <input ref={inputRef} />
            </Dialog>
          </>
        );
      };
      const wrapper = mount(<Demo />, { attachTo: document.body });
      const trigger = wrapper.find('button').at(0);
      (trigger.getDOMNode() as any).focus();
      trigger.simulate('click');
      jest.runAllTimers();
      const closeButton = wrapper.find('.rc-dialog-close');
      closeButton.simulate('click');
      jest.runAllTimers();
      expect(document.activeElement).toBe(trigger.getDOMNode());
      wrapper.unmount();
    });
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

  describe('re-render', () => {
    function createWrapper(props?: Partial<DialogProps>): [ReactWrapper, () => number] {
      let renderTimes = 0;
      const RenderChecker = () => {
        renderTimes += 1;
        return null;
      };

      const Demo = (demoProps?: any) => {
        return (
          <Dialog visible {...props} {...demoProps}>
            <RenderChecker />
          </Dialog>
        );
      };

      const wrapper = mount(<Demo />);

      return [wrapper, () => renderTimes];
    }

    it('should not re-render when visible changed', () => {
      const [wrapper, getRenderTimes] = createWrapper();
      expect(getRenderTimes()).toEqual(1);

      // Hidden should not trigger render
      wrapper.setProps({ visible: false });
      expect(getRenderTimes()).toEqual(1);
    });

    it('should re-render when forceRender', () => {
      const [wrapper, getRenderTimes] = createWrapper({ forceRender: true });
      expect(getRenderTimes()).toEqual(1);

      // Hidden should not trigger render
      wrapper.setProps({ visible: false });
      expect(getRenderTimes()).toEqual(2);
    });
  });

  describe('afterClose', () => {
    it('should trigger afterClose when set visible to false', () => {
      const afterClose = jest.fn();

      const wrapper = mount(<Dialog afterClose={afterClose} visible />);
      jest.runAllTimers();

      wrapper.setProps({ visible: false });
      jest.runAllTimers();

      expect(afterClose).toHaveBeenCalledTimes(1);
    });

    it('should not trigger afterClose when mount dialog of getContainer={false}', () => {
      const afterClose = jest.fn();

      const wrapper = mount(<Dialog afterClose={afterClose} getContainer={false} />);
      jest.runAllTimers();

      wrapper.setProps({ visible: false });
      jest.runAllTimers();

      expect(afterClose).toHaveBeenCalledTimes(0);
    });

    it('should not trigger afterClose when mount dialog of forceRender={true}', () => {
      const afterClose = jest.fn();

      const wrapper = mount(<Dialog afterClose={afterClose} forceRender />);
      jest.runAllTimers();

      wrapper.setProps({ visible: false });
      jest.runAllTimers();

      expect(afterClose).toHaveBeenCalledTimes(0);
    });
  });

  describe('afterOpenChange', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.clearAllTimers();
      jest.useRealTimers();
    });

    it('should trigger afterOpenChange when visible changed', async () => {
      const afterOpenChange = jest.fn();

      const Demo = (props: any) => (
        <Provider motion={false}>
          <Dialog afterOpenChange={afterOpenChange} {...props} />
        </Provider>
      );

      const { rerender } = render(<Demo visible />);
      await runFakeTimer();
      expect(afterOpenChange).toHaveBeenCalledWith(true);
      expect(afterOpenChange).toHaveBeenCalledTimes(1);

      rerender(<Demo />);
      await runFakeTimer();
      expect(afterOpenChange).toHaveBeenCalledWith(false);
      expect(afterOpenChange).toHaveBeenCalledTimes(2);
    });
  });

  it('should support classNames', () => {
    const wrapper = mount(
      <Dialog
        visible
        title="Default"
        footer="Footer"
        classNames={{
          header: 'custom-header',
          body: 'custom-body',
          footer: 'custom-footer',
          mask: 'custom-mask',
          wrapper: 'custom-wrapper',
          content: 'custom-content',
        }}
        style={{ width: 600 }}
        height={903}
      />,
    );
    jest.runAllTimers();
    wrapper.update();

    expect(wrapper.render()).toMatchSnapshot();
    expect(wrapper.find('.rc-dialog-wrap').props().className).toContain('custom-wrapper');
    expect(wrapper.find('.rc-dialog-body').props().className).toContain('custom-body');
    expect(wrapper.find('.rc-dialog-header').props().className).toContain('custom-header');
    expect(wrapper.find('.rc-dialog-footer').props().className).toContain('custom-footer');
    expect(wrapper.find('.rc-dialog-mask').props().className).toContain('custom-mask');
    expect(wrapper.find('.rc-dialog-content').props().className).toContain('custom-content');
  });

  it('should support styles', () => {
    const wrapper = mount(
      <Dialog
        visible
        title="Default"
        footer="Footer"
        styles={{
          header: { background: 'red' },
          body: { background: 'green' },
          footer: { background: 'blue' },
          mask: { background: 'yellow' },
          wrapper: { background: 'pink' },
          content: { background: 'orange' },
        }}
        style={{ width: 600 }}
        height={903}
      />,
    );
    jest.runAllTimers();
    wrapper.update();

    expect(wrapper.render()).toMatchSnapshot();
    expect(wrapper.find('.rc-dialog-wrap').props().style.background).toBe('pink');
    expect(wrapper.find('.rc-dialog-body').props().style.background).toBe('green');
    expect(wrapper.find('.rc-dialog-header').props().style.background).toBe('red');
    expect(wrapper.find('.rc-dialog-footer').props().style.background).toBe('blue');
    expect(wrapper.find('.rc-dialog-mask').props().style.background).toBe('yellow');
    expect(wrapper.find('.rc-dialog-content').props().style.background).toBe('orange');
  });
  it('should warning', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const wrapper = mount(
      <Dialog
        visible
        title="Default"
        footer="Footer"
        bodyStyle={{ background: 'green' }}
        maskStyle={{ background: 'yellow' }}
        wrapClassName="custom-wrapper"
        style={{ width: 600 }}
        height={903}
      />,
    );
    jest.runAllTimers();
    wrapper.update();

    expect(spy).toHaveBeenCalledWith(
      `Warning: bodyStyle is deprecated, please use styles instead.`,
    );
    expect(spy).toHaveBeenCalledWith(
      `Warning: maskStyle is deprecated, please use styles instead.`,
    );
    expect(spy).toHaveBeenCalledWith(
      `Warning: wrapClassName is deprecated, please use classNames instead.`,
    );
    spy.mockRestore();
  });

  it('support aria-* in closable', () => {
    const onClose = jest.fn();
    const wrapper = mount(
      <Dialog 
        closable={{
          closeIcon:"test",
          'aria-label': 'test aria-label',
        }} 
        visible 
        onClose={onClose} 
      />
    );
    jest.runAllTimers();
    wrapper.update();

    const btn = wrapper.find('.rc-dialog-close');
    expect(btn.text()).toBe('test');
    expect(btn.getDOMNode().getAttribute('aria-label')).toBe('test aria-label');
    btn.simulate('click');

    jest.runAllTimers();
    wrapper.update();
    expect(onClose).toHaveBeenCalledTimes(1);
  });
  it('should not display closeIcon when closable is false', () => {
    const onClose = jest.fn();
    const wrapper = mount(
      <Dialog 
        closable={false} 
        visible 
        onClose={onClose} 
      />
    );
    jest.runAllTimers();
    wrapper.update();

    const btn = wrapper.find('.rc-dialog-close');
    expect(btn.find('.rc-dialog-close-x')).not.toBeNull();
  });
});
