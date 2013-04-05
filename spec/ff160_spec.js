Cookie.unset('__sawpf_');

describe('Firefox 16.0 should show with user agent', function() {
    
  var userAgents = [
    'Mozilla/6.0 (Windows NT 6.2; WOW64; rv:16.0.1) Gecko/20121011 Firefox/16.0.1',
    'Mozilla/5.0 (Windows NT 6.2; WOW64; rv:16.0.1) Gecko/20121011 Firefox/16.0.1',
    'Mozilla/5.0 (Windows NT 6.2; Win64; x64; rv:16.0.1) Gecko/20121011 Firefox/16.0.1'
  ];
  
  for(var i=0; i<userAgents.length; i++) {
      var u = userAgents[i];
      it(u, function() {
          fakeUserAgent(u);
          afterSawpfLoaded(function(){
            expect(document.getElementById('sawpf')).toExist();
          })
      });
  };

});