/* eslint-disable react/no-render-return-value, max-classes-per-file, func-names, no-console */
import React from 'react';
import Select from 'rc-select';
import { render, fireEvent } from '@testing-library/react';
import Dialog from '../src';

/**
 * Since overflow scroll test need a clear env which may affect by other test.
 * Use a clean env instead.
 */
describe('Dialog.Portal', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('event should bubble', () => {
    const onClose = jest.fn();

    const { container } = render(
      <Dialog onClose={onClose} visible>
        <Select virtual={false} open>
          <Select.Option value="bamboo">Bamboo</Select.Option>
        </Select>
      </Dialog>,
    );

    jest.runAllTimers();

    fireEvent.mouseDown(container.querySelector('.rc-dialog-section'));
    fireEvent.click(container.querySelector('.rc-select-item-option-content'));
    fireEvent.mouseUp(container.querySelector('.rc-dialog-section'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('dialog dont close when mouseDown in content and mouseUp in wrap', () => {
    const onClose = jest.fn();

    const { container } = render(
      <Dialog onClose={onClose} visible>
        content
      </Dialog>,
    );

    jest.runAllTimers();

    fireEvent.mouseDown(container.querySelector('.rc-dialog-section'));
    fireEvent.mouseUp(container.querySelector('.rc-dialog-wrap'));
    expect(onClose).not.toHaveBeenCalled();
  });
});
