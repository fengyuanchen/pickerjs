describe('show (event)', () => {
  it('should trigger the `show` event', () => {
    const input = window.createInput();
    const picker = new Picker(input, {
      shown() {
        picker.hide();
      },
    });

    input.addEventListener('show', (event) => {
      expect(event.type).to.equal('show');
    });

    picker.show();
  });

  it('should not trigger the `shown` event when default prevented', (done) => {
    const input = window.createInput();
    const picker = new Picker(input, {
      shown() {
        expect.fail(1, 0);
      },
    });

    input.addEventListener('show', (event) => {
      event.preventDefault();
      setTimeout(() => {
        expect(picker.shown).to.be.false;
        done();
      }, 1000);
    });

    picker.show();
  });
});
