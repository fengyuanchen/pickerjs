describe('reset (method)', () => {
  it('should reset the value of the input element', () => {
    const input = window.createInput();
    const initialValue = '1024-05-12 02:56';

    input.value = initialValue;

    const value = '2048-10-24 05:12';
    const picker = new Picker(input);

    picker.setDate(value).pick();
    expect(picker.getDate(true)).to.equal(value);
    expect(input.value).to.equal(value);
    picker.reset();
    expect(picker.getDate(true)).to.equal(initialValue);
    expect(input.value).to.equal(initialValue);
  });
});
