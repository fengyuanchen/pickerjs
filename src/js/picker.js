import DEFAULTS from './defaults';
import TEMPLATE from './template';
import events from './events';
import handlers from './handlers';
import helpers from './helpers';
import methods from './methods';
import * as $ from './utilities';

const LANGUAGES = {};
const REGEXP_DELIMITER = /\{\{\s*(\w+)\s*\}\}/g;
const REGEXP_INPUTS = /input|textarea/i;
let AnotherPicker;

class Picker {
  constructor(element, options) {
    const self = this;

    options = $.isPlainObject(options) ? options : {};

    if (options.language) {
      // Priority: DEFAULTS < LANGUAGES < options
      options = $.extend(true, {}, LANGUAGES[options.language], options);
    }

    self.element = element;
    self.options = $.extend(true, {}, DEFAULTS, options);
    self.shown = false;
    self.init();
  }

  init() {
    const self = this;
    const element = self.element;

    if ($.getData(element, 'picker')) {
      return;
    }

    $.setData(element, 'picker', self);

    const options = self.options;
    const isInput = REGEXP_INPUTS.test(element.tagName);
    const inline = options.inline && (options.container || !isInput);
    const template = document.createElement('div');

    template.insertAdjacentHTML('afterbegin',
      TEMPLATE.replace(REGEXP_DELIMITER, (...args) => options.text[args[1]]));

    const picker = template.getElementsByClassName('picker')[0];
    const grid = picker.getElementsByClassName('picker-grid')[0];
    let container = options.container;

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

    const initialValue = self.getValue();
    const date = self.parseDate(options.date || initialValue);

    self.date = date;
    self.initialDate = new Date(date);
    self.initialValue = initialValue;
    self.data = {};

    let rows = Number(options.rows);

    if (!(rows % 2)) {
      rows += 1;
    }

    options.rows = rows || 5;
    $.addClass(grid, rows > 1 ? 'picker-multiple' : 'picker-single');

    let increment = options.increment;

    if (!$.isPlainObject(increment)) {
      increment = {
        year: increment,
        month: increment,
        day: increment,
        hour: increment,
        minute: increment,
        second: increment,
        millisecond: increment,
      };
    }

    self.format.tokens.forEach((token) => {
      const type = $.tokenToType(token);
      const cell = document.createElement('div');
      const list = document.createElement('ul');
      const data = {
        digit: token.length,
        increment: Math.abs(Number(increment[type])) || 1,
        list,
        max: Infinity,
        min: -Infinity,
        index: Math.floor((options.rows + 2) / 2),
        offset: 0,
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
          data.max = () => {
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
      $.addClass(cell, `picker-${type}s`);
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

  static noConflict() {
    window.Picker = AnotherPicker;
    return Picker;
  }

  static setDefaults(options) {
    options = $.isPlainObject(options) ? options : {};

    if (options.language) {
      options = $.extend(true, {}, LANGUAGES[options.language], options);
    }

    $.extend(true, DEFAULTS, options);
  }
}

$.extend(Picker.prototype, events);
$.extend(Picker.prototype, handlers);
$.extend(Picker.prototype, helpers);
$.extend(Picker.prototype, methods);

Picker.languages = LANGUAGES;

if (typeof window !== 'undefined') {
  AnotherPicker = window.Picker;
  window.Picker = Picker;
}

export default Picker;
