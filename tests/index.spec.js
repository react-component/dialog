/** @jsx React.DOM */

var expect = require('expect.js');
var Dialog = require('../index');
var sinon = require('sinon');
require('/assets/bootstrap.css');
var $ = require('jquery');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var Simulate = TestUtils.Simulate;
var async = require('async');

describe('dialog', function () {
  var title = "第一个title";
  var dialog;

  var container = document.createElement('div');
  container.id = 't1';
  document.body.appendChild(container);

  var callback1;
  var callback2;

  beforeEach(function (done) {
    callback1 = sinon.spy();
    callback2 = sinon.spy();
    React.render((<Dialog
      style={{width:600}}
      title={title} onClose={callback1} onShow={callback2}>
      <p>第一个dialog</p>
    </Dialog>), container, function () {
      dialog = this;
      done();
    });
  });

  afterEach(function () {
    React.unmountComponentAtNode(container);
  });

  it('show', function (done) {
    dialog.setProps({'visible': true});
    setTimeout(function () {
      expect($('#t1 .rc-dialog-wrap').hasClass('rc-dialog-hidden')).not.to.be.ok();
      done();
    }, 10);

  });

  it('hide', function (done) {
    dialog.setProps({'visible': false});
    setTimeout(function () {
      expect($('#t1 .rc-dialog-wrap').hasClass('rc-dialog-wrap-hidden')).to.be.ok();
      done();
    }, 10);
  });

  it('create', function () {
    expect($('#t1 .rc-dialog').length).to.be(1);
    expect($('#t1 .rc-dialog-title').text()).to.be(title);
  });

  it('mask', function () {
    expect($('#t1 .rc-dialog-mask').length).to.be(1);

  });
  it('default visible false', function () {
    expect($('#t1 .rc-dialog-wrap').hasClass('rc-dialog-wrap-hidden')).to.be.ok();
  });

  it('show', function (done) {
    dialog.setProps({'visible': true});
    setTimeout(function () {
      expect(callback2.called).to.be(true);
      expect($('#t1 .rc-dialog-wrap').hasClass('rc-dialog-wrap-hidden')).not.to.be.ok();
      done();
    }, 10);
  });

  it('click close', function (done) {
    async.series([function (done) {
      dialog.setProps({'visible': true});
      setTimeout(done, 10);
    }, function (done) {
      var btn = $('#t1 .rc-dialog-header a')[0];
      Simulate.click(btn);
      setTimeout(done, 10);
    }, function (done) {
      expect(callback1.called).to.be(true);
      expect($('#t1 .rc-dialog-wrap').hasClass('rc-dialog-wrap-hidden')).to.be.ok();
      done();
    }], done)
  });
});
