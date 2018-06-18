import { getData } from './utilities';

export default {
  focus(e) {
    e.target.blur();
    this.show();
  },

  click(e) {
    const action = getData(e.target, 'action');

    if (action === 'hide') {
      this.hide();
    } else if (action === 'pick') {
      this.pick();
    }
  },

  wheel(e) {
    let { target } = e;

    if (target === this.grid) {
      return;
    }

    e.preventDefault();

    if (target.tagName.toLowerCase() === 'li') {
      target = target.parentNode;
    }

    if (target.tagName.toLowerCase() === 'ul') {
      target = target.parentNode;
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

    if (target === this.grid) {
      return;
    }

    // This line is required for preventing page scrolling in iOS browsers
    e.preventDefault();

    if (target.tagName.toLowerCase() === 'li') {
      target = target.parentNode;
    }

    if (target.tagName.toLowerCase() === 'ul') {
      target = target.parentNode;
    }

    const list = target.firstElementChild;
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
