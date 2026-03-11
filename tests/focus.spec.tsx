/* eslint-disable react/no-render-return-value, max-classes-per-file, func-names, no-console */
import React from 'react';
import ReactDOM from 'react-dom';
import { act, render } from '@testing-library/react';
import Dialog from '../src';

// Mock: import { useLockFocus } from '@rc-component/util/lib/Dom/focus';
jest.mock('@rc-component/util/lib/Dom/focus', () => {
  const actual = jest.requireActual('@rc-component/util/lib/Dom/focus');

  const useLockFocus = (visible: boolean, ...rest: any[]) => {
    globalThis.__useLockFocusVisible = visible;
    const hooks = actual.useLockFocus(visible, ...rest);
    const proxyIgnoreElement = (ele: HTMLElement) => {
      globalThis.__ignoredElement = ele;
      hooks[0](ele);
    };
    return [proxyIgnoreElement, ...hooks.slice(1)] as ReturnType<typeof actual.useLockFocus>;
  };

  return {
    ...actual,
    useLockFocus,
  };
});

/**
 * Since overflow scroll test need a clear env which may affect by other test.
 * Use a clean env instead.
 */
describe('Dialog.Focus', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('Should lock when fixed', () => {
    render(
      <Dialog
        visible
        styles={{
          wrapper: { position: 'fixed' },
        }}
      />,
    );

    act(() => {
      jest.runAllTimers();
    });

    expect(globalThis.__useLockFocusVisible).toBe(true);
  });

  it('Should not lock when not fixed', () => {
    render(
      <Dialog
        visible
        styles={{
          wrapper: { position: 'absolute' },
        }}
      />,
    );

    act(() => {
      jest.runAllTimers();
    });

    expect(globalThis.__useLockFocusVisible).toBe(false);
  });

  it('should not lock focus when focusTrap is false', () => {
    render(
      <Dialog
        visible
        focusTrap={false}
        styles={{
          wrapper: { position: 'fixed' },
        }}
      />,
    );

    act(() => {
      jest.runAllTimers();
    });

    expect(globalThis.__useLockFocusVisible).toBe(false);
  });

  it('should call ignoreElement when input in portal is focused', () => {
    render(
      <Dialog visible styles={{ wrapper: { position: 'fixed' } }}>
        {ReactDOM.createPortal(<input id="portal-input" />, document.body)}
      </Dialog>,
    );

    act(() => {
      jest.runAllTimers();
    });

    const input = document.getElementById('portal-input') as HTMLElement;
    act(() => {
      input.focus();
    });

    expect(globalThis.__ignoredElement).toBe(input);
  });
});
