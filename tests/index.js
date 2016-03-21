/* eslint-disable func-names */
const expect = require('expect.js');
const Dialog = require('../index');
require('../assets/bootstrap.less');
const $ = require('jquery');
const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const Simulate = TestUtils.Simulate;
const async = require('async');
const rcUtil = require('rc-util');

describe('dialog', () => {
  const title = '第一个title';
  let dialog;

  const container = document.createElement('div');
  container.id = 't1';
  document.body.appendChild(container);

  let callback1;

  beforeEach(() => {
    function onClose() {
      callback1 = 1;
      dialog.setState({
        visible: false,
      });
    }

    callback1 = 0;
    dialog = ReactDOM.render((
      <Dialog
        style={{ width: 600 }}
        title={title}
        onClose={onClose}
      >
        <p>第一个dialog</p>
      </Dialog>), container);
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
      Simulate.click(btn);
      setTimeout(done, 10);
    }, (done) => {
      expect(callback1).to.be(1);
      expect($('.rc-dialog-wrap').css('display'))
        .to.be('none');
      done();
    }], finish);
  });

  it('esc to close', (finish) => {
    async.series([(done) => {
      dialog.setState({
        visible: true,
      });
      setTimeout(done, 10);
    }, (done) => {
      Simulate.keyDown($('.rc-dialog')[0], {
        keyCode: rcUtil.KeyCode.ESC,
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
      setTimeout(done, 10);
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
    const d = ReactDOM.render(<Dialog>
      <p className="renderToBody">1</p>
    </Dialog>, container);
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
});
