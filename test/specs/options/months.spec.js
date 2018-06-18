describe('months (option)', () => {
  it('should use the given months', () => {
    const input = window.createInput();
    const date = '十一月';
    const picker = new Picker(input, {
      date,
      format: 'MMMM',
      months: [
        '一月',
        '二月',
        '三月',
        '四月',
        '五月',
        '六月',
        '七月',
        '八月',
        '九月',
        '十月',
        '十一月',
        '十二月',
      ],
    });

    expect(picker.getDate(true)).to.equal(date);
  });
});
