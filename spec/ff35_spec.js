fakeUserAgent('Mozilla/5.0 (X11; U; Linux x86_64; en-US; rv:1.9.1.8) Gecko/20100215 Solaris/10.1 (GNU) Firefox/3.5.8 (Byte/me)');
require('/src/1.0.js');

describe('Firefox 3.5', function() {
  it('should not show sawpf bar', function() {
    expect(document.getElementById('sawpf')).not.toExist();
  });
});
