describe('hide (event)', () => {
  it('should trigger the `hide` event', (done) => {
    const input = window.createInput();
    const picker = new Picker(input, {
      shown() {
        picker.hide();
      },
    });

    input.addEventListener('hide', (event) => {
      expect(event.type).to.equal('hide');
      done();
    });

    picker.show();
  });

  it('should not trigger the `hidden` event when default prevented', (done) => {
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

      hidden() {
        expect.fain(1, 0);
      },
    });

    input.addEventListener('hide', (event) => {
      event.preventDefault();
    });
    picker.show();
  });
});
