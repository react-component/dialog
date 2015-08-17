webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(39);


/***/ },

/***/ 39:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	__webpack_require__(40);
	
	var _react = __webpack_require__(10);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _rcDialog = __webpack_require__(11);
	
	var _rcDialog2 = _interopRequireDefault(_rcDialog);
	
	var MyControl = _react2['default'].createClass({
	  displayName: 'MyControl',
	
	  getInitialState: function getInitialState() {
	    return {
	      visible: false,
	      destroyOnClose: false
	    };
	  },
	
	  onClick: function onClick(e) {
	    this.setState({
	      mousePosition: {
	        x: e.pageX,
	        y: e.pageY
	      },
	      visible: true
	    });
	  },
	
	  onClose: function onClose() {
	    this.setState({
	      visible: false
	    });
	  },
	
	  onDestroyOnCloseChange: function onDestroyOnCloseChange(e) {
	    this.setState({
	      destroyOnClose: e.target.checked
	    });
	  },
	
	  render: function render() {
	    var dialog;
	    if (this.state.visible || !this.state.destroyOnClose) {
	      dialog = _react2['default'].createElement(
	        _rcDialog2['default'],
	        { visible: this.state.visible,
	          animation: 'zoom',
	          maskAnimation: 'fade',
	          onClose: this.onClose,
	          style: { width: 600 },
	          mousePosition: this.state.mousePosition, title: _react2['default'].createElement(
	            'div',
	            null,
	            ' 第二个弹框'
	          ) },
	        _react2['default'].createElement('input', null),
	        _react2['default'].createElement(
	          'p',
	          null,
	          'basic modal'
	        )
	      );
	    }
	    return _react2['default'].createElement(
	      'div',
	      null,
	      _react2['default'].createElement(
	        'p',
	        null,
	        _react2['default'].createElement(
	          'button',
	          { className: 'btn btn-primary', onClick: this.onClick },
	          'show dialog'
	        ),
	        ' ',
	        _react2['default'].createElement(
	          'label',
	          null,
	          'destroy on close: ',
	          _react2['default'].createElement('input', { type: 'checkbox', checked: this.state.destroyOnClose, onChange: this.onDestroyOnCloseChange })
	        )
	      ),
	      dialog
	    );
	  }
	});
	
	_react2['default'].render(_react2['default'].createElement(
	  'div',
	  null,
	  _react2['default'].createElement(
	    'h2',
	    null,
	    'ant-design dialog'
	  ),
	  _react2['default'].createElement(MyControl, null)
	), document.getElementById('__react-content'));

/***/ },

