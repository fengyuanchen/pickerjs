(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) : factory(global.Picker);
}(typeof self !== 'undefined' ? self : this, function (Picker) {
  'use strict';

  Picker.languages['en-GB'] = {
    format: 'DD/MM/YYYY HH:mm'
  };
}));
