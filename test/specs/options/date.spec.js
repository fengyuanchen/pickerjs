describe('date (option)', () => {
  it('should be `null` by default', () => {
    const input = window.createInput();
    const picker = new Picker(input);

    expect(picker.options.date).to.be.null;
  });

  it('should support object value', () => {
    const input = window.createInput();
    const time = Date.now() + 3600000;
    const picker = new Picker(input, {
      date: new Date(time),
    });

    expect(picker.getDate().getTime()).to.equal(time);
  });

  it('should support string value', () => {
    const input = window.createInput();
    const date = '2222-02-22 22:22';
    const picker = new Picker(input, {
      date,
    });

    expect(picker.getDate(true)).to.equal(date);
  });
});
