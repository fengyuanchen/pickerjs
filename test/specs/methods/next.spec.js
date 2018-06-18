describe('next (method)', () => {
  it('should switch to the next date item', () => {
    const input = window.createInput();
    const date = '2048-10-24 5:12:2.56';
    const picker = new Picker(input, {
      date,
      format: 'YYYY-M-D H:m:s.S',
    });

    picker.next('year');
    expect(picker.getDate().getFullYear()).to.equal(2049);
    picker.next('month');
    expect(picker.getDate().getMonth()).to.equal(10);
    picker.next('day');
    expect(picker.getDate().getDate()).to.equal(25);
    picker.next('hour');
    expect(picker.getDate().getHours()).to.equal(6);
    picker.next('minute');
    expect(picker.getDate().getMinutes()).to.equal(13);
    picker.next('second');
    expect(picker.getDate().getSeconds()).to.equal(3);
    picker.next('millisecond');
    expect(picker.getDate().getMilliseconds()).to.equal(57);
  });
});
