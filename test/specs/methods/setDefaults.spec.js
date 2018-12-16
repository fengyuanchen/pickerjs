describe('setDefaults', () => {
  it('should be a static method', () => {
    expect(Picker.setDefaults).to.be.a('function');
  });

  it('should change the global default options', () => {
    Picker.setDefaults({
      controls: true,
    });

    const input = window.createInput();
    const picker = new Picker(input, {
      controls: true,
    });

    expect(picker.picker.querySelectorAll('.picker-cell__control--prev').length).to.equal(5);
    expect(picker.picker.querySelectorAll('.picker-cell__control--next').length).to.equal(5);

    // Reverts it for the rest test suites
    Picker.setDefaults({
      controls: false,
    });
  });
});
