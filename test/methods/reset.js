window.QUnit.test('methods#reset', (assert) => {
  const input = document.createElement('input');
  const initialValue = '1024-05-12 02:56';

  input.value = initialValue;
  document.body.appendChild(input);
  assert.expect(4);

  const value = '2048-10-24 05:12';
  const picker = new window.Picker(input);

  picker.setDate(value).pick();
  assert.deepEqual(picker.getDate(true), value);
  assert.deepEqual(input.value, value);
  picker.reset();
  assert.deepEqual(picker.getDate(true), initialValue);
  assert.deepEqual(input.value, initialValue);
});
