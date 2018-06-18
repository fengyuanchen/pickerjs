import DEFAULTS from './defaults';
import TEMPLATE from './template';
import events from './events';
import handlers from './handlers';
import helpers from './helpers';
import methods from './methods';
import {
  CLASS_OPEN,
  CLASS_OPENED,
  LANGUAGES,
  NAMESPACE,
  WINDOW,
} from './constants';
import {
  addClass,
  deepAssign,
  getData,
  getDaysInMonth,
  isPlainObject,
  isString,
  parseFormat,
  setData,
  tokenToType,
} from './utilities';

const REGEXP_DELIMITER = /\{\{\s*(\w+)\s*\}\}/g;
const REGEXP_INPUTS = /input|textarea/i;
const AnotherPicker = WINDOW.Picker;

class Picker {
  /**
   * Create a new Picker.
   * @param {Element} element - The target element for picking.
   * @param {Object} [options={}] - The configuration options.
   */
  constructor(element, options = {}) {
    if (!element || element.nodeType !== 1) {
      throw new Error('The first argument is required and must be an element.');
    }

    this.element = element;
    this.options = deepAssign(
      {},
      DEFAULTS,
      LANGUAGES[options.language],
      isPlainObject(options) && options,
    );
    this.shown = false;
    this.init();
  }

  init() {
    const { element } = this;

    if (getData(element, NAMESPACE)) {
      return;
    }

    setData(element, NAMESPACE, this);

    const { options } = this;
    const isInput = REGEXP_INPUTS.test(element.tagName);
    const inline = options.inline && (options.container || !isInput);
    const template = document.createElement('div');

    template.insertAdjacentHTML(
      'afterbegin',
      TEMPLATE.replace(REGEXP_DELIMITER, (...args) => options.text[args[1]]),
    );

    const picker = template.getElementsByClassName(NAMESPACE)[0];
    const grid = picker.getElementsByClassName(`${NAMESPACE}-grid`)[0];
    let { container } = options;

    if (isString(container)) {
      container = document.querySelector(container);
    }

    if (inline) {
      addClass(picker, CLASS_OPEN);
      addClass(picker, CLASS_OPENED);

      if (!container) {
        container = element;
      }
    } else {
      const { ownerDocument } = element;
      const body = ownerDocument.body || ownerDocument.documentElement;

      this.body = body;
      this.scrollBarWidth = WINDOW.innerWidth - ownerDocument.documentElement.clientWidth;
      this.initialBodyPaddingRight = WINDOW.getComputedStyle(body).paddingRight;
      addClass(picker, `${NAMESPACE}-fixed`);

      if (!container) {
        container = document.body;
      }
    }

    this.isInput = isInput;
    this.inline = inline;
    this.container = container;
    this.picker = picker;
    this.grid = grid;
    this.cell = null;
    this.format = parseFormat(options.format);

    const initialValue = this.getValue();
    const date = this.parseDate(options.date || initialValue);

    this.date = date;
    this.initialDate = new Date(date);
    this.initialValue = initialValue;
    this.data = {};

    let rows = Number(options.rows);

    if (!(rows % 2)) {
      rows += 1;
    }

    options.rows = rows || 5;
    addClass(grid, rows > 1 ? `${NAMESPACE}-multiple` : `${NAMESPACE}-single`);

    let { increment } = options;

    if (!isPlainObject(increment)) {
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

    this.format.tokens.forEach((token) => {
      const type = tokenToType(token);
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
          data.max = () => getDaysInMonth(date.getFullYear(), date.getMonth());
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

        default:
      }

      setData(cell, 'type', type);
      setData(cell, 'token', token);
      addClass(list, `${NAMESPACE}-list`);
      addClass(cell, `${NAMESPACE}-cell`);
      addClass(cell, `${NAMESPACE}-${type}s`);
      cell.appendChild(list);
      grid.appendChild(cell);
      this.data[type] = data;
      this.render(type);
    });

    if (inline) {
      container.innerHTML = '';
    }

    container.appendChild(picker);
    this.bind();
  }

  /**
   * Get the no conflict picker class.
   * @returns {Picker} The picker class.
   */
  static noConflict() {
    WINDOW.Picker = AnotherPicker;
    return Picker;
  }

  /**
   * Change the default options.
   * @param {Object} options - The new default options.
   */
  static setDefaults(options) {
    deepAssign(DEFAULTS, LANGUAGES[options.language], isPlainObject(options) && options);
  }
}

deepAssign(Picker.prototype, events, handlers, helpers, methods);
Picker.languages = LANGUAGES;

export default Picker;
