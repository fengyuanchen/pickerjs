# Picker.js

[![Build Status](https://img.shields.io/travis/fengyuanchen/pickerjs.svg)](https://travis-ci.org/fengyuanchen/pickerjs) [![Coverage Status](https://img.shields.io/codecov/c/github/fengyuanchen/pickerjs.svg)](https://codecov.io/gh/fengyuanchen/pickerjs) [![Downloads](https://img.shields.io/npm/dm/pickerjs.svg)](https://www.npmjs.com/package/pickerjs) [![Version](https://img.shields.io/npm/v/pickerjs.svg)](https://www.npmjs.com/package/pickerjs)

> JavaScript date time picker.

- [Website](https://fengyuanchen.github.io/pickerjs)

## Table of contents

- [Main](#main)
- [Getting started](#getting-started)
- [Options](#options)
- [Methods](#methods)
- [Events](#events)
- [No conflict](#no-conflict)
- [Browser support](#browser-support)
- [Versioning](#versioning)
- [License](#license)

## Main

```text
dist/
├── picker.css
├── picker.min.css   (compressed)
├── picker.js        (UMD)
├── picker.min.js    (UMD, compressed)
├── picker.common.js (CommonJS, default)
└── picker.esm.js    (ES Module)
```

## Getting started

### Installation

```shell
npm install pickerjs
```

Include files:

```html
<link  href="/path/to/picker.css" rel="stylesheet">
<script src="/path/to/picker.js"></script>
```

### Usage

#### Syntax

```js
new Picker(element[, options])
```

- **element**
  - Type: `HTMLElement`
  - The target element for picking.

- **options** (optional)
  - Type: `Object`
  - The options for picking. Check out the available [options](#options).

#### Example

```html
<input type="text" id="input">
```

```js
var input = document.getElementById('input');
var picker = new Picker(input, {
  format: 'YYYY/MM/DD HH:mm',
});
```

[⬆ Back to top](#table-of-contents)

## Options

You may set picker options with `new Picker(element, options)`.
If you want to change the global default options, You may use `Picker.setDefaults(options)`.

### container

- Type: `Element` or `Selector`
- Default: `null`

Define the container for putting the picker. If not present, the picker will be appended to the `document.body`.

```js
new Picker(element, {
  container: document.querySelector('.picker-container'),
});
```

Or

```js
new Picker(element, {
  container: '.picker-container',
});
```

### controls

- Type: `Boolean`
- Default: `false`

Indicate whether show the prev and next arrow controls on each column.

### date

- Type: `Date` or `String`
- Default: `null`

The initial date. If not present, use the current date.

```js
new Picker(element, {
  date: new Date(2048, 9, 24, 5, 12),
});
```

Or

```js
new Picker(element, {
  date: '2048-10-24 05:12',
});
```

### format

- Type: `String`
- Default: `'YYYY-MM-DD HH:mm'`
- Tokens:
  - `YYYY`: 4 digits year with leading zero
  - `YYY`: 3 digits year with leading zero
  - `YY`: 2 digits year with leading zero and be converted to a year near 2000
  - `Y`: Years with any number of digits and sign
  - `MMMM`: Month name
  - `MMM`: Short month name
  - `MM`: Month number with leading zero
  - `M`: Month number
  - `DD`: Day of month with leading zero
  - `D`: Day of month
  - `HH`: Hours with leading zero
  - `H`: Hours
  - `mm`: Minutes with leading zero
  - `m`: Minutes
  - `ss`: Seconds with leading zero
  - `s`: Seconds
  - `SSS`: Milliseconds with leading zero
  - `SS`: Milliseconds with leading zero
  - `S`: Milliseconds

The date string format, also as the sorting order of date time columns.

```js
new Picker(element, {
  date: '2048-10-24 05:12:02.056',
  format: 'YYYY-MM-DD HH:mm:ss.SSS',
});
```

Or

```js
new Picker(element, {
  date: 'Oct 24, 2048',
  format: 'MMM D, YYYY',
});
```

### headers

- Type: `Boolean`
- Default: `false`

Indicate whether show the column headers. The text content of each header is defined in the `text` option.

### increment

- Type: `Number` or `Object`
- Default: `1`

Define the increment for each date time part.

```js
new Picker(element, {
  increment: 10,
});
```

Or

```js
new Picker(element, {
  increment: {
    year: 1,
    month: 1,
    day: 1,
    hour: 1,
    minute: 10,
    second: 10,
    millisecond: 100,
  },
});
```

### inline

- Type: `Boolean`
- Default: `false`

Enable inline mode.

### language

- Type: `String` (ISO language code)
- Default: `''`

Define the language.

> You should define the language first. Check out the [i18n](i18n) folder for more information.

### months

- Type: `Array`
- Default: `['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']`

Months' name.

### monthsShort

- Type: `Array`
- Default: `['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']`

Short months' name.

### rows

- Type: `Number`
- Default: `5`

Define the number of rows for showing.

### text

- Type: `Object`
- Default:

  ```js
  {
    title: 'Pick a date and time',
    cancel: 'Cancel',
    confirm: 'OK',
    year: 'Year',
    month: 'Month',
    day: 'Day',
    hour: 'Hour',
    minute: 'Minute',
    second: 'Second',
    millisecond: 'Millisecond',
  }
  ```

Define the title and button text of the picker.

### translate

- Type: `Function`
- Default:

  ```js
  function (type, text) {
    return text;
  }
  ```

Translate date time text.

```js
new Picker(element, {
  translate(type, text) {
    const aliases = ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九'];

    return String(text).split('').map((n) => aliases[Number(n)]).join('');
  },
});
```

### show

- Type: `Function`
- Default: `null`

The shortcut of the `show` event.

### shown

- Type: `Function`
- Default: `null`

The shortcut of the `shown` event.

### hide

- Type: `Function`
- Default: `null`

The shortcut of the `hide` event.

### hidden

- Type: `Function`
- Default: `null`

The shortcut of the `hidden` event.

### pick

- Type: `Function`
- Default: `null`

The shortcut of the `pick` event.

[⬆ Back to top](#table-of-contents)

## Methods

If a method doesn't need to return any value, it will return the picker instance (`this`) for chain composition.

### show()

Show the picker.

### hide()

Hide the picker.

### prev(type)

- **type**:
  - Type: `String`
  - Options: `'year'`, `'month'`, `'day'`, `'hour'`, `'minute'`, `'second'`, `'millisecond'`
  - Date time type.

Pick the previous item.

### next(type)

- **type**: (the same as the `prev` method)

Pick the next item.

### pick()

Pick the current date to the target element.

### getDate([formatted])

- **formatted** (optional):
  - Type: `Boolean`
  - Format the date.
- (return value):
  - Type: `Date` or `String`

Get the current date.

```js
const picker = new Picker(element, {
  date: new Date(2048, 9, 24, 5, 12),
});

picker.getDate();
// > Sat Oct 24 2048 05:12:00 GMT+0800 (China Standard Time)

picker.getDate(true);
// > 2048-10-24 05:12
```

### setDate(date)

- **date**:
  - Type: `Date`
  - The new date.

Override the current date with a new date.

### update()

Update the picker with the current the element value / text.

### reset()

Reset the picker and the element value / text.

### parseDate(date)

- **date**:
  - Type: `String`
- (return value):
  - Type: `Date`

Parse a date string with the set date format.

```js
const picker = new Picker(element, options);

picker.parseDate('2048-10-24 05:12');
// > Sat Oct 24 2048 05:12:00 GMT+0800 (China Standard Time)
```

### formatDate(date)

- **date**:
  - Type: `Date`
- (return value):
  - Type: `String`
  - The formatted date string.

Format a date object to a string with the set date format.

```js
const picker = new Picker(element, options);

picker.formatDate(new Date(2048, 9, 24, 5, 12));
// > 2048-10-24 05:12
```

### destroy()

Destroy the picker and remove the instance from the target element.

[⬆ Back to top](#table-of-contents)

## Events

### show

This event fires when a picker modal starts to show.

> Only available in non-inline mode.

### shown

This event fires when a picker modal has shown.

> Only available in non-inline mode.

### hide

This event fires when a picker modal starts to hide.

> Only available in non-inline mode.

### hidden

This event fires when a picker modal has hidden.

> Only available in non-inline mode.

### pick

This event fires when pick the current date to the target element.

> If the target element is an `<input>` or `<textarea>` element, then a `change` event will be triggered too.

[⬆ Back to top](#table-of-contents)

## No conflict

If you have to use other picker with the same namespace, just call the `Picker.noConflict` static method to revert to it.

```html
<script src="other-picker.js"></script>
<script src="picker.js"></script>
<script>
  Picker.noConflict();
  // Code that uses other `Picker` can follow here.
</script>
```

## Browser support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)
- Edge (latest)
- Internet Explorer 9+

## Versioning

Maintained under the [Semantic Versioning guidelines](https://semver.org).

## License

[MIT](https://opensource.org/licenses/MIT) © [Chen Fengyuan](https://chenfengyuan.com)

[⬆ Back to top](#table-of-contents)
