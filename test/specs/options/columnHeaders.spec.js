describe('showGridHeaders (option)', () => {
  it('should be `false` by default', () => {
    const input = window.createInput();
    const picker = new Picker(input);

    expect(picker.options.showGridHeaders).to.be.false;
  });

  it('should be hidden by default element', () => {
    const container = window.createContainer();
    const input = window.createInput();
    new Picker(input, {
      container,
    });

    expect(container.getElementsByClassName('picker-column-description')[0].classList.contains('invisible')).to.be.true;
  });
  it('should render header when showGridHeaders is true', () => {
    const container = window.createContainer();
    const input = window.createInput();
    new Picker(input, {
      container,
      showGridHeaders:true
    });

    expect(container.getElementsByClassName('picker-column-description')[0].classList.contains('invisible')).to.be.false;
  });

});
