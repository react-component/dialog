/* eslint-disable react/no-render-return-value, max-classes-per-file, func-names, no-console */
import { render } from '@testing-library/react';
import { Provider } from 'rc-motion';
import React from 'react';
import Dialog from '../src';

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
