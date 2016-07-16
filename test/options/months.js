window.QUnit.test('options#months', (assert) => {
  const input = document.createElement('input');

  document.body.appendChild(input);
  assert.expect(1);

  const date = '十一月';
  const picker = new window.Picker(input, {
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

  assert.deepEqual(picker.getDate(true), date);
});
