describe('shown (option)', () => {
  it('should be `null` be default', () => {
    const input = window.createInput();
    const picker = new Picker(input);

    expect(picker.options.shown).to.be.null;
  });

  it('should execute the `shown` hook function', (done) => {
    const input = window.createInput();
    const picker = new Picker(input, {
      shown(event) {
        expect(event.type).to.equal('shown');
        done();
        picker.hide();
      },
    });

    picker.show();
  });
});