/***/ 40:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(41);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/yiminghe/code/react-components/dialog/node_modules/rc-tools/node_modules/css-loader/index.js?sourceMap!/Users/yiminghe/code/react-components/dialog/node_modules/rc-tools/node_modules/less-loader/index.js?sourceMap!/Users/yiminghe/code/react-components/dialog/assets/bootstrap.less", function() {
			var newContent = require("!!/Users/yiminghe/code/react-components/dialog/node_modules/rc-tools/node_modules/css-loader/index.js?sourceMap!/Users/yiminghe/code/react-components/dialog/node_modules/rc-tools/node_modules/less-loader/index.js?sourceMap!/Users/yiminghe/code/react-components/dialog/assets/bootstrap.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 41:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	exports.push([module.id, ".rc-dialog {\n  outline: none;\n  position: absolute;\n  left: -9999px;\n  top: -9999px;\n  z-index: 1000;\n}\n.rc-dialog-title {\n  margin-top: 10px;\n  margin-bottom: 10px;\n  font-size: 18px;\n}\n.rc-dialog-content {\n  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);\n  position: relative;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 6px;\n  outline: 0;\n}\n.rc-dialog-wrap-hidden > .rc-dialog,\n.rc-dialog-wrap-hidden > .rc-dialog-mask {\n  display: none;\n}\n.rc-dialog-close {\n  cursor: pointer;\n  outline: none;\n  margin-top: -2px;\n  float: right;\n  font-size: 21px;\n  font-weight: 700;\n  line-height: 1;\n  color: #000;\n  text-shadow: 0 1px 0 #fff;\n  filter: alpha(opacity=20);\n  opacity: .2;\n  text-decoration: none;\n}\n.rc-dialog-close-x:after {\n  content: '×';\n}\n.rc-dialog-close:hover {\n  opacity: 1;\n  filter: alpha(opacity=100);\n  text-decoration: none;\n}\n.rc-dialog-header {\n  min-height: 16.43px;\n  padding: 15px;\n  border-bottom: 1px solid #e5e5e5;\n}\n.rc-dialog-body {\n  overflow-y: auto;\n  padding: 15px;\n}\n.rc-dialog-mask {\n  position: fixed;\n  top: 0;\n  right: 0;\n  left: 0;\n  bottom: 0;\n  background-color: #000;\n  height: 100%;\n  opacity: .5;\n  z-index: 1000;\n  filter: alpha(opacity=50);\n}\n", "", {"version":3,"sources":["Dialog.less","Mask.less"],"names":[],"mappings":"AAGA;EACE,aAAA;EACA,kBAAA;EACA,aAAA;EACA,YAAA;EACA,aAAA;;AAGF;EACE,gBAAA;EACA,mBAAA;EACA,eAAA;;AAGF;EACE,yCAAA;EACA,kBAAA;EACA,sBAAA;EACA,4BAAA;EACA,oCAAA;EACA,kBAAA;EACA,UAAA;;AAGF,sBAAuB;AACvB,sBAAuB;EACrB,aAAA;;AAGF;EACE,eAAA;EACA,aAAA;EACA,gBAAA;EACA,YAAA;EACA,eAAA;EACA,gBAAA;EACA,cAAA;EACA,WAAA;EACA,yBAAA;EACA,yBAAA;EACA,WAAA;EACA,qBAAA;;AAEA,gBAAC,EAAE;EACD,SAAQ,GAAR;;AAGF,gBAAC;EACC,UAAA;EACA,0BAAA;EACA,qBAAA;;AAIJ;EACE,mBAAA;EACA,aAAA;EACA,gCAAA;;AAGF;EACE,gBAAA;EACA,aAAA;;ACjEF;EACE,eAAA;EACA,MAAA;EACA,QAAA;EACA,OAAA;EACA,SAAA;EACA,sBAAA;EACA,YAAA;EACA,WAAA;EACA,aAAA;EACA,yBAAA","sourcesContent":[".rc-dialog-wrap {\n}\n\n.rc-dialog {\n  outline: none;\n  position: absolute;\n  left:-9999px;\n  top:-9999px;\n  z-index: 1000;\n}\n\n.rc-dialog-title {\n  margin-top: 10px;\n  margin-bottom: 10px;\n  font-size: 18px;\n}\n\n.rc-dialog-content {\n  box-shadow: 0 5px 15px rgba(0, 0, 0, .5);\n  position: relative;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, .2);\n  border-radius: 6px;\n  outline: 0;\n}\n\n.rc-dialog-wrap-hidden > .rc-dialog,\n.rc-dialog-wrap-hidden > .rc-dialog-mask {\n  display: none;\n}\n\n.rc-dialog-close {\n  cursor: pointer;\n  outline: none;\n  margin-top: -2px;\n  float: right;\n  font-size: 21px;\n  font-weight: 700;\n  line-height: 1;\n  color: #000;\n  text-shadow: 0 1px 0 #fff;\n  filter: alpha(opacity=20);\n  opacity: .2;\n  text-decoration: none;\n\n  &-x:after {\n    content:'×'\n  }\n\n  &:hover {\n    opacity: 1;\n    filter: alpha(opacity=100);\n    text-decoration: none;\n  }\n}\n\n.rc-dialog-header {\n  min-height: 16.43px;\n  padding: 15px;\n  border-bottom: 1px solid #e5e5e5;\n}\n\n.rc-dialog-body {\n  overflow-y: auto;\n  padding: 15px\n}",".rc-dialog-mask {\n  position: fixed;\n  top: 0;\n  right: 0;\n  left: 0;\n  bottom:0;\n  background-color: #000;\n  height:100%;\n  opacity: .5;\n  z-index: 1000;\n  filter: alpha(opacity=50);\n}"]}]);

/***/ }

});
//# sourceMappingURL=bootstrap.js.map