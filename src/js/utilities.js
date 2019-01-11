import {
  IS_BROWSER,
  WINDOW,
} from './constants';

const { hasOwnProperty, toString } = Object.prototype;

/**
 * Detect the type of the given value.
 * @param {*} value - The value to detect.
 * @returns {string} Returns the type.
 */
export function typeOf(value) {
  return toString.call(value).slice(8, -1).toLowerCase();
}

/**
 * Check if the given value is a string.
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if the given value is a string, else `false`.
 */
export function isString(value) {
  return typeof value === 'string';
}

/**
 * Check if the given value is finite.
 */
export const isFinite = Number.isFinite || WINDOW.isFinite;

/**
 * Check if the given value is not a number.
 */
export const isNaN = Number.isNaN || WINDOW.isNaN;

/**
 * Check if the given value is a number.
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if the given value is a number, else `false`.
 */
export function isNumber(value) {
  return typeof value === 'number' && !isNaN(value);
}

/**
 * Check if the given value is an object.
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if the given value is an object, else `false`.
 */
export function isObject(value) {
  return typeof value === 'object' && value !== null;
}

/**
 * Check if the given value is a plain object.
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if the given value is a plain object, else `false`.
 */
export function isPlainObject(value) {
  if (!isObject(value)) {
    return false;
  }

  try {
    const { constructor } = value;
    const { prototype } = constructor;

    return constructor && prototype && hasOwnProperty.call(prototype, 'isPrototypeOf');
  } catch (error) {
    return false;
  }
}

/**
 * Check if the given value is a function.
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if the given value is a function, else `false`.
 */
export function isFunction(value) {
  return typeof value === 'function';
}

/**
 * Check if the given value is a date.
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if the given value is a date, else `false`.
 */
export function isDate(value) {
  return typeOf(value) === 'date';
}

/**
 * Check if the given value is a valid date.
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if the given value is a valid date, else `false`.
 */
export function isValidDate(value) {
  return isDate(value) && value.toString() !== 'Invalid Date';
}

/**
 * Iterate the given data.
 * @param {*} data - The data to iterate.
 * @param {Function} callback - The process function for each element.
 * @returns {*} The original data.
 */
export function forEach(data, callback) {
  if (data && isFunction(callback)) {
    if (Array.isArray(data) || isNumber(data.length)/* array-like */) {
      const { length } = data;
      let i;

      for (i = 0; i < length; i += 1) {
        if (callback.call(data, data[i], i, data) === false) {
          break;
        }
      }
    } else if (isObject(data)) {
      Object.keys(data).forEach((key) => {
        callback.call(data, data[key], key, data);
      });
    }
  }

  return data;
}

/**
 * Recursively assigns own enumerable properties of source objects to the target object.
 * @param {Object} target - The target object.
 * @param {Object[]} sources - The source objects.
 * @returns {Object} The target object.
 */
export function deepAssign(target, ...sources) {
  if (isObject(target) && sources.length > 0) {
    sources.forEach((source) => {
      if (isObject(source)) {
        Object.keys(source).forEach((key) => {
          if (isPlainObject(target[key]) && isPlainObject(source[key])) {
            target[key] = deepAssign({}, target[key], source[key]);
          } else {
            target[key] = source[key];
          }
        });
      }
    });
  }

  return target;
}

/**
 * Check if the given element has a special class.
 * @param {Element} element - The element to check.
 * @param {string} value - The class to search.
 * @returns {boolean} Returns `true` if the special class was found.
 */
export function hasClass(element, value) {
  return element.classList
    ? element.classList.contains(value)
    : element.className.indexOf(value) > -1;
}

/**
 * Add classes to the given element.
 * @param {Element} element - The target element.
 * @param {string} value - The classes to be added.
 */
