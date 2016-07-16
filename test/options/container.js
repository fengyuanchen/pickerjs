window.QUnit.test('options#container', (assert) => {
  const container = document.createElement('div');
  const input = document.createElement('input');

  document.body.appendChild(input);
  document.body.appendChild(container);
  assert.expect(1);

  // eslint-disable-next-line
  const picker = new window.Picker(input, {
    container,
    inline: true,
  });

  assert.deepEqual(container.childElementCount, 1);
});

window.QUnit.test('options#container: self', (assert) => {
  const container = document.createElement('div');

  document.body.appendChild(container);
  assert.expect(1);

  // eslint-disable-next-line
  const picker = new window.Picker(container, {
    inline: true,
  });

  assert.deepEqual(container.childElementCount, 1);
});
