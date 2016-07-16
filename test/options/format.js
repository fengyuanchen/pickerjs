window.QUnit.test('options#format', (assert) => {
  const input = document.createElement('input');

  document.body.appendChild(input);
  assert.expect(1);

  const date = '1111/1/1 1:1:1.1';
  const picker = new window.Picker(input, {
    date,
    format: 'YYYY/M/D H:m:s.S',
  });

  assert.deepEqual(picker.getDate(true), date);
});

window.QUnit.test('options#format: YYYY', (assert) => {
  const input = document.createElement('input');

  document.body.appendChild(input);
  assert.expect(6);

  const date = '1111';
  const picker = new window.Picker(input, {
    date,
    format: 'YYYY',
  });

  assert.deepEqual(picker.getDate(true), date);

  const date2 = '111';

  picker.setDate(date2);
  assert.deepEqual(picker.getDate(true), '0111');

  const date3 = '11';

  picker.setDate(date3);
  assert.deepEqual(picker.getDate(true), '0011');

  const date4 = '1';

  picker.setDate(date4);
  assert.deepEqual(picker.getDate(true), '0001');

  const date5 = '11111';

  picker.setDate(date5);
  assert.deepEqual(picker.getDate(true), date5);

  const date6 = '-1';

  picker.setDate(date6);
  assert.deepEqual(picker.getDate(true), '-0001');
});

window.QUnit.test('options#format: YYY', (assert) => {
  const input = document.createElement('input');

  document.body.appendChild(input);
  assert.expect(5);

  const date = '111';
  const picker = new window.Picker(input, {
    date,
    format: 'YYY',
  });

  assert.deepEqual(picker.getDate(true), date);

  const date2 = '11';

  picker.setDate(date2);
  assert.deepEqual(picker.getDate(true), '011');

  const date3 = '1';

  picker.setDate(date3);
  assert.deepEqual(picker.getDate(true), '001');

  const date4 = '1111';

  picker.setDate(date4);
  assert.deepEqual(picker.getDate(true), date4);

  const date5 = '-1';

  picker.setDate(date5);
  assert.deepEqual(picker.getDate(true), '-001');
});

window.QUnit.test('options#format: YY', (assert) => {
  const input = document.createElement('input');

  document.body.appendChild(input);
  assert.expect(6);

  const date = '11';
  const picker = new window.Picker(input, {
    date,
    format: 'YY',
  });

  assert.deepEqual(picker.getDate(true), date);
  assert.deepEqual(picker.getDate().getFullYear(), 2011);

  const date2 = '1';

  picker.setDate(date2);
  assert.deepEqual(picker.getDate(true), '01');
  assert.deepEqual(picker.getDate().getFullYear(), 2001);

  const date3 = '111';

  picker.setDate(date3);
  assert.deepEqual(picker.getDate(true), '11');

  const date4 = '-1';

  picker.setDate(date4);
  assert.deepEqual(picker.getDate(true), '01');
});

window.QUnit.test('options#format: Y', (assert) => {
  const input = document.createElement('input');

  document.body.appendChild(input);
  assert.expect(7);

  const date = '1';
  const picker = new window.Picker(input, {
    date,
    format: 'Y',
  });
  assert.deepEqual(picker.getDate(true), date);

  const date2 = '11';

  picker.setDate(date2);
  assert.deepEqual(picker.getDate(true), date2);

  const date3 = '111';

  picker.setDate(date3);
  assert.deepEqual(picker.getDate(true), date3);

  const date4 = '1111';

  picker.setDate(date4);
  assert.deepEqual(picker.getDate(true), date4);

  const date5 = '11111';

  picker.setDate(date5);
  assert.deepEqual(picker.getDate(true), date5);

  const date6 = '111111';

  picker.setDate(date6);
  assert.deepEqual(picker.getDate(true), date6);

  const date7 = '-1';

  picker.setDate(date7);
  assert.deepEqual(picker.getDate(true), date7);
});

window.QUnit.test('options#format: MMMM', (assert) => {
  const input = document.createElement('input');

  document.body.appendChild(input);
  assert.expect(1);

  const date = 'December';
  const picker = new window.Picker(input, {
    date,
    format: 'MMMM',
  });

  assert.deepEqual(picker.getDate(true), date);
});

window.QUnit.test('options#format: MMM', (assert) => {
  const input = document.createElement('input');

  document.body.appendChild(input);
  assert.expect(1);

  const date = 'Dec';
  const picker = new window.Picker(input, {
    date,
    format: 'MMM',
  });

  assert.deepEqual(picker.getDate(true), date);
});

window.QUnit.test('options#format: MM', (assert) => {
  const input = document.createElement('input');

  document.body.appendChild(input);
  assert.expect(1);

  const date = '01';
  const picker = new window.Picker(input, {
    date,
    format: 'MM',
  });

  assert.deepEqual(picker.getDate(true), date);
});

window.QUnit.test('options#format: M', (assert) => {
  const input = document.createElement('input');

  document.body.appendChild(input);
  assert.expect(1);

  const date = '1';
  const picker = new window.Picker(input, {
    date,
    format: 'M',
  });

  assert.deepEqual(picker.getDate(true), date);
});

window.QUnit.test('options#format: DD', (assert) => {
  const input = document.createElement('input');

  document.body.appendChild(input);
  assert.expect(2);

  const date = '01';
  const picker = new window.Picker(input, {
    date,
    format: 'DD',
  });

  assert.deepEqual(picker.getDate(true), date);

  const date2 = '11';
  picker.setDate(date2);
  assert.deepEqual(picker.getDate(true), date2);
});

window.QUnit.test('options#format: D', (assert) => {
  const input = document.createElement('input');

  document.body.appendChild(input);
  assert.expect(2);

  const date = '1';
  const picker = new window.Picker(input, {
    date,
    format: 'D',
  });

  assert.deepEqual(picker.getDate(true), date);

  const date2 = '11';
  picker.setDate(date2);
  assert.deepEqual(picker.getDate(true), date2);
});
