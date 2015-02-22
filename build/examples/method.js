webpackJsonp([0],[
/* 0 */
/*!********************!*\
  !*** multi method ***!
  \********************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(/*! ./examples/method.js */1);


/***/ },
/* 1 */
/*!****************************!*\
  !*** ./examples/method.js ***!
  \****************************/
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	
	__webpack_require__(/*! rc-dialog/assets/bootstrap.css */ 5);
	var React = __webpack_require__(/*! react */ 3);
	var Dialog = __webpack_require__(/*! rc-dialog */ 4);
	
	function close() {
	  console.log('close');
	}
	
	function show() {
	  console.log('show');
	}
	
	React.render(React.createElement("div", null, React.createElement("h1", null, "call method"), React.createElement("div", {id: "d1"})),document.getElementById('__react-content'));
	
	var dialog = React.render(
	  (React.createElement(Dialog, {title: "第一个弹框", onClose: close, onShow: show, 
	    style: {width: 500}
	  }, 
	    React.createElement("p", null, "第一个dialog")
	  )),
	  document.getElementById('d1')
	);
	
	setTimeout(function () {
	  dialog.show();
	}, 100);


/***/ }
]);
//# sourceMappingURL=method.js.map