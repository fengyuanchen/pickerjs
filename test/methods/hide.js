window.QUnit.test('methods#hide', (assert) => {
  const input = document.createElement('input');
  const done = assert.async();

  document.body.appendChild(input);
  assert.expect(2);

  const picker = new window.Picker(input, {
    shown() {
      assert.ok(picker.shown);
      picker.hide();
      assert.notOk(picker.shown);
      done();
    },
  });

  picker.show();
});
