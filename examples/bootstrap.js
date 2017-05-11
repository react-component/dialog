webpackJsonp([1],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(281);


/***/ }),

/***/ 281:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _classCallCheck2 = __webpack_require__(2);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(3);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(72);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	__webpack_require__(282);
	
	__webpack_require__(283);
	
	var _react = __webpack_require__(81);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(116);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _DialogWrap = __webpack_require__(262);
	
	var _DialogWrap2 = _interopRequireDefault(_DialogWrap);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var MyControl = function (_React$Component) {
	    (0, _inherits3.default)(MyControl, _React$Component);
	
	    function MyControl() {
	        (0, _classCallCheck3.default)(this, MyControl);
	
	        var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.apply(this, arguments));
	
	        _this.state = {
	            visible: false,
	            destroyOnClose: false
	        };
	        _this.onClick = function () {
	            _this.setState({
	                visible: true
	            });
	        };
	        _this.onClose = function () {
	            _this.setState({
	                visible: false
	            });
	        };
	        _this.onDestroyOnCloseChange = function (e) {
	            _this.setState({
	                destroyOnClose: e.target.checked
	            });
	        };
	        return _this;
	    }
	
	    MyControl.prototype.render = function render() {
	        var dialog = void 0;
	        if (this.state.visible || !this.state.destroyOnClose) {
	            dialog = _react2.default.createElement(_DialogWrap2.default, { visible: this.state.visible, animation: "slide-fade", maskAnimation: "fade", onClose: this.onClose, style: { width: 600 }, title: _react2.default.createElement("div", null, '\u7B2C\u4E8C\u4E2A\u5F39\u6846'), footer: [_react2.default.createElement("button", { type: "button", className: "btn btn-default", key: "close", onClick: this.onClose }, "Close"), _react2.default.createElement("button", { type: "button", className: "btn btn-primary", key: "save", onClick: this.onClose }, "Save changes")] }, _react2.default.createElement("h4", null, "Text in a modal"), _react2.default.createElement("p", null, "Duis mollis, est non commodo luctus, nisi erat porttitor ligula."), _react2.default.createElement("hr", null), _react2.default.createElement("h4", null, "Overflowing text to show scroll behavior"), _react2.default.createElement("p", null, "Cras mattis consectetur purus sit amet fermentum." + " " + "Cras justo odio, dapibus ac facilisis in," + " " + "egestas eget quam. Morbi leo risus, porta ac consectetur ac," + " " + "vestibulum at eros."), _react2.default.createElement("p", null, "Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus" + " " + "sagittis lacus vel augue laoreet rutrum faucibus dolor auctor."), _react2.default.createElement("div", { style: { display: '' } }, _react2.default.createElement("p", null, "Aenean lacinia bibendum nulla sed" + " " + "consectetur. Praesent commodo cursus magna," + " " + "vel scelerisque nisl consectetur et. Donec sed odio dui." + " " + "Donec" + " " + "ullamcorper nulla non metus auctor fringilla."), _react2.default.createElement("p", null, "Cras mattis consectetur purus sit amet fermentum." + " " + "Cras justo odio, dapibus ac facilisis in, egestas" + " " + "eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros."), _react2.default.createElement("p", null, "Praesent commodo cursus" + " " + "magna, vel scelerisque nisl consectetur et." + " " + "Vivamus sagittis lacus vel augue laoreet rutrum faucibus" + " " + "dolor auctor."), _react2.default.createElement("p", null, "Aenean lacinia bibendum nulla sed consectetur." + " " + "Praesent commodo cursus magna, vel" + " " + "scelerisque nisl consectetur et. Donec sed odio dui." + " " + "Donec ullamcorper nulla non metus auctor" + " " + "fringilla."), _react2.default.createElement("p", null, "Cras mattis consectetur purus sit amet fermentum." + " " + "Cras justo odio, dapibus ac" + " " + "facilisis in, egestas eget quam. Morbi leo risus," + " " + "porta ac consectetur ac, vestibulum at eros."), _react2.default.createElement("p", null, "Praesent commodo cursus magna, vel scelerisque nisl consectetur et." + " " + "Vivamus sagittis lacus vel augue" + " " + "laoreet rutrum faucibus dolor auctor."), _react2.default.createElement("p", null, "Aenean lacinia bibendum nulla sed consectetur. Praesent" + " " + "commodo cursus magna, vel scelerisque nisl consectetur et." + " " + "Donec sed odio dui. Donec ullamcorper nulla" + " " + "non metus auctor fringilla.")));
	        }
	        return _react2.default.createElement("div", { style: { margin: 20 } }, _react2.default.createElement("p", null, _react2.default.createElement("button", { className: "btn btn-primary", onClick: this.onClick }, "show dialog"), '\xA0', _react2.default.createElement("label", null, "destroy on close:", _react2.default.createElement("input", { type: "checkbox", checked: this.state.destroyOnClose, onChange: this.onDestroyOnCloseChange }))), dialog);
	    };
	
	    return MyControl;
	}(_react2.default.Component);
	
	_reactDom2.default.render(_react2.default.createElement("div", null, _react2.default.createElement("h2", null, "ant-design dialog"), _react2.default.createElement(MyControl, null)), document.getElementById('__react-content'));

/***/ }),

/***/ 282:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 283:
282

});
//# sourceMappingURL=bootstrap.js.map