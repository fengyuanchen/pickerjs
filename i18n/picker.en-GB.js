(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as anonymous module.
    define('picker.en-GB', ['picker'], factory);
  } else if (typeof exports === 'object') {
    // Node / CommonJS
    factory(require('picker'));
  } else {
    // Browser globals.
    factory(Picker);
  }
})(function (Picker) {

  'use strict';

  Picker.languages['en-GB'] = {
    format: 'DD/MM/YYYY HH:mm'
  };
});
