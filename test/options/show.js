window.QUnit.test('options#show', (assert) => {
  const input = document.createElement('input');

  document.body.appendChild(input);
  assert.expect(1);

  const picker = new window.Picker(input, {
    show() {
      assert.ok(true);
    },
    shown() {
      picker.hide();
    },
  });

  picker.show();
});

window.QUnit.test('options#show: default prevented', (assert) => {
  const input = document.createElement('input');
  const done = assert.async();

  document.body.appendChild(input);
  assert.expect(1);

  const picker = new window.Picker(input, {
    show(e) {
      e.preventDefault();

      setTimeout(() => {
        assert.notOk(picker.shown);
        done();
      }, 1000);
    },
    shown() {
      assert.ok(true);
    },
  });

  picker.show();
});
