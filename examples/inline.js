webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(28);


/***/ },

/***/ 2:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(3);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/yiminghe/code/react-components/dialog/node_modules/rc-tools/node_modules/css-loader/index.js!/Users/yiminghe/code/react-components/dialog/assets/index.css", function() {
			var newContent = require("!!/Users/yiminghe/code/react-components/dialog/node_modules/rc-tools/node_modules/css-loader/index.js!/Users/yiminghe/code/react-components/dialog/assets/index.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 3:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	exports.push([module.id, ".rc-dialog {\n  outline: none;\n  position: absolute;\n  left: -9999px;\n  top: -9999px;\n  z-index: 1000;\n}\n.rc-dialog-wrap * {\n  box-sizing: border-box;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\n.rc-dialog-wrap-hidden > .rc-dialog {\n  display: none;\n}\n.rc-dialog-title {\n  margin: 0;\n  font-size: 14px;\n  line-height: 21px;\n  font-weight: bold;\n}\n.rc-dialog-content {\n  position: relative;\n  background-color: #ffffff;\n  border: none;\n  border-radius: 6px 6px;\n  background-clip: padding-box;\n  outline: 0;\n}\n.rc-dialog-close {\n  cursor: pointer;\n  outline: none;\n  margin-top: -2px;\n  float: right;\n  font-size: 21px;\n  font-weight: 700;\n  line-height: 1;\n  color: #000;\n  text-shadow: 0 1px 0 #fff;\n  filter: alpha(opacity=20);\n  opacity: .2;\n  text-decoration: none;\n}\n.rc-dialog-close-x:after {\n  content: '×';\n}\n.rc-dialog-close:hover {\n  opacity: 1;\n  filter: alpha(opacity=100);\n  text-decoration: none;\n}\n.rc-dialog-header {\n  padding: 13px 20px 14px 20px;\n  border-radius: 5px 5px 0 0;\n  background: #fff;\n  color: #666;\n  border-bottom: 1px solid #e9e9e9;\n}\n.rc-dialog-body {\n  padding: 20px;\n}\n.rc-dialog-footer {\n  border-top: 1px solid #e9e9e9;\n  padding: 10px 20px 10px 10px;\n  text-align: right;\n  border-radius: 0 0 5px 5px;\n}\n.rc-dialog-wrap-hidden > .rc-dialog.rc-dialog-zoom-enter,\n.rc-dialog-wrap-hidden > .rc-dialog.rc-dialog-zoom-leave {\n  display: block;\n}\n.rc-dialog-zoom-enter {\n  opacity: 0;\n  -webkit-animation-duration: 0.3s;\n          animation-duration: 0.3s;\n  -webkit-animation-fill-mode: both;\n          animation-fill-mode: both;\n  -webkit-animation-timing-function: cubic-bezier(0.18, 0.89, 0.32, 1.28);\n          animation-timing-function: cubic-bezier(0.18, 0.89, 0.32, 1.28);\n  -webkit-animation-play-state: paused;\n          animation-play-state: paused;\n}\n.rc-dialog-zoom-leave {\n  -webkit-animation-duration: 0.3s;\n          animation-duration: 0.3s;\n  -webkit-animation-fill-mode: both;\n          animation-fill-mode: both;\n  -webkit-animation-timing-function: cubic-bezier(0.6, -0.3, 0.74, 0.05);\n          animation-timing-function: cubic-bezier(0.6, -0.3, 0.74, 0.05);\n  -webkit-animation-play-state: paused;\n          animation-play-state: paused;\n}\n.rc-dialog-zoom-enter.rc-dialog-zoom-enter-active {\n  -webkit-animation-name: rcDialogZoomIn;\n          animation-name: rcDialogZoomIn;\n  -webkit-animation-play-state: running;\n          animation-play-state: running;\n}\n.rc-dialog-zoom-leave.rc-dialog-zoom-leave-active {\n  -webkit-animation-name: rcDialogZoomOut;\n          animation-name: rcDialogZoomOut;\n  -webkit-animation-play-state: running;\n          animation-play-state: running;\n}\n@-webkit-keyframes rcDialogZoomIn {\n  0% {\n    opacity: 0;\n    -webkit-transform-origin: 50% 50%;\n            transform-origin: 50% 50%;\n    -webkit-transform: scale(0, 0);\n            transform: scale(0, 0);\n  }\n  100% {\n    opacity: 1;\n    -webkit-transform-origin: 50% 50%;\n            transform-origin: 50% 50%;\n    -webkit-transform: scale(1, 1);\n            transform: scale(1, 1);\n  }\n}\n@keyframes rcDialogZoomIn {\n  0% {\n    opacity: 0;\n    -webkit-transform-origin: 50% 50%;\n            transform-origin: 50% 50%;\n    -webkit-transform: scale(0, 0);\n            transform: scale(0, 0);\n  }\n  100% {\n    opacity: 1;\n    -webkit-transform-origin: 50% 50%;\n            transform-origin: 50% 50%;\n    -webkit-transform: scale(1, 1);\n            transform: scale(1, 1);\n  }\n}\n@-webkit-keyframes rcDialogZoomOut {\n  0% {\n    opacity: 1;\n    -webkit-transform-origin: 50% 50%;\n            transform-origin: 50% 50%;\n    -webkit-transform: scale(1, 1);\n            transform: scale(1, 1);\n  }\n  100% {\n    opacity: 0;\n    -webkit-transform-origin: 50% 50%;\n            transform-origin: 50% 50%;\n    -webkit-transform: scale(0, 0);\n            transform: scale(0, 0);\n  }\n}\n@keyframes rcDialogZoomOut {\n  0% {\n    opacity: 1;\n    -webkit-transform-origin: 50% 50%;\n            transform-origin: 50% 50%;\n    -webkit-transform: scale(1, 1);\n            transform: scale(1, 1);\n  }\n  100% {\n    opacity: 0;\n    -webkit-transform-origin: 50% 50%;\n            transform-origin: 50% 50%;\n    -webkit-transform: scale(0, 0);\n            transform: scale(0, 0);\n  }\n}\n.rc-dialog-wrap-hidden > .rc-dialog-mask {\n  display: none;\n}\n.rc-dialog-mask {\n  position: fixed;\n  top: 0;\n  right: 0;\n  left: 0;\n  bottom: 0;\n  background-color: #373737;\n  background-color: rgba(55, 55, 55, 0.6);\n  height: 100%;\n  z-index: 1000;\n  filter: alpha(opacity=50);\n}\n.rc-dialog-wrap-hidden > .rc-dialog-mask.rc-dialog-fade-enter,\n.rc-dialog-wrap-hidden > .rc-dialog-mask.rc-dialog-fade-leave {\n  display: block;\n}\n.rc-dialog-fade-enter {\n  opacity: 0;\n  -webkit-animation-duration: 0.3s;\n          animation-duration: 0.3s;\n  -webkit-animation-fill-mode: both;\n          animation-fill-mode: both;\n  -webkit-animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);\n          animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);\n  -webkit-animation-play-state: paused;\n          animation-play-state: paused;\n}\n.rc-dialog-fade-leave {\n  -webkit-animation-duration: 0.3s;\n          animation-duration: 0.3s;\n  -webkit-animation-fill-mode: both;\n          animation-fill-mode: both;\n  -webkit-animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);\n          animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);\n  -webkit-animation-play-state: paused;\n          animation-play-state: paused;\n}\n.rc-dialog-fade-enter.rc-dialog-fade-enter-active {\n  -webkit-animation-name: rcDialogFadeIn;\n          animation-name: rcDialogFadeIn;\n  -webkit-animation-play-state: running;\n          animation-play-state: running;\n}\n.rc-dialog-fade-leave.rc-dialog-fade-leave-active {\n  -webkit-animation-name: rcDialogFadeOut;\n          animation-name: rcDialogFadeOut;\n  -webkit-animation-play-state: running;\n          animation-play-state: running;\n}\n@-webkit-keyframes rcDialogFadeIn {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@keyframes rcDialogFadeIn {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@-webkit-keyframes rcDialogFadeOut {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n@keyframes rcDialogFadeOut {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n", ""]);

/***/ },

/***/ 28:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(2);
	var React = __webpack_require__(6);
	var Dialog = __webpack_require__(7);
	var container;
	
	var DialogContent = React.createClass({
	  displayName: 'DialogContent',
	
	  getInitialState: function getInitialState() {
	    return {
	      value: ''
	    };
	  },
	
	  onChange: function onChange(e) {
	    this.props.onChange(e.target.value);
	    this.setState({
	      value: e.target.value
	    });
	  },
	
	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement('input', { onChange: this.onChange,
	
	        value: this.state.value }),
	      React.createElement(
	        'p',
	        null,
	        '第二个弹出框内容'
	      ),
	      React.createElement(
	        'p',
	        null,
	        '第二个弹出框内容'
	      ),
	      React.createElement(
	        'p',
	        null,
	        '第二个弹出框内容'
	      ),
	      React.createElement(
	        'p',
	        null,
	        '第二个弹出框内容'
	      ),
	      React.createElement(
	        'p',
	        null,
	        '第二个弹出框内容'
	      ),
	      React.createElement(
	        'p',
	        null,
	        '第二个弹出框内容'
	      ),
	      React.createElement(
	        'p',
	        null,
	        '第二个弹出框内容'
	      ),
	      React.createElement(
	        'div',
	        { className: 'modal-footer' },
	        React.createElement(
	          'button',
	          { className: 'btn', onClick: this.props.onClose },
	          'Close'
	        ),
	        React.createElement(
	          'button',
	          { className: 'btn', onClick: this.props.onDestroy },
	          'destroy'
	        ),
	        React.createElement(
	          'button',
	          { className: 'btn btn-primary', onClick: this.props.handleSave },
	          'Save changes'
	        )
	      )
	    );
	  }
	});
	
	var MyControl = React.createClass({
	  displayName: 'MyControl',
	
	  getInitialState: function getInitialState() {
	    return {
	      visible: false
	    };
	  },
	
	  onChange: function onChange(v) {
	    this.dialogContentInput = v;
	  },
	
	  handleClose: function handleClose() {
	    this.setState({
	      visible: false
	    });
	  },
	
	  handleDestroy: function handleDestroy() {
	    this.setState({
	      destroy: true
	    });
	  },
	
	  handleTrigger: function handleTrigger() {
	    var _this = this;
	
	    this.setState({
	      visible: true
	    });
	
	    // test rerender
	    setTimeout(function () {
	      _this.setState({
	        visible: true
	      });
	    }, 100);
	  },
	
	  render: function render() {
	    if (this.state.destroy) {
	      return null;
	    }
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'button',
	        { className: 'btn btn-primary', onClick: this.handleTrigger },
	        'show dialog'
	      ),
	      '   ',
	      React.createElement(
	        'button',
	        { className: 'btn btn-primary', onClick: this.handleDestroy },
	        'destroy'
	      ),
	      React.createElement(
	        Dialog,
	        {
	          ref: 'dialog',
	          title: '第二个弹框',
	          animation: 'zoom',
	          maskAnimation: 'fade',
	          visible: this.state.visible,
	          onClose: this.handleClose,
	          style: { width: 600 }
	        },
	        React.createElement(DialogContent, { onChange: this.onChange, onClose: this.handleClose,
	          onDestroy: this.handleDestroy })
	      )
	    );
	  }
	});
	
	React.render(React.createElement(
	  'div',
	  null,
	  React.createElement(
	    'h2',
	    null,
	    'render dialog inside component'
	  ),
	  React.createElement(MyControl, null)
	), document.getElementById('__react-content'));

/***/ }

});
//# sourceMappingURL=inline.js.map