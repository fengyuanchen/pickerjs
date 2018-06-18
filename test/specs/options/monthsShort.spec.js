describe('monthsShort (option)', () => {
  it('should use the given short months', () => {
    const input = window.createInput();
    const date = '6月';
    const picker = new Picker(input, {
      date,
      format: 'MMM',
      monthsShort: [
        '1月',
        '2月',
        '3月',
        '4月',
        '5月',
        '6月',
        '7月',
        '8月',
        '9月',
        '10月',
        '11月',
        '12月',
      ],
    });

    expect(picker.getDate(true)).to.equal(date);
  });
});
