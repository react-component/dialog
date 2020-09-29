/* eslint-disable react/no-render-return-value, max-classes-per-file, func-names, no-console */
import React from 'react';
import { mount } from 'enzyme';
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
    const wrapper = mount(<Dialog />, { attachTo: document.body });
    document.body.style.overflow = 'scroll';

    wrapper.setProps({ visible: true });
    jest.runAllTimers();
    wrapper.update();
    expect(document.body.style.overflow).toBe('hidden');

    wrapper.setProps({ visible: false });
    jest.runAllTimers();
    wrapper.update();
    expect(document.body.style.overflow).toBe('scroll');

    wrapper.unmount();
  });

  it('Multiple Dialog body overflow set correctly', () => {
    document.body.style.overflow = 'scroll';

    const Demo = ({ visible = false, visible2 = false, ...restProps }) => (
      <div>
        <Dialog {...restProps} visible={visible} />
        <Dialog {...restProps} visible={visible2} />
      </div>
    );

    const wrapper = mount(<Demo />, { attachTo: document.body });

    expect(wrapper.find('.rc-dialog').length).toBe(0);

    wrapper.setProps({ visible: true });
    jest.runAllTimers();

    expect(wrapper.find('div.rc-dialog').length).toBe(1);
    expect(document.body.style.overflow).toBe('hidden');

    wrapper.setProps({ visible2: true });
    jest.runAllTimers();

    expect(wrapper.find('div.rc-dialog').length).toBe(2);
    expect(document.body.style.overflow).toBe('hidden');

    wrapper.setProps({
      visible: false,
      visible2: false,
    });
    jest.runAllTimers();

    expect(document.body.style.overflow).toBe('scroll');

    wrapper.setProps({
      visible: true,
    });
    jest.runAllTimers();
    expect(document.body.style.overflow).toBe('hidden');

    wrapper.setProps({
      visible: false,
      visible2: true,
    });
    jest.runAllTimers();
    expect(document.body.style.overflow).toBe('hidden');

    wrapper.setProps({
      visible: false,
      visible2: false,
    });
    jest.runAllTimers();
    expect(document.body.style.overflow).toBe('scroll');
    wrapper.unmount();
  });
});
