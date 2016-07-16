window.QUnit.test('methods#next', (assert) => {
  const input = document.createElement('input');

  document.body.appendChild(input);
  assert.expect(7);

  const date = '2048-10-24 5:12:2.56';
  const picker = new window.Picker(input, {
    date,
    format: 'YYYY-M-D H:m:s.S',
  });

  picker.next('year');
  assert.deepEqual(picker.getDate().getFullYear(), 2049);
  picker.next('month');
  assert.deepEqual(picker.getDate().getMonth(), 10);
  picker.next('day');
  assert.deepEqual(picker.getDate().getDate(), 25);
  picker.next('hour');
  assert.deepEqual(picker.getDate().getHours(), 6);
  picker.next('minute');
  assert.deepEqual(picker.getDate().getMinutes(), 13);
  picker.next('second');
  assert.deepEqual(picker.getDate().getSeconds(), 3);
  picker.next('millisecond');
  assert.deepEqual(picker.getDate().getMilliseconds(), 57);
});
