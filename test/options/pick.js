window.QUnit.test('options#pick', (assert) => {
  const input = document.createElement('input');

  document.body.appendChild(input);
  assert.expect(3);

  const picker = new window.Picker(input, {
    pick() {
      assert.ok(true);
    },
  });

  assert.notOk(input.value);
  picker.pick();
  assert.ok(input.value);
});
