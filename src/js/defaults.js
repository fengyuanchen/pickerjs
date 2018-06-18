export default {
  // Define the container for putting the picker.
  container: null,

  // The initial date. If not present, use the current date.
  date: null,

  // The date string format, also as the sorting order for columns.
  format: 'YYYY-MM-DD HH:mm',

  // Define the increment for each date / time part.
  increment: 1,

  // Enable inline mode.
  inline: false,

  // Define the language. (An ISO language code).
  language: '',

  // Months' name.
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],

  // Shorter months' name.
  monthsShort: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],

  // Define the number of rows for showing.
  rows: 5,

  // Define the text of the picker.
  text: {
    title: 'Pick a date / time',
    cancel: 'Cancel',
    confirm: 'OK',
  },

  // Translate date / time text.
  translate(type, text) {
    return text;
  },

  // Shortcuts of custom events.
  show: null,
  shown: null,
  hide: null,
  hidden: null,
  pick: null,
};
