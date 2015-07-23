webpackJsonp([2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(33);


/***/ },

/***/ 33:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(34);
	var React = __webpack_require__(6);
	var Dialog = __webpack_require__(7);
	
	function close() {
	  console.log('close');
	}
	
	function show() {
	  console.log('show');
	}
	
	React.render(React.createElement(
	  'div',
	  null,
	  React.createElement(
	    'p',
	    null,
	    'does not support render visible on server!'
	  ),
	  React.createElement(
	    Dialog,
	    {
	      title: '第一个弹框',
	      width: '500',
	      zIndex: 100,
	      visible: true,
	      onClose: close,
	      onShow: show
	    },
	    React.createElement(
	      'p',
	      null,
	      '第一个dialog'
	    )
	  )
	), document.getElementById('__react-content'));

/***/ },

/***/ 34:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(35);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/yiminghe/code/react-components/dialog/node_modules/rc-tools/node_modules/css-loader/index.js!/Users/yiminghe/code/react-components/dialog/assets/bootstrap.css", function() {
			var newContent = require("!!/Users/yiminghe/code/react-components/dialog/node_modules/rc-tools/node_modules/css-loader/index.js!/Users/yiminghe/code/react-components/dialog/assets/bootstrap.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 35:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	exports.push([module.id, ".rc-dialog {\n  outline: none;\n  position: absolute;\n  left: -9999px;\n  top: -9999px;\n  z-index: 1000;\n}\n.rc-dialog-title {\n  margin-top: 10px;\n  margin-bottom: 10px;\n  font-size: 18px;\n}\n.rc-dialog-content {\n  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);\n  position: relative;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 6px;\n  outline: 0;\n}\n.rc-dialog-wrap-hidden > .rc-dialog,\n.rc-dialog-wrap-hidden > .rc-dialog-mask {\n  display: none;\n}\n.rc-dialog-close {\n  cursor: pointer;\n  outline: none;\n  margin-top: -2px;\n  float: right;\n  font-size: 21px;\n  font-weight: 700;\n  line-height: 1;\n  color: #000;\n  text-shadow: 0 1px 0 #fff;\n  filter: alpha(opacity=20);\n  opacity: .2;\n  text-decoration: none;\n}\n.rc-dialog-close-x:after {\n  content: '×';\n}\n.rc-dialog-close:hover {\n  opacity: 1;\n  filter: alpha(opacity=100);\n  text-decoration: none;\n}\n.rc-dialog-header {\n  min-height: 16.43px;\n  padding: 15px;\n  border-bottom: 1px solid #e5e5e5;\n}\n.rc-dialog-body {\n  overflow-y: auto;\n  padding: 15px;\n}\n.rc-dialog-mask {\n  position: fixed;\n  top: 0;\n  right: 0;\n  left: 0;\n  bottom: 0;\n  background-color: #000;\n  height: 100%;\n  opacity: .5;\n  z-index: 1000;\n  filter: alpha(opacity=50);\n}\n", ""]);

/***/ }

});
//# sourceMappingURL=simple.js.map