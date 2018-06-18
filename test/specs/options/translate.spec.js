describe('translate (option)', () => {
  it('should translate the date correctly', () => {
    const input = window.createInput();
    const picker = new Picker(input, {
      translate(type, text) {
        const suffixes = {
          year: '年',
          month: '月',
          day: '日',
          hour: '时',
          minute: '分',
        };

        return Number(text) + suffixes[type];
      },
    });

    expect(picker.picker.querySelector('.picker-picked[data-name="year"]').textContent).to.equal(`${picker.getDate().getFullYear()}年`);
  });
});
