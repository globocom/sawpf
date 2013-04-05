Cookie.unset('__sawpf_');

describe('Compatibility mode:', function() {
    
  describe('using IE7 on IE8', function() {
    it('should show sawpf bar', function() {
      fakeUserAgent('Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0; Trident/4.0)');
      document.documentMode = 7;
      afterSawpfLoaded(function(){
          expect(document.getElementById('sawpf')).toExist();
      })
    });
  });
  
  describe('using IE7 on IE9', function() {
    it('should not show sawpf bar', function() {
      fakeUserAgent('Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0; Trident/5.0)');
      document.documentMode = 7;
      afterSawpfLoaded(function(){
          expect(document.getElementById('sawpf')).not.toExist();
      });
    });
  });
    
  describe('using IE8 on IE9', function() {
    it('should not show sawpf bar', function() {
      fakeUserAgent('Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/5.0)');
      document.documentMode = 8;
      afterSawpfLoaded(function(){
          expect(document.getElementById('sawpf')).not.toExist();
      });
    });
  });
  
  describe('using IE7 on IE10', function() {
      it('should not show sawpf bar', function() {
        fakeUserAgent('Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0; Trident/6.0)');
        document.documentMode = 7;
        afterSawpfLoaded(function(){
            expect(document.getElementById('sawpf')).not.toExist();
        });
      });
    });
      
    describe('using IE8 on IE10', function() {
      it('should not show sawpf bar', function() {
        fakeUserAgent('Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/6.0)');
        document.documentMode = 8;
        afterSawpfLoaded(function(){
            expect(document.getElementById('sawpf')).not.toExist();
        });
      });
    });
  
});
