export const IN_BROWSER = typeof window !== 'undefined';
export const WINDOW = IN_BROWSER ? window : {};
export const NAMESPACE = 'picker';
export const LANGUAGES = {};

// Classes
export const CLASS_OPEN = `${NAMESPACE}-open`;
export const CLASS_OPENED = `${NAMESPACE}-opened`;
export const CLASS_PICKED = `${NAMESPACE}-picked`;

// Events
export const EVENT_CLICK = 'click';
export const EVENT_FOCUS = 'focus';
export const EVENT_HIDDEN = 'hidden';
export const EVENT_HIDE = 'hide';
export const EVENT_KEY_DOWN = 'keydown';
export const EVENT_PICK = 'pick';
export const EVENT_POINTER_DOWN = WINDOW.PointerEvent ? 'pointerdown' : 'touchstart mousedown';
export const EVENT_POINTER_MOVE = WINDOW.PointerEvent ? 'pointermove' : 'touchmove mousemove';
export const EVENT_POINTER_UP = WINDOW.PointerEvent ? 'pointerup pointercancel' : 'touchend touchcancel mouseup';
export const EVENT_SHOW = 'show';
export const EVENT_SHOWN = 'shown';
export const EVENT_WHEEL = 'wheel mousewheel DOMMouseScroll';
