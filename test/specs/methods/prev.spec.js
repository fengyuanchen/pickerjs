describe('prev (method)', () => {
  it('should switch to the previous date item', () => {
    const input = window.createInput();
    const date = '2048-10-24 5:12:2.56';
    const picker = new Picker(input, {
      date,
      format: 'YYYY-M-D H:m:s.S',
    });

    picker.prev('year');
    expect(picker.getDate().getFullYear()).to.equal(2047);
    picker.prev('month');
    expect(picker.getDate().getMonth()).to.equal(8);
    picker.prev('day');
    expect(picker.getDate().getDate()).to.equal(23);
    picker.prev('hour');
    expect(picker.getDate().getHours()).to.equal(4);
    picker.prev('minute');
    expect(picker.getDate().getMinutes()).to.equal(11);
    picker.prev('second');
    expect(picker.getDate().getSeconds()).to.equal(1);
    picker.prev('millisecond');
    expect(picker.getDate().getMilliseconds()).to.equal(55);
  });
});
