describe('hide (option)', () => {
  it('should be `null` be default', () => {
    const input = window.createInput();
    const picker = new Picker(input);

    expect(picker.options.hide).to.be.null;
  });

  it('should execute the `hide` hook function', (done) => {
    const input = window.createInput();
    const picker = new Picker(input, {
      shown() {
        picker.hide();
      },

      hide(event) {
        expect(event.type).to.equal('hide');
        done();
      },
    });

    picker.show();
  });

  it('should not execute the `hidden` hook function when default prevented', (done) => {
    const input = window.createInput();
    const picker = new Picker(input, {
      shown() {
        picker.hide();

        setTimeout(() => {
          expect(picker.shown).to.be.true;
          done();
          picker.destroy();
        }, 1000);
      },

      hide(event) {
        event.preventDefault();
      },

      hidden() {
        expect.fail(1, 0);
      },
    });

    picker.show();
  });
});
