/* eslint-disable func-names */
import 'core-js/es6/map';
import 'core-js/es6/set';
import expect from 'expect.js';
import Dialog from '../index';
import '../assets/bootstrap.less';
import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
const Simulate = TestUtils.Simulate;
import async from 'async';
import KeyCode from 'rc-util/lib/KeyCode';

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
        closeIcon={'test-text'}
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
        .to.be('block');
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
        .to.be('none');
      done();
    }, 10);
  });

  it('create', () => {
    expect($('.rc-dialog').length).to.be(0);
  });

  it('mask', () => {
    dialog.setState({
      visible: true,
    });
    expect($('.rc-dialog-mask').length).to.be(1);
  });

  it('click close', (finish) => {
    async.series([(done) => {
      dialog.setState({
        visible: true,
      });
      setTimeout(done, 10);
    }, (done) => {
      const btn = $('.rc-dialog-close')[0];
      expect(btn.innerText).to.be('test-text');
      Simulate.click(btn);
      setTimeout(done, 10);
    }, (done) => {
      expect(callback1).to.be(1);
      expect($('.rc-dialog-wrap').css('display'))
        .to.be('none');
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
    expect($(".inputElem").val()).to.be("test")
    wrapper.setState({
      visible: false,
    });
    wrapper.setState({
      visible: true,
    });
    expect($(".inputElem").val()).to.be("")
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
      expect(callback1).to.be(1);
      expect($('.rc-dialog-wrap').css('display'))
        .to.be('none');
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
      expect(callback1).to.be(1);
      expect($('.rc-dialog-wrap').css('display'))
        .to.be('none');
      done();
    }, (done) => {
      dialog.setState({
        visible: true,
        maskClosable: false,
      });

      setTimeout(done, 10);
    }, (done) => {
      // dialog should stay on visible after mask click if set maskClosable to false
      // expect(callback1).to.be(0);
      expect($('.rc-dialog-wrap').css('display'))
        .to.be('block');
      done();
    }], finish);
  });

  it('renderToBody', () => {
    const d = ReactDOM.render(<DialogWrap>
      <p className="renderToBody">1</p>
    </DialogWrap>, container);
    expect($('.renderToBody').length).to.be(0);
    expect($('.rc-dialog-wrap').length).to.be(0);
    d.setState({
      visible: true,
    });
    expect($('.rc-dialog-wrap').length).to.be(1);
    expect($('.renderToBody').length).to.be(1);
    expect($('.rc-dialog-wrap')[0].parentNode.parentNode).not.to.be(container);
    ReactDOM.unmountComponentAtNode(container);
    expect($('.renderToBody').length).to.be(0);
    expect($('.rc-dialog-wrap').length).to.be(0);
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
    // expect($('.rc-dialog-wrap')[0].parentNode.parentNode).to.be(returnedContainer);
    expect($('.rc-dialog-wrap')[0].parentNode.parentNode.parentNode).to.be(returnedContainer);
  });

  it('render footer padding correctly', () => {
    async.series([() => {
      ReactDOM.render(<DialogWrap footer={''} />, container)
    }, () => {
      expect($('.rc-dialog-footer').css('padding')).to.be('10px 20px');
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
    expect(document.activeElement).to.be(document.querySelector('input'));
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
    expect(document.activeElement).to.be(sentinelEnd);
  });

  it('sets transform-origin when property mousePosition is set', () => {
    const d = ReactDOM.render((
      <Dialog
        style={{ width: 600 }}
        title={title}
        mousePosition={{x:100, y:100}}
        visible
      >
        <p>the dialog</p>
      </Dialog>), container);
    expect($('.rc-dialog').css('transform-origin')).to.not.be.empty();
  });

  it('can get dom element before dialog first show when forceRender is set true ',()=>{
    const d = ReactDOM.render((
      <Dialog
        forceRender
      >
        <div>forceRender element</div>
      </Dialog>
    ),container)
    expect($('.rc-dialog-body > div').text()).to.be('forceRender element')
  });

  it('should not close if mouse down in dialog', () => {
    dialog.setState({
      visible: true,
    });
    const dialogBody = $('.rc-dialog-body')[0];
    Simulate.mouseDown(dialogBody);
    const wrapper = $('.rc-dialog-wrap')[0];
    Simulate.mouseUp(wrapper);
    expect(dialog.state.visible).to.be(true);
  });
});
