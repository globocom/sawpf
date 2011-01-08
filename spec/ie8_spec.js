fakeUserAgent('Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0)');
require('/src/1.0.js');

describe('Internet Explorer 8.0', function() {
  it('should not show sawpf bar', function() {
    expect(document.getElementById('sawpf')).not.toExist();
  });
});
