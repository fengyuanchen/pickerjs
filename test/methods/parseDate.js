window.QUnit.test('methods#parseDate', (assert) => {
  const input = document.createElement('input');

  document.body.appendChild(input);
  assert.expect(1);

  const date = '2048-10-24 05:12';
  const picker = new window.Picker(input);

  assert.deepEqual(picker.formatDate(picker.parseDate(date)), date);
});
