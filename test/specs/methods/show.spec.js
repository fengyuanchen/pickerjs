describe('show (method)', () => {
  it('should show the picker', () => {
    const input = window.createInput();
    const picker = new Picker(input, {
      shown() {
        picker.hide();
      },
    });

    expect(picker.shown).to.be.false;
    picker.show();
    expect(picker.shown).to.be.true;
  });
});
