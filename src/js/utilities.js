const REGEXP_SPACES = /\s+/;
const REGEXP_TOKENS = /(Y|M|D|H|m|s|S)+/g;
const REGEXP_HYPHEN = /([a-z\d])([A-Z])/g;
const toString = Object.prototype.toString;
const hasOwnProperty = Object.prototype.hasOwnProperty;

export function typeOf(obj) {
  return toString.call(obj).slice(8, -1).toLowerCase();
}

export function isObject(obj) {
  return typeof obj === 'object' && obj !== null;
}

export function isFunction(fn) {
  return typeof fn === 'function';
}

export function isNumber(num) {
  return typeof num === 'number' && !isNaN(num);
}

export function isDate(date) {
  return typeOf(date) === 'date';
}

export function isValidDate(date) {
  return isDate(date) && date.toString() !== 'Invalid Date';
}

export function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function isPlainObject(obj) {
  if (!isObject(obj)) {
    return false;
  }

  try {
    const constructor = obj.constructor;
    const prototype = constructor.prototype;

    return constructor && prototype && hasOwnProperty.call(prototype, 'isPrototypeOf');
  } catch (e) {
    return false;
  }
}

export function extend(obj, ...args) {
  const deep = obj === true;

  if (deep) {
    obj = args.shift();
  }

  if (isObject(obj) && args.length > 0) {
    args.forEach((arg) => {
      if (isObject(arg)) {
        Object.keys(arg).forEach((key) => {
          if (deep && isObject(obj[key])) {
            extend(true, obj[key], arg[key]);
          } else {
            obj[key] = arg[key];
          }
        });
      }
    });
  }

  return obj;
}

export function hasClass(element, value) {
  return element.classList ?
    element.classList.contains(value) :
    element.className.indexOf(value) > -1;
}

export function addClass(element, value) {
  if (!value) {
    return;
  }

  if (element.classList) {
    element.classList.add(value);
    return;
  }

  const className = element.className.trim();

  if (!className) {
    element.className = value;
  } else if (className.indexOf(value) < 0) {
    element.className = `${className} ${value}`;
  }
}

export function removeClass(element, value) {
  if (!value) {
    return;
  }

  if (element.classList) {
    element.classList.remove(value);
    return;
  }

  const className = element.className;

  if (className.indexOf(value) > -1) {
    element.className = className.replace(value, '').trim();
  }
}

export function toggleClass(element, value, added) {
  if (!value) {
    return;
  }

  // IE10-11 doesn't support the second parameter of `classList.toggle`
  if (added) {
    addClass(element, value);
  } else {
    removeClass(element, value);
  }
}

export function toHyphenCase(str) {
  return str.replace(REGEXP_HYPHEN, '$1-$2').toLowerCase();
}

export function getData(element, name) {
  if (isObject(element[name])) {
    return element[name];
  } else if (element.dataset) {
    return element.dataset[name];
  }

  return element.getAttribute(`data-${toHyphenCase(name)}`);
}

export function setData(element, name, data) {
  if (isObject(data)) {
    element[name] = data;
  } else if (element.dataset) {
    element.dataset[name] = data;
  } else {
    element.setAttribute(`data-${toHyphenCase(name)}`, data);
  }
}

export function removeData(element, name) {
  if (isObject(element[name])) {
    delete element[name];
  } else if (element.dataset) {
    delete element.dataset[name];
  } else {
    element.removeAttribute(`data-${toHyphenCase(name)}`);
  }
}

export function removeListener(element, type, handler) {
  const types = type.trim().split(REGEXP_SPACES);

  if (types.length > 1) {
    types.forEach(t => removeListener(element, t, handler));
    return;
  }

  if (element.removeEventListener) {
    element.removeEventListener(type, handler, false);
  } else if (element.detachEvent) {
    element.detachEvent(`on${type}`, handler);
  }
}

export function addListener(element, type, handler, once) {
  const types = type.trim().split(REGEXP_SPACES);
  const originalHandler = handler;

  if (types.length > 1) {
    types.forEach(t => addListener(element, t, handler));
    return;
  }

  if (once) {
    handler = (...args) => {
      removeListener(element, type, handler);

      return originalHandler.apply(element, args);
    };
  }

  element.addEventListener(type, handler, false);
}

export function dispatchEvent(element, type, data) {
  let event;

  // Event and CustomEvent on IE9-11 are global objects, not constructors
  if (typeof Event === 'function' && typeof CustomEvent === 'function') {
    if (data === undefined) {
      event = new Event(type, {
        bubbles: true,
        cancelable: true,
      });
    } else {
      event = new CustomEvent(type, {
        detail: data,
        bubbles: true,
        cancelable: true,
      });
    }
  } else if (data === undefined) {
    event = document.createEvent('Event');
    event.initEvent(type, true, true);
  } else {
    event = document.createEvent('CustomEvent');
    event.initCustomEvent(type, true, true, data);
  }

  // IE9+
  return element.dispatchEvent(event);
}

export function empty(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

export function getDaysInMonth(year, month) {
  return [31, (isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
}

export function addLeadingZero(value, length = 1) {
  const str = String(Math.abs(value));
  let i = str.length;
  let result = '';

  if (value < 0) {
    result += '-';
  }

  while (i++ < length) {
    result += '0';
  }

  return result + str;
}

export function tokenToType(token) {
  return {
    Y: 'year',
    M: 'month',
    D: 'day',
    H: 'hour',
    m: 'minute',
    s: 'second',
    S: 'millisecond',
  }[token.charAt(0)];
}

export function parseFormat(format) {
  const tokens = format.match(REGEXP_TOKENS);

  if (!tokens) {
    throw new Error('Invalid format');
  }

  const result = {
    tokens,
  };

  tokens.forEach((token) => {
    result[tokenToType(token)] = token;
  });

  return result;
}
