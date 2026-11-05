/* eslint-disable react/no-render-return-value, max-classes-per-file, func-names, no-console */
import { render } from '@testing-library/react';
import { Provider } from '@rc-component/motion';
import React from 'react';
import Dialog from '../src';
import Content from '../src/Dialog/Content';
import type { ContentRef } from '../src/Dialog/Content';

describe('Dialog.ref', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('support panelRef', () => {
    const panelRef = React.createRef<HTMLDivElement>();

    render(
      <Provider motion={false}>
        <Dialog panelRef={panelRef} visible />
      </Provider>,
    );

    expect(panelRef.current).toHaveClass('rc-dialog');
  });
});

describe('Dialog.Content ref', () => {
  it('handle created before panel mounts should still focus the panel', () => {
    const ref = React.createRef<ContentRef>();
    const props = {
      prefixCls: 'rc-dialog',
      motionName: '',
      ariaId: 'test',
      onVisibleChanged: () => {},
    };

    const { rerender, container } = render(<Content {...props} ref={ref} visible={false} />);

    // Keep the handle created while the panel was not mounted
    const handle = ref.current;
    expect(typeof handle.focus).toBe('function');
    expect(() => handle.focus()).not.toThrow();

    rerender(<Content {...props} ref={ref} visible />);

    handle.focus();
    expect(container.querySelector('[role="dialog"]')).toBe(document.activeElement);
  });
});
