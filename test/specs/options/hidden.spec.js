describe('hidden (option)', () => {
  it('should be `null` be default', () => {
    const input = window.createInput();
    const picker = new Picker(input);

    expect(picker.options.hidden).to.be.null;
  });

  it('should execute the `hidden` hook function', (done) => {
    const input = window.createInput();
    const picker = new Picker(input, {
      shown() {
        picker.hide();
      },

      hidden(event) {
        expect(event.type).to.equal('hidden');
        done();
      },
    });

    picker.show();
  });
});