export function addClass(element, value) {
  if (!value) {
    return;
  }

  if (isNumber(element.length)) {
    forEach(element, (elem) => {
      addClass(elem, value);
    });
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

/**
 * Remove classes from the given element.
 * @param {Element} element - The target element.
 * @param {string} value - The classes to be removed.
 */
export function removeClass(element, value) {
  if (!value) {
    return;
  }

  if (isNumber(element.length)) {
    forEach(element, (elem) => {
      removeClass(elem, value);
    });
    return;
  }

  if (element.classList) {
    element.classList.remove(value);
    return;
  }

  if (element.className.indexOf(value) >= 0) {
    element.className = element.className.replace(value, '');
  }
}

/**
 * Add or remove classes from the given element.
 * @param {Element} element - The target element.
 * @param {string} value - The classes to be toggled.
 * @param {boolean} added - Add only.
 */
export function toggleClass(element, value, added) {
  if (!value) {
    return;
  }

  if (isNumber(element.length)) {
    forEach(element, (elem) => {
      toggleClass(elem, value, added);
    });
    return;
  }

  // IE10-11 doesn't support the second parameter of `classList.toggle`
  if (added) {
    addClass(element, value);
  } else {
    removeClass(element, value);
  }
}

const REGEXP_HYPHENATE = /([a-z\d])([A-Z])/g;

/**
 * Transform the given string from camelCase to kebab-case
 * @param {string} value - The value to transform.
 * @returns {string} The transformed value.
 */
export function hyphenate(value) {
  return value.replace(REGEXP_HYPHENATE, '$1-$2').toLowerCase();
}

/**
 * Get data from the given element.
 * @param {Element} element - The target element.
 * @param {string} name - The data key to get.
 * @returns {string} The data value.
 */
export function getData(element, name) {
  if (isObject(element[name])) {
    return element[name];
  }

  if (element.dataset) {
    return element.dataset[name];
  }

  return element.getAttribute(`data-${hyphenate(name)}`);
}

/**
 * Set data to the given element.
 * @param {Element} element - The target element.
 * @param {string} name - The data key to set.
 * @param {string} data - The data value.
 */
export function setData(element, name, data) {
  if (isObject(data)) {
    element[name] = data;
  } else if (element.dataset) {
    element.dataset[name] = data;
  } else {
    element.setAttribute(`data-${hyphenate(name)}`, data);
  }
}

/**
 * Remove data from the given element.
 * @param {Element} element - The target element.
 * @param {string} name - The data key to remove.
 */
export function removeData(element, name) {
  if (isObject(element[name])) {
    try {
      delete element[name];
    } catch (error) {
      element[name] = undefined;
    }
  } else if (element.dataset) {
    // #128 Safari not allows to delete dataset property
    try {
      delete element.dataset[name];
    } catch (error) {
      element.dataset[name] = undefined;
    }
  } else {
    element.removeAttribute(`data-${hyphenate(name)}`);
  }
}

const REGEXP_SPACES = /\s\s*/;
const onceSupported = (() => {
  let supported = false;

  if (IS_BROWSER) {
    let once = false;
    const listener = () => {};
    const options = Object.defineProperty({}, 'once', {
      get() {
        supported = true;
        return once;
      },

      /**
       * This setter can fix a `TypeError` in strict mode
       * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Getter_only}
       * @param {boolean} value - The value to set
       */
      set(value) {
        once = value;
      },
    });

    WINDOW.addEventListener('test', listener, options);
    WINDOW.removeEventListener('test', listener, options);
  }

  return supported;
})();

/**
 * Remove event listener from the target element.
 * @param {Element} element - The event target.
 * @param {string} type - The event type(s).
 * @param {Function} listener - The event listener.
 * @param {Object} options - The event options.
 */
export function removeListener(element, type, listener, options = {}) {
  let handler = listener;

  type.trim().split(REGEXP_SPACES).forEach((event) => {
    if (!onceSupported) {
      const { listeners } = element;

      if (listeners && listeners[event] && listeners[event][listener]) {
        handler = listeners[event][listener];
        delete listeners[event][listener];

        if (Object.keys(listeners[event]).length === 0) {
          delete listeners[event];
        }

        if (Object.keys(listeners).length === 0) {
          delete element.listeners;
        }
      }
    }

    element.removeEventListener(event, handler, options);
  });
}

/**
 * Add event listener to the target element.
 * @param {Element} element - The event target.
 * @param {string} type - The event type(s).
 * @param {Function} listener - The event listener.
 * @param {Object} options - The event options.
 */
export function addListener(element, type, listener, options = {}) {
  let handler = listener;

  type.trim().split(REGEXP_SPACES).forEach((event) => {
    if (options.once && !onceSupported) {
      const { listeners = {} } = element;

      handler = (...args) => {
        delete listeners[event][listener];
        element.removeEventListener(event, handler, options);
        listener.apply(element, args);
      };

      if (!listeners[event]) {
        listeners[event] = {};
      }

      if (listeners[event][listener]) {
        element.removeEventListener(event, listeners[event][listener], options);
      }

      listeners[event][listener] = handler;
      element.listeners = listeners;
    }

    element.addEventListener(event, handler, options);
  });
}

/**
 * Dispatch event on the target element.
 * @param {Element} element - The event target.
 * @param {string} type - The event type(s).
 * @param {Object} data - The additional event data.
 * @returns {boolean} Indicate if the event is default prevented or not.
 */
export function dispatchEvent(element, type, data) {
  let event;

  // Event and CustomEvent on IE9-11 are global objects, not constructors
  if (isFunction(Event) && isFunction(CustomEvent)) {
    event = new CustomEvent(type, {
      detail: data,
      bubbles: true,
      cancelable: true,
    });
  } else {
    event = document.createEvent('CustomEvent');
    event.initCustomEvent(type, true, true, data);
  }

  return element.dispatchEvent(event);
}

/**
 * Check if the given year is a leap year.
 * @param {number} year - The year to check.
 * @returns {boolean} Returns `true` if the given year is a leap year, else `false`.
 */
export function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Get days number of the given month.
 * @param {number} year - The target year.
 * @param {number} month - The target month.
 * @returns {number} Returns days number.
 */
export function getDaysInMonth(year, month) {
  return [31, (isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
}

/**
 * Add leading zeroes to the given value
 * @param {number} value - The value to add.
 * @param {number} [length=1] - The number of the leading zeroes.
 * @returns {string} Returns converted value.
 */
export function addLeadingZero(value, length = 1) {
  const str = String(Math.abs(value));
  let i = str.length;
  let result = '';

  if (value < 0) {
    result += '-';
  }

  while (i < length) {
    i += 1;
    result += '0';
  }

  return result + str;
}

/**
 * Map token to type name
 * @param {string} token - The token to map.
 * @returns {string} Returns mapped type name.
 */
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

export const REGEXP_TOKENS = /(Y|M|D|H|m|s|S)\1*/g;

/**
 * Parse date format.
 * @param {string} format - The format to parse.
 * @returns {Object} Returns parsed format data.
 */
export function parseFormat(format) {
  let tokens = format.match(REGEXP_TOKENS);

  if (!tokens) {
    throw new Error('Invalid format.');
  }

  // Remove duplicate tokens (#22)
  tokens = tokens.filter((token, index) => tokens.indexOf(token) === index);

  const result = {
    tokens,
  };

  tokens.forEach((token) => {
    result[tokenToType(token)] = token;
  });

  return result;
}
