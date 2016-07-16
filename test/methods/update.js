window.QUnit.test('methods#update', (assert) => {
  const input = document.createElement('input');

  document.body.appendChild(input);
  assert.expect(1);

  const value = '2048-10-24 05:12';
  const picker = new window.Picker(input);

  input.value = value;
  picker.update();
  assert.deepEqual(picker.getDate(true), value);
});
