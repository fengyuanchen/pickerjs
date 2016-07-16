window.QUnit.test('events#hide', (assert) => {
  const input = document.createElement('input');
  const done = assert.async();

  document.body.appendChild(input);
  assert.expect(1);

  const picker = new window.Picker(input, {
    shown() {
      picker.hide();
    },
  });

  input.addEventListener('hide', () => {
    assert.ok(true);
    done();
  }, false);

  picker.show();
});

window.QUnit.test('events#hide: default prevented', (assert) => {
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
    hidden() {
      assert.ok(true);
    },
  });

  input.addEventListener('hide', (e) => e.preventDefault(), false);
  picker.show();
});
