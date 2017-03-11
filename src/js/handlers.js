import * as $ from './utilities';

export default {
  focus(e) {
    e.target.blur();
    this.show();
  },

  click(e) {
    const action = $.getData(e.target, 'action');

    if (action === 'hide') {
      this.hide();
    } else if (action === 'pick') {
      this.pick();
    }
  },

  wheel(e) {
    const self = this;
    let target = e.target;

    if (target === self.grid) {
      return;
    }

    e.preventDefault();

    if (target.tagName.toLowerCase() === 'li') {
      target = target.parentNode;
    }

    if (target.tagName.toLowerCase() === 'ul') {
      target = target.parentNode;
    }

    const type = $.getData(target, 'type');

    if (e.deltaY < 0) {
      self.prev(type);
    } else {
      self.next(type);
    }
  },

  pointerdown(e) {
    const self = this;
    let target = e.target;

    if (target === self.grid) {
      return;
    }

    if (target.tagName.toLowerCase() === 'li') {
      target = target.parentNode;
    }

    if (target.tagName.toLowerCase() === 'ul') {
      target = target.parentNode;
    }

    const list = target.firstElementChild;
    const itemHeight = list.firstElementChild.offsetHeight;

    self.cell = {
      elem: target,
      list,
      moveY: 0,
      maxMoveY: itemHeight,
      minMoveY: itemHeight / 2,
      startY: e.changedTouches ? e.changedTouches[0].pageY : e.pageY,
      type: $.getData(target, 'type'),
    };
  },

  pointermove(e) {
    const self = this;
    const cell = self.cell;

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
      self.prev(cell.type);
    } else if (moveY <= -cell.maxMoveY) {
      self.next(cell.type);
    }
  },

  pointerup() {
    const self = this;
    const cell = self.cell;

    if (!cell) {
      return;
    }

    cell.list.style.top = 0;

    if (cell.moveY >= cell.minMoveY) {
      self.prev(cell.type);
    } else if (cell.moveY <= -cell.minMoveY) {
      self.next(cell.type);
    }

    self.cell = null;
  },

  keydown(e) {
    const self = this;

    if (self.shown && (e.key === 'Escape' || e.keyCode === 27)) {
      self.hide();
    }
  },
};
