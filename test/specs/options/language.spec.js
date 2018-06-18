describe('language (option)', () => {
  it('should be empty by default', () => {
    const input = window.createInput();
    const picker = new Picker(input);

    expect(picker.options.language).to.be.empty;
  });

  it('should use the given language', () => {
    const input = window.createInput();
    const picker = new Picker(input, {
      language: 'en-US',
    });

    expect(picker.options.format).to.equal(Picker.languages['en-US'].format);
  });
});
