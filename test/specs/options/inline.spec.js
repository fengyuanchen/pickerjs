describe('inline (option)', () => {
  it('should be `false` by default', () => {
    const input = window.createInput();
    const picker = new Picker(input);

    expect(picker.options.inline).to.be.false;
  });

  it('should be inline', () => {
    const container = window.createContainer();
    const picker = new Picker(container, {
      inline: true,
    });

    expect(picker.picker.parentElement).to.equal(container);
  });

  it('should work with the `container` option', () => {
    const container = window.createContainer();
    const input = window.createInput();
    const picker = new Picker(input, {
      container,
      inline: true,
    });

    expect(picker.picker.parentElement).to.equal(container);
  });
});
