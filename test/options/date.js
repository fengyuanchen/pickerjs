window.QUnit.test('options#date: Date', (assert) => {
  const input = document.createElement('input');

  document.body.appendChild(input);
  assert.expect(1);

  const time = Date.now() + 3600000; // One hour later
  const picker = new window.Picker(input, {
    date: new Date(time),
  });

  assert.deepEqual(picker.getDate().getTime(), time);
});

window.QUnit.test('options#date: String', (assert) => {
  const input = document.createElement('input');

  document.body.appendChild(input);
  assert.expect(1);

  const date = '2222-02-22 22:22';
  const picker = new window.Picker(input, {
    date,
  });

  assert.deepEqual(picker.getDate(true), date);
});
