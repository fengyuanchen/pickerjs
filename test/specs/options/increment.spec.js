describe('increment (option)', () => {
  it('should be `1` by default', () => {
    const input = window.createInput();
    const picker = new Picker(input);

    expect(picker.options.increment).to.equal(1);
  });

  it('should support number value', () => {
    const input = window.createInput();

    // Be sure that `date.getMonth() + increment` should less than `12` and so on.
    const date = new Date(2048, 1, 1, 1, 1, 1, 1, 1);
    const increment = 2;
    const picker = new Picker(input, {
      date,
      format: 'YYYY-M-D H:m:s.S',
      increment,
    });

    expect(Number(picker.picker.querySelector('.picker-picked[data-name="year"]').nextElementSibling.dataset.value)).to.equal(date.getFullYear() + increment);
    expect(Number(picker.picker.querySelector('.picker-picked[data-name="month"]').nextElementSibling.dataset.value)).to.equal(date.getMonth() + increment);
    expect(Number(picker.picker.querySelector('.picker-picked[data-name="day"]').nextElementSibling.dataset.value)).to.equal(date.getDate() + increment);
    expect(Number(picker.picker.querySelector('.picker-picked[data-name="hour"]').nextElementSibling.dataset.value)).to.equal(date.getHours() + increment);
    expect(Number(picker.picker.querySelector('.picker-picked[data-name="minute"]').nextElementSibling.dataset.value)).to.equal(date.getMinutes() + increment);
    expect(Number(picker.picker.querySelector('.picker-picked[data-name="second"]').nextElementSibling.dataset.value)).to.equal(date.getSeconds() + increment);
    expect(Number(picker.picker.querySelector('.picker-picked[data-name="millisecond"]').nextElementSibling.dataset.value)).to.equal(date.getMilliseconds() + increment);
  });

  it('should support object value', () => {
    const input = window.createInput();

    // Be sure that `date.getMonth() + increment` should less than `12` and so on.
    const date = new Date(2048, 1, 1, 1, 1, 1, 1, 1);
    const increment = 2;
    const picker = new Picker(input, {
      date,
      format: 'YYYY-M-D H:m:s.S',
      increment: {
        year: increment,
        month: increment,
        day: increment,
        hour: increment,
        minute: increment,
        second: increment,
        millisecond: increment,
      },
    });

    expect(Number(picker.picker.querySelector('.picker-picked[data-name="year"]').nextElementSibling.dataset.value)).to.equal(date.getFullYear() + increment);
    expect(Number(picker.picker.querySelector('.picker-picked[data-name="month"]').nextElementSibling.dataset.value)).to.equal(date.getMonth() + increment);
    expect(Number(picker.picker.querySelector('.picker-picked[data-name="day"]').nextElementSibling.dataset.value)).to.equal(date.getDate() + increment);
    expect(Number(picker.picker.querySelector('.picker-picked[data-name="hour"]').nextElementSibling.dataset.value)).to.equal(date.getHours() + increment);
    expect(Number(picker.picker.querySelector('.picker-picked[data-name="minute"]').nextElementSibling.dataset.value)).to.equal(date.getMinutes() + increment);
    expect(Number(picker.picker.querySelector('.picker-picked[data-name="second"]').nextElementSibling.dataset.value)).to.equal(date.getSeconds() + increment);
    expect(Number(picker.picker.querySelector('.picker-picked[data-name="millisecond"]').nextElementSibling.dataset.value)).to.equal(date.getMilliseconds() + increment);
  });
});
