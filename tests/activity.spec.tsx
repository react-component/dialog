import { act, fireEvent, render } from '@testing-library/react';
import React from 'react';
import Dialog from '../src';

// Run with real motion status (jsdom has no transition support by default)
jest.mock('@rc-component/motion', () => {
  const origin = jest.requireActual('@rc-component/motion');
  return {
    ...origin,
    __esModule: true,
    default: origin.genCSSMotion({ transitionSupport: true }),
  };
});

const { Activity } = React as any;

describe('Dialog in Activity', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  async function runFakeTimer() {
    for (let i = 0; i < 20; i += 1) {
      await act(async () => {
        jest.advanceTimersByTime(100);
        await Promise.resolve();
      });
    }
  }

  // Finish the running motions of panel & mask
  async function endMotion() {
    await runFakeTimer();
    ['.rc-dialog', '.rc-dialog-mask'].forEach((selector) => {
      const element = document.querySelector(selector);
      if (element) {
        act(() => {
          element.dispatchEvent(new Event('transitionend'));
        });
      }
    });
    await runFakeTimer();
  }

  const Demo = ({ mode, open = true }: { mode: 'visible' | 'hidden'; open?: boolean }) => (
    <React.StrictMode>
      <Activity mode={mode}>
        <Dialog visible={open} animation="zoom" maskAnimation="fade">
          <input data-testid="input" />
        </Dialog>
      </Activity>
    </React.StrictMode>
  );

  const getInput = () => document.querySelector<HTMLInputElement>('[data-testid="input"]');

  function expectNoMotion() {
    expect(document.querySelector('.rc-dialog').className).toBe('rc-dialog');
    expect(document.querySelector('.rc-dialog-mask').className).toBe('rc-dialog-mask');
  }

  it.each([
    ['open on mount', false],
    ['open later', true],
  ])('keeps panel when restored from hidden (%s)', async (_, openLater) => {
    const { rerender } = render(<Demo mode="visible" open={!openLater} />);
    if (openLater) {
      await runFakeTimer();
      rerender(<Demo mode="visible" open />);
    }
    await endMotion();
    expectNoMotion();

    const panel = document.querySelector('.rc-dialog');
    fireEvent.change(getInput(), { target: { value: 'hello' } });

    rerender(<Demo mode="hidden" />);
    await runFakeTimer();

    expect(() => rerender(<Demo mode="visible" />)).not.toThrow();

    // Panel is not destroyed and motion is not replayed
    expect(document.querySelector('.rc-dialog')).toBe(panel);
    expectNoMotion();
    expect(getInput().value).toBe('hello');

    await runFakeTimer();
    expect(document.querySelector('.rc-dialog')).toBe(panel);
    expect(getInput().value).toBe('hello');
  });

  it('still plays motion when opened again after restore', async () => {
    const { rerender } = render(<Demo mode="visible" />);
    await endMotion();

    rerender(<Demo mode="hidden" />);
    await runFakeTimer();
    rerender(<Demo mode="visible" />);
    await runFakeTimer();

    rerender(<Demo mode="visible" open={false} />);
    await runFakeTimer();
    expect(document.querySelector('.rc-dialog')).toHaveClass('rc-dialog-zoom-leave');
    await endMotion();

    rerender(<Demo mode="visible" />);
    await runFakeTimer();
    expect(document.querySelector('.rc-dialog')).toHaveClass('rc-dialog-zoom-enter');
  });
});
