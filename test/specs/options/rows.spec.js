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

    expect(picker.picker.querySelectorAll('.picker-item[data-name="year"]').length).to.equal(rows + 2);
  });
});
