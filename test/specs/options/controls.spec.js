describe('controls (option)', () => {
  it('should be `false` by default', () => {
    const input = window.createInput();
    const picker = new Picker(input);

    expect(picker.options.controls).to.be.false;
  });

  it('should show the controls', () => {
    const input = window.createInput();
    const picker = new Picker(input, {
      controls: true,
    });

    expect(picker.picker.querySelectorAll('.picker-cell__control--prev').length).to.equal(5);
    expect(picker.picker.querySelectorAll('.picker-cell__control--next').length).to.equal(5);
  });

  it('should move to the previous year once click the prev control', () => {
    const input = window.createInput();
    const picker = new Picker(input, {
      controls: true,
    });

    const year = picker.getDate().getFullYear();

    picker.picker.querySelector('.picker-years .picker-cell__control--prev').click();
    expect(picker.getDate().getFullYear()).to.equal(year - 1);
  });

  it('should move to the next year once click the next control', () => {
    const input = window.createInput();
    const picker = new Picker(input, {
      controls: true,
    });

    const year = picker.getDate().getFullYear();

    picker.picker.querySelector('.picker-years .picker-cell__control--next').click();
    expect(picker.getDate().getFullYear()).to.equal(year + 1);
  });
});
