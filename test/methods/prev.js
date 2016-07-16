window.QUnit.test('methods#prev', (assert) => {
  const input = document.createElement('input');

  document.body.appendChild(input);
  assert.expect(7);

  const date = '2048-10-24 5:12:2.56';
  const picker = new window.Picker(input, {
    date,
    format: 'YYYY-M-D H:m:s.S',
  });

  picker.prev('year');
  assert.deepEqual(picker.getDate().getFullYear(), 2047);
  picker.prev('month');
  assert.deepEqual(picker.getDate().getMonth(), 8);
  picker.prev('day');
  assert.deepEqual(picker.getDate().getDate(), 23);
  picker.prev('hour');
  assert.deepEqual(picker.getDate().getHours(), 4);
  picker.prev('minute');
  assert.deepEqual(picker.getDate().getMinutes(), 11);
  picker.prev('second');
  assert.deepEqual(picker.getDate().getSeconds(), 1);
  picker.prev('millisecond');
  assert.deepEqual(picker.getDate().getMilliseconds(), 55);
});
