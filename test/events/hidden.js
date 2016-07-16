window.QUnit.test('events#hidden', (assert) => {
  const input = document.createElement('input');
  const done = assert.async();

  document.body.appendChild(input);
  assert.expect(1);

  const picker = new window.Picker(input, {
    shown() {
      picker.hide();
    },
  });

  input.addEventListener('hidden', () => {
    assert.ok(true);
    done();
  }, false);

  picker.show();
});
