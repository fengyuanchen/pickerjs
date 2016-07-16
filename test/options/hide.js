window.QUnit.test('options#hide', (assert) => {
  const input = document.createElement('input');
  const done = assert.async();

  document.body.appendChild(input);
  assert.expect(1);

  const picker = new window.Picker(input, {
    shown() {
      picker.hide();
    },
    hide() {
      assert.ok(true);
      done();
    },
  });

  picker.show();
});

window.QUnit.test('options#hide: default prevented', (assert) => {
  const container = document.createElement('div');
  const input = document.createElement('input');
  const done = assert.async();

  container.appendChild(input);
  document.body.appendChild(container);
  assert.expect(1);

  const picker = new window.Picker(input, {
    shown() {
      picker.hide();

      setTimeout(() => {
        assert.ok(picker.shown);
        done();
        picker.destroy();
      }, 1000);
    },
    hide(e) {
      e.preventDefault();
    },
    hidden() {
      assert.ok(true);
    },
  });

  picker.show();
});
