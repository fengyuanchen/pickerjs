describe('Picker', () => {
  it('should be a class (function)', () => {
    expect(Picker).to.be.a('function');
  });

  it('should throw error when the first argument is not an element', () => {
    expect(() => {
      new Picker(document);
    }).to.throw('The first argument is required and must be an element.');
  });
});
