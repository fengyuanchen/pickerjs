window.QUnit.test('methods#show', (assert) => {
  const input = document.createElement('input');

  document.body.appendChild(input);
  assert.expect(2);

  const picker = new window.Picker(input, {
    shown() {
      picker.hide();
    },
  });

  assert.notOk(picker.shown);
  picker.show();
  assert.ok(picker.shown);
});
