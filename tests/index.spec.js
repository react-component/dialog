'use strict';

var expect = require('expect.js');
var Dialog = require('../index');
require('../assets/bootstrap.less');
var $ = require('jquery');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var Simulate = TestUtils.Simulate;
var async = require('async');
var rcUtil = require('rc-util');

describe('dialog', function () {
  var title = "第一个title";
  var dialog;

  var container = document.createElement('div');
  container.id = 't1';
  document.body.appendChild(container);

  var callback1;

  beforeEach(function () {
    function onClose() {
      callback1 = 1;
      dialog.setState({
        visible: false
      });
    }

    callback1 = 0;
    dialog = React.render((<Dialog
      style={{width: 600}}
      title={title}
      onClose={onClose}>
      <p>第一个dialog</p>
    </Dialog>), container);
  });

  afterEach(function () {
    React.unmountComponentAtNode(container);
  });

  it('show', function (done) {
    dialog.setState({
      visible: true
    });
    setTimeout(function () {
      expect($('.rc-dialog-wrap').hasClass('rc-dialog-wrap-hidden')).not.to.be.ok();
      done();
    }, 10);

  });

  it('close', function (done) {
    dialog.setState({
      visible: true
    });
    dialog.setState({
      visible: false
    });
    setTimeout(function () {
      expect($('.rc-dialog-wrap').hasClass('rc-dialog-wrap-hidden')).to.be.ok();
      done();
    }, 10);
  });

  it('create', function () {
    expect($('.rc-dialog').length).to.be(0);
  });

  it('mask', function () {
    dialog.setState({
      visible: true
    });
    expect($('.rc-dialog-mask').length).to.be(1);

  });

  it('click close', function (done) {
    async.series([function (done) {
      dialog.setState({
        visible: true
      });
      setTimeout(done, 10);
    }, function (done) {
      var btn = $('.rc-dialog-header a')[0];
      Simulate.click(btn);
      setTimeout(done, 10);
    }, function (done) {
      expect(callback1).to.be(1);
      expect($('.rc-dialog-wrap').hasClass('rc-dialog-wrap-hidden')).to.be.ok();
      done();
    }], done)
  });

  it('esc to close', function (done) {
    async.series([function (done) {
      dialog.setState({
        visible: true
      });
      setTimeout(done, 10);
    }, function (done) {
      Simulate.keyDown($('.rc-dialog')[0], {
        keyCode: rcUtil.KeyCode.ESC
      });
      setTimeout(done, 10);
    }, function (done) {
      expect(callback1).to.be(1);
      expect($('.rc-dialog-wrap').hasClass('rc-dialog-wrap-hidden')).to.be.ok();
      done();
    }], done)
  });

  it('renderToBody', function () {
    var d = React.render(<Dialog>
      <p className="renderToBody">1</p>
    </Dialog>, container);
    expect($('.renderToBody').length).to.be(0);
    expect($('.rc-dialog-container').length).to.be(0);
    d.setState({
      visible: true
    });
    expect($('.rc-dialog-container').length).to.be(1);
    expect($('.renderToBody').length).to.be(1);
    expect($('.rc-dialog-wrap')[0].parentNode).not.to.be(container);
    expect($('.rc-dialog-wrap')[0].parentNode.className).to.be('rc-dialog-container');
    React.unmountComponentAtNode(container);
    expect($('.renderToBody').length).to.be(0);
    expect($('.rc-dialog-container').length).to.be(0);
  });
});
