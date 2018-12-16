import {
  CLASS_OPEN,
  CLASS_OPENED,
  CLASS_PICKED,
  DATA_VALUE,
  EVENT_HIDDEN,
  EVENT_HIDE,
  EVENT_PICK,
  EVENT_SHOW,
  EVENT_SHOWN,
  NAMESPACE,
} from './constants';
import {
  addClass,
  addLeadingZero,
  dispatchEvent,
  getData,
  isDate,
  isFunction,
  isString,
  isValidDate,
  removeClass,
  removeData,
  setData,
} from './utilities';

export default {
  /**
   * Show the picker.
   * @param {boolean} [immediate=false] - Indicate if show the picker immediately or not.
   * @returns {Picker} this
   */
  show(immediate = false) {
    const { element, picker } = this;

    if (this.inline || this.shown) {
      return this;
    }

    if (dispatchEvent(element, EVENT_SHOW) === false) {
      return this;
    }

    this.shown = true;
    this.open();
    addClass(picker, CLASS_OPEN);

    const done = () => {
      dispatchEvent(element, EVENT_SHOWN);
    };

    if (!immediate) {
      // Reflow to enable transition
      // eslint-disable-next-line
      picker.offsetWidth;
    }

    addClass(picker, CLASS_OPENED);

    if (immediate) {
      done();
    } else {
      setTimeout(done, 300);
    }

    return this;
  },

  /**
   * Hide the picker.
   * @param {boolean} [immediate=false] - Indicate if hide the picker immediately or not.
   * @returns {Picker} this
   */
  hide(immediate = false) {
    const { element, picker } = this;

    if (this.inline || !this.shown) {
      return this;
    }

    if (dispatchEvent(element, EVENT_HIDE) === false) {
      return this;
    }

    this.shown = false;
    removeClass(picker, CLASS_OPENED);

    const done = () => {
      this.close();
      removeClass(picker, CLASS_OPEN);
      dispatchEvent(element, EVENT_HIDDEN);
    };

    if (immediate) {
      done();
    } else {
      setTimeout(done, 300);
    }

    return this;
  },

  /**
   * Pick to the previous item.
   * @param {string} type - The column type.
   * @returns {Picker} this
   */
  prev(type) {
    const { options } = this;
    const token = this.format[type];
    const data = this.data[type];
    const { list } = data;
    const item = list.lastElementChild;
    const max = isFunction(data.max) ? data.max() : data.max;
    const min = isFunction(data.min) ? data.min() : data.min;
    const prev = data.item.previousElementSibling;
    let value = Number(getData(list.firstElementChild, DATA_VALUE)) - data.increment;

    if (value < min) {
      value += (max - min) + 1;
    }

    item.textContent = options.translate(type, data.aliases ? data.aliases[value]
      : addLeadingZero(value + data.offset, token.length));

    setData(item, DATA_VALUE, value);

    if (prev) {
      removeClass(data.item, CLASS_PICKED);
      addClass(prev, CLASS_PICKED);
      data.item = prev;
    }

    list.insertBefore(item, list.firstElementChild);
    data.current = Number(getData(data.item, DATA_VALUE));
    this.current(type, data.current);

    if (this.inline && options.container) {
      this.pick();
    }

    return this;
  },

  /**
   * Pick to the next item.
   * @param {String} type - The column type.
   * @returns {Picker} this
   */
  next(type) {
    const { options } = this;
    const token = this.format[type];
    const data = this.data[type];
    const { list } = data;
    const item = list.firstElementChild;
    const max = isFunction(data.max) ? data.max() : data.max;
    const min = isFunction(data.min) ? data.min() : data.min;
    const next = data.item.nextElementSibling;
    let value = Number(getData(list.lastElementChild, DATA_VALUE)) + data.increment;

    if (value > max) {
      value -= (max - min) + 1;
    }

    item.textContent = options.translate(type, data.aliases ? data.aliases[value]
      : addLeadingZero(value + data.offset, token.length));

    setData(item, DATA_VALUE, value);
    list.appendChild(item);

    if (next) {
      removeClass(data.item, CLASS_PICKED);
      addClass(next, CLASS_PICKED);
      data.item = next;
    }

    data.current = Number(getData(data.item, DATA_VALUE));
    this.current(type, data.current);

    if (this.inline && options.container) {
      this.pick();
    }

    return this;
  },

  // Pick the current date to the target element.
  pick() {
    const { element } = this;

    if (dispatchEvent(element, EVENT_PICK) === false) {
      return this;
    }

    const value = this.formatDate(this.date);

    this.setValue(value);

    if (this.isInput && dispatchEvent(element, 'change') === false) {
      this.reset();
    }

    this.hide();

    return this;
  },

  /**
   * Get the current date.
   * @param {boolean} [formatted=false] - Indicate if format the date or not.
   * @return {Date|string} The output date.
   */
  getDate(formatted = false) {
    const { date } = this;

    return formatted ? this.formatDate(date) : new Date(date);
  },

  /**
   * Override the current date with a new date.
   * @param {Date|string} date - The date to set.
   * @returns {Picker} this
   */
  setDate(date) {
    if (date) {
      this.date = this.parseDate(date);
      this.render();
    }

    return this;
  },

  // Update the picker with the current element value / text.
  update() {
    this.date = this.parseDate(this.getValue());
    this.render();

    return this;
  },

  // Reset the picker and element value / text.
  reset() {
    this.setValue(this.initialValue);
    this.date = new Date(this.initialDate);
    this.render();

    return this;
  },

  /**
   * Parse a date with the set date format.
   * @param {Date|string} date - The date to parse.
   * @returns {Date} The parsed date object.
   */
  parseDate(date) {
    const { options, format } = this;
    let digits = [];

    if (isDate(date)) {
      return new Date(date);
    }

    if (isString(date)) {
      const groups = [
        ...options.months,
        ...options.monthsShort,
        '\\d+',
      ];

      digits = date.match(new RegExp(`(${groups.join('|')})`, 'g'));

      // Parse `11111111` (YYYYMMDD) to ['1111', '11', '11']
      if (digits && (date.length === options.format.length
        && digits.length !== format.tokens.length)) {
        digits = format.tokens.map(token => date.substr(
          options.format.indexOf(token),
          token.length,
        ));
      }

      if (!digits || digits.length !== format.tokens.length) {
        return new Date();
      }
    }

    const parsedDate = new Date();

    digits.forEach((digit, i) => {
      const token = format.tokens[i];
      const n = Number(digit);

      switch (token) {
        case 'YYYY':
        case 'YYY':
        case 'Y': {
          const index = date.indexOf(digit);
          const isHyphen = date.substr(index - 1, 1) === '-';
          const isBC = (index > 1 && isHyphen && /\S/.test(date.substr(index - 2, 1)))
            || (index === 1 && isHyphen);

          parsedDate.setFullYear(isBC ? -n : n);
          break;
        }

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

        default:
      }
    });

    return parsedDate;
  },

  /**
   * Format a date object to a string with the set date format.
   * @param {Date} date - The date to format.
   * @return {string} THe formatted date.
   */
  formatDate(date) {
    const { options, format } = this;
    let formatted = '';

    if (isValidDate(date)) {
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      const milliseconds = date.getMilliseconds();

      formatted = options.format;

      format.tokens.forEach((token) => {
        let replacement = '';

        switch (token) {
          case 'YYYY':
          case 'YYY':
          case 'Y':
            replacement = addLeadingZero(year, token.length);
            break;

          case 'YY':
            replacement = addLeadingZero(year % 100, 2);
            break;

          case 'MMMM':
            replacement = options.months[month];
            break;

          case 'MMM':
            replacement = options.monthsShort[month];
            break;

          case 'MM':
          case 'M':
            replacement = addLeadingZero(month + 1, token.length);
            break;

          case 'DD':
          case 'D':
            replacement = addLeadingZero(day, token.length);
            break;

          case 'HH':
          case 'H':
            replacement = addLeadingZero(hours, token.length);
            break;

          case 'mm':
          case 'm':
            replacement = addLeadingZero(minutes, token.length);
            break;

          case 'ss':
          case 's':
            replacement = addLeadingZero(seconds, token.length);
            break;

          case 'SSS':
          case 'SS':
          case 'S':
            replacement = addLeadingZero(milliseconds, token.length);
            break;

          default:
        }

        formatted = formatted.replace(token, replacement);
      });
    }

    return formatted;
  },

  // Destroy the picker and remove the instance from the target element.
  destroy() {
    const { element, picker } = this;

    if (!getData(element, NAMESPACE)) {
      return this;
    }

    this.hide(true);
    this.unbind();
    removeData(element, NAMESPACE);
    picker.parentNode.removeChild(picker);
    return this;
  },
};
