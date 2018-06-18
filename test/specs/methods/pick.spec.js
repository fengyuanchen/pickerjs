describe('pick (method)', () => {
  it('should pick the date to the input element', () => {
    const input = window.createInput();
    const picker = new Picker(input);

    expect(input.value).to.equal('');
    picker.pick();
    expect(input.value).to.equal(picker.getDate(true));
  });
});
