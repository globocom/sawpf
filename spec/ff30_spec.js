Cookie.unset('__sawpf_');
fakeUserAgent('Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10.5; en-US; rv:1.9.0.3) Gecko/2008092414 Firefox/3.0.3');
require('/src/1.0.js');

describe('Firefox 3.0', function() {
  it('should show sawpf bar', function() {
    expect(document.getElementById('sawpf')).toExist();
  });
});
