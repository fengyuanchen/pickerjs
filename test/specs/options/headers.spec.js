describe('headers (option)', () => {
  it('should be `false` by default', () => {
    const input = window.createInput();
    const picker = new Picker(input);

    expect(picker.options.headers).to.be.false;
  });

  it('should show the column headers', () => {
    const input = window.createInput();
    const picker = new Picker(input, {
      headers: true,
    });

    expect(picker.picker.querySelector('.picker-years .picker-cell__header').textContent).to.equal('Year');
    expect(picker.picker.querySelector('.picker-months .picker-cell__header').textContent).to.equal('Month');
    expect(picker.picker.querySelector('.picker-days .picker-cell__header').textContent).to.equal('Day');
  });

  it('should show the custom column headers', () => {
    const input = window.createInput();
    const picker = new Picker(input, {
      headers: true,
      text: {
        year: '年',
        month: '月',
      },
    });

    expect(picker.picker.querySelector('.picker-years .picker-cell__header').textContent).to.equal('年');
    expect(picker.picker.querySelector('.picker-months .picker-cell__header').textContent).to.equal('月');
    expect(picker.picker.querySelector('.picker-days .picker-cell__header').textContent).to.equal('Day');
  });

  it('should fall back to default headers even though the values are undefined', () => {
    const input = window.createInput();
    const picker = new Picker(input, {
      headers: true,
      text: {
        year: undefined,
        month: undefined,
        day: undefined,
      },
    });

    expect(picker.picker.querySelector('.picker-years .picker-cell__header').textContent).to.equal('Year');
    expect(picker.picker.querySelector('.picker-months .picker-cell__header').textContent).to.equal('Month');
    expect(picker.picker.querySelector('.picker-days .picker-cell__header').textContent).to.equal('Day');
  });
});
