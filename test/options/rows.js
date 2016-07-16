window.QUnit.test('options#rows', (assert) => {
  const input = document.createElement('input');

  document.body.appendChild(input);
  assert.expect(1);

  const rows = 7;
  const picker = new window.Picker(input, {
    rows,
  });

  assert.deepEqual(picker.picker.querySelectorAll('.picker-item[data-name="year"]').length,
    rows + 2);
});
