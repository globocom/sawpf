Cookie.unset('__sawpf_');

describe('Firefox 18.0 should show with user agent', function() {
    
  var userAgents = [
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8.3) Gecko/20120221 Firefox/18.0',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 1083) Gecko/20100101 Firefox/18.0',
    'Mozilla/6.0 (Windows NT 6.1; WOW64; rv:16.0.1) Gecko/20121011 Firefox/18.0.1 CentOS',
    'Mozilla/5.0 (Windows NT 6.2; rv:18.0) Gecko/18.0 Firefox/18.0',
    'Mozilla/5.0 (Windows NT 6.2; rv:18.0) Gecko/20100101 Firefox/18.0 AppEngine-Google; (+http://code.google.com/appengine; appid: sxun242114)',
    'Mozilla/5.0 (Windows NT 6.2; rv:18.0) Gecko/20100101 Firefox/18.0 AlexaToolbar/amznf-3.0.20121130',
    'Mozilla/5.0 (Windows NT 6.2; rv:18.0; WUID3ef51991e2477112a6356e9ebe639d09; WTB2938) Gecko/20100101 Firefox/18.0',
    'Mozilla/5.0 (Windows NT 6.2; rv:18.0; WUIDa4cc521a7d917a346f3cb972995175d3; WTB592) Gecko/20100101 Firefox/18.0',
    'Mozilla/5.0 (Windows NT 6.2; rv:18.0) Gecko/20100101 Firefox/18.0',
    'Mozilla/5.0 (Windows NT 6.2; rv:18.0) Gecko/20100101 Firefox/18.0'
  ];
  
  for(var i=0; i<userAgents.length; i++) {
      var u = userAgents[i];
      it(u, function() {
          fakeUserAgent(u);
          afterSawpfLoaded(function(){
            expect(document.getElementById('sawpf')).not.toExist();
          })
      });
  };

});