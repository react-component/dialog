/* eslint-disable react/no-render-return-value, max-classes-per-file, func-names, no-console */
import React from 'react';
import { render } from '@testing-library/react';
import Dialog from '../src';

/**
 * Since overflow scroll test need a clear env which may affect by other test.
 * Use a clean env instead.
 */
describe('Dialog.Scroll', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('Single Dialog body overflow set correctly', () => {
    const { unmount, rerender } = render(<Dialog visible />);

    expect(document.body).toHaveStyle({
      overflowY: 'hidden',
    });

    rerender(<Dialog />);
    expect(document.body).not.toHaveStyle({
      overflowY: 'hidden',
    });

    // wrapper.unmount();
    unmount();
  });

  it('Multiple Dialog body overflow set correctly', () => {
    const Demo = ({ visible = false, visible2 = false, ...restProps }) => (
      <div>
        <Dialog {...restProps} visible={visible} />
        <Dialog {...restProps} visible={visible2} />
      </div>
    );

    const { rerender, unmount } = render(<Demo />);

    expect(document.querySelector('.rc-dialog')).toBeFalsy();

    rerender(<Demo visible />);
    expect(document.querySelectorAll('.rc-dialog')).toHaveLength(1);
    expect(document.body).toHaveStyle({
      overflowY: 'hidden',
    });

    rerender(<Demo visible visible2 />);
    expect(document.querySelectorAll('.rc-dialog')).toHaveLength(2);
    expect(document.body).toHaveStyle({
      overflowY: 'hidden',
    });

    rerender(<Demo />);
    expect(document.body).not.toHaveStyle({
      overflowY: 'hidden',
    });

    rerender(<Demo visible />);
    expect(document.body).toHaveStyle({
      overflowY: 'hidden',
    });

    rerender(<Demo visible2 />);
    expect(document.body).toHaveStyle({
      overflowY: 'hidden',
    });

    rerender(<Demo />);
    expect(document.body).not.toHaveStyle({
      overflowY: 'hidden',
    });

    unmount();
  });
});
