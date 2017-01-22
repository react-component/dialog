webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(2);
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(36);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _DialogWrap = __webpack_require__(174);
	
	var _DialogWrap2 = _interopRequireDefault(_DialogWrap);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* eslint no-console:0 */
	var MyControl = _react2.default.createClass({
	    displayName: 'MyControl',
	    getInitialState: function getInitialState() {
	        return {
	            visible: false,
	            width: 600,
	            destroyOnClose: false,
	            center: false
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
	    onClose: function onClose(e) {
	        // console.log(e);
	        this.setState({
	            visible: false
	        });
	    },
	    onDestroyOnCloseChange: function onDestroyOnCloseChange(e) {
	        this.setState({
	            destroyOnClose: e.target.checked
	        });
	    },
	    changeWidth: function changeWidth() {
	        this.setState({
	            width: this.state.width === 600 ? 800 : 600
	        });
	    },
	    center: function center(e) {
	        this.setState({
	            center: e.target.checked
	        });
	    },
	    render: function render() {
	        var dialog = void 0;
	        if (this.state.visible || !this.state.destroyOnClose) {
	            var style = {
	                width: this.state.width
	            };
	            var wrapClassName = '';
	            if (this.state.center) {
	                wrapClassName = 'center';
	            }
	            dialog = _react2.default.createElement(_DialogWrap2.default, { visible: this.state.visible, wrapClassName: wrapClassName, animation: "zoom", maskAnimation: "fade", onClose: this.onClose, style: style, mousePosition: this.state.mousePosition }, _react2.default.createElement("input", null), _react2.default.createElement("p", null, "basic modal"), _react2.default.createElement("button", { onClick: this.changeWidth }, "change width"), _react2.default.createElement("div", { style: { height: 200 } }));
	        }
	        return _react2.default.createElement("div", { style: { width: '90%', margin: '0 auto' } }, _react2.default.createElement("style", null, '\n            .center {\n              display: flex;\n              align-items: center;\n              justify-content: center;\n            }\n            '), _react2.default.createElement("p", null, _react2.default.createElement("button", { className: "btn btn-primary", onClick: this.onClick }, "show dialog"), '\xA0', _react2.default.createElement("label", null, "destroy on close:", _react2.default.createElement("input", { type: "checkbox", checked: this.state.destroyOnClose, onChange: this.onDestroyOnCloseChange })), '\xA0', _react2.default.createElement("label", null, "center", _react2.default.createElement("input", { type: "checkbox", checked: this.state.center, onChange: this.center }))), dialog);
	    }
	});
	// use import Dialog from 'rc-dialog'
	
	_reactDom2.default.render(_react2.default.createElement("div", null, _react2.default.createElement("h2", null, "ant-design dialog"), _react2.default.createElement(MyControl, null)), document.getElementById('__react-content'));

/***/ },
/* 2 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
]);
//# sourceMappingURL=ant-design.js.map