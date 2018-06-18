describe('update (method)', () => {
  it('should update the picker when the value of the input element changed', () => {
    const input = window.createInput();
    const value = '2048-10-24 05:12';
    const picker = new Picker(input);

    input.value = value;
    picker.update();
    expect(picker.getDate(true)).to.equal(value);
  });
});
