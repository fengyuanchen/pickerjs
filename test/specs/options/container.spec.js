describe('container (option)', () => {
  it('should be `null` by default', () => {
    const input = window.createInput();
    const picker = new Picker(input);

    expect(picker.options.container).to.be.null;
  });

  it('should support element', () => {
    const container = window.createContainer();
    const input = window.createInput();
    const picker = new Picker(input, {
      container,
      inline: true,
    });

    expect(picker.picker.parentElement).to.equal(container);
  });

  it('should support selector', () => {
    const container = window.createContainer();

    container.className = 'js-option-container';

    const input = window.createInput();
    const picker = new Picker(input, {
      container: '.js-option-container',
      inline: true,
    });

    expect(picker.picker.parentElement).to.equal(container);
  });

  it('should use self as container', () => {
    const container = window.createContainer();
    const picker = new Picker(container, {
      inline: true,
    });

    expect(picker.picker.parentElement).to.equal(container);
  });
});
