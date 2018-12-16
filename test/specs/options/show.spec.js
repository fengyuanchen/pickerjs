describe('show (option)', () => {
  it('should be `null` be default', () => {
    const input = window.createInput();
    const picker = new Picker(input);

    expect(picker.options.show).to.be.null;
  });

  it('should execute the `show` hook function', () => {
    const input = window.createInput();
    const picker = new Picker(input, {
      show(event) {
        expect(event.type).to.equal('show');
      },

      shown() {
        picker.hide();
      },

      hidden() {
        picker.destroy();
      },
    });

    picker.show();
  });

  it('should not execute the `shown` hook function when default prevented', (done) => {
    const input = window.createInput();
    const picker = new Picker(input, {
      show(event) {
        event.preventDefault();

        setTimeout(() => {
          expect(picker.shown).to.be.false;
          done();
        }, 1000);
      },

      shown() {
        expect.fail(1, 0);
      },
    });

    picker.show();
  });
});
