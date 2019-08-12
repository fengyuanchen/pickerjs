(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) : factory(global.Picker);
}(typeof self !== 'undefined' ? self : this, function (Picker) {
  'use strict';

  Picker.languages['pt-BR'] = {
    months: [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro'
    ],
    monthsShort: [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Maio',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez'
    ],
    text: {
      title: 'Escolha uma data e hora',
      cancel: 'Cancelar',
      confirm: 'Confirmar',
      year: 'Ano',
      month: 'Mês',
      day: 'Dia',
      hour: 'Hora',
      minute: 'Minutos',
      second: 'Segundos',
      millisecond: 'Milissegundos'
    }
  };
}));
