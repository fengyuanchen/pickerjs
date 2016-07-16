window.QUnit.test('events#show', (assert) => {
  const input = document.createElement('input');

  document.body.appendChild(input);
  assert.expect(1);

  const picker = new window.Picker(input, {
    shown() {
      picker.hide();
    },
  });

  input.addEventListener('show', () => assert.ok(true), false);

  picker.show();
});

window.QUnit.test('events#show: default prevented', (assert) => {
  const input = document.createElement('input');
  const done = assert.async();

  document.body.appendChild(input);
  assert.expect(1);

  const picker = new window.Picker(input, {
    shown() {
      assert.ok(true);
    },
  });

  input.addEventListener('show', (e) => {
    e.preventDefault();

    setTimeout(() => {
      assert.notOk(picker.shown);
      done();
    }, 1000);
  }, false);

  picker.show();
});
