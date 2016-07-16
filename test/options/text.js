window.QUnit.test('options#text', (assert) => {
  const input = document.createElement('input');

  document.body.appendChild(input);
  assert.expect(3);

  const text = {
    title: '请选择日期/时间',
    cancel: '取消',
    confirm: '确认',
  };
  const picker = new window.Picker(input, {
    text,
  });

  assert.deepEqual(picker.picker.querySelector('.picker-title').textContent, text.title);
  assert.deepEqual(picker.picker.querySelector('.picker-cancel').textContent, text.cancel);
  assert.deepEqual(picker.picker.querySelector('.picker-confirm').textContent, text.confirm);
});
