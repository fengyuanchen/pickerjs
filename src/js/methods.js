import * as $ from './utilities';

export default {
  // Show the picker.
  show() {
    const self = this;
    const element = self.element;
    const picker = self.picker;

    if (self.inline || self.shown) {
      return self;
    }

    if ($.dispatchEvent(element, 'show') === false) {
      return self;
    }

    self.shown = true;

    const style = document.body.style;

    style.overflow = 'hidden';
    style.paddingRight = `${self.scrollbarWidth}px`;
    $.addClass(picker, 'picker-open');

    // Reflow to enable transition
    // eslint-disable-next-line
    picker.offsetWidth;

    $.addClass(picker, 'picker-opened');

    setTimeout(() => {
      $.dispatchEvent(element, 'shown');
    }, 300);

    return self;
  },

  // Hide the picker.
  hide() {
    const self = this;
    const element = self.element;
    const picker = self.picker;

    if (self.inline || !self.shown) {
      return self;
    }

    if ($.dispatchEvent(element, 'hide') === false) {
      return self;
    }

    self.shown = false;
    $.removeClass(picker, 'picker-opened');

    setTimeout(() => {
      const style = document.body.style;

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
  prev(type) {
    const self = this;
    const options = self.options;
    const token = self.format[type];
    const data = self.data[type];
    const list = data.list;
    const item = list.lastElementChild;
    const max = $.isFunction(data.max) ? data.max() : data.max;
    const min = $.isFunction(data.min) ? data.min() : data.min;
    const prev = data.item.previousElementSibling;
    let value = Number($.getData(list.firstElementChild, 'value')) - data.increment;

    if (value < min) {
      value += (max - min) + 1;
    }

    item.textContent = options.translate(type, data.aliases ? data.aliases[value] :
      $.addLeadingZero(value + data.offset, token.length));

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
  next(type) {
    const self = this;
    const options = self.options;
    const token = self.format[type];
    const data = self.data[type];
    const list = data.list;
    const item = list.firstElementChild;
    const max = $.isFunction(data.max) ? data.max() : data.max;
    const min = $.isFunction(data.min) ? data.min() : data.min;
    const next = data.item.nextElementSibling;
    let value = Number($.getData(list.lastElementChild, 'value')) + data.increment;

    if (value > max) {
      value -= (max - min) + 1;
    }

    item.textContent = options.translate(type, data.aliases ? data.aliases[value] :
      $.addLeadingZero(value + data.offset, token.length));

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
  pick() {
    const self = this;
    const element = self.element;

    if ($.dispatchEvent(element, 'pick') === false) {
      return self;
    }

    const value = self.formatDate(self.date);

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
  getDate(formatted) {
    const self = this;
    const date = self.date;

    return formatted ? self.formatDate(date) : new Date(date);
  },

  /**
   * Override the current date with a new date.
   *
   * @param {Date|String} [date]
   */
  setDate(date) {
    const self = this;

    if (date) {
      self.date = self.parseDate(date);
      self.render();
    }

    return self;
  },

  // Update the picker with the current element value / text.
  update() {
    const self = this;

    self.date = self.parseDate(self.getValue());
    self.render();

    return self;
  },

  // Reset the picker and element value / text.
  reset() {
    const self = this;

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
  parseDate(date) {
    const self = this;
    const options = self.options;
    const format = self.format;
    let digits = [];

    if ($.isDate(date)) {
      return new Date(date);
    }

    if (typeof date === 'string') {
      const months = options.months.join('|');
      const monthsShort = options.monthsShort.join('|');

      digits = date.match(new RegExp(`(${months}|${monthsShort}|\\d+)`, 'g'));

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
  formatDate(date) {
    const self = this;
    const options = self.options;
    const format = self.format;
    let formatted = '';

    if ($.isValidDate(date)) {
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
    }

    return formatted;
  },

  // Destroy the picker and remove the instance from the target element.
  destroy() {
    const self = this;
    const element = self.element;
    const picker = self.picker;

    self.unbind();
    $.removeData(element, 'picker');
    picker.parentNode.removeChild(picker);

    return self;
  },
};
