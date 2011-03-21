Cookie.unset('__sawpf_');
fakeUserAgent('Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0; Trident/4.0)');
require('/src/1.0.js');

describe('Internet Explorer 7.0', function() {
  it('should show sawpf bar', function() {
    expect(document.getElementById('sawpf')).toExist();
  });
});
