describe('pick (option)', () => {
  it('should be `null` be default', () => {
    const input = window.createInput();
    const picker = new Picker(input);

    expect(picker.options.pick).to.be.null;
  });

  it('should execute the `pick` hook function', () => {
    const input = window.createInput();
    const picker = new Picker(input, {
      pick(event) {
        expect(event.type).to.equal('pick');
      },
    });

    expect(input.value).to.be.empty;
    picker.pick();
    expect(input.value).to.not.be.empty;
    picker.destroy();
  });
});
