describe('text (option)', () => {
  it('should match the given text', () => {
    const input = window.createInput();
    const text = {
      title: '选择日期时间',
      cancel: '取消',
      confirm: '确认',
    };
    const picker = new Picker(input, {
      text,
    });

    expect(picker.picker.querySelector('.picker-title').textContent).to.equal(text.title);
    expect(picker.picker.querySelector('.picker-cancel').textContent).to.equal(text.cancel);
    expect(picker.picker.querySelector('.picker-confirm').textContent).to.equal(text.confirm);
  });

  it('should support partial properties', () => {
    const input = window.createInput();
    const text = {
      title: '选择日期时间',
    };
    const picker = new Picker(input, {
      text,
    });

    expect(picker.picker.querySelector('.picker-title').textContent).to.equal(text.title);
    expect(picker.picker.querySelector('.picker-cancel').textContent).to.equal('Cancel');
    expect(picker.picker.querySelector('.picker-confirm').textContent).to.equal('OK');
  });
});
