(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as anonymous module.
    define('picker.zh-CN', ['picker'], factory);
  } else if (typeof exports === 'object') {
    // Node / CommonJS
    factory(require('picker'));
  } else {
    // Browser globals.
    factory(Picker);
  }
})(function (Picker) {

  'use strict';

  Picker.languages['zh-CN'] = {
    months: [
      '一月',
      '二月',
      '三月',
      '四月',
      '五月',
      '六月',
      '七月',
      '八月',
      '九月',
      '十月',
      '十一月',
      '十二月'
    ],
    monthsShort: [
      '1月',
      '2月',
      '3月',
      '4月',
      '5月',
      '6月',
      '7月',
      '8月',
      '9月',
      '10月',
      '11月',
      '12月'
    ],
    text: {
      title: '请选择日期/时间',
      cancel: '取消',
      confirm: '确认'
    }
  };
});
