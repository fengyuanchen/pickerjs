window.QUnit.test('events#pick', (assert) => {
  const input = document.createElement('input');

  document.body.appendChild(input);
  assert.expect(4);

  const picker = new window.Picker(input);

  input.addEventListener('pick', () => assert.ok(true), false);
  input.addEventListener('change', () => assert.ok(true), false);
  assert.notOk(input.value);
  picker.pick();
  assert.ok(input.value);
});
