window.QUnit.test('methods#pick', (assert) => {
  const input = document.createElement('input');

  document.body.appendChild(input);
  assert.expect(2);

  const picker = new window.Picker(input);

  assert.deepEqual(input.value, '');
  picker.pick();
  assert.deepEqual(input.value, picker.getDate(true));
});
