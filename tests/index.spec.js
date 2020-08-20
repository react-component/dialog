/* eslint-disable react/no-render-return-value */
/* eslint-disable func-names */
import 'core-js/es6/map';
import 'core-js/es6/set';
import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';

import async from 'async';
import KeyCode from 'rc-util/lib/KeyCode';

import Dialog from '../index';
import '../assets/bootstrap.less';

const {Simulate} = TestUtils;

describe('dialog', () => {
  const title = '第一个title';
  let dialog;

  const container = document.createElement('div');
  container.id = 't1';
  document.body.appendChild(container);

  let callback1;

  class DialogWrap extends React.Component {
    state = {
      visible: false,
      maskClosable: true,
    };

    render() {
      return (
        <Dialog
          {...this.props}
          visible={this.state.visible}
          maskClosable={this.state.maskClosable}
        />
      );
    }
  }

  beforeEach(() => {
    function onClose() {
      callback1 = 1;
      dialog.setState({
        visible: false,
      });
    }

    callback1 = 0;
    dialog = ReactDOM.render((
      <DialogWrap
        style={{ width: 600 }}
        title={title}
        onClose={onClose}
        closeIcon="test-text"
      >
        <p>第一个dialog</p>
      </DialogWrap>), container);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
  });

  it('show', (done) => {
    dialog.setState({
      visible: true,
    });
    setTimeout(() => {
      expect($('.rc-dialog-wrap').css('display'))
        .toBe('block');
      done();
    }, 10);
  });

  it('close', (done) => {
    dialog.setState({
      visible: true,
    });
    dialog.setState({
      visible: false,
    });
    setTimeout(() => {
      expect($('.rc-dialog-wrap').css('display'))
        .toBe('none');
      done();
    }, 10);
  });

  it('create', () => {
    expect($('.rc-dialog').length).toBe(0);
  });

  it('mask', () => {
    dialog.setState({
      visible: true,
    });
    expect($('.rc-dialog-mask').length).toBe(1);
  });

  it('root', () => {
    dialog.setState({
      visible: true,
    });
    expect($('.rc-dialog-root').length).toBe(1);
  });

  it('click close', (finish) => {
    async.series([(done) => {
      dialog.setState({
        visible: true,
      });
      setTimeout(done, 10);
    }, (done) => {
      const btn = $('.rc-dialog-close')[0];
      expect(btn.textContent).toBe('test-text');
      Simulate.click(btn);
      setTimeout(done, 10);
    }, (done) => {
      expect(callback1).toBe(1);
      expect($('.rc-dialog-wrap').css('display'))
        .toBe('none');
      done();
    }], finish);
  });

  it("destroy on hide should unmount child components on close", () => {
    const wrapper = ReactDOM.render(<DialogWrap destroyOnClose>
      <input className="inputElem" />
    </DialogWrap>, container);
    wrapper.setState({
      visible: true,
    });
    $(".inputElem").val("test");
    expect($(".inputElem").val()).toBe("test")
    wrapper.setState({
      visible: false,
    });
    wrapper.setState({
      visible: true,
    });
    expect($(".inputElem").val()).toBe("")
  })

  it('esc to close', (finish) => {
    async.series([(done) => {
      dialog.setState({
        visible: true,
      });
      setTimeout(done, 10);
    }, (done) => {
      Simulate.keyDown($('.rc-dialog')[0], {
        keyCode: KeyCode.ESC,
      });
      setTimeout(done, 10);
    }, (done) => {
      expect(callback1).toBe(1);
      expect($('.rc-dialog-wrap').css('display'))
        .toBe('none');
      done();
    }], finish);
  });

  it('mask to close', (finish) => {
    async.series([(done) => {
      dialog.setState({
        visible: true,
      });
      setTimeout(done, 500);
    }, (done) => {
      const mask = $('.rc-dialog-wrap')[0];
      Simulate.click(mask);
      setTimeout(done, 10);
    }, (done) => {
      // dialog should closed after mask click
      expect(callback1).toBe(1);
      expect($('.rc-dialog-wrap').css('display'))
        .toBe('none');
      done();
    }, (done) => {
      dialog.setState({
        visible: true,
        maskClosable: false,
      });

      setTimeout(done, 10);
    }, (done) => {
      // dialog should stay on visible after mask click if set maskClosable to false
      // expect(callback1).toBe(0);
      expect($('.rc-dialog-wrap').css('display'))
        .toBe('block');
      done();
    }], finish);
  });

  it('renderToBody', () => {
    const d = ReactDOM.render(<DialogWrap>
      <p className="renderToBody">1</p>
    </DialogWrap>, container);
    expect($('.renderToBody').length).toBe(0);
    expect($('.rc-dialog-wrap').length).toBe(0);
    d.setState({
      visible: true,
    });
    expect($('.rc-dialog-wrap').length).toBe(1);
    expect($('.renderToBody').length).toBe(1);
    expect($('.rc-dialog-wrap')[0].parentNode.parentNode).not.toBe(container);
    ReactDOM.unmountComponentAtNode(container);
    expect($('.renderToBody').length).toBe(0);
    expect($('.rc-dialog-wrap').length).toBe(0);
  });

  it('getContainer', () => {
    const returnedContainer = document.createElement('div');
    document.body.appendChild(returnedContainer);
    const d = ReactDOM.render(
      <DialogWrap getContainer={() => returnedContainer}>
        <p className="getContainer">Hello world!</p>
      </DialogWrap>,
      container
    );
    d.setState({
      visible: true,
    });
    // fix issue #10656, must change this test
    // expect($('.rc-dialog-wrap')[0].parentNode.parentNode).toBe(returnedContainer);
    expect($('.rc-dialog-wrap')[0].parentNode.parentNode.parentNode).toBe(returnedContainer);
  });

  it('render footer padding correctly', () => {
    async.series([() => {
      ReactDOM.render(<DialogWrap footer="" />, container)
    }, () => {
      expect($('.rc-dialog-footer').css('padding')).toBe('10px 20px');
    }]);
  });

  it('support input autoFocus', () => {
    const d = ReactDOM.render(
      <DialogWrap><input autoFocus /></DialogWrap>,
      container
    );
    d.setState({
      visible: true
    });
    expect(document.activeElement).toBe(document.querySelector('input'));
  });

  it('trap focus after shift-tabbing', () => {
    dialog.setState({
      visible: true
    });
    const dialogEl = $('.rc-dialog-wrap')[0];
    const shiftTabbingDescriptor = {
      key: 'TAB',
      keyCode: 9,
      which: 9,
      shiftKey: true
    }
    Simulate.keyDown(dialogEl, shiftTabbingDescriptor);
    const sentinelEnd = $('.rc-dialog-content + div')[0];
    expect(document.activeElement).toBe(sentinelEnd);
  });

  it('sets transform-origin when property mousePosition is set', () => {
    ReactDOM.render((
      <Dialog
        style={{ width: 600 }}
        title={title}
        mousePosition={{x:100, y:100}}
        visible
      >
        <p>the dialog</p>
      </Dialog>), container);
    expect($('.rc-dialog').css('transform-origin')).not.toBeNull();
  });

  it('can get dom element before dialog first show when forceRender is set true ',()=>{
    ReactDOM.render((
      <Dialog
        forceRender
      >
        <div>forceRender element</div>
      </Dialog>
    ),container);
    expect($('.rc-dialog-body > div').text()).toBe('forceRender element');
  });

  it('should not close if mouse down in dialog', () => {
    dialog.setState({
      visible: true,
    });
    const dialogBody = $('.rc-dialog-body')[0];
    Simulate.mouseDown(dialogBody);
    const wrapper = $('.rc-dialog-wrap')[0];
    Simulate.mouseUp(wrapper);
    expect(dialog.state.visible).toBe(true);
  });

  it('getContainer is false', () => {
    ReactDOM.render((
      <Dialog
        getContainer={false}
      >
        <div>forceRender element</div>
      </Dialog>
    ),container);
    expect($('.rc-dialog-body > div').text()).toBe('forceRender element');
    expect($('.rc-dialog-wrap')[0].style.display).toBe('none');
  });

  it('getContainer is false and visible is true', () => {
    ReactDOM.render((
      <Dialog
        getContainer={false}
        visible
      >
        <div>forceRender element</div>
      </Dialog>
    ),container);
    expect($('.rc-dialog-body > div').text()).toBe('forceRender element');
    expect($('.rc-dialog-wrap')[0].style.display).toBe('');
  });

  it('Single Dialog body overflow set correctly', () => {
    document.body.style.overflow = "scroll"

    dialog.setState({
      visible: true
    });
    expect(document.body.style.overflow).toBe('hidden');

    dialog.setState({
      visible: false
    });
    expect(document.body.style.overflow).toBe('scroll');
  });

  it('Multiple Dialog body overflow set correctly', () => {
    document.body.style.overflow = "scroll"

    class MultipleDialogWrap extends React.Component {
      state = {
        visible: false,
        visible2: false,
      };

      render() {
        return (
          <div>
            <Dialog
              {...this.props}
              visible={this.state.visible}
            />
            <Dialog
              {...this.props}
              visible={this.state.visible2}
            />
          </div>
        );
      }
    }

    const d = ReactDOM.render((
      <MultipleDialogWrap>
        <div>forceRender element</div>
      </MultipleDialogWrap>
    ),container);

    expect($('.rc-dialog').length).toBe(0);

    d.setState({
      visible: true,
    })
    expect($('.rc-dialog').length).toBe(1);
    expect(document.body.style.overflow).toBe('hidden');

    d.setState({
      visible2: true,
    })
    expect($('.rc-dialog').length).toBe(2);
    expect(document.body.style.overflow).toBe('hidden');

    d.setState({
      visible: false,
      visible2: false,
    })
    expect(document.body.style.overflow).toBe('scroll');

    d.setState({
      visible: true,
    })
    expect(document.body.style.overflow).toBe('hidden');

    d.setState({
      visible: false,
      visible2: true,
    })
    expect(document.body.style.overflow).toBe('hidden');

    d.setState({
      visible: false,
      visible2: false,
    })
    expect(document.body.style.overflow).toBe('scroll');
  });

  it('afterClose', (done) => {
    ReactDOM.render((
      <DialogWrap
        afterClose={done}
      >
        <div>afterClose</div>
      </DialogWrap>
    ),container);
    dialog.setState({
      visible: true,
    });
    dialog.setState({
      visible: false,
    });
  });

  it('zIndex', () => {
    ReactDOM.render((
      <DialogWrap
        zIndex={1000}
      >
        <div>afterClose</div>
      </DialogWrap>
    ),container);
    dialog.setState({
      visible: true,
    });

    expect($('.rc-dialog-wrap').css("zIndex")).toBe('1000');
  });

  it('should show dialog when initialize dialog, given forceRender and visible is true', () => {
    class DialogWrapTest extends React.Component {
      state = {
        visible: true,
        forceRender: true,
      };

      render() {
        return (
          <Dialog
            forceRender={this.state.forceRender}
            visible={this.state.visible}
          />
        );
      }
    }

    ReactDOM.render((
      <DialogWrapTest
        visible
        forceRender
      >
        <div>Show dialog with forceRender and visible is true</div>
      </DialogWrapTest>
    ),container);
    setTimeout(() => {
      expect($('.rc-dialog-wrap').css('display'))
        .toBe('block');
    }, 10);
  });
});
