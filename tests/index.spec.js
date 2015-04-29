/** @jsx React.DOM */

var expect = require('expect.js');
var Dialog = require('../index');
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

  beforeEach(function () {
    function onClose(){
      callback1=1;
    }
    function onShow(){
      callback2=1;
    }
    callback1 = 0;
    callback2 = 0;
    dialog = React.render((<Dialog
      style={{width: 600}}
      title={title} 
      onClose={onClose} onShow={onShow}>
      <p>第一个dialog</p>
    </Dialog>), container);
  });

  afterEach(function () {
    React.unmountComponentAtNode(container);
  });

  it('show', function (done) {
    dialog.show();
    setTimeout(function () {
      expect($('.rc-dialog-wrap').hasClass('rc-dialog-wrap-hidden')).not.to.be.ok();
      done();
    }, 10);

  });

  it('close', function (done) {
    dialog.show();
    dialog.close();
    setTimeout(function () {
      expect($('.rc-dialog-wrap').hasClass('rc-dialog-wrap-hidden')).to.be.ok();
      done();
    }, 10);
  });

  it('create', function () {
    expect($('.rc-dialog').length).to.be(0);
  });

  it('mask', function () {
    dialog.show();
    expect($('.rc-dialog-mask').length).to.be(1);

  });

  it('show', function (done) {
    dialog.show();
    setTimeout(function () {
      expect(callback2).to.be(1);
      expect($('.rc-dialog-wrap').hasClass('rc-dialog-wrap-hidden')).not.to.be.ok();
      done();
    }, 10);
  });

  it('click close', function (done) {
    async.series([function (done) {
      dialog.show();
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
});
