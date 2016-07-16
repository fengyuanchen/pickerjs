window.QUnit.test('methods#formatDate', (assert) => {
  const input = document.createElement('input');

  document.body.appendChild(input);
  assert.expect(2);

  const picker = new window.Picker(input);

  assert.deepEqual(picker.formatDate('Invalid Date'), '');
  assert.deepEqual(picker.formatDate(new Date(2048, 9, 24, 5, 12)), '2048-10-24 05:12');
});
