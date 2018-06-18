describe('parseDate (method)', () => {
  it('should parse date correctly', () => {
    const input = window.createInput();
    const date = '2048-10-24 05:12';
    const picker = new Picker(input);

    expect(picker.formatDate(picker.parseDate(date))).to.equal(date);
  });
});
