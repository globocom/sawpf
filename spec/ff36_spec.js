Cookie.unset('__sawpf_');
fakeUserAgent('Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US; rv:1.9.2.11) Gecko/20101012 Firefox/3.6.11');
require('/src/1.0.js');

describe('Firefox 3.6', function() {
  it('should not show sawpf bar', function() {
    expect(document.getElementById('sawpf')).not.toExist();
  });
});
