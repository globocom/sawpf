Cookie.set('__sawpf_', '1', 10000);
fakeUserAgent('Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 6.0; Trident/4.0)'); // IE6
require('/src/1.0.js');

describe('Cookie is present', function() {
  it('should not show sawpf bar', function() {
    expect(document.getElementById('sawpf')).not.toExist();
  });
});
