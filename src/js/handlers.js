import { NAMESPACE } from './constants';
import { getData } from './utilities';

export default {
  focus(e) {
    e.target.blur();
    this.show();
  },

  click(event) {
    const { target } = event;
    const action = getData(target, 'action');

    switch (action) {
      case 'hide':
        this.hide();
        break;

      case 'pick':
        this.pick();
        break;

      case 'prev':
      case 'next':
        this[action](getData(target.parentElement, 'type'));
        break;

      default:
    }
  },

  wheel(e) {
    let { target } = e;

    if (target === this.grid) {
      return;
    }

    e.preventDefault();

    while (target.parentElement && target.parentElement !== this.grid) {
      target = target.parentElement;
    }

    const type = getData(target, 'type');

    if (e.deltaY < 0) {
      this.prev(type);
    } else {
      this.next(type);
    }
  },

  pointerdown(e) {
    let { target } = e;

    if (target === this.grid || getData(target, 'action')) {
      return;
    }

    // This line is required for preventing page scrolling in iOS browsers
    e.preventDefault();

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
      startY: e.changedTouches ? e.changedTouches[0].pageY : e.pageY,
      type: getData(target, 'type'),
    };
  },

  pointermove(e) {
    const { cell } = this;

    if (!cell) {
      return;
    }

    e.preventDefault();

    const endY = e.changedTouches ? e.changedTouches[0].pageY : e.pageY;
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

  pointerup(e) {
    const { cell } = this;

    if (!cell) {
      return;
    }

    e.preventDefault();
    cell.list.style.top = 0;

    if (cell.moveY >= cell.minMoveY) {
      this.prev(cell.type);
    } else if (cell.moveY <= -cell.minMoveY) {
      this.next(cell.type);
    }

    this.cell = null;
  },

  keydown(e) {
    if (this.shown && (e.key === 'Escape' || e.keyCode === 27)) {
      this.hide();
    }
  },
};
