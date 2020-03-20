webpackJsonp([0],{

/***/ 137:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(138);


/***/ }),

/***/ 138:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_DialogWrap__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rc_drawer__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rc_drawer_assets_index_css__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rc_drawer_assets_index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rc_drawer_assets_index_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rc_dialog_assets_index_less__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rc_dialog_assets_index_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rc_dialog_assets_index_less__);






var useState = __WEBPACK_IMPORTED_MODULE_0_react__["useState"];

var Demo = function Demo() {
    var _useState = useState(false),
        showDialog = _useState[0],
        setShowDialog = _useState[1];

    var _useState2 = useState(false),
        showDrawer = _useState2[0],
        setShowDrawer = _useState2[1];

    var onToggleDrawer = function onToggleDrawer() {
        setShowDrawer(function (value) {
            return !value;
        });
    };
    var onToggleDialog = function onToggleDialog() {
        setShowDialog(function (value) {
            return !value;
        });
    };
    var dialog = __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__src_DialogWrap__["a" /* default */], { visible: showDialog, animation: "zoom", maskAnimation: "fade", onClose: onToggleDialog, forceRender: true }, __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("p", null, "basic modal"), __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("p", null, __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("button", { onClick: onToggleDrawer }, "show drawer")), __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { style: { height: 200 } }));
    var drawer = __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_3_rc_drawer__["a" /* default */], { open: showDrawer, handler: false, onClose: onToggleDrawer, level: null }, __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("button", { onClick: onToggleDrawer }, "close drawer"));
    return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null, __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("button", { onClick: onToggleDialog }, "open dialog"), dialog, drawer);
};
__WEBPACK_IMPORTED_MODULE_1_react_dom__["render"](__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null, __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("h2", null, "multiple dialog"), __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](Demo, null)), document.getElementById('__react-content'));

/***/ }),

/***/ 139:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DrawerWrapper__ = __webpack_require__(140);
// export this package's api

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__DrawerWrapper__["a" /* default */]);

/***/ }),

/***/ 140:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rc_util_es_PortalWrapper__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_lifecycles_compat__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__DrawerChild__ = __webpack_require__(141);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var DrawerWrapper =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DrawerWrapper, _React$Component);

  function DrawerWrapper(props) {
    var _this;

    _classCallCheck(this, DrawerWrapper);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DrawerWrapper).call(this, props));

    _this.onHandleClick = function (e) {
      var _this$props = _this.props,
          onHandleClick = _this$props.onHandleClick,
          $open = _this$props.open;

      if (onHandleClick) {
        onHandleClick(e);
      }

      if (typeof $open === 'undefined') {
        var _open = _this.state.open;

        _this.setState({
          open: !_open
        });
      }
    };

    _this.onClose = function (e) {
      var _this$props2 = _this.props,
          onClose = _this$props2.onClose,
          open = _this$props2.open;

      if (onClose) {
        onClose(e);
      }

      if (typeof open === 'undefined') {
        _this.setState({
          open: false
        });
      }
    };

    var open = typeof props.open !== 'undefined' ? props.open : !!props.defaultOpen;
    _this.state = {
      open: open
    };

    if ('onMaskClick' in props) {
      console.warn('`onMaskClick` are removed, please use `onClose` instead.');
    }

    return _this;
  }

  _createClass(DrawerWrapper, [{
    key: "render",
    // tslint:disable-next-line:member-ordering
    value: function render() {
      var _this2 = this;

      var _this$props3 = this.props,
          defaultOpen = _this$props3.defaultOpen,
          getContainer = _this$props3.getContainer,
          wrapperClassName = _this$props3.wrapperClassName,
          forceRender = _this$props3.forceRender,
          handler = _this$props3.handler,
          props = _objectWithoutProperties(_this$props3, ["defaultOpen", "getContainer", "wrapperClassName", "forceRender", "handler"]);

      var open = this.state.open; // 渲染在当前 dom 里；

      if (!getContainer) {
        return __WEBPACK_IMPORTED_MODULE_1_react__["createElement"]("div", {
          className: wrapperClassName,
          ref: function ref(c) {
            _this2.dom = c;
          }
        }, __WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_3__DrawerChild__["a" /* default */], Object.assign({}, props, {
          open: open,
          handler: handler,
          getContainer: function getContainer() {
            return _this2.dom;
          },
          onClose: this.onClose,
          onHandleClick: this.onHandleClick
        })));
      } // 如果有 handler 为内置强制渲染；


      var $forceRender = !!handler || forceRender;
      return __WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_0_rc_util_es_PortalWrapper__["a" /* default */], {
        visible: open,
        forceRender: $forceRender,
        getContainer: getContainer,
        wrapperClassName: wrapperClassName
      }, function (_ref) {
        var visible = _ref.visible,
            afterClose = _ref.afterClose,
            rest = _objectWithoutProperties(_ref, ["visible", "afterClose"]);

        return (// react 15，componentWillUnmount 时 Portal 返回 afterClose, visible.
          __WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_3__DrawerChild__["a" /* default */], Object.assign({}, props, rest, {
            open: visible !== undefined ? visible : open,
            afterVisibleChange: afterClose !== undefined ? afterClose : props.afterVisibleChange,
            handler: handler,
            onClose: _this2.onClose,
            onHandleClick: _this2.onHandleClick
          }))
        );
      });
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, _ref2) {
      var prevProps = _ref2.prevProps;
      var newState = {
        prevProps: props
      };

      if (typeof prevProps !== 'undefined' && props.open !== prevProps.open) {
        newState.open = props.open;
      }

      return newState;
    }
  }]);

  return DrawerWrapper;
}(__WEBPACK_IMPORTED_MODULE_1_react__["Component"]);

