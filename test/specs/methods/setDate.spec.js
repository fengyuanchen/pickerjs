describe('setDate (method)', () => {
  it('should set date correctly', () => {
    const input = window.createInput();
    const date = new Date(2048, 9, 24, 5, 12);
    const picker = new Picker(input, {
      date,
    });

    picker.setDate(date);
    expect(picker.getDate().getTime()).to.equal(date.getTime());

    const date2 = '1024-05-12 02:56';

    picker.setDate(date2);
    expect(picker.getDate(true)).to.equal(date2);
  });
});
