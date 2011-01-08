fakeUserAgent('Mozilla/5.0 (X11; U; OpenBSD i386; en-US; rv:1.8.1.14) Gecko/20080821 Firefox/2.0.0.14');
require('/src/1.0.js');

describe('Firefox 2.0', function() {
  it('should show sawpf bar', function() {
    expect(document.getElementById('sawpf')).toExist();
  });
});
