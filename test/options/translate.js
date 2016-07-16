window.QUnit.test('options#translate', (assert) => {
  const input = document.createElement('input');

  document.body.appendChild(input);
  assert.expect(1);

  const picker = new window.Picker(input, {
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

  assert.deepEqual(picker.picker.querySelector('.picker-picked[data-name="year"]').textContent,
    `${picker.getDate().getFullYear()}年`);
});