DrawerWrapper.defaultProps = {
  prefixCls: 'drawer',
  placement: 'left',
  getContainer: 'body',
  defaultOpen: false,
  level: 'all',
  duration: '.3s',
  ease: 'cubic-bezier(0.78, 0.14, 0.15, 0.86)',
  onChange: function onChange() {},
  afterVisibleChange: function afterVisibleChange() {},
  handler: __WEBPACK_IMPORTED_MODULE_1_react__["createElement"]("div", {
    className: "drawer-handle"
  }, __WEBPACK_IMPORTED_MODULE_1_react__["createElement"]("i", {
    className: "drawer-handle-icon"
  })),
  showMask: true,
  maskClosable: true,
  maskStyle: {},
  wrapperClassName: '',
  className: '',
  keyboard: true,
  forceRender: false
};
/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_2_react_lifecycles_compat__["a" /* polyfill */])(DrawerWrapper));

/***/ }),

/***/ 141:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_classnames__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rc_util_es_getScrollBarSize__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rc_util_es_KeyCode__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_lifecycles_compat__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils__ = __webpack_require__(143);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }







var currentDrawer = {};

var DrawerChild =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DrawerChild, _React$Component);

  function DrawerChild(props) {
    var _this;

    _classCallCheck(this, DrawerChild);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DrawerChild).call(this, props));

    _this.domFocus = function () {
      if (_this.dom) {
        _this.dom.focus();
      }
    };

    _this.removeStartHandler = function (e) {
      if (e.touches.length > 1) {
        return;
      }

      _this.startPos = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    };

    _this.removeMoveHandler = function (e) {
      if (e.changedTouches.length > 1) {
        return;
      }

      var currentTarget = e.currentTarget;
      var differX = e.changedTouches[0].clientX - _this.startPos.x;
      var differY = e.changedTouches[0].clientY - _this.startPos.y;

      if (currentTarget === _this.maskDom || currentTarget === _this.handlerDom || currentTarget === _this.contentDom && Object(__WEBPACK_IMPORTED_MODULE_5__utils__["c" /* getTouchParentScroll */])(currentTarget, e.target, differX, differY)) {
        e.preventDefault();
      }
    };

    _this.transitionEnd = function (e) {
      var dom = e.target;
      Object(__WEBPACK_IMPORTED_MODULE_5__utils__["e" /* removeEventListener */])(dom, __WEBPACK_IMPORTED_MODULE_5__utils__["g" /* transitionEnd */], _this.transitionEnd);
      dom.style.transition = '';
    };

    _this.onKeyDown = function (e) {
      if (e.keyCode === __WEBPACK_IMPORTED_MODULE_2_rc_util_es_KeyCode__["a" /* default */].ESC) {
        var onClose = _this.props.onClose;
        e.stopPropagation();

        if (onClose) {
          onClose(e);
        }
      }
    };

    _this.onWrapperTransitionEnd = function (e) {
      var _this$props = _this.props,
          open = _this$props.open,
          afterVisibleChange = _this$props.afterVisibleChange;

      if (e.target === _this.contentWrapper && e.propertyName.match(/transform$/)) {
        _this.dom.style.transition = '';

        if (!open && _this.getCurrentDrawerSome()) {
          document.body.style.overflowX = '';

          if (_this.maskDom) {
            _this.maskDom.style.left = '';
            _this.maskDom.style.width = '';
          }
        }

        if (afterVisibleChange) {
          afterVisibleChange(!!open);
        }
      }
    };

    _this.openLevelTransition = function () {
      var _this$props2 = _this.props,
          open = _this$props2.open,
          width = _this$props2.width,
          height = _this$props2.height;

      var _this$getHorizontalBo = _this.getHorizontalBoolAndPlacementName(),
          isHorizontal = _this$getHorizontalBo.isHorizontal,
          placementName = _this$getHorizontalBo.placementName;

      var contentValue = _this.contentDom ? _this.contentDom.getBoundingClientRect()[isHorizontal ? 'width' : 'height'] : 0;
      var value = (isHorizontal ? width : height) || contentValue;

      _this.setLevelAndScrolling(open, placementName, value);
    };

    _this.setLevelTransform = function (open, placementName, value, right) {
      var _this$props3 = _this.props,
          placement = _this$props3.placement,
          levelMove = _this$props3.levelMove,
          duration = _this$props3.duration,
          ease = _this$props3.ease,
          showMask = _this$props3.showMask; // router 切换时可能会导至页面失去滚动条，所以需要时时获取。

      _this.levelDom.forEach(function (dom) {
        dom.style.transition = "transform ".concat(duration, " ").concat(ease);
        Object(__WEBPACK_IMPORTED_MODULE_5__utils__["a" /* addEventListener */])(dom, __WEBPACK_IMPORTED_MODULE_5__utils__["g" /* transitionEnd */], _this.transitionEnd);
        var levelValue = open ? value : 0;

        if (levelMove) {
          var $levelMove = Object(__WEBPACK_IMPORTED_MODULE_5__utils__["f" /* transformArguments */])(levelMove, {
            target: dom,
            open: open
          });
          levelValue = open ? $levelMove[0] : $levelMove[1] || 0;
        }

        var $value = typeof levelValue === 'number' ? "".concat(levelValue, "px") : levelValue;
        var placementPos = placement === 'left' || placement === 'top' ? $value : "-".concat($value);
        placementPos = showMask && placement === 'right' && right ? "calc(".concat(placementPos, " + ").concat(right, "px)") : placementPos;
        dom.style.transform = levelValue ? "".concat(placementName, "(").concat(placementPos, ")") : '';
      });
    };

    _this.setLevelAndScrolling = function (open, placementName, value) {
      var onChange = _this.props.onChange;

      if (!__WEBPACK_IMPORTED_MODULE_5__utils__["i" /* windowIsUndefined */]) {
        var right = document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight) && window.innerWidth > document.body.offsetWidth ? Object(__WEBPACK_IMPORTED_MODULE_1_rc_util_es_getScrollBarSize__["a" /* default */])(true) : 0;

        _this.setLevelTransform(open, placementName, value, right);

        _this.toggleScrollingToDrawerAndBody(right);
      }

      if (onChange) {
        onChange(open);
      }
    };

    _this.toggleScrollingToDrawerAndBody = function (right) {
      var _this$props4 = _this.props,
          getOpenCount = _this$props4.getOpenCount,
          getContainer = _this$props4.getContainer,
          showMask = _this$props4.showMask,
          open = _this$props4.open;
      var container = getContainer && getContainer();
      var openCount = getOpenCount && getOpenCount(); // 处理 body 滚动

      if (container && container.parentNode === document.body && showMask) {
        var eventArray = ['touchstart'];
        var domArray = [document.body, _this.maskDom, _this.handlerDom, _this.contentDom];

        if (open && document.body.style.overflow !== 'hidden') {
          if (right) {
            _this.addScrollingEffect(right);
          }

          if (openCount === 1) {
            document.body.style.overflow = 'hidden';
          }

          document.body.style.touchAction = 'none'; // 手机禁滚

          domArray.forEach(function (item, i) {
            if (!item) {
              return;
            }

            Object(__WEBPACK_IMPORTED_MODULE_5__utils__["a" /* addEventListener */])(item, eventArray[i] || 'touchmove', i ? _this.removeMoveHandler : _this.removeStartHandler, _this.passive);
          });
        } else if (_this.getCurrentDrawerSome()) {
          // 没有弹框的状态下清除 overflow;
          if (!openCount) {
            document.body.style.overflow = '';
          }

          document.body.style.touchAction = '';

          if (right) {
            _this.remScrollingEffect(right);
          } // 恢复事件


          domArray.forEach(function (item, i) {
            if (!item) {
              return;
            }

            Object(__WEBPACK_IMPORTED_MODULE_5__utils__["e" /* removeEventListener */])(item, eventArray[i] || 'touchmove', i ? _this.removeMoveHandler : _this.removeStartHandler, _this.passive);
          });
        }
      }
    };

    _this.addScrollingEffect = function (right) {
      var _this$props5 = _this.props,
          placement = _this$props5.placement,
          duration = _this$props5.duration,
          ease = _this$props5.ease,
          getOpenCount = _this$props5.getOpenCount,
          switchScrollingEffect = _this$props5.switchScrollingEffect;
      var openCount = getOpenCount && getOpenCount();

      if (openCount === 1) {
        switchScrollingEffect();
      }

      var widthTransition = "width ".concat(duration, " ").concat(ease);
      var transformTransition = "transform ".concat(duration, " ").concat(ease);
      _this.dom.style.transition = 'none';

      switch (placement) {
        case 'right':
          _this.dom.style.transform = "translateX(-".concat(right, "px)");
          break;

        case 'top':
        case 'bottom':
          _this.dom.style.width = "calc(100% - ".concat(right, "px)");
          _this.dom.style.transform = 'translateZ(0)';
          break;

        default:
          break;
      }

      clearTimeout(_this.timeout);
      _this.timeout = setTimeout(function () {
        if (_this.dom) {
          _this.dom.style.transition = "".concat(transformTransition, ",").concat(widthTransition);
          _this.dom.style.width = '';
          _this.dom.style.transform = '';
        }
      });
    };

    _this.remScrollingEffect = function (right) {
      var _this$props6 = _this.props,
          placement = _this$props6.placement,
          duration = _this$props6.duration,
          ease = _this$props6.ease,
          getOpenCount = _this$props6.getOpenCount,
          switchScrollingEffect = _this$props6.switchScrollingEffect;
      var openCount = getOpenCount && getOpenCount();

      if (!openCount) {
        switchScrollingEffect(true);
      }

      if (__WEBPACK_IMPORTED_MODULE_5__utils__["h" /* transitionStr */]) {
        document.body.style.overflowX = 'hidden';
      }

      _this.dom.style.transition = 'none';
      var heightTransition;
      var widthTransition = "width ".concat(duration, " ").concat(ease);
      var transformTransition = "transform ".concat(duration, " ").concat(ease);

      switch (placement) {
        case 'left':
          {
            _this.dom.style.width = '100%';
            widthTransition = "width 0s ".concat(ease, " ").concat(duration);
            break;
          }

        case 'right':
          {
            _this.dom.style.transform = "translateX(".concat(right, "px)");
            _this.dom.style.width = '100%';
            widthTransition = "width 0s ".concat(ease, " ").concat(duration);

            if (_this.maskDom) {
              _this.maskDom.style.left = "-".concat(right, "px");
              _this.maskDom.style.width = "calc(100% + ".concat(right, "px)");
            }

            break;
          }

        case 'top':
        case 'bottom':
          {
            _this.dom.style.width = "calc(100% + ".concat(right, "px)");
            _this.dom.style.height = '100%';
            _this.dom.style.transform = 'translateZ(0)';
            heightTransition = "height 0s ".concat(ease, " ").concat(duration);
            break;
          }

        default:
          break;
      }

      clearTimeout(_this.timeout);
      _this.timeout = setTimeout(function () {
        if (_this.dom) {
          _this.dom.style.transition = "".concat(transformTransition, ",").concat(heightTransition ? "".concat(heightTransition, ",") : '').concat(widthTransition);
          _this.dom.style.transform = '';
          _this.dom.style.width = '';
          _this.dom.style.height = '';
        }
      });
    };

    _this.getCurrentDrawerSome = function () {
      return !Object.keys(currentDrawer).some(function (key) {
        return currentDrawer[key];
      });
    };

    _this.getLevelDom = function (_ref) {
      var level = _ref.level,
          getContainer = _ref.getContainer;

      if (__WEBPACK_IMPORTED_MODULE_5__utils__["i" /* windowIsUndefined */]) {
        return;
      }

      var container = getContainer && getContainer();
      var parent = container ? container.parentNode : null;
      _this.levelDom = [];

      if (level === 'all') {
        var children = parent ? Array.prototype.slice.call(parent.children) : [];
        children.forEach(function (child) {
          if (child.nodeName !== 'SCRIPT' && child.nodeName !== 'STYLE' && child.nodeName !== 'LINK' && child !== container) {
            _this.levelDom.push(child);
          }
        });
      } else if (level) {
        Object(__WEBPACK_IMPORTED_MODULE_5__utils__["b" /* dataToArray */])(level).forEach(function (key) {
          document.querySelectorAll(key).forEach(function (item) {
            _this.levelDom.push(item);
          });
        });
      }
    };

    _this.getHorizontalBoolAndPlacementName = function () {
      var placement = _this.props.placement;
      var isHorizontal = placement === 'left' || placement === 'right';
      var placementName = "translate".concat(isHorizontal ? 'X' : 'Y');
      return {
        isHorizontal: isHorizontal,
        placementName: placementName
      };
    };

    _this.state = {
      _self: _assertThisInitialized(_this)
    };
    return _this;
  }

  _createClass(DrawerChild, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      if (!__WEBPACK_IMPORTED_MODULE_5__utils__["i" /* windowIsUndefined */]) {
        var passiveSupported = false;

        try {
          window.addEventListener('test', null, Object.defineProperty({}, 'passive', {
            get: function get() {
              passiveSupported = true;
              return null;
            }
          }));
        } catch (err) {}

        this.passive = passiveSupported ? {
          passive: false
        } : false;
      }

      var open = this.props.open;
      this.drawerId = "drawer_id_".concat(Number((Date.now() + Math.random()).toString().replace('.', Math.round(Math.random() * 9).toString())).toString(16));
      this.getLevelDom(this.props);

      if (open) {
        currentDrawer[this.drawerId] = open; // 默认打开状态时推出 level;

        this.openLevelTransition();
        this.forceUpdate(function () {
          _this2.domFocus();
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var open = this.props.open;

      if (open !== prevProps.open) {
        if (open) {
          this.domFocus();
        }

        currentDrawer[this.drawerId] = !!open;
        this.openLevelTransition();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this$props7 = this.props,
          getOpenCount = _this$props7.getOpenCount,
          open = _this$props7.open,
          switchScrollingEffect = _this$props7.switchScrollingEffect;
      var openCount = typeof getOpenCount === 'function' && getOpenCount();
      delete currentDrawer[this.drawerId];

      if (open) {
        this.setLevelTransform(false);
        document.body.style.touchAction = '';
      }

      if (!openCount) {
        document.body.style.overflow = '';
        switchScrollingEffect(true);
      }
    } // tslint:disable-next-line:member-ordering

  }, {
    key: "render",
    value: function render() {
      var _classnames,
          _this3 = this;

      var _this$props8 = this.props,
          className = _this$props8.className,
          children = _this$props8.children,
          style = _this$props8.style,
          width = _this$props8.width,
          height = _this$props8.height,
          defaultOpen = _this$props8.defaultOpen,
          $open = _this$props8.open,
          prefixCls = _this$props8.prefixCls,
          placement = _this$props8.placement,
          level = _this$props8.level,
          levelMove = _this$props8.levelMove,
          ease = _this$props8.ease,
          duration = _this$props8.duration,
          getContainer = _this$props8.getContainer,
          handler = _this$props8.handler,
          onChange = _this$props8.onChange,
          afterVisibleChange = _this$props8.afterVisibleChange,
          showMask = _this$props8.showMask,
          maskClosable = _this$props8.maskClosable,
          maskStyle = _this$props8.maskStyle,
          onClose = _this$props8.onClose,
          onHandleClick = _this$props8.onHandleClick,
          keyboard = _this$props8.keyboard,
          getOpenCount = _this$props8.getOpenCount,
          switchScrollingEffect = _this$props8.switchScrollingEffect,
          props = _objectWithoutProperties(_this$props8, ["className", "children", "style", "width", "height", "defaultOpen", "open", "prefixCls", "placement", "level", "levelMove", "ease", "duration", "getContainer", "handler", "onChange", "afterVisibleChange", "showMask", "maskClosable", "maskStyle", "onClose", "onHandleClick", "keyboard", "getOpenCount", "switchScrollingEffect"]); // 首次渲染都将是关闭状态。


      var open = this.dom ? $open : false;
      var wrapperClassName = __WEBPACK_IMPORTED_MODULE_0_classnames___default()(prefixCls, (_classnames = {}, _defineProperty(_classnames, "".concat(prefixCls, "-").concat(placement), true), _defineProperty(_classnames, "".concat(prefixCls, "-open"), open), _defineProperty(_classnames, className || '', !!className), _defineProperty(_classnames, 'no-mask', !showMask), _classnames));

      var _this$getHorizontalBo2 = this.getHorizontalBoolAndPlacementName(),
          placementName = _this$getHorizontalBo2.placementName; // 百分比与像素动画不同步，第一次打用后全用像素动画。
      // const defaultValue = !this.contentDom || !level ? '100%' : `${value}px`;


      var placementPos = placement === 'left' || placement === 'top' ? '-100%' : '100%';
      var transform = open ? '' : "".concat(placementName, "(").concat(placementPos, ")");
      var handlerChildren = handler && __WEBPACK_IMPORTED_MODULE_3_react__["cloneElement"](handler, {
        onClick: function onClick(e) {
          if (handler.props.onClick) {
            handler.props.onClick();
          }

          if (onHandleClick) {
            onHandleClick(e);
          }
        },
        ref: function ref(c) {
          _this3.handlerDom = c;
        }
      });
      return __WEBPACK_IMPORTED_MODULE_3_react__["createElement"]("div", Object.assign({}, props, {
        tabIndex: -1,
        className: wrapperClassName,
        style: style,
        ref: function ref(c) {
          _this3.dom = c;
        },
        onKeyDown: open && keyboard ? this.onKeyDown : undefined,
        onTransitionEnd: this.onWrapperTransitionEnd
      }), showMask && __WEBPACK_IMPORTED_MODULE_3_react__["createElement"]("div", {
        className: "".concat(prefixCls, "-mask"),
        onClick: maskClosable ? onClose : undefined,
        style: maskStyle,
        ref: function ref(c) {
          _this3.maskDom = c;
        }
      }), __WEBPACK_IMPORTED_MODULE_3_react__["createElement"]("div", {
        className: "".concat(prefixCls, "-content-wrapper"),
        style: {
          transform: transform,
          msTransform: transform,
          width: Object(__WEBPACK_IMPORTED_MODULE_5__utils__["d" /* isNumeric */])(width) ? "".concat(width, "px") : width,
          height: Object(__WEBPACK_IMPORTED_MODULE_5__utils__["d" /* isNumeric */])(height) ? "".concat(height, "px") : height
        },
        ref: function ref(c) {
          _this3.contentWrapper = c;
        }
      }, __WEBPACK_IMPORTED_MODULE_3_react__["createElement"]("div", {
        className: "".concat(prefixCls, "-content"),
        ref: function ref(c) {
          _this3.contentDom = c;
        },
        onTouchStart: open && showMask ? this.removeStartHandler : undefined,
        onTouchMove: open && showMask ? this.removeMoveHandler : undefined
      }, children), handlerChildren));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, _ref2) {
      var prevProps = _ref2.prevProps,
          _self = _ref2._self;
      var nextState = {
        prevProps: props
      };

      if (prevProps !== undefined) {
        var placement = props.placement,
            level = props.level;

        if (placement !== prevProps.placement) {
          // test 的 bug, 有动画过场，删除 dom
          _self.contentDom = null;
        }

        if (level !== prevProps.level) {
          _self.getLevelDom(props);
        }
      }

      return nextState;
    }
  }]);

  return DrawerChild;
}(__WEBPACK_IMPORTED_MODULE_3_react__["Component"]);

