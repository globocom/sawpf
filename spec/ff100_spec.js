Cookie.unset('__sawpf_');
fakeUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10.7; rv:10.0) Gecko/20100101 Firefox/10.0');
require('/src/1.0.js');

describe('Firefox 10.0', function() {
  it('should show sawpf bar', function() {
    expect(document.getElementById('sawpf')).toExist();
  });
});

