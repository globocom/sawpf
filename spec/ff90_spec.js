Cookie.unset('__sawpf_');

describe('Firefox 9.0', function() {

  it('should not show sawpf bar', function() {
    fakeUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:9.0a2) Gecko/20111101 Firefox/9.0a2');
    afterSawpfLoaded(function(){
        expect(document.getElementById('sawpf')).not.toExist();
    });
  });

  it('should not show sawpf bar', function() {
    fakeUserAgent('Mozilla/5.0 (Windows NT 6.2; rv:9.0.1) Gecko/20100101 Firefox/9.0.1');
    afterSawpfLoaded(function(){
        expect(document.getElementById('sawpf')).not.toExist();
    });
  });

});

