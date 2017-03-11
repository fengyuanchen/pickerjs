/*!
 * Picker.js v0.1.2
 * https://github.com/fengyuanchen/pickerjs
 *
 * Copyright (c) 2017 Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2017-03-11T07:37:24.622Z
 */

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _defaults = __webpack_require__(1);
	
	var _defaults2 = _interopRequireDefault(_defaults);
	
	var _template = __webpack_require__(2);
	
	var _template2 = _interopRequireDefault(_template);
	
	var _events = __webpack_require__(3);
	
	var _events2 = _interopRequireDefault(_events);
	
	var _handlers = __webpack_require__(5);
	
	var _handlers2 = _interopRequireDefault(_handlers);
	
	var _helpers = __webpack_require__(6);
	
	var _helpers2 = _interopRequireDefault(_helpers);
	
	var _methods = __webpack_require__(7);
	
	var _methods2 = _interopRequireDefault(_methods);
	
	var _utilities = __webpack_require__(4);
	
	var $ = _interopRequireWildcard(_utilities);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var LANGUAGES = {};
	var REGEXP_DELIMITER = /\{\{\s*(\w+)\s*\}\}/g;
	var REGEXP_INPUTS = /input|textarea/i;
	var AnotherPicker = void 0;
	
	var Picker = function () {
	  function Picker(element, options) {
	    _classCallCheck(this, Picker);
	
	    var self = this;
	
	    options = $.isPlainObject(options) ? options : {};
	
	    if (options.language) {
	      // Priority: DEFAULTS < LANGUAGES < options
	      options = $.extend(true, {}, LANGUAGES[options.language], options);
	    }
	
	    self.element = element;
	    self.options = $.extend(true, {}, _defaults2.default, options);
	    self.shown = false;
	    self.init();
	  }
	
	  _createClass(Picker, [{
	    key: 'init',
	    value: function init() {
	      var self = this;
	      var element = self.element;
	
	      if ($.getData(element, 'picker')) {
	        return;
	      }
	
	      $.setData(element, 'picker', self);
	
	      var options = self.options;
	      var isInput = REGEXP_INPUTS.test(element.tagName);
	      var inline = options.inline && (options.container || !isInput);
	      var template = document.createElement('div');
	
	      template.insertAdjacentHTML('afterbegin', _template2.default.replace(REGEXP_DELIMITER, function () {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	          args[_key] = arguments[_key];
	        }
	
	        return options.text[args[1]];
	      }));
	
	      var picker = template.getElementsByClassName('picker')[0];
	      var grid = picker.getElementsByClassName('picker-grid')[0];
	      var container = options.container;
	
	      if (typeof container === 'string') {
	        container = document.querySelector(container);
	      }
	
	      if (inline) {
	        $.addClass(picker, 'picker-open');
	        $.addClass(picker, 'picker-opened');
	
	        if (!container) {
	          container = element;
	        }
	      } else {
	        self.scrollbarWidth = window.innerWidth - document.body.clientWidth;
	
	        $.addClass(picker, 'picker-fixed');
	
	        if (!container) {
	          container = document.body;
	        }
	      }
	
	      self.isInput = isInput;
	      self.inline = inline;
	      self.container = container;
	      self.picker = picker;
	      self.grid = grid;
	      self.cell = null;
	      self.format = $.parseFormat(options.format);
	
	      var initialValue = self.getValue();
	      var date = self.parseDate(options.date || initialValue);
	
	      self.date = date;
	      self.initialDate = new Date(date);
	      self.initialValue = initialValue;
	      self.data = {};
	
	      var rows = Number(options.rows);
	
	      if (!(rows % 2)) {
	        rows += 1;
	      }
	
	      options.rows = rows || 5;
	      $.addClass(grid, rows > 1 ? 'picker-multiple' : 'picker-single');
	
	      var increment = options.increment;
	
	      if (!$.isPlainObject(increment)) {
	        increment = {
	          year: increment,
	          month: increment,
	          day: increment,
	          hour: increment,
	          minute: increment,
	          second: increment,
	          millisecond: increment
	        };
	      }
	
	      self.format.tokens.forEach(function (token) {
	        var type = $.tokenToType(token);
	        var cell = document.createElement('div');
	        var list = document.createElement('ul');
	        var data = {
	          digit: token.length,
	          increment: Math.abs(Number(increment[type])) || 1,
	          list: list,
	          max: Infinity,
	          min: -Infinity,
	          index: Math.floor((options.rows + 2) / 2),
	          offset: 0
	        };
	
	        switch (token.charAt(0)) {
	          case 'Y':
	            if (data.digit === 2) {
	              data.max = 99;
	              data.min = 0;
	            }
	            break;
	
	          case 'M':
	            data.max = 11;
	            data.min = 0;
	            data.offset = 1;
	
	            if (data.digit === 3) {
	              data.aliases = options.monthsShort;
	            } else if (data.digit === 4) {
	              data.aliases = options.months;
	            }
	            break;
	
	          case 'D':
	            data.max = function () {
	              return $.getDaysInMonth(date.getFullYear(), date.getMonth());
	            };
	            data.min = 1;
	            break;
	
	          case 'H':
	            data.max = 23;
	            data.min = 0;
	            break;
	
	          case 'm':
	            data.max = 59;
	            data.min = 0;
	            break;
	
	          case 's':
	            data.max = 59;
	            data.min = 0;
	            break;
	
	          case 'S':
	            data.max = 999;
	            data.min = 0;
	            break;
	
	          // No default
	        }
	
	        $.setData(cell, 'type', type);
	        $.setData(cell, 'token', token);
	        $.addClass(list, 'picker-list');
	        $.addClass(cell, 'picker-cell');
	        $.addClass(cell, 'picker-' + type + 's');
	        cell.appendChild(list);
	        grid.appendChild(cell);
	        self.data[type] = data;
	        self.render(type);
	      });
	
	      if (inline) {
	        $.empty(container);
	      }
	
	      container.appendChild(picker);
	      self.bind();
	    }
	  }], [{
	    key: 'noConflict',
	    value: function noConflict() {
	      window.Picker = AnotherPicker;
	      return Picker;
	    }
	  }, {
	    key: 'setDefaults',
	    value: function setDefaults(options) {
	      options = $.isPlainObject(options) ? options : {};
	
	      if (options.language) {
	        options = $.extend(true, {}, LANGUAGES[options.language], options);
	      }
	
	      $.extend(true, _defaults2.default, options);
	    }
	  }]);
	
	  return Picker;
	}();
	
	$.extend(Picker.prototype, _events2.default);
	$.extend(Picker.prototype, _handlers2.default);
	$.extend(Picker.prototype, _helpers2.default);
	$.extend(Picker.prototype, _methods2.default);
	
	Picker.languages = LANGUAGES;
	
	if (typeof window !== 'undefined') {
	  AnotherPicker = window.Picker;
	  window.Picker = Picker;
	}
	
	exports.default = Picker;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  // Define the container for putting the picker.
	  container: null,
	
	  // The initial date. If not present, use the current date.
	  date: null,
	
	  // The date string format, also as the sorting order for columns.
	  format: 'YYYY-MM-DD HH:mm',
	
	  // Define the increment for each date / time part.
	  increment: 1,
	
	  // Enable inline mode.
	  inline: false,
	
	  // Define the language. (An ISO language code)
	  language: '',
	
	  // Months' name.
	  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	
	  // Shorter months' name.
	  monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
	
	  // Translate date / time text.
	  translate: function translate(type, text) {
	    return text;
	  },
	
	
	  // Define the number of rows for showing.
	  rows: 5,
	
	  // Define the text of the picker.
	  text: {
	    title: 'Pick a date / time',
	    cancel: 'Cancel',
	    confirm: 'OK'
	  },
	
	  // Shortcuts of custom events
	  show: null,
	  shown: null,
	  hide: null,
	  hidden: null,
	  pick: null
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = '<div class="picker" data-action="hide">' + '<div class="picker-content">' + '<div class="picker-header">' + '<h4 class="picker-title">{{ title }}</h4>' + '<button data-action="hide" class="picker-close" type="button">&times;</button>' + '</div>' + '<div class="picker-body">' + '<div class="picker-grid"></div>' + '</div>' + '<div class="picker-footer">' + '<button class="picker-cancel" data-action="hide" type="button">{{ cancel }}</button>' + '<button class="picker-confirm" data-action="pick" type="button">{{ confirm }}</button>' + '</div>' + '</div>' + '</div>';

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utilities = __webpack_require__(4);
	
	var $ = _interopRequireWildcard(_utilities);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	// Native events
	var PointerEvent = typeof window !== 'undefined' ? window.PointerEvent : null;
	var EVENT_POINTER_DOWN = PointerEvent ? 'pointerdown' : 'touchstart mousedown';
	var EVENT_POINTER_MOVE = PointerEvent ? 'pointermove' : 'touchmove mousemove';
	var EVENT_POINTER_UP = PointerEvent ? ' pointerup pointercancel' : 'touchend touchcancel mouseup';
	var EVENT_KEY_DOWN = 'keydown';
	var EVENT_WHEEL = 'wheel';
	var EVENT_CLICK = 'click';
	var EVENT_FOCUS = 'focus';
	
	// Custom events
	var EVENT_SHOW = 'show';
	var EVENT_SHOWN = 'shown';
	var EVENT_HIDE = 'hide';
	var EVENT_HIDDEN = 'hidden';
	var EVENT_PICK = 'pick';
	
	exports.default = {
	  bind: function bind() {
	    var self = this;
	    var element = self.element;
	    var options = self.options;
	    var picker = self.picker;
	    var grid = self.grid;
	
	    if ($.isFunction(options.show)) {
	      $.addListener(element, EVENT_SHOW, options.show);
	    }
	
	    if ($.isFunction(options.shown)) {
	      $.addListener(element, EVENT_SHOWN, options.shown);
	    }
	
	    if ($.isFunction(options.hide)) {
	      $.addListener(element, EVENT_HIDE, options.hide);
	    }
	
	    if ($.isFunction(options.hidden)) {
	      $.addListener(element, EVENT_HIDDEN, options.hidden);
	    }
	
	    if ($.isFunction(options.pick)) {
	      $.addListener(element, EVENT_PICK, options.pick);
	    }
	
	    $.addListener(element, EVENT_FOCUS, self.onFocus = self.focus.bind(self));
	    $.addListener(element, EVENT_CLICK, self.onFocus);
	    $.addListener(picker, EVENT_CLICK, self.onClick = self.click.bind(self));
	    $.addListener(grid, EVENT_WHEEL, self.onWheel = self.wheel.bind(self));
	    $.addListener(grid, EVENT_POINTER_DOWN, self.onPointerDown = self.pointerdown.bind(self));
	    $.addListener(document, EVENT_POINTER_MOVE, self.onPointerMove = self.pointermove.bind(self));
	    $.addListener(document, EVENT_POINTER_UP, self.onPointerUp = self.pointerup.bind(self));
	    $.addListener(document, EVENT_KEY_DOWN, self.onKeyDown = self.keydown.bind(self));
	  },
	  unbind: function unbind() {
	    var self = this;
	    var element = self.element;
	    var options = self.options;
	    var picker = self.picker;
	    var grid = self.grid;
	
	    if ($.isFunction(options.show)) {
	      $.removeListener(element, EVENT_SHOW, options.show);
	    }
	
	    if ($.isFunction(options.shown)) {
	      $.removeListener(element, EVENT_SHOWN, options.shown);
	    }
	
	    if ($.isFunction(options.hide)) {
	      $.removeListener(element, EVENT_HIDE, options.hide);
	    }
	
	    if ($.isFunction(options.hidden)) {
	      $.removeListener(element, EVENT_HIDDEN, options.hidden);
	    }
	
	    if ($.isFunction(options.pick)) {
	      $.removeListener(element, EVENT_PICK, options.pick);
	    }
	
	    $.removeListener(element, EVENT_FOCUS, self.onFocus);
	    $.removeListener(element, EVENT_CLICK, self.onFocus);
	    $.removeListener(picker, EVENT_CLICK, self.onClick);
	    $.removeListener(grid, EVENT_WHEEL, self.onWheel);
	    $.removeListener(grid, EVENT_POINTER_DOWN, self.onPointerDown);
	    $.removeListener(document, EVENT_POINTER_MOVE, self.onPointerMove);
	    $.removeListener(document, EVENT_POINTER_UP, self.onPointerUp);
	    $.removeListener(document, EVENT_KEY_DOWN, self.onKeyDown);
	  }
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports.typeOf = typeOf;
	exports.isObject = isObject;
	exports.isFunction = isFunction;
	exports.isNumber = isNumber;
	exports.isDate = isDate;
	exports.isValidDate = isValidDate;
	exports.isLeapYear = isLeapYear;
	exports.isPlainObject = isPlainObject;
	exports.extend = extend;
	exports.hasClass = hasClass;
	exports.addClass = addClass;
	exports.removeClass = removeClass;
	exports.toggleClass = toggleClass;
	exports.toHyphenCase = toHyphenCase;
	exports.getData = getData;
	exports.setData = setData;
	exports.removeData = removeData;
	exports.removeListener = removeListener;
	exports.dispatchEvent = dispatchEvent;
	exports.empty = empty;
	exports.getDaysInMonth = getDaysInMonth;
	exports.addLeadingZero = addLeadingZero;
	exports.tokenToType = tokenToType;
	exports.parseFormat = parseFormat;
	var REGEXP_SPACES = /\s+/;
	var REGEXP_TOKENS = /(Y|M|D|H|m|s|S)+/g;
	var REGEXP_HYPHEN = /([a-z\d])([A-Z])/g;
	var toString = Object.prototype.toString;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	
	function typeOf(obj) {
	  return toString.call(obj).slice(8, -1).toLowerCase();
	}
	
	function isObject(obj) {
	  return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj !== null;
	}
	
	function isFunction(fn) {
	  return typeof fn === 'function';
	}
	
	function isNumber(num) {
	  return typeof num === 'number' && !isNaN(num);
	}
	
	function isDate(date) {
	  return typeOf(date) === 'date';
	}
	
	function isValidDate(date) {
	  return isDate(date) && date.toString() !== 'Invalid Date';
	}
	
	function isLeapYear(year) {
	  return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
	}
	
	function isPlainObject(obj) {
	  if (!isObject(obj)) {
	    return false;
	  }
	
	  try {
	    var _constructor = obj.constructor;
	    var prototype = _constructor.prototype;
	
	    return _constructor && prototype && hasOwnProperty.call(prototype, 'isPrototypeOf');
	  } catch (e) {
	    return false;
	  }
	}
	
	function extend(obj) {
	  var deep = obj === true;
	
	  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    args[_key - 1] = arguments[_key];
	  }
	
	  if (deep) {
	    obj = args.shift();
	  }
	
	  if (isObject(obj) && args.length > 0) {
	    args.forEach(function (arg) {
	      if (isObject(arg)) {
	        Object.keys(arg).forEach(function (key) {
	          if (deep && isObject(obj[key])) {
	            extend(true, obj[key], arg[key]);
	          } else {
	            obj[key] = arg[key];
	          }
	        });
	      }
	    });
	  }
	
	  return obj;
	}
	
	function hasClass(element, value) {
	  return element.classList ? element.classList.contains(value) : element.className.indexOf(value) > -1;
	}
	
	function addClass(element, value) {
	  if (!value) {
	    return;
	  }
	
	  if (element.classList) {
	    element.classList.add(value);
	    return;
	  }
	
	  var className = element.className.trim();
	
	  if (!className) {
	    element.className = value;
	  } else if (className.indexOf(value) < 0) {
	    element.className = className + ' ' + value;
	  }
	}
	
	function removeClass(element, value) {
	  if (!value) {
	    return;
	  }
	
	  if (element.classList) {
	    element.classList.remove(value);
	    return;
	  }
	
	  var className = element.className;
	
	  if (className.indexOf(value) > -1) {
	    element.className = className.replace(value, '').trim();
	  }
	}
	
	function toggleClass(element, value, added) {
	  if (!value) {
	    return;
	  }
	
	  // IE10-11 doesn't support the second parameter of `classList.toggle`
	  if (added) {
	    addClass(element, value);
	  } else {
	    removeClass(element, value);
	  }
	}
	
	function toHyphenCase(str) {
	  return str.replace(REGEXP_HYPHEN, '$1-$2').toLowerCase();
	}
	
	function getData(element, name) {
	  if (isObject(element[name])) {
	    return element[name];
	  } else if (element.dataset) {
	    return element.dataset[name];
	  }
	
	  return element.getAttribute('data-' + toHyphenCase(name));
	}
	
	function setData(element, name, data) {
	  if (isObject(data)) {
	    element[name] = data;
	  } else if (element.dataset) {
	    element.dataset[name] = data;
	  } else {
	    element.setAttribute('data-' + toHyphenCase(name), data);
	  }
	}
	
	function removeData(element, name) {
	  if (isObject(element[name])) {
	    delete element[name];
	  } else if (element.dataset) {
	    delete element.dataset[name];
	  } else {
	    element.removeAttribute('data-' + toHyphenCase(name));
	  }
	}
	
	function removeListener(element, type, handler) {
	  var types = type.trim().split(REGEXP_SPACES);
	
	  if (types.length > 1) {
	    types.forEach(function (t) {
	      return removeListener(element, t, handler);
	    });
	    return;
	  }
	
	  if (element.removeEventListener) {
	    element.removeEventListener(type, handler, false);
	  } else if (element.detachEvent) {
	    element.detachEvent('on' + type, handler);
	  }
	}
	
	function addListener(element, type, _handler, once) {
	  var types = type.trim().split(REGEXP_SPACES);
	  var originalHandler = _handler;
	
	  if (types.length > 1) {
	    types.forEach(function (t) {
	      return addListener(element, t, _handler);
	    });
	    return;
	  }
	
	  if (once) {
	    _handler = function handler() {
	      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        args[_key2] = arguments[_key2];
	      }
	
	      removeListener(element, type, _handler);
	
	      return originalHandler.apply(element, args);
	    };
	  }
	
	  element.addEventListener(type, _handler, false);
	}
	
	exports.addListener = addListener;
	function dispatchEvent(element, type, data) {
	  var event = void 0;
	
	  // Event and CustomEvent on IE9-11 are global objects, not constructors
	  if (typeof Event === 'function' && typeof CustomEvent === 'function') {
	    if (data === undefined) {
	      event = new Event(type, {
	        bubbles: true,
	        cancelable: true
	      });
	    } else {
	      event = new CustomEvent(type, {
	        detail: data,
	        bubbles: true,
	        cancelable: true
	      });
	    }
	  } else if (data === undefined) {
	    event = document.createEvent('Event');
	    event.initEvent(type, true, true);
	  } else {
	    event = document.createEvent('CustomEvent');
	    event.initCustomEvent(type, true, true, data);
	  }
	
	  // IE9+
	  return element.dispatchEvent(event);
	}
	
	function empty(element) {
	  while (element.firstChild) {
	    element.removeChild(element.firstChild);
	  }
	}
	
	function getDaysInMonth(year, month) {
	  return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
	}
	
	function addLeadingZero(value) {
	  var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
	
	  var str = String(Math.abs(value));
	  var i = str.length;
	  var result = '';
	
	  if (value < 0) {
	    result += '-';
	  }
	
	  while (i++ < length) {
	    result += '0';
	  }
	
	  return result + str;
	}
	
	function tokenToType(token) {
	  return {
	    Y: 'year',
	    M: 'month',
	    D: 'day',
	    H: 'hour',
	    m: 'minute',
	    s: 'second',
	    S: 'millisecond'
	  }[token.charAt(0)];
	}
	
	function parseFormat(format) {
	  var tokens = format.match(REGEXP_TOKENS);
	
	  if (!tokens) {
	    throw new Error('Invalid format');
	  }
	
	  var result = {
	    tokens: tokens
	  };
	
	  tokens.forEach(function (token) {
	    result[tokenToType(token)] = token;
	  });
	
	  return result;
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utilities = __webpack_require__(4);
	
	var $ = _interopRequireWildcard(_utilities);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	exports.default = {
	  focus: function focus(e) {
	    e.target.blur();
	    this.show();
	  },
	  click: function click(e) {
	    var action = $.getData(e.target, 'action');
	
	    if (action === 'hide') {
	      this.hide();
	    } else if (action === 'pick') {
	      this.pick();
	    }
	  },
	  wheel: function wheel(e) {
	    var self = this;
	    var target = e.target;
	
	    if (target === self.grid) {
	      return;
	    }
	
	    e.preventDefault();
	
	    if (target.tagName.toLowerCase() === 'li') {
	      target = target.parentNode;
	    }
	
	    if (target.tagName.toLowerCase() === 'ul') {
	      target = target.parentNode;
	    }
	
	    var type = $.getData(target, 'type');
	
	    if (e.deltaY < 0) {
	      self.prev(type);
	    } else {
	      self.next(type);
	    }
	  },
	  pointerdown: function pointerdown(e) {
	    var self = this;
	    var target = e.target;
	
	    if (target === self.grid) {
	      return;
	    }
	
	    if (target.tagName.toLowerCase() === 'li') {
	      target = target.parentNode;
	    }
	
	    if (target.tagName.toLowerCase() === 'ul') {
	      target = target.parentNode;
	    }
	
	    var list = target.firstElementChild;
	    var itemHeight = list.firstElementChild.offsetHeight;
	
	    self.cell = {
	      elem: target,
	      list: list,
	      moveY: 0,
	      maxMoveY: itemHeight,
	      minMoveY: itemHeight / 2,
	      startY: e.changedTouches ? e.changedTouches[0].pageY : e.pageY,
	      type: $.getData(target, 'type')
	    };
	  },
	  pointermove: function pointermove(e) {
	    var self = this;
	    var cell = self.cell;
	
	    if (!cell) {
	      return;
	    }
	
	    e.preventDefault();
	
	    var endY = e.changedTouches ? e.changedTouches[0].pageY : e.pageY;
	    var moveY = cell.moveY + (endY - cell.startY);
	
	    cell.startY = endY;
	    cell.moveY = moveY;
	
	    if (Math.abs(moveY) < cell.maxMoveY) {
	      cell.list.style.top = moveY + 'px';
	      return;
	    }
	
	    cell.list.style.top = 0;
	    cell.moveY = 0;
	
	    if (moveY >= cell.maxMoveY) {
	      self.prev(cell.type);
	    } else if (moveY <= -cell.maxMoveY) {
	      self.next(cell.type);
	    }
	  },
	  pointerup: function pointerup() {
	    var self = this;
	    var cell = self.cell;
	
	    if (!cell) {
	      return;
	    }
	
	    cell.list.style.top = 0;
	
	    if (cell.moveY >= cell.minMoveY) {
	      self.prev(cell.type);
	    } else if (cell.moveY <= -cell.minMoveY) {
	      self.next(cell.type);
	    }
	
	    self.cell = null;
	  },
	  keydown: function keydown(e) {
	    var self = this;
	
	    if (self.shown && (e.key === 'Escape' || e.keyCode === 27)) {
	      self.hide();
	    }
	  }
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utilities = __webpack_require__(4);
	
	var $ = _interopRequireWildcard(_utilities);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	exports.default = {
	  render: function render(type) {
	    var self = this;
	
	    if (!type) {
	      self.format.tokens.forEach(function (token) {
	        return self.render($.tokenToType(token));
	      });
	      return;
	    }
	
	    var options = self.options;
	    var data = self.data[type];
	    var current = self.current(type);
	    var max = $.isFunction(data.max) ? data.max() : data.max;
	    var min = $.isFunction(data.min) ? data.min() : data.min;
	    var base = 0;
	
	    if (isFinite(max)) {
	      base = min > 0 ? max : max + 1;
	    }
	
	    $.empty(data.list);
	    data.current = current;
	
	    for (var i = 0; i < options.rows + 2; i++) {
	      var item = document.createElement('li');
	      var position = i - data.index;
	      var newValue = current + position * data.increment;
	
	      if (base) {
	        newValue %= base;
	
	        if (newValue < min) {
	          newValue += base;
	        }
	      }
	
	      item.textContent = options.translate(type, data.aliases ? data.aliases[newValue] : $.addLeadingZero(newValue + data.offset, data.digit));
	
	      $.setData(item, 'name', type);
	      $.setData(item, 'value', newValue);
	      $.addClass(item, 'picker-item');
	
	      if (position === 0) {
	        $.addClass(item, 'picker-picked');
	        data.item = item;
	      }
	
	      data.list.appendChild(item);
	    }
	  },
	  current: function current(type, value) {
	    var self = this;
	    var date = self.date;
	    var format = self.format;
	    var token = format[type];
	
	    switch (token.charAt(0)) {
	      case 'Y':
	        if ($.isNumber(value)) {
	          date.setFullYear(token.length === 2 ? 2000 + value : value);
	
	          if (format.month) {
	            self.render($.tokenToType(format.month));
	          }
	
	          if (format.day) {
	            self.render($.tokenToType(format.day));
	          }
	        }
	
	        return date.getFullYear();
	
	      case 'M':
	        if ($.isNumber(value)) {
	          date.setMonth(value);
	
	          if (format.day) {
	            self.render($.tokenToType(format.day));
	          }
	        }
	
	        return date.getMonth();
	
	      case 'D':
	        if ($.isNumber(value)) {
	          date.setDate(value);
	        }
	
	        return date.getDate();
	
	      case 'H':
	        if ($.isNumber(value)) {
	          date.setHours(value);
	        }
	
	        return date.getHours();
	
	      case 'm':
	        if ($.isNumber(value)) {
	          date.setMinutes(value);
	        }
	
	        return date.getMinutes();
	
	      case 's':
	        if ($.isNumber(value)) {
	          date.setSeconds(value);
	        }
	
	        return date.getSeconds();
	
	      case 'S':
	        if ($.isNumber(value)) {
	          date.setMilliseconds(value);
	        }
	
	        return date.getMilliseconds();
	
	      // No default
	    }
	
	    return date;
	  },
	  getValue: function getValue() {
	    var self = this;
	    var element = self.element;
	
	    return self.isInput ? element.value : element.textContent;
	  },
	  setValue: function setValue(value) {
	    var self = this;
	    var element = self.element;
	
	    if (self.isInput) {
	      element.value = value;
	    } else if (self.options.container) {
	      element.textContent = value;
	    }
	  }
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utilities = __webpack_require__(4);
	
	var $ = _interopRequireWildcard(_utilities);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	exports.default = {
	  // Show the picker.
	  show: function show() {
	    var self = this;
	    var element = self.element;
	    var picker = self.picker;
	
	    if (self.inline || self.shown) {
	      return self;
	    }
	
	    if ($.dispatchEvent(element, 'show') === false) {
	      return self;
	    }
	
	    self.shown = true;
	
	    var style = document.body.style;
	
	    style.overflow = 'hidden';
	    style.paddingRight = self.scrollbarWidth + 'px';
	    $.addClass(picker, 'picker-open');
	
	    // Reflow to enable transition
	    // eslint-disable-next-line
	    picker.offsetWidth;
	
	    $.addClass(picker, 'picker-opened');
	
	    setTimeout(function () {
	      $.dispatchEvent(element, 'shown');
	    }, 300);
	
	    return self;
	  },
	
	
	  // Hide the picker.
	  hide: function hide() {
	    var self = this;
	    var element = self.element;
	    var picker = self.picker;
	
	    if (self.inline || !self.shown) {
	      return self;
	    }
	
	    if ($.dispatchEvent(element, 'hide') === false) {
	      return self;
	    }
	
	    self.shown = false;
	    $.removeClass(picker, 'picker-opened');
	
	    setTimeout(function () {
	      var style = document.body.style;
	
	      $.removeClass(picker, 'picker-open');
	
	      style.overflow = 'auto';
	      style.paddingRight = 0;
	
	      $.dispatchEvent(element, 'hidden');
	    }, 300);
	
	    return self;
	  },
	
	
	  /**
	   * Pick to the previous item.
	   *
	   * @param {String} type
	   */
	  prev: function prev(type) {
	    var self = this;
	    var options = self.options;
	    var token = self.format[type];
	    var data = self.data[type];
	    var list = data.list;
	    var item = list.lastElementChild;
	    var max = $.isFunction(data.max) ? data.max() : data.max;
	    var min = $.isFunction(data.min) ? data.min() : data.min;
	    var prev = data.item.previousElementSibling;
	    var value = Number($.getData(list.firstElementChild, 'value')) - data.increment;
	
	    if (value < min) {
	      value += max - min + 1;
	    }
	
	    item.textContent = options.translate(type, data.aliases ? data.aliases[value] : $.addLeadingZero(value + data.offset, token.length));
	
	    $.setData(item, 'value', value);
	
	    if (prev) {
	      $.removeClass(data.item, 'picker-picked');
	      $.addClass(prev, 'picker-picked');
	      data.item = prev;
	    }
	
	    list.insertBefore(item, list.firstElementChild);
	
	    data.current = Number($.getData(data.item, 'value'));
	    self.current(type, data.current);
	
	    if (self.inline && options.container) {
	      self.pick();
	    }
	
	    return self;
	  },
	
	
	  /**
	   * Pick to the next item.
	   *
	   * @param {String} type
	   */
	  next: function next(type) {
	    var self = this;
	    var options = self.options;
	    var token = self.format[type];
	    var data = self.data[type];
	    var list = data.list;
	    var item = list.firstElementChild;
	    var max = $.isFunction(data.max) ? data.max() : data.max;
	    var min = $.isFunction(data.min) ? data.min() : data.min;
	    var next = data.item.nextElementSibling;
	    var value = Number($.getData(list.lastElementChild, 'value')) + data.increment;
	
	    if (value > max) {
	      value -= max - min + 1;
	    }
	
	    item.textContent = options.translate(type, data.aliases ? data.aliases[value] : $.addLeadingZero(value + data.offset, token.length));
	
	    $.setData(item, 'value', value);
	    list.appendChild(item);
	
	    if (next) {
	      $.removeClass(data.item, 'picker-picked');
	      $.addClass(next, 'picker-picked');
	      data.item = next;
	    }
	
	    data.current = Number($.getData(data.item, 'value'));
	    self.current(type, data.current);
	
	    if (self.inline && options.container) {
	      self.pick();
	    }
	
	    return self;
	  },
	
	
	  // Pick the current date to the target element.
	  pick: function pick() {
	    var self = this;
	    var element = self.element;
	
	    if ($.dispatchEvent(element, 'pick') === false) {
	      return self;
	    }
	
	    var value = self.formatDate(self.date);
	
	    self.setValue(value);
	
	    if (self.isInput && $.dispatchEvent(element, 'change') === false) {
	      self.reset();
	    }
	
	    self.hide();
	
	    return self;
	  },
	
	
	  /**
	   * Get the current date.
	   *
	   * @param {Boolean} [formatted]
	   * @return {Date|String} (date)
	   */
	  getDate: function getDate(formatted) {
	    var self = this;
	    var date = self.date;
	
	    return formatted ? self.formatDate(date) : new Date(date);
	  },
	
	
	  /**
	   * Override the current date with a new date.
	   *
	   * @param {Date|String} [date]
	   */
	  setDate: function setDate(date) {
	    var self = this;
	
	    if (date) {
	      self.date = self.parseDate(date);
	      self.render();
	    }
	
	    return self;
	  },
	
	
	  // Update the picker with the current element value / text.
	  update: function update() {
	    var self = this;
	
	    self.date = self.parseDate(self.getValue());
	    self.render();
	
	    return self;
	  },
	
	
	  // Reset the picker and element value / text.
	  reset: function reset() {
	    var self = this;
	
	    self.setValue(self.initialValue);
	    self.date = new Date(self.initialDate);
	    self.render();
	
	    return self;
	  },
	
	
	  /**
	   * Parse a date string with the set date format.
	   *
	   * @param {String} date
	   * @return {Date} (parsed date)
	   */
	  parseDate: function parseDate(date) {
	    var self = this;
	    var options = self.options;
	    var format = self.format;
	    var digits = [];
	
	    if ($.isDate(date)) {
	      return new Date(date);
	    }
	
	    if (typeof date === 'string') {
	      var months = options.months.join('|');
	      var monthsShort = options.monthsShort.join('|');
	
	      digits = date.match(new RegExp('(' + months + '|' + monthsShort + '|\\d+)', 'g'));
	
	      if (!digits || digits.length !== format.tokens.length) {
	        return new Date();
	      }
	    }
	
	    var parsedDate = new Date();
	
	    digits.forEach(function (digit, i) {
	      var token = format.tokens[i];
	      var n = Number(digit);
	
	      switch (token) {
	        case 'YYYY':
	        case 'YYY':
	        case 'Y':
	          parsedDate.setFullYear(date.substr(date.indexOf(digit) - 1, 1) === '-' ? -n : n);
	          break;
	
	        case 'YY':
	          parsedDate.setFullYear(2000 + n);
	          break;
	
	        case 'MMMM':
	          parsedDate.setMonth(options.months.indexOf(digit));
	          break;
	
	        case 'MMM':
	          parsedDate.setMonth(options.monthsShort.indexOf(digit));
	          break;
	
	        case 'MM':
	        case 'M':
	          parsedDate.setMonth(n - 1);
	          break;
	
	        case 'DD':
	        case 'D':
	          parsedDate.setDate(n);
	          break;
	
	        case 'HH':
	        case 'H':
	          parsedDate.setHours(n);
	          break;
	
	        case 'mm':
	        case 'm':
	          parsedDate.setMinutes(n);
	          break;
	
	        case 'ss':
	        case 's':
	          parsedDate.setSeconds(n);
	          break;
	
	        case 'SSS':
	        case 'SS':
	        case 'S':
	          parsedDate.setMilliseconds(n);
	          break;
	
	        // No default
	      }
	    });
	
	    return parsedDate;
	  },
	
	
	  /**
	   * Format a date object to a string with the set date format.
	   *
	   * @param {Date} date
	   * @return {String} (formatted date)
	   */
	  formatDate: function formatDate(date) {
	    var self = this;
	    var options = self.options;
	    var format = self.format;
	    var formatted = '';
	
	    if ($.isValidDate(date)) {
	      (function () {
	        var year = date.getFullYear();
	        var month = date.getMonth();
	        var day = date.getDate();
	        var hours = date.getHours();
	        var minutes = date.getMinutes();
	        var seconds = date.getSeconds();
	        var milliseconds = date.getMilliseconds();
	
	        formatted = options.format;
	
	        format.tokens.forEach(function (token) {
	          var replacement = '';
	
	          switch (token) {
	            case 'YYYY':
	            case 'YYY':
	            case 'Y':
	              replacement = $.addLeadingZero(year, token.length);
	              break;
	
	            case 'YY':
	              replacement = $.addLeadingZero(year % 100, 2);
	              break;
	
	            case 'MMMM':
	              replacement = options.months[month];
	              break;
	
	            case 'MMM':
	              replacement = options.monthsShort[month];
	              break;
	
	            case 'MM':
	            case 'M':
	              replacement = $.addLeadingZero(month + 1, token.length);
	              break;
	
	            case 'DD':
	            case 'D':
	              replacement = $.addLeadingZero(day, token.length);
	              break;
	
	            case 'HH':
	            case 'H':
	              replacement = $.addLeadingZero(hours, token.length);
	              break;
	
	            case 'mm':
	            case 'm':
	              replacement = $.addLeadingZero(minutes, token.length);
	              break;
	
	            case 'ss':
	            case 's':
	              replacement = $.addLeadingZero(seconds, token.length);
	              break;
	
	            case 'SSS':
	            case 'SS':
	            case 'S':
	              replacement = $.addLeadingZero(milliseconds, token.length);
	              break;
	
	            // No default
	
	          }
	
	          formatted = formatted.replace(token, replacement);
	        });
	      })();
	    }
	
	    return formatted;
	  },
	
	
	  // Destroy the picker and remove the instance from the target element.
	  destroy: function destroy() {
	    var self = this;
	    var element = self.element;
	    var picker = self.picker;
	
	    self.unbind();
	    $.removeData(element, 'picker');
	    picker.parentNode.removeChild(picker);
	
	    return self;
	  }
	};

/***/ }
/******/ ])
});
;
//# sourceMappingURL=picker.js.map