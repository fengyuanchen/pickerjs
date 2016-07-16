window.QUnit.test('methods#getDate', (assert) => {
  const input = document.createElement('input');

  document.body.appendChild(input);
  assert.expect(2);

  const date = new Date(2048, 9, 24, 5, 12);
  const picker = new window.Picker(input, {
    date,
  });

  assert.deepEqual(picker.getDate().getTime(), date.getTime());
  assert.deepEqual(picker.getDate(true), '2048-10-24 05:12');
});
