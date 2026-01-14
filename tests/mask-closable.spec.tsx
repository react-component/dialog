import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import Dialog from '../src';

describe('Dialog.MaskClosable', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should close when click on mask', () => {
    const onClose = jest.fn();
    render(
      <Dialog visible maskClosable onClose={onClose}>
        Content
      </Dialog>
    );

    act(() => {
      jest.runAllTimers();
    });

    const mask = document.querySelector('.rc-dialog-wrap');
    if (!mask) throw new Error('Mask not found');

    fireEvent.mouseDown(mask);
    fireEvent.mouseUp(mask);
    fireEvent.click(mask);
    expect(onClose).toHaveBeenCalled();
  });

  it('should not close when dragging from content to mask', () => {
    const onClose = jest.fn();
    const { getByText } = render(
      <Dialog visible maskClosable onClose={onClose}>
        Content
      </Dialog>
    );

    act(() => {
      jest.runAllTimers();
    });

    const content = getByText('Content');
    const mask = document.querySelector('.rc-dialog-wrap');
    if (!mask) throw new Error('Mask not found');

    // Simulate mouse down on content
    fireEvent.mouseDown(content);
    // Simulate mouse up on mask
    fireEvent.mouseUp(mask);
    // Simulate click on mask (since click follows mouseup)
    fireEvent.click(mask);

    expect(onClose).not.toHaveBeenCalled();
  });
});
