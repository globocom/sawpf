fakeUserAgent('Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 6.0; Trident/4.0)');
require('/src/1.0.js');

describe('sawpf com ie6', function() {
  it('should show sawpf bar', function() {
    expect(document.getElementById('sawpf')).toExist();
  });
});