DrawerChild.defaultProps = {
  switchScrollingEffect: function switchScrollingEffect() {}
};
/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_4_react_lifecycles_compat__["a" /* polyfill */])(DrawerChild));

/***/ }),

/***/ 142:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg) && arg.length) {
				var inner = classNames.apply(null, arg);
				if (inner) {
					classes.push(inner);
				}
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
		window.classNames = classNames;
	}
}());


/***/ }),

/***/ 143:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = dataToArray;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return transitionStr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return transitionEnd; });
/* harmony export (immutable) */ __webpack_exports__["a"] = addEventListener;
/* harmony export (immutable) */ __webpack_exports__["e"] = removeEventListener;
/* harmony export (immutable) */ __webpack_exports__["f"] = transformArguments;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return isNumeric; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return windowIsUndefined; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getTouchParentScroll; });
function dataToArray(vars) {
  if (Array.isArray(vars)) {
    return vars;
  }

  return [vars];
}
var transitionEndObject = {
  transition: 'transitionend',
  WebkitTransition: 'webkitTransitionEnd',
  MozTransition: 'transitionend',
  OTransition: 'oTransitionEnd otransitionend'
};
var transitionStr = Object.keys(transitionEndObject).filter(function (key) {
  if (typeof document === 'undefined') {
    return false;
  }

  var html = document.getElementsByTagName('html')[0];
  return key in (html ? html.style : {});
})[0];
var transitionEnd = transitionEndObject[transitionStr];
function addEventListener(target, eventType, callback, options) {
  if (target.addEventListener) {
    target.addEventListener(eventType, callback, options);
  } else if (target.attachEvent) {
    // tslint:disable-line
    target.attachEvent("on".concat(eventType), callback); // tslint:disable-line
  }
}
function removeEventListener(target, eventType, callback, options) {
  if (target.removeEventListener) {
    target.removeEventListener(eventType, callback, options);
  } else if (target.attachEvent) {
    // tslint:disable-line
    target.detachEvent("on".concat(eventType), callback); // tslint:disable-line
  }
}
function transformArguments(arg, cb) {
  var result = typeof arg === 'function' ? arg(cb) : arg;

  if (Array.isArray(result)) {
    if (result.length === 2) {
      return result;
    }

    return [result[0], result[1]];
  }

  return [result];
}
var isNumeric = function isNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
};
var windowIsUndefined = !(typeof window !== 'undefined' && window.document && window.document.createElement);
var getTouchParentScroll = function getTouchParentScroll(root, currentTarget, differX, differY) {
  if (!currentTarget || currentTarget === document || currentTarget instanceof Document) {
    return false;
  } // root 为 drawer-content 设定了 overflow, 判断为 root 的 parent 时结束滚动；


  if (currentTarget === root.parentNode) {
    return true;
  }

  var isY = Math.max(Math.abs(differX), Math.abs(differY)) === Math.abs(differY);
  var isX = Math.max(Math.abs(differX), Math.abs(differY)) === Math.abs(differX);
  var scrollY = currentTarget.scrollHeight - currentTarget.clientHeight;
  var scrollX = currentTarget.scrollWidth - currentTarget.clientWidth;
  var style = document.defaultView.getComputedStyle(currentTarget);
  var overflowY = style.overflowY === 'auto' || style.overflowY === 'scroll';
  var overflowX = style.overflowX === 'auto' || style.overflowX === 'scroll';
  var y = scrollY && overflowY;
  var x = scrollX && overflowX;

  if (isY && (!y || y && (currentTarget.scrollTop >= scrollY && differY < 0 || currentTarget.scrollTop <= 0 && differY > 0)) || isX && (!x || x && (currentTarget.scrollLeft >= scrollX && scrollX < 0 || currentTarget.scrollLeft <= 0 && scrollX > 0))) {
    return getTouchParentScroll(root, currentTarget.parentNode, differX, differY);
  }

  return false;
};

/***/ }),

/***/ 144:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 40:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[137]);
//# sourceMappingURL=multiple-Portal.js.map