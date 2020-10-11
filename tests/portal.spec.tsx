/* eslint-disable react/no-render-return-value, max-classes-per-file, func-names, no-console */
import React from 'react';
import Select from 'rc-select';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
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

    const wrapper = mount(
      <Dialog onClose={onClose} visible>
        <Select virtual={false} open>
          <Select.Option value="bamboo">Bamboo</Select.Option>
        </Select>
      </Dialog>,
    );

    act(() => {
      jest.runAllTimers();
    });

    wrapper.find('.rc-select-item-option-content').simulate('click');
    expect(onClose).not.toHaveBeenCalled();
  });
});
