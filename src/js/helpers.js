import {
  CLASS_PICKED,
  DATA_NAME,
  DATA_VALUE,
  NAMESPACE,
} from './constants';
import {
  addClass,
  addLeadingZero,
  getDaysInMonth,
  isFinite,
  isFunction,
  isNumber,
  setData,
  tokenToType,
} from './utilities';

export default {
  render(type) {
    if (!type) {
      this.format.tokens.forEach(token => this.render(tokenToType(token)));
      return;
    }

    const { options } = this;
    const data = this.data[type];
    const current = this.current(type);
    const max = isFunction(data.max) ? data.max() : data.max;
    const min = isFunction(data.min) ? data.min() : data.min;
    let base = 0;

    if (isFinite(max)) {
      base = min > 0 ? max : max + 1;
    }

    data.list.innerHTML = '';
    data.current = current;

    for (let i = 0; i < options.rows + 2; i += 1) {
      const item = document.createElement('li');
      const position = i - data.index;
      let newValue = current + (position * data.increment);

      if (base) {
        newValue %= base;

        if (newValue < min) {
          newValue += base;
        }
      }

      item.textContent = options.translate(type, data.aliases ? data.aliases[newValue]
        : addLeadingZero(newValue + data.offset, data.digit));

      setData(item, DATA_NAME, type);
      setData(item, DATA_VALUE, newValue);
      addClass(item, `${NAMESPACE}-item`);

      if (position === 0) {
        addClass(item, CLASS_PICKED);
        data.item = item;
      }

      data.list.appendChild(item);
    }
  },

  current(type, value) {
    const { date } = this;
    const { format } = this;
    const token = format[type];

    switch (token.charAt(0)) {
      case 'Y':
        if (isNumber(value)) {
          date.setFullYear(token.length === 2 ? (2000 + value) : value);

          if (format.month) {
            this.render(tokenToType(format.month));
          }

          if (format.day) {
            this.render(tokenToType(format.day));
          }
        }

        return date.getFullYear();

      case 'M':
        if (isNumber(value)) {
          date.setMonth(
            value,

            // The current day should not exceed its maximum day in current month
            Math.min(date.getDate(), getDaysInMonth(date.getFullYear(), value)),
          );

          if (format.day) {
            this.render(tokenToType(format.day));
          }
        }

        return date.getMonth();

      case 'D':
        if (isNumber(value)) {
          date.setDate(value);
        }

        return date.getDate();

      case 'H':
        if (isNumber(value)) {
          date.setHours(value);
        }

        return date.getHours();

      case 'm':
        if (isNumber(value)) {
          date.setMinutes(value);
        }

        return date.getMinutes();

      case 's':
        if (isNumber(value)) {
          date.setSeconds(value);
        }

        return date.getSeconds();

      case 'S':
        if (isNumber(value)) {
          date.setMilliseconds(value);
        }

        return date.getMilliseconds();

      default:
    }

    return date;
  },

  getValue() {
    const { element } = this;

    return this.isInput ? element.value : element.textContent;
  },

  setValue(value) {
    const { element } = this;

    if (this.isInput) {
      element.value = value;
    } else if (this.options.container) {
      element.textContent = value;
    }
  },

  open() {
    const { body } = this;

    body.style.overflow = 'hidden';
    body.style.paddingRight = `${this.scrollBarWidth + (parseFloat(this.initialBodyPaddingRight) || 0)}px`;
  },

  close() {
    const { body } = this;

    body.style.overflow = '';
    body.style.paddingRight = this.initialBodyPaddingRight;
  },
};
