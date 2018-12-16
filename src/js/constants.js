export const IS_BROWSER = typeof window !== 'undefined';
export const WINDOW = IS_BROWSER ? window : {};
export const IS_TOUCH_DEVICE = IS_BROWSER ? 'ontouchstart' in WINDOW.document.documentElement : false;
export const HAS_POINTER_EVENT = IS_BROWSER ? 'PointerEvent' in WINDOW : false;
export const NAMESPACE = 'picker';
export const LANGUAGES = {};

// Actions
export const ACTION_HIDE = 'hide';
export const ACTION_NEXT = 'next';
export const ACTION_PICK = 'pick';
export const ACTION_PREV = 'prev';

// Classes
export const CLASS_OPEN = `${NAMESPACE}-open`;
export const CLASS_OPENED = `${NAMESPACE}-opened`;
export const CLASS_PICKED = `${NAMESPACE}-picked`;

// Data keys
// Add namespace to avoid to conflict to some other libraries.
export const DATA_ACTION = `${NAMESPACE}Action`;
export const DATA_TOKEN = 'token';
export const DATA_TYPE = 'type';
export const DATA_NAME = 'name';
export const DATA_VALUE = 'value';

// Events
export const EVENT_CLICK = 'click';
export const EVENT_FOCUS = 'focus';
export const EVENT_HIDDEN = 'hidden';
export const EVENT_HIDE = 'hide';
export const EVENT_KEY_DOWN = 'keydown';
export const EVENT_PICK = 'pick';
export const EVENT_TOUCH_START = IS_TOUCH_DEVICE ? 'touchstart' : 'mousedown';
export const EVENT_TOUCH_MOVE = IS_TOUCH_DEVICE ? 'touchmove' : 'mousemove';
export const EVENT_TOUCH_END = IS_TOUCH_DEVICE ? 'touchend touchcancel' : 'mouseup';
export const EVENT_POINTER_DOWN = HAS_POINTER_EVENT ? 'pointerdown' : EVENT_TOUCH_START;
export const EVENT_POINTER_MOVE = HAS_POINTER_EVENT ? 'pointermove' : EVENT_TOUCH_MOVE;
export const EVENT_POINTER_UP = HAS_POINTER_EVENT ? 'pointerup pointercancel' : EVENT_TOUCH_END;
export const EVENT_SHOW = 'show';
export const EVENT_SHOWN = 'shown';
export const EVENT_WHEEL = 'wheel mousewheel DOMMouseScroll';
