(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) : factory(global.Picker);
}(typeof self !== 'undefined' ? self : this, function (Picker) {
  'use strict';

  Picker.languages['pl-PL'] = {
    months: [
      'Styczeń',
      'Luty',
      'Marzec',
      'Kwiecień',
      'Maj',
      'Czerwiec',
      'Lipiec',
      'Sierpień',
      'Wrzesień',
      'Październik',
      'Listopad',
      'Grudzień'
    ],
    monthsShort: [
      'Stycz',
      'Luty',
      'Mar',
      'Kwie',
      'Maj',
      'Czerw',
      'Lip',
      'Sierp',
      'Wrzes',
      'Paźdz',
      'List',
      'Grudz',
    ],
    text: {
      title: 'Wybierz dzień',
      cancel: 'Anuluj',
      confirm: 'OK'
    }
  };
}));
