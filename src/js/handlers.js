import {
  ACTION_HIDE,
  ACTION_NEXT,
  ACTION_PICK,
  ACTION_PREV,
  DATA_ACTION,
  DATA_TYPE,
  NAMESPACE,
} from './constants';
import { getData } from './utilities';

export default {
  focus(event) {
    event.target.blur();
    this.show();
  },

  click(event) {
    const { target } = event;
    const action = getData(target, DATA_ACTION);

    switch (action) {
      case ACTION_HIDE:
        this.hide();
        break;

      case ACTION_PICK:
        this.pick();
        break;

      case ACTION_PREV:
      case ACTION_NEXT:
        this[action](getData(target.parentElement, DATA_TYPE));
        break;

      default:
    }
  },

  wheel(event) {
    let { target } = event;

    if (target === this.grid) {
      return;
    }

    event.preventDefault();

    while (target.parentElement && target.parentElement !== this.grid) {
      target = target.parentElement;
    }

    const type = getData(target, DATA_TYPE);

    if (event.deltaY < 0) {
      this.prev(type);
    } else {
      this.next(type);
    }
  },

  pointerdown(event) {
    let { target } = event;

    if (target === this.grid || getData(target, DATA_ACTION)) {
      return;
    }

    // This line is required for preventing page scrolling in iOS browsers
    event.preventDefault();

    while (target.parentElement && target.parentElement !== this.grid) {
      target = target.parentElement;
    }

    const list = target.querySelector(`.${NAMESPACE}-list`);
    const itemHeight = list.firstElementChild.offsetHeight;

    this.cell = {
      elem: target,
      list,
      moveY: 0,
      maxMoveY: itemHeight,
      minMoveY: itemHeight / 2,
      startY: event.changedTouches ? event.changedTouches[0].pageY : event.pageY,
      type: getData(target, DATA_TYPE),
    };
  },

  pointermove(event) {
    const { cell } = this;

    if (!cell) {
      return;
    }

    event.preventDefault();

    const endY = event.changedTouches ? event.changedTouches[0].pageY : event.pageY;
    const moveY = cell.moveY + (endY - cell.startY);

    cell.startY = endY;
    cell.moveY = moveY;

    if (Math.abs(moveY) < cell.maxMoveY) {
      cell.list.style.top = `${moveY}px`;
      return;
    }

    cell.list.style.top = 0;
    cell.moveY = 0;

    if (moveY >= cell.maxMoveY) {
      this.prev(cell.type);
    } else if (moveY <= -cell.maxMoveY) {
      this.next(cell.type);
    }
  },

  pointerup(event) {
    const { cell } = this;

    if (!cell) {
      return;
    }

    event.preventDefault();
    cell.list.style.top = 0;

    if (cell.moveY >= cell.minMoveY) {
      this.prev(cell.type);
    } else if (cell.moveY <= -cell.minMoveY) {
      this.next(cell.type);
    }

    this.cell = null;
  },

  keydown(event) {
    if (this.shown && (event.key === 'Escape' || event.keyCode === 27)) {
      this.hide();
    }
  },
};
