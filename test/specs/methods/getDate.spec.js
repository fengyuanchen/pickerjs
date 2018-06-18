describe('getDate (method)', () => {
  it('should get a date object', () => {
    const input = window.createInput();
    const date = new Date(2048, 9, 24, 5, 12);
    const picker = new Picker(input, {
      date,
    });

    expect(picker.getDate().getTime()).to.equal(date.getTime());
  });

  it('should get a formatted date', () => {
    const input = window.createInput();
    const picker = new Picker(input, {
      date: new Date(2048, 9, 24, 5, 12),
    });

    expect(picker.getDate(true)).to.equal('2048-10-24 05:12');
  });
});
