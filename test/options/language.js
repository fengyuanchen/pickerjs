const script = document.createElement('script');

script.src = '../i18n/picker.en-US.js';
document.body.appendChild(script);

window.QUnit.test('options#language', (assert) => {
  const input = document.createElement('input');

  document.body.appendChild(input);
  assert.expect(1);

  const picker = new window.Picker(input, {
    language: 'en-US',
  });

  assert.deepEqual(picker.options.format, window.Picker.languages['en-US'].format);
});
