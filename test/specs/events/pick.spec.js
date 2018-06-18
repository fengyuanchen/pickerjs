describe('pick (event)', () => {
  it('should trigger the `pick` event', () => {
    const input = window.createInput();
    const picker = new Picker(input);

    input.addEventListener('pick', (event) => {
      expect(event.type).to.equal('pick');
    });
    input.addEventListener('change', (event) => {
      expect(event.type).to.equal('change');
    });
    expect(input.value).to.be.empty;
    picker.pick();
    expect(input.value).to.not.be.empty;
  });
});
