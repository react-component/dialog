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

describe('dialog', function() {
  const title = '第一个title';
  let dialog;

  const container = document.createElement('div');
  container.id = 't1';
  document.body.appendChild(container);

  let callback1;

  beforeEach(function() {
    function onClose() {
      callback1 = 1;
      dialog.setState({
        visible: false,
      });
    }

    callback1 = 0;
    dialog = ReactDOM.render((<Dialog
      style={{width: 600}}
      title={title}
      onClose={onClose}>
      <p>第一个dialog</p>
    </Dialog>), container);
  });

  afterEach(function() {
    ReactDOM.unmountComponentAtNode(container);
  });

  it('show', function(done) {
    dialog.setState({
      visible: true,
    });
    setTimeout(function() {
      expect($('.rc-dialog').hasClass('rc-dialog-hidden')).not.to.be.ok();
      done();
    }, 10);
  });

  it('close', function(done) {
    dialog.setState({
      visible: true,
    });
    dialog.setState({
      visible: false,
    });
    setTimeout(function() {
      expect($('.rc-dialog').hasClass('rc-dialog-hidden')).to.be.ok();
      done();
    }, 10);
  });

  it('create', function() {
    expect($('.rc-dialog').length).to.be(0);
  });

  it('mask', function() {
    dialog.setState({
      visible: true,
    });
    expect($('.rc-dialog-mask').length).to.be(1);
  });

  it('click close', function(finish) {
    async.series([function(done) {
      dialog.setState({
        visible: true,
      });
      setTimeout(done, 10);
    }, function(done) {
      const btn = $('.rc-dialog-close')[0];
      Simulate.click(btn);
      setTimeout(done, 10);
    }, function(done) {
      expect(callback1).to.be(1);
      expect($('.rc-dialog').hasClass('rc-dialog-hidden')).to.be.ok();
      done();
    }], finish);
  });

  it('esc to close', function(finish) {
    async.series([function(done) {
      dialog.setState({
        visible: true,
      });
      setTimeout(done, 10);
    }, function(done) {
      Simulate.keyDown($('.rc-dialog')[0], {
        keyCode: rcUtil.KeyCode.ESC,
      });
      setTimeout(done, 10);
    }, function(done) {
      expect(callback1).to.be(1);
      expect($('.rc-dialog').hasClass('rc-dialog-hidden')).to.be.ok();
      done();
    }], finish);
  });

  it('renderToBody', function() {
    const d = ReactDOM.render(<Dialog>
      <p className="renderToBody">1</p>
    </Dialog>, container);
    expect($('.renderToBody').length).to.be(0);
    expect($('.rc-dialog-container').length).to.be(0);
    d.setState({
      visible: true,
    });
    expect($('.rc-dialog-container').length).to.be(1);
    expect($('.renderToBody').length).to.be(1);
    expect($('.rc-dialog-wrap')[0].parentNode).not.to.be(container);
    expect($('.rc-dialog-wrap')[0].parentNode.className).to.be('rc-dialog-container');
    ReactDOM.unmountComponentAtNode(container);
    expect($('.renderToBody').length).to.be(0);
    expect($('.rc-dialog-container').length).to.be(0);
  });
});
