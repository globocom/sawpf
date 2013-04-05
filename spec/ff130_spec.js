Cookie.unset('__sawpf_');

describe('Firefox 13.0 should show with user agent', function() {
    
  var userAgents = [
    'Mozilla/5.0 (Windows NT 5.1; rv:15.0) Gecko/20100101 Firefox/13.0.1',
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