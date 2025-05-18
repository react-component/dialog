/* eslint-disable react/no-render-return-value, max-classes-per-file, func-names, no-console */
import { fireEvent, render, act } from '@testing-library/react';
import { Provider } from '@rc-component/motion';
import KeyCode from '@rc-component/util/lib/KeyCode';
import React, { cloneElement, useEffect } from 'react';
import type { DialogProps } from '../src';
import Dialog from '../src';

jest.mock('@rc-component/motion', () => {
  const OriReact = jest.requireActual('react');
  const origin = jest.requireActual('@rc-component/motion');
  const OriCSSMotion = origin.default;

  const ProxyCSSMotion = OriReact.forwardRef((props: any, ref: any) => {
    global.onAppearPrepare = props.onAppearPrepare;

    return <OriCSSMotion {...props} ref={ref} />;
  });

  return {
    ...origin,
    default: ProxyCSSMotion,
    __esModule: true,
  };
});

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
    render(<Dialog title="Default" visible />);
    jest.runAllTimers();

    expect(document.querySelector('.rc-dialog-root')).toMatchSnapshot();
  });

  it('add rootClassName and rootStyle should render correct', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <Dialog
        visible
        rootClassName="customize-root-class"
        rootStyle={{ fontSize: 20 }}
        style={{ width: 600 }}
        height={903}
        wrapStyle={{ fontSize: 10 }}
      />,
    );
    jest.runAllTimers();

    expect(document.querySelector('.rc-dialog-root')).toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `Warning: wrapStyle is deprecated, please use styles instead.`,
    );
    expect(document.querySelector('.customize-root-class')).toBeTruthy();
    expect(document.querySelector('.rc-dialog-wrap')).toHaveStyle('fontSize: 10px');
    expect(document.querySelector('.rc-dialog-root')).toHaveStyle('fontSize: 20px');
    expect(document.querySelector('.rc-dialog')).toHaveStyle('height: 903px');
    expect(document.querySelector('.rc-dialog')).toHaveStyle('width: 600px');
  });

  it('show', () => {
    render(<Dialog visible />);
    jest.runAllTimers();

    expect(document.querySelector('.rc-dialog-wrap')).toHaveStyle('display: block');
  });

  it('close', () => {
    const { rerender } = render(<Dialog visible />);
    jest.runAllTimers();

    rerender(<Dialog visible={false} />);
    jest.runAllTimers();

    expect(document.querySelector('.rc-dialog-wrap')).toHaveStyle('display: none');
  });

  it('create & root & mask', () => {
    render(<Dialog visible />);
    jest.runAllTimers();

    expect(document.querySelector('.rc-dialog-root')).toBeTruthy();
    expect(document.querySelector('.rc-dialog-mask')).toBeTruthy();
  });

  it('click close', () => {
    const onClose = jest.fn();
    render(<Dialog closeIcon="test" onClose={onClose} visible />);
    jest.runAllTimers();

    const btn = document.querySelector('.rc-dialog-close');
    expect(btn.textContent).toBe('test');
    fireEvent.click(btn);

    jest.runAllTimers();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  describe('destroyOnHidden', () => {
    it('default is false', () => {
      const { rerender } = render(
        <Dialog visible>
          <input className="test-destroy" />
        </Dialog>,
      );

      rerender(<Dialog visible={false} />);
      jest.runAllTimers();

      expect(document.querySelectorAll('.test-destroy')).toHaveLength(1);
    });

    it('destroy on hide should unmount child components on close', () => {
      const Demo: React.FC<Partial<DialogProps>> = (props) => (
        <Dialog destroyOnHidden {...props}>
          <input className="test-input" />
        </Dialog>
      );

      const { rerender } = render(<Demo />);

      // Show
      rerender(<Demo visible />);
      act(() => {
        jest.runAllTimers();
      });
      document.querySelector<HTMLInputElement>('.test-input').value = 'test';
      expect(document.querySelector<HTMLInputElement>('.test-input')).toHaveValue('test');

      // Hide
      rerender(<Demo visible={false} />);
      act(() => {
        jest.runAllTimers();
      });
      expect(document.querySelector<HTMLInputElement>('.test-input')).toBeFalsy();

      // Show
      rerender(<Demo visible />);
      act(() => {
        jest.runAllTimers();
      });

      expect(document.querySelector<HTMLInputElement>('.test-input')).toHaveValue('');
    });
  });

  it('esc to close', () => {
    const onClose = jest.fn();
    render(<Dialog onClose={onClose} visible />);
    jest.runAllTimers();

    fireEvent.keyDown(document.querySelector('.rc-dialog'), { keyCode: KeyCode.ESC });
    jest.runAllTimers();
    expect(onClose).toHaveBeenCalled();
  });

  it('mask to close', () => {
    const onClose = jest.fn();
    const { rerender } = render(<Dialog onClose={onClose} visible />);

    // Mask close
    fireEvent.click(document.querySelector('.rc-dialog-wrap'));
    jest.runAllTimers();
    expect(onClose).toHaveBeenCalled();
    onClose.mockReset();

    // Mask can not close
    rerender(<Dialog onClose={onClose} visible maskClosable={false} />);
    fireEvent.click(document.querySelector('.rc-dialog-wrap'));
    jest.runAllTimers();
    expect(onClose).not.toHaveBeenCalled();
  });

  it('renderToBody', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    render(
      <Dialog visible>
        <p className="renderToBody">1</p>
      </Dialog>,
      { container },
    );

    act(() => {
      jest.runAllTimers();
    });

    expect(container.querySelector('.rc-dialog')).toBeFalsy();
    expect(document.body.querySelector('.rc-dialog')).toBeTruthy();

    document.body.removeChild(container);
  });

  it('getContainer', () => {
    const returnedContainer = document.createElement('div');
    render(
      <Dialog visible getContainer={() => returnedContainer}>
        <p className="getContainer">Hello world!</p>
      </Dialog>,
    );

    expect(returnedContainer.querySelector('.rc-dialog')).toBeTruthy();
  });

  it('render title correctly', () => {
    render(<Dialog visible title="bamboo" />);
    expect(document.querySelector('.rc-dialog-header').textContent).toBe('bamboo');
  });

  it('render footer correctly', () => {
    render(<Dialog visible footer="test" />);
    expect(document.querySelector('.rc-dialog-footer').textContent).toBe('test');
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
      render(<Dialog visible />);
      const sentinelEnd = document.querySelector<HTMLDivElement>('.rc-dialog > div:last-child');
      sentinelEnd.focus();

      fireEvent.keyDown(document.querySelector('.rc-dialog-wrap'), {
        keyCode: KeyCode.TAB,
      });

      const sentinelStart = document.querySelector('.rc-dialog > div:first-child');
      expect(document.activeElement).toBe(sentinelStart);
    });

    it('trap focus after shift-tabbing', () => {
      render(<Dialog visible />);

      document.querySelector<HTMLDivElement>('.rc-dialog > div:first-child').focus();

      fireEvent.keyDown(document.querySelector('.rc-dialog-wrap'), {
        keyCode: KeyCode.TAB,
        key: 'Tab',
        shiftKey: true,
      });
      const sentinelEnd = document.querySelector('.rc-dialog > div:last-child');
      expect(document.activeElement).toBe(sentinelEnd);
    });
  });

  describe('mousePosition', () => {
    function prepareModal(mousePosition: { x: number; y: number }) {
      const { container } = render(
        <Dialog style={{ width: 600 }} mousePosition={mousePosition} visible>
          <p>the dialog</p>
        </Dialog>,
      );

      // Trigger position align
      act(() => {
        global.onAppearPrepare?.();
      });

      return container;
    }

    it('sets transform-origin when property mousePosition is set', () => {
      prepareModal({ x: 100, y: 100 });

      expect(
        document.querySelector<HTMLElement>('.rc-dialog').style['transform-origin'],
      ).toBeTruthy();
    });

    it('both undefined', () => {
      prepareModal({ x: undefined, y: undefined });

      expect(
        document.querySelector<HTMLElement>('.rc-dialog').style['transform-origin'],
      ).toBeFalsy();
    });

    it('one valid', () => {
      prepareModal({ x: 10, y: 0 });

      expect(
        document.querySelector<HTMLElement>('.rc-dialog').style['transform-origin'],
      ).toBeTruthy();
    });
  });

  it('can get dom element before dialog first show when forceRender is set true ', () => {
    render(
      <Dialog forceRender>
        <div>forceRender element</div>
      </Dialog>,
    );
    expect(document.querySelector('.rc-dialog-body > div').textContent).toEqual(
      'forceRender element',
    );
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
    render(<Dialog onClose={onClose} visible />);
    fireEvent.click(document.querySelector('.rc-dialog-body'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('zIndex', () => {
    render(<Dialog visible zIndex={903} />);
    expect(document.querySelector('.rc-dialog-wrap')).toHaveStyle('z-index: 903');
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

    render(
      <DialogWrapTest>
        <div>Show dialog with forceRender and visible is true</div>
      </DialogWrapTest>,
    );

    act(() => {
      jest.runAllTimers();
    });

    expect(document.querySelector('.rc-dialog-wrap')).toHaveStyle('display: block');
  });

  it('modalRender', () => {
    render(
      <Dialog
        visible
        modalRender={(node: React.ReactElement<any>) =>
          cloneElement(node, { ...node.props, style: { background: '#1890ff' } })
        }
      />,
    );
    expect(document.querySelector('.rc-dialog-section')).toHaveStyle('background: #1890ff');
  });

  describe('focusTriggerAfterClose', () => {
    it('should focus trigger after close dialog', () => {
      const Demo: React.FC = () => {
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
      render(<Demo />);
      const trigger = document.querySelector('button');
      trigger.focus();
      fireEvent.click(trigger);
      jest.runAllTimers();
      const closeButton = document.querySelector('.rc-dialog-close');
      fireEvent.click(closeButton);
      jest.runAllTimers();
      expect(document.activeElement).toBe(trigger);
    });

    it('should focus trigger after close dialog when contains focusable element', () => {
      const Demo: React.FC = () => {
        const [visible, setVisible] = React.useState(false);
        const inputRef = React.useRef<HTMLInputElement>(null);
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
      render(<Demo />);
      const trigger = document.querySelector('button');
      trigger.focus();
      fireEvent.click(trigger);
      jest.runAllTimers();
      const closeButton = document.querySelector('.rc-dialog-close');
      fireEvent.click(closeButton);
      jest.runAllTimers();
      expect(document.activeElement).toBe(trigger);
    });
  });

  describe('size should work', () => {
    it('width', () => {
      render(<Dialog visible width={1128} />);
      expect(document.querySelector('.rc-dialog')).toHaveStyle('width: 1128px');
    });

    it('height', () => {
      render(<Dialog visible height={903} />);
      expect(document.querySelector('.rc-dialog')).toHaveStyle('height: 903px');
    });
  });

  describe('re-render', () => {
    function createWrapper(
      props?: Partial<DialogProps>,
    ): [
      container: HTMLElement,
      getRenderTimes: () => number,
      updateProps: (props?: Partial<DialogProps>) => void,
    ] {
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

      const { container, rerender } = render(<Demo />);

      return [
        container,
        () => renderTimes,
        (nextProps) => {
          rerender(<Demo {...nextProps} />);
        },
      ];
    }

    it('should not re-render when visible changed', () => {
      const [, getRenderTimes, updateProps] = createWrapper();
      const lastRenderTimes = getRenderTimes();
      expect(getRenderTimes()).toBeGreaterThan(0);

      // Hidden should not trigger render
      updateProps({ visible: false });
      expect(getRenderTimes()).toEqual(lastRenderTimes);
    });

    it('should re-render when forceRender', () => {
      const [, getRenderTimes, updateProps] = createWrapper({ forceRender: true });
      const lastRenderTimes = getRenderTimes();
      expect(getRenderTimes()).toBeGreaterThan(0);

      // Hidden should not trigger render
      updateProps({ visible: false });
      expect(getRenderTimes()).toBeGreaterThan(lastRenderTimes);
    });
  });

  describe('afterClose', () => {
    it('should trigger afterClose when set visible to false', () => {
      const afterClose = jest.fn();

      const { rerender } = render(<Dialog afterClose={afterClose} visible />);
      act(() => {
        jest.runAllTimers();
      });

      rerender(<Dialog afterClose={afterClose} visible={false} />);
      act(() => {
        jest.runAllTimers();
      });

      expect(afterClose).toHaveBeenCalledTimes(1);
    });

    it('should not trigger afterClose when mount dialog of getContainer={false}', () => {
      const afterClose = jest.fn();

      const { container } = render(<Dialog afterClose={afterClose} getContainer={false} />);
      jest.runAllTimers();

      render(<Dialog afterClose={afterClose} getContainer={false} visible={false} />, {
        container,
      });
      jest.runAllTimers();

      expect(afterClose).toHaveBeenCalledTimes(0);
    });

    it('should not trigger afterClose when mount dialog of forceRender={true}', () => {
      const afterClose = jest.fn();

      const { container } = render(<Dialog afterClose={afterClose} forceRender />);
      jest.runAllTimers();

      render(<Dialog afterClose={afterClose} forceRender visible={false} />, { container });
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

      rerender(<Demo visible={false} />);
      await runFakeTimer();
      expect(afterOpenChange).toHaveBeenCalledWith(false);
      expect(afterOpenChange).toHaveBeenCalledTimes(2);
    });
  });

  it('should support classNames', () => {
    render(
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
          section: 'custom-section',
        }}
        style={{ width: 600 }}
        height={903}
      />,
    );
    jest.runAllTimers();

    expect(document.querySelector('.rc-dialog-root')).toMatchSnapshot();
    expect(document.querySelector('.rc-dialog-wrap').className).toContain('custom-wrapper');
    expect(document.querySelector('.rc-dialog-body').className).toContain('custom-body');
    expect(document.querySelector('.rc-dialog-header').className).toContain('custom-header');
    expect(document.querySelector('.rc-dialog-footer').className).toContain('custom-footer');
    expect(document.querySelector('.rc-dialog-mask').className).toContain('custom-mask');
    expect(document.querySelector('.rc-dialog-section').className).toContain('custom-section');
  });

  it('should support styles', () => {
    render(
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
          section: { background: 'orange' },
          title: { background: 'orange' },
        }}
        style={{ width: 600 }}
        height={903}
      />,
    );
    jest.runAllTimers();

    expect(document.querySelector('.rc-dialog-root')).toMatchSnapshot();
    expect(document.querySelector('.rc-dialog-wrap')).toHaveStyle('background: pink');
    expect(document.querySelector('.rc-dialog-body')).toHaveStyle('background: green');
    expect(document.querySelector('.rc-dialog-header')).toHaveStyle('background: red');
    expect(document.querySelector('.rc-dialog-footer')).toHaveStyle('background: blue');
    expect(document.querySelector('.rc-dialog-mask')).toHaveStyle('background: yellow');
    expect(document.querySelector('.rc-dialog-section')).toHaveStyle('background: orange');
    expect(document.querySelector('.rc-dialog-title')).toHaveStyle('background: orange');
  });

  it('should warning', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(
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
    render(
      <Dialog
        closable={{
          closeIcon: 'test',
          'aria-label': 'test aria-label',
        }}
        visible
        onClose={onClose}
      />,
    );
    jest.runAllTimers();

    const btn = document.querySelector('.rc-dialog-close');
    expect(btn.textContent).toBe('test');
    expect(btn.getAttribute('aria-label')).toBe('test aria-label');
    fireEvent.click(btn);

    jest.runAllTimers();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('support disable button in closable', () => {
    const onClose = jest.fn();
    render(
      <Dialog
        closable={{
          closeIcon: 'test',
          disabled: true,
        }}
        visible
        onClose={onClose}
      />,
    );
    jest.runAllTimers();

    const btn = document.querySelector<HTMLButtonElement>('.rc-dialog-close');
    expect(btn.disabled).toBeTruthy();
    fireEvent.click(btn);

    jest.runAllTimers();
    expect(onClose).not.toHaveBeenCalled();

    fireEvent.keyDown(btn, { key: 'Enter' });
    jest.runAllTimers();
    expect(onClose).not.toHaveBeenCalled();
  });

  it('should not display closeIcon when closable is false', () => {
    const onClose = jest.fn();
    render(<Dialog closable={false} visible onClose={onClose} />);

    act(() => {
      jest.runAllTimers();
    });

    expect(document.querySelector('.rc-dialog')).toBeTruthy();
    expect(document.querySelector('.rc-dialog-close')).toBeFalsy();
  });
});
