describe('noConflict', () => {
  it('should be a static method', () => {
    expect(Picker.noConflict).to.be.a('function');
  });

  it('should return the Picker class itself', () => {
    const { Picker } = window;
    const ImagePicker = Picker.noConflict();

    expect(ImagePicker).to.equal(Picker);
    expect(window.Picker).to.be.undefined;

    // Reverts it for the rest test suites
    window.Picker = ImagePicker;
  });
});
