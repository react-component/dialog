webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* eslint no-console:0 */
	
	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	__webpack_require__(2);
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(160);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _rcDialog = __webpack_require__(161);
	
	var _rcDialog2 = _interopRequireDefault(_rcDialog);
	
	var _objectAssign = __webpack_require__(194);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var MyControl = _react2['default'].createClass({
	  displayName: 'MyControl',
	
	  getInitialState: function getInitialState() {
	    return {
	      visible: false,
	      width: 600,
	      align: {
	        points: ['tc', 'tc'],
	        offset: [0, 100]
	      },
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
	
	  onClose: function onClose(e) {
	    console.log(e);
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
	      width: this.state.width === 600 ? 800 : 600,
	      align: (0, _objectAssign2['default'])({}, this.state.align)
	    });
	  },
	
	  render: function render() {
	    var dialog = undefined;
	    if (this.state.visible || !this.state.destroyOnClose) {
	      dialog = _react2['default'].createElement(
	        _rcDialog2['default'],
	        { visible: this.state.visible,
	          align: this.state.align,
	          animation: 'zoom',
	          maskAnimation: 'fade',
	          onClose: this.onClose,
	          style: { width: this.state.width },
	          mousePosition: this.state.mousePosition, title: _react2['default'].createElement(
	            'div',
	            null,
	            '第二个弹框'
	          ) },
	        _react2['default'].createElement('input', null),
	        _react2['default'].createElement(
	          'p',
	          null,
	          'basic modal'
	        ),
	        _react2['default'].createElement(
	          'button',
	          { onClick: this.changeWidth },
	          'change width'
	        ),
	        _react2['default'].createElement('div', { style: { height: 200 } })
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
	          _react2['default'].createElement('input', { type: 'checkbox', checked: this.state.destroyOnClose,
	            onChange: this.onDestroyOnCloseChange })
	        )
	      ),
	      dialog
	    );
	  }
	});
	
	_reactDom2['default'].render(_react2['default'].createElement(
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
/* 2 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
]);
//# sourceMappingURL=ant-design.js.map