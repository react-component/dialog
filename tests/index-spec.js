/** @jsx React.DOM */


var expect = require('expect.js');
var Dialog = require('../index');
var React = require('react');
var sinon = require('sinon');

require('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css');
var $ = require('jquery');
var simulateDomEvent = require('simulate-dom-event');


var node = $('<div id="t1"></div>').appendTo('body');

var node2 = $('<div id="t2"></div>').appendTo('body');


describe('dialog', function() {
  var title = "第一个title";

  var callback1 = sinon.spy();
  var callback2 = sinon.spy();

   var dialog = React.renderComponent(
      (<Dialog title={title} onClose={callback1} onShow={callback2}>
        <p>第一个dialog</p>
      </Dialog>),
      document.getElementById('t1')
  );
  it('create', function() {
    expect($('#t1 .rc-dialog').length).to.be(1);
    expect($('#t1 .modal-title').text()).to.be(title);
  });

  it('mask',function() {
    expect($('#t1 .modal-mask').length).to.be(1);

  });
  it('default visible',function  () {
    expect($('#t1 .rc-dialog').css('display')).to.be('none');
  });

  it('show',function (done) {
    dialog.setProps({'visible' : true});
    setTimeout(function  () {
      expect(callback2.called).to.be(true);

      expect($('#t1 .rc-dialog').css('display')).to.be('block');
      done();
    },1000);
  });

  it('click close',function() {
    var btn = $('#t1 .modal-header button')[0];
    simulateDomEvent(btn,'click');
    expect(callback1.called).to.be(true);
  });
});

describe('second dialog',function() {
  var dialog = React.renderComponent(
      (<Dialog title="第二个">
        <p>第二个dialog</p>
      </Dialog>),
      document.getElementById('t2')
  );

  it('show',function(done) {
    dialog.setProps({'visible' : true});
    setTimeout(function(){
      expect($('#t2 .rc-dialog').css('display')).to.be('block');
      done();
    },1000);
     
  });

  it('hide',function(done) {
    dialog.setProps({'visible' : false});
    setTimeout(function(){
      expect($('#t2 .rc-dialog').css('display')).to.be('none');
      done();
    },1000);
  });

  it('show',function() {
     dialog.setProps({'visible' : true});
     expect($('#t2 .rc-dialog').css('display')).to.be('block');
  });
});
