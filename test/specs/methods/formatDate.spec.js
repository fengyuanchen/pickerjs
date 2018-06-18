describe('formatDate (method)', () => {
  it('should format the given date correctly', () => {
    const input = window.createInput();
    const picker = new Picker(input);

    expect(picker.formatDate('Invalid Date')).to.equal('');
    expect(picker.formatDate(new Date(2048, 9, 24, 5, 12))).to.equal('2048-10-24 05:12');
  });
});
