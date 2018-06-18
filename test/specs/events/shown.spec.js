describe('shown (event)', () => {
  it('should trigger the `shown` event', (done) => {
    const input = window.createInput();
    const picker = new Picker(input);

    input.addEventListener('shown', (event) => {
      expect(event.type).to.equal('shown');
      done();
      picker.hide();
    });
    picker.show();
  });
});
