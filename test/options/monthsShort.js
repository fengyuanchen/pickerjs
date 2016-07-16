window.QUnit.test('options#monthsShort', (assert) => {
  const input = document.createElement('input');

  document.body.appendChild(input);
  assert.expect(1);

  const date = '6月';
  const picker = new window.Picker(input, {
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

  assert.deepEqual(picker.getDate(true), date);
});
