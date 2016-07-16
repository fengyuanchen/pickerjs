window.QUnit.test('options#inline', (assert) => {
  const container = document.createElement('div');

  document.body.appendChild(container);
  assert.expect(1);

  // eslint-disable-next-line
  const picker = new window.Picker(container, {
    inline: true,
  });

  assert.deepEqual(container.childElementCount, 1);
});

window.QUnit.test('options#inline: container', (assert) => {
  const container = document.createElement('div');
  const input = document.createElement('input');

  document.body.appendChild(container);
  document.body.appendChild(input);
  assert.expect(1);

  // eslint-disable-next-line
  const picker = new window.Picker(input, {
    container,
    inline: true,
  });

  assert.deepEqual(container.childElementCount, 1);
});
