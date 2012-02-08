Cookie.unset('__sawpf_');

function loadSawpf() {
  (function(d,t){
    var g=d.createElement(t),
    s=d.getElementsByTagName(t)[0];
    g.src='/src/1.0.js';
    s.parentNode.insertBefore(g,s)
  }(document,'script'));
}

describe('Firefox 9.0', function() {

  beforeEach(function() {
    return;
    var el = document.getElementById('sawpf');
    if (!el) return;
    el.parent.removeChild(el);
  });

  it('should not show sawpf bar', function() {
    fakeUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:9.0a2) Gecko/20111101 Firefox/9.0a2');
    loadSawpf();
    expect(document.getElementById('sawpf')).not.toExist();
  });

  it('should not show sawpf bar', function() {
    fakeUserAgent('Mozilla/5.0 (Windows NT 6.2; rv:9.0.1) Gecko/20100101 Firefox/9.0.1');
    loadSawpf();
    expect(document.getElementById('sawpf')).toExist();
  });

});

