/* eslint-disable react/no-render-return-value, max-classes-per-file, func-names, no-console */
import React from 'react';
import { act, render } from '@testing-library/react';
import Dialog from '../src';

// Mock: import { useLockFocus } from '@rc-component/util/lib/Dom/focus';
jest.mock('@rc-component/util/lib/Dom/focus', () => {
  const actual = jest.requireActual('@rc-component/util/lib/Dom/focus');

  const useLockFocus = (visible: boolean, ...rest: any[]) => {
    globalThis.__useLockFocusVisible = visible;
    return actual.useLockFocus(visible, ...rest);
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
});
