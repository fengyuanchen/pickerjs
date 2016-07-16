export default (
  '<div class="picker" data-action="hide">' +
    '<div class="picker-content">' +
      '<div class="picker-header">' +
        '<h4 class="picker-title">{{ title }}</h4>' +
        '<button data-action="hide" class="picker-close" type="button">&times;</button>' +
      '</div>' +
      '<div class="picker-body">' +
        '<div class="picker-grid"></div>' +
      '</div>' +
      '<div class="picker-footer">' +
        '<button class="picker-cancel" data-action="hide" type="button">{{ cancel }}</button>' +
        '<button class="picker-confirm" data-action="pick" type="button">{{ confirm }}</button>' +
      '</div>' +
    '</div>' +
  '</div>'
);
