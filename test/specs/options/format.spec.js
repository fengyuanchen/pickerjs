describe('format (option)', () => {
  it('should match the given format', () => {
    const input = window.createInput();
    const date = '1111/1/1 1:1:1.1';
    const picker = new Picker(input, {
      date,
      format: 'YYYY/M/D H:m:s.S',
    });

    expect(picker.getDate(true)).to.equal(date);
  });

  it('should support "YYYYMMDD"', () => {
    const input = window.createInput();
    const date = '11111111';
    const picker = new Picker(input, {
      date,
      format: 'YYYYMMDD',
    });

    expect(picker.getDate(true)).to.equal(date);
  });

  it('should support "YYYY"', () => {
    const input = window.createInput();
    const date = '1111';
    const picker = new Picker(input, {
      date,
      format: 'YYYY',
    });

    expect(picker.getDate(true)).to.equal(date);
    picker.setDate('111');
    expect(picker.getDate(true)).to.equal('0111');
    picker.setDate('11');
    expect(picker.getDate(true)).to.equal('0011');
    picker.setDate('1');
    expect(picker.getDate(true)).to.equal('0001');
    picker.setDate('11111');
    expect(picker.getDate(true)).to.equal('11111');
  });

  it('should support "YYY"', () => {
    const input = window.createInput();
    const date = '111';
    const picker = new Picker(input, {
      date,
      format: 'YYY',
    });

    expect(picker.getDate(true)).to.equal(date);
    picker.setDate('11');
    expect(picker.getDate(true)).to.equal('011');
    picker.setDate('1');
    expect(picker.getDate(true)).to.equal('001');
    picker.setDate('1111');
    expect(picker.getDate(true)).to.equal('1111');
  });

  it('should support "YY"', () => {
    const input = window.createInput();
    const date = '11';
    const picker = new Picker(input, {
      date,
      format: 'YY',
    });

    expect(picker.getDate(true)).to.equal(date);
    expect(picker.getDate().getFullYear()).to.equal(2011);
    picker.setDate('1');
    expect(picker.getDate(true)).to.equal('01');
    expect(picker.getDate().getFullYear()).to.equal(2001);
    picker.setDate('111');
    expect(picker.getDate(true)).to.equal('11');
  });

  it('should support "Y"', () => {
    const input = window.createInput();
    const date = '1';
    const picker = new Picker(input, {
      date,
      format: 'Y',
    });

    expect(picker.getDate(true)).to.equal(date);
    picker.setDate('11');
    expect(picker.getDate(true)).to.equal('11');

    // 1000 BC
    picker.setDate('-1000');
    expect(picker.getDate(true)).to.equal('-1000');
  });

  it('should support "MMMM"', () => {
    const input = window.createInput();
    const date = 'December';
    const picker = new Picker(input, {
      date,
      format: 'MMMM',
    });

    expect(picker.getDate(true)).to.equal(date);
  });

  it('should support "MMM"', () => {
    const input = window.createInput();
    const date = 'Dec';
    const picker = new Picker(input, {
      date,
      format: 'MMM',
    });

    expect(picker.getDate(true)).to.equal(date);
  });

  it('should support "MM"', () => {
    const input = window.createInput();
    const date = '01';
    const picker = new Picker(input, {
      date,
      format: 'MM',
    });

    expect(picker.getDate(true)).to.equal(date);
    picker.setDate('11');
    expect(picker.getDate(true)).to.equal('11');
  });

  it('should support "M"', () => {
    const input = window.createInput();
    const date = '1';
    const picker = new Picker(input, {
      date,
      format: 'M',
    });

    expect(picker.getDate(true)).to.equal(date);
    picker.setDate('11');
    expect(picker.getDate(true)).to.equal('11');
  });

  it('should support "DD"', () => {
    const input = window.createInput();
    const date = '01';
    const picker = new Picker(input, {
      date,
      format: 'DD',
    });

    expect(picker.getDate(true)).to.equal(date);
    picker.setDate('11');
    expect(picker.getDate(true)).to.equal('11');
  });

  it('should support "D"', () => {
    const input = window.createInput();
    const date = '1';
    const picker = new Picker(input, {
      date,
      format: 'D',
    });

    expect(picker.getDate(true)).to.equal(date);
    picker.setDate('11');
    expect(picker.getDate(true)).to.equal('11');
  });

  it('should support "HH"', () => {
    const input = window.createInput();
    const date = '01';
    const picker = new Picker(input, {
      date,
      format: 'HH',
    });

    expect(picker.getDate(true)).to.equal(date);
    picker.setDate('11');
    expect(picker.getDate(true)).to.equal('11');
  });

  it('should support "H"', () => {
    const input = window.createInput();
    const date = '1';
    const picker = new Picker(input, {
      date,
      format: 'H',
    });

    expect(picker.getDate(true)).to.equal(date);
    picker.setDate('11');
    expect(picker.getDate(true)).to.equal('11');
  });

  it('should support "mm"', () => {
    const input = window.createInput();
    const date = '01';
    const picker = new Picker(input, {
      date,
      format: 'mm',
    });

    expect(picker.getDate(true)).to.equal(date);
    picker.setDate('11');
    expect(picker.getDate(true)).to.equal('11');
  });

  it('should support "m"', () => {
    const input = window.createInput();
    const date = '1';
    const picker = new Picker(input, {
      date,
      format: 'm',
    });

    expect(picker.getDate(true)).to.equal(date);
    picker.setDate('11');
    expect(picker.getDate(true)).to.equal('11');
  });

  it('should support "ss"', () => {
    const input = window.createInput();
    const date = '01';
    const picker = new Picker(input, {
      date,
      format: 'ss',
    });

    expect(picker.getDate(true)).to.equal(date);
    picker.setDate('11');
    expect(picker.getDate(true)).to.equal('11');
  });

  it('should support "s"', () => {
    const input = window.createInput();
    const date = '1';
    const picker = new Picker(input, {
      date,
      format: 's',
    });

    expect(picker.getDate(true)).to.equal(date);
    picker.setDate('11');
    expect(picker.getDate(true)).to.equal('11');
  });

  it('should support "SSS"', () => {
    const input = window.createInput();
    const date = '001';
    const picker = new Picker(input, {
      date,
      format: 'SSS',
    });

    expect(picker.getDate(true)).to.equal(date);
    picker.setDate('11');
    expect(picker.getDate(true)).to.equal('011');
    picker.setDate('1');
    expect(picker.getDate(true)).to.equal('001');
  });

  it('should support "SS"', () => {
    const input = window.createInput();
    const date = '01';
    const picker = new Picker(input, {
      date,
      format: 'SS',
    });

    expect(picker.getDate(true)).to.equal(date);
    picker.setDate('11');
    expect(picker.getDate(true)).to.equal('11');
  });

  it('should support "S"', () => {
    const input = window.createInput();
    const date = '1';
    const picker = new Picker(input, {
      date,
      format: 'S',
    });

    expect(picker.getDate(true)).to.equal(date);
    picker.setDate('11');
    expect(picker.getDate(true)).to.equal('11');
  });

  it('should throw error when the format is invalid', () => {
    const input = window.createInput();

    expect(() => {
      new Picker(input, {
        format: '',
      });
    }).to.throw('Invalid format.');
  });
});
