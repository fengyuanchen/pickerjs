describe('destroy (method)', () => {
  it('should destroy the picker correctly', () => {
    const container = window.createContainer();
    const input = window.createInput();
    const picker = new Picker(input, {
      container,
      inline: true,
    });

    expect(input.picker).to.equal(picker);
    expect(container.childElementCount).to.equal(1);
    picker.destroy();
    expect(input.picker).to.be.undefined;
    expect(container.childElementCount).to.equal(0);
  });
});
