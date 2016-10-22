import * as $ from './utilities';

export default {
  render(type) {
    const self = this;

    if (!type) {
      self.format.tokens.forEach(token => self.render($.tokenToType(token)));
      return;
    }

    const options = self.options;
    const data = self.data[type];
    const current = self.current(type);
    const max = $.isFunction(data.max) ? data.max() : data.max;
    const min = $.isFunction(data.min) ? data.min() : data.min;
    let base = 0;

    if (isFinite(max)) {
      base = min > 0 ? max : max + 1;
    }

    $.empty(data.list);
    data.current = current;

    for (let i = 0; i < options.rows + 2; i++) {
      const item = document.createElement('li');
      const position = i - data.index;
      let newValue = current + (position * data.increment);

      if (base) {
        newValue %= base;

        if (newValue < min) {
          newValue += base;
        }
      }

      item.textContent = options.translate(type, data.aliases ? data.aliases[newValue] :
        $.addLeadingZero(newValue + data.offset, data.digit));

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

  current(type, value) {
    const self = this;
    const date = self.date;
    const format = self.format;
    const token = format[type];

    switch (token.charAt(0)) {
      case 'Y':
        if ($.isNumber(value)) {
          date.setFullYear(token.length === 2 ? (2000 + value) : value);

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

  getValue() {
    const self = this;
    const element = self.element;

    return self.isInput ? element.value : element.textContent;
  },

  setValue(value) {
    const self = this;
    const element = self.element;

    if (self.isInput) {
      element.value = value;
    } else if (self.options.container) {
      element.textContent = value;
    }
  },
};
