describe('rows (option)', () => {
  it('should be `5` by default', () => {
    const input = window.createInput();
    const picker = new Picker(input);

    expect(picker.options.rows).to.equal(5);
  });

  it('should match the given rows', () => {
    const input = window.createInput();
    const rows = 7;
    const picker = new Picker(input, {
      rows,
    });

    expect(picker.picker.querySelectorAll('.picker-item[data-name="year"]').length - 2).to.equal(rows);
  });

  it('should plus 1 when the rows is even', () => {
    const input = window.createInput();
    const rows = 6;
    const picker = new Picker(input, {
      rows,
    });

    expect(picker.picker.querySelectorAll('.picker-item[data-name="year"]').length - 2).to.equal(rows + 1);
  });

  it('should support one row', () => {
    const input = window.createInput();
    const rows = 1;
    const picker = new Picker(input, {
      rows,
    });

    expect(picker.picker.querySelectorAll('.picker-item[data-name="year"]').length - 2).to.equal(rows);
  });

  it('should fall back to 5 if the value is NaN', () => {
    const input = window.createInput();
    const picker = new Picker(input, {
      rows: NaN,
    });

    expect(picker.picker.querySelectorAll('.picker-item[data-name="year"]').length - 2).to.equal(5);
  });
});
