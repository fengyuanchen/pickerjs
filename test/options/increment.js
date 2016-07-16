window.QUnit.test('options#increment: Number', (assert) => {
  const input = document.createElement('input');

  document.body.appendChild(input);
  assert.expect(7);

  const date = new Date();
  const increment = 2;
  const picker = new window.Picker(input, {
    date,
    format: 'YYYY-M-D H:m:s.S',
    increment,
  });

  assert.deepEqual(Number(picker.picker.querySelector('.picker-picked[data-name="year"]')
    .nextElementSibling.dataset.value), date.getFullYear() + increment);
  assert.deepEqual(Number(picker.picker.querySelector('.picker-picked[data-name="month"]')
    .nextElementSibling.dataset.value), date.getMonth() + increment);
  assert.deepEqual(Number(picker.picker.querySelector('.picker-picked[data-name="day"]')
    .nextElementSibling.dataset.value), date.getDate() + increment);
  assert.deepEqual(Number(picker.picker.querySelector('.picker-picked[data-name="hour"]')
    .nextElementSibling.dataset.value), date.getHours() + increment);
  assert.deepEqual(Number(picker.picker.querySelector('.picker-picked[data-name="minute"]')
    .nextElementSibling.dataset.value), date.getMinutes() + increment);
  assert.deepEqual(Number(picker.picker.querySelector('.picker-picked[data-name="second"]')
    .nextElementSibling.dataset.value), date.getSeconds() + increment);
  assert.deepEqual(Number(picker.picker.querySelector('.picker-picked[data-name="millisecond"]')
    .nextElementSibling.dataset.value), date.getMilliseconds() + increment);
});

window.QUnit.test('options#increment: Object', (assert) => {
  const input = document.createElement('input');

  document.body.appendChild(input);
  assert.expect(7);

  const date = new Date();
  const increment = 2;
  const picker = new window.Picker(input, {
    date,
    format: 'YYYY-M-D H:m:s.S',
    increment: {
      year: increment,
      month: increment,
      day: increment,
      hour: increment,
      minute: increment,
      second: increment,
      millisecond: increment,
    },
  });

  assert.deepEqual(Number(picker.picker.querySelector('.picker-picked[data-name="year"]')
    .nextElementSibling.dataset.value), date.getFullYear() + increment);
  assert.deepEqual(Number(picker.picker.querySelector('.picker-picked[data-name="month"]')
    .nextElementSibling.dataset.value), date.getMonth() + increment);
  assert.deepEqual(Number(picker.picker.querySelector('.picker-picked[data-name="day"]')
    .nextElementSibling.dataset.value), date.getDate() + increment);
  assert.deepEqual(Number(picker.picker.querySelector('.picker-picked[data-name="hour"]')
    .nextElementSibling.dataset.value), date.getHours() + increment);
  assert.deepEqual(Number(picker.picker.querySelector('.picker-picked[data-name="minute"]')
    .nextElementSibling.dataset.value), date.getMinutes() + increment);
  assert.deepEqual(Number(picker.picker.querySelector('.picker-picked[data-name="second"]')
    .nextElementSibling.dataset.value), date.getSeconds() + increment);
  assert.deepEqual(Number(picker.picker.querySelector('.picker-picked[data-name="millisecond"]')
    .nextElementSibling.dataset.value), date.getMilliseconds() + increment);
});
