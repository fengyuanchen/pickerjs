describe('hidden (event)', () => {
  it('should trigger the `hidden` event', (done) => {
    const input = window.createInput();
    const picker = new Picker(input, {
      shown() {
        picker.hide();
      },
    });

    input.addEventListener('hidden', (event) => {
      expect(event.type).to.equal('hidden');
      done();
    });

    picker.show();
  });
});
