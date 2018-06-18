import {
  EVENT_CLICK,
  EVENT_FOCUS,
  EVENT_HIDDEN,
  EVENT_HIDE,
  EVENT_KEY_DOWN,
  EVENT_PICK,
  EVENT_POINTER_DOWN,
  EVENT_POINTER_MOVE,
  EVENT_POINTER_UP,
  EVENT_SHOW,
  EVENT_SHOWN,
  EVENT_WHEEL,
} from './constants';
import {
  addListener,
  isFunction,
  removeListener,
} from './utilities';

export default {
  bind() {
    const { element, options, grid } = this;

    if (isFunction(options.show)) {
      addListener(element, EVENT_SHOW, options.show);
    }

    if (isFunction(options.shown)) {
      addListener(element, EVENT_SHOWN, options.shown);
    }

    if (isFunction(options.hide)) {
      addListener(element, EVENT_HIDE, options.hide);
    }

    if (isFunction(options.hidden)) {
      addListener(element, EVENT_HIDDEN, options.hidden);
    }

    if (isFunction(options.pick)) {
      addListener(element, EVENT_PICK, options.pick);
    }

    addListener(element, EVENT_FOCUS, (this.onFocus = this.focus.bind(this)));
    addListener(element, EVENT_CLICK, this.onFocus);
    addListener(this.picker, EVENT_CLICK, (this.onClick = this.click.bind(this)));
    addListener(grid, EVENT_WHEEL, (this.onWheel = this.wheel.bind(this)));
    addListener(grid, EVENT_POINTER_DOWN, (this.onPointerDown = this.pointerdown.bind(this)));
    addListener(document, EVENT_POINTER_MOVE, (this.onPointerMove = this.pointermove.bind(this)));
    addListener(document, EVENT_POINTER_UP, (this.onPointerUp = this.pointerup.bind(this)));
    addListener(document, EVENT_KEY_DOWN, (this.onKeyDown = this.keydown.bind(this)));
  },

  unbind() {
    const { element, options, grid } = this;

    if (isFunction(options.show)) {
      removeListener(element, EVENT_SHOW, options.show);
    }

    if (isFunction(options.shown)) {
      removeListener(element, EVENT_SHOWN, options.shown);
    }

    if (isFunction(options.hide)) {
      removeListener(element, EVENT_HIDE, options.hide);
    }

    if (isFunction(options.hidden)) {
      removeListener(element, EVENT_HIDDEN, options.hidden);
    }

    if (isFunction(options.pick)) {
      removeListener(element, EVENT_PICK, options.pick);
    }

    removeListener(element, EVENT_FOCUS, this.onFocus);
    removeListener(element, EVENT_CLICK, this.onFocus);
    removeListener(this.picker, EVENT_CLICK, this.onClick);
    removeListener(grid, EVENT_WHEEL, this.onWheel);
    removeListener(grid, EVENT_POINTER_DOWN, this.onPointerDown);
    removeListener(document, EVENT_POINTER_MOVE, this.onPointerMove);
    removeListener(document, EVENT_POINTER_UP, this.onPointerUp);
    removeListener(document, EVENT_KEY_DOWN, this.onKeyDown);
  },
};
