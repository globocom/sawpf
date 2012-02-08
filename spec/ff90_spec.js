Cookie.unset('__sawpf_');
fakeUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:9.0a2) Gecko/20111101 Firefox/9.0a2');
require('/src/1.0.js');

describe('Firefox 9.0', function() {
  it('should not show sawpf bar', function() {
    expect(document.getElementById('sawpf')).not.toExist();
  });
});

