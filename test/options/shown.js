window.QUnit.test('options#shown', (assert) => {
  const input = document.createElement('input');
  const done = assert.async();

  document.body.appendChild(input);
  assert.expect(1);

  const picker = new window.Picker(input, {
    shown() {
      assert.ok(true);
      done();
      picker.hide();
    },
  });

  picker.show();
});
