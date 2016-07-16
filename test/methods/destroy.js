window.QUnit.test('methods#destroy', (assert) => {
  const container = document.createElement('div');
  const input = document.createElement('input');

  document.body.appendChild(input);
  document.body.appendChild(container);
  assert.expect(4);

  const picker = new window.Picker(input, {
    container,
    inline: true,
  });

  assert.deepEqual(input.picker, picker);
  assert.deepEqual(container.childElementCount, 1);
  picker.destroy();
  assert.deepEqual(input.picker, undefined);
  assert.deepEqual(container.childElementCount, 0);
});
