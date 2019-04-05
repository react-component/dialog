webpackJsonp([1],{

/***/ 133:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(134);


/***/ }),

/***/ 134:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rc_dialog_assets_index_less__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rc_dialog_assets_index_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rc_dialog_assets_index_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_dom__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_DialogWrap__ = __webpack_require__(43);



/* eslint-disable */
/* tslint:disable */



// use import Dialog from 'rc-dialog'


var App = function (_React$Component) {
    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits___default()(App, _React$Component);

    function App() {
        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, App);

        var _this = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn___default()(this, _React$Component.apply(this, arguments));

        _this.state = {
            password: "",
            showChangePassword: false
        };
        _this.login = function () {
            setTimeout(function () {
                location.href = "/";
            }, 500);
        };
        _this.toggleChangePasswordModal = function () {
            console.clear();
            _this.setState({
                showChangePassword: !_this.state.showChangePassword
            });
        };
        return _this;
    }

    App.prototype.render = function render() {
        var _this2 = this;

        var _state = this.state,
            password = _state.password,
            showChangePassword = _state.showChangePassword;

        return __WEBPACK_IMPORTED_MODULE_4_react__["createElement"]("div", null, __WEBPACK_IMPORTED_MODULE_4_react__["createElement"]("input", { placeholder: '\u7528\u6237\u540D' }), __WEBPACK_IMPORTED_MODULE_4_react__["createElement"]("input", { type: "password", value: password, onChange: function onChange(_ref) {
                var value = _ref.target.value;

                console.log("change password:", value);
                _this2.setState({ password: value });
            }, placeholder: '\u5BC6\u7801' }), __WEBPACK_IMPORTED_MODULE_4_react__["createElement"]("button", { onClick: function onClick() {
                return _this2.login();
            } }, "login"), __WEBPACK_IMPORTED_MODULE_4_react__["createElement"]("button", { onClick: this.toggleChangePasswordModal }, "openModal"), __WEBPACK_IMPORTED_MODULE_4_react__["createElement"](__WEBPACK_IMPORTED_MODULE_6__src_DialogWrap__["a" /* default */], { mask: false, visible: showChangePassword, onCancel: this.toggleChangePasswordModal, footer: null }));
    };

    return App;
}(__WEBPACK_IMPORTED_MODULE_4_react__["Component"]);

__WEBPACK_IMPORTED_MODULE_5_react_dom__["render"](__WEBPACK_IMPORTED_MODULE_4_react__["createElement"](App, null), document.getElementById('__react-content'));
/* eslint-enable */
/* tslint:enable */

/***/ }),

/***/ 40:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[133]);
//# sourceMappingURL=~debug.js.map