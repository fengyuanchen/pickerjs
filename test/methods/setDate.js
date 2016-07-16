window.QUnit.test('methods#setDate', (assert) => {
  const input = document.createElement('input');

  document.body.appendChild(input);
  assert.expect(2);

  const date = new Date(2048, 9, 24, 5, 12);
  const picker = new window.Picker(input, {
    date,
  });

  picker.setDate(date);
  assert.deepEqual(picker.getDate().getTime(), date.getTime());

  const date2 = '1024-05-12 02:56';

  picker.setDate(date2);
  assert.deepEqual(picker.getDate(true), date2);
});
