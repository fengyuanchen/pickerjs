import * as $ from './utilities';

// Native events
const EVENT_MOUSE_DOWN = 'mousedown touchstart pointerdown MSPointerDown';
const EVENT_MOUSE_MOVE = 'mousemove touchmove pointermove MSPointerMove';
const EVENT_MOUSE_UP = 'mouseup touchend touchcancel' +
  ' pointerup pointercancel MSPointerUp MSPointerCancel';
const EVENT_KEY_DOWN = 'keydown';
const EVENT_WHEEL = 'wheel';
const EVENT_CLICK = 'click';
const EVENT_FOCUS = 'focus';

// Custom events
const EVENT_SHOW = 'show';
const EVENT_SHOWN = 'shown';
const EVENT_HIDE = 'hide';
const EVENT_HIDDEN = 'hidden';
const EVENT_PICK = 'pick';

export default {
  bind() {
    const self = this;
    const element = self.element;
    const options = self.options;
    const picker = self.picker;
    const grid = self.grid;

    if ($.isFunction(options.show)) {
      $.addListener(element, EVENT_SHOW, options.show);
    }

    if ($.isFunction(options.shown)) {
      $.addListener(element, EVENT_SHOWN, options.shown);
    }

    if ($.isFunction(options.hide)) {
      $.addListener(element, EVENT_HIDE, options.hide);
    }

    if ($.isFunction(options.hidden)) {
      $.addListener(element, EVENT_HIDDEN, options.hidden);
    }

    if ($.isFunction(options.pick)) {
      $.addListener(element, EVENT_PICK, options.pick);
    }

    $.addListener(element, EVENT_FOCUS, (self.onFocus = self.focus.bind(self)));
    $.addListener(element, EVENT_CLICK, self.onFocus);
    $.addListener(picker, EVENT_CLICK, (self.onClick = self.click.bind(self)));
    $.addListener(grid, EVENT_WHEEL, (self.onWheel = self.wheel.bind(self)));
    $.addListener(grid, EVENT_MOUSE_DOWN, (self.onMouseDown = self.mousedown.bind(self)));
    $.addListener(document, EVENT_MOUSE_MOVE, (self.onMouseMove = self.mousemove.bind(self)));
    $.addListener(document, EVENT_MOUSE_UP, (self.onMouseUp = self.mouseup.bind(self)));
    $.addListener(document, EVENT_KEY_DOWN, (self.onKeyDown = self.keydown.bind(self)));
  },

  unbind() {
    const self = this;
    const element = self.element;
    const options = self.options;
    const picker = self.picker;
    const grid = self.grid;

    if ($.isFunction(options.show)) {
      $.removeListener(element, EVENT_SHOW, options.show);
    }

    if ($.isFunction(options.shown)) {
      $.removeListener(element, EVENT_SHOWN, options.shown);
    }

    if ($.isFunction(options.hide)) {
      $.removeListener(element, EVENT_HIDE, options.hide);
    }

    if ($.isFunction(options.hidden)) {
      $.removeListener(element, EVENT_HIDDEN, options.hidden);
    }

    if ($.isFunction(options.pick)) {
      $.removeListener(element, EVENT_PICK, options.pick);
    }

    $.removeListener(element, EVENT_FOCUS, self.onFocus);
    $.removeListener(element, EVENT_CLICK, self.onFocus);
    $.removeListener(picker, EVENT_CLICK, self.onClick);
    $.removeListener(grid, EVENT_WHEEL, self.onWheel);
    $.removeListener(grid, EVENT_MOUSE_DOWN, self.onMouseDown);
    $.removeListener(document, EVENT_MOUSE_MOVE, self.onMouseMove);
    $.removeListener(document, EVENT_MOUSE_UP, self.onMouseUp);
    $.removeListener(document, EVENT_KEY_DOWN, self.onKeyDown);
  },
};
