describe('show (method)', () => {
  it('should show the picker', (done) => {
    const input = window.createInput();
    const picker = new Picker(input, {
      shown() {
        picker.hide();
        done();
      },
    });

    expect(picker.shown).to.be.false;
    picker.show();
    expect(picker.shown).to.be.true;
  });

  it('should show the picker immediately', () => {
    const input = window.createInput();
    const picker = new Picker(input, {
      shown() {
        picker.hide();
      },
    });

    expect(picker.shown).to.be.false;
    picker.show(true);
    expect(picker.shown).to.be.false;
  });
});
